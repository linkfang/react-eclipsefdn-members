/**
 * Copyright (c) 2021 Eclipse Foundation
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * Author: Martin Lowe <martin.lowe@eclipse-foundation.org>
 *
 * SPDX-License-Identifier: EPL-2.0
 */
package org.eclipsefoundation.react.service.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Executor;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.context.control.ActivateRequestContext;
import javax.inject.Inject;
import javax.ws.rs.ServerErrorException;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response.Status;

import org.apache.commons.lang3.StringUtils;
import org.eclipse.microprofile.graphql.NonNull;
import org.eclipse.microprofile.rest.client.inject.RestClient;
import org.eclipsefoundation.api.APIMiddleware;
import org.eclipsefoundation.api.OrganizationAPI;
import org.eclipsefoundation.api.SysAPI;
import org.eclipsefoundation.api.model.Organization;
import org.eclipsefoundation.api.model.OrganizationContact;
import org.eclipsefoundation.api.model.OrganizationDocument;
import org.eclipsefoundation.api.model.OrganizationMembership;
import org.eclipsefoundation.api.model.SysRelation;
import org.eclipsefoundation.core.model.RequestWrapper;
import org.eclipsefoundation.core.namespace.DefaultUrlParameterNames;
import org.eclipsefoundation.core.service.CachingService;
import org.eclipsefoundation.eclipsedb.dao.EclipseDBPersistenceDAO;
import org.eclipsefoundation.eclipsedb.dto.OrganizationInformation;
import org.eclipsefoundation.persistence.dao.impl.DefaultHibernateDao;
import org.eclipsefoundation.persistence.model.RDBMSQuery;
import org.eclipsefoundation.persistence.service.FilterService;
import org.eclipsefoundation.react.model.MemberOrganization;
import org.eclipsefoundation.react.model.MemberOrganization.MemberOrganizationDescription;
import org.eclipsefoundation.react.model.MemberOrganization.MemberOrganizationLogos;
import org.eclipsefoundation.react.model.MembershipLevel;
import org.eclipsefoundation.react.model.OrganizationContactData;
import org.eclipsefoundation.react.model.OrganizationWGPA;
import org.eclipsefoundation.react.service.LiveImageService;
import org.eclipsefoundation.react.service.OrganizationsService;
import org.eclipsefoundation.react.service.WorkingGroupsService;
import org.jboss.resteasy.specimpl.MultivaluedMapImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.github.benmanes.caffeine.cache.AsyncCacheLoader;
import com.github.benmanes.caffeine.cache.AsyncLoadingCache;
import com.github.benmanes.caffeine.cache.Caffeine;

import io.quarkus.runtime.Startup;

/**
 * Builds a list of working group definitions from the FoundationDB, making use of some data from the FoundationDB
 * system API to retrieve common values such as relation descriptions.
 * 
 * @author Martin Lowe
 */
@Startup
@ApplicationScoped
public class FoundationDBOrganizationService implements OrganizationsService {
    public static final Logger LOGGER = LoggerFactory.getLogger(FoundationDBOrganizationService.class);

    private static final String ALL_LIST_CACHE_KEY = "allEntries";

    @Inject
    DefaultHibernateDao dao;
    @Inject
    EclipseDBPersistenceDAO eDBdao;
    @Inject
    FilterService filters;
    @Inject
    LiveImageService imageService;
    @Inject
    WorkingGroupsService wgService;

    @RestClient
    @Inject
    OrganizationAPI orgAPI;
    @RestClient
    @Inject
    SysAPI sysAPI;
    @Inject
    CachingService cache;

    // use a loading cache for HA of expensive getAll call
    private AsyncLoadingCache<String, List<MemberOrganization>> loadingCache;

    /**
     * On construct, start the loading cache for the full list of member organizations. This is a large call that we
     * want to be highly available, as attempting to call it without a cache would result in timeouts.
     */
    @PostConstruct
    void init() {
        FoundationDBOrganizationService parent = this;
        loadingCache = Caffeine.newBuilder().buildAsync(new AsyncCacheLoader<String, List<MemberOrganization>>() {
            @Override
            public @NonNull CompletableFuture<List<MemberOrganization>> asyncLoad(String key,
                    @NonNull Executor executor) {
                CompletableFuture<List<MemberOrganization>> future = new CompletableFuture<>();
                if (key.equals(ALL_LIST_CACHE_KEY)) {
                    return future.completeAsync(parent::getAll);
                } else {
                    return future.completeAsync(null);
                }
            }
        });
        LOGGER.info("Starting init of cached organizations");
        loadingCache.get(ALL_LIST_CACHE_KEY);
    }

    @Override
    public List<MemberOrganization> get() {
        // retrieve results from loading cache (this is very expensive, but should always be available)
        CompletableFuture<List<MemberOrganization>> orgs = loadingCache.get(ALL_LIST_CACHE_KEY);
        try {
            return new ArrayList<>(orgs.get());
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new ServerErrorException("Could not retrieve member organizations", Status.INTERNAL_SERVER_ERROR);
        } catch (ExecutionException e) {
            throw new ServerErrorException("Could not retrieve member organizations", Status.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public Optional<MemberOrganization> getByID(String id) {
        try {
            return cache.get(id, new MultivaluedMapImpl<>(), MemberOrganization.class,
                    () -> convertToMemberOrganization(orgAPI.getOrganization(id)));
        } catch (Exception e) {
            LOGGER.error("Error retrieving member organization: ", e);
        }
        return Optional.empty();
    }

    @Override
    public Optional<List<OrganizationContactData>> getOrganizationContacts(String orgID, Optional<String> mail,
            Optional<String> role, Optional<String> fName, Optional<String> lName) {
        // create param map to properly generate a cache key
        MultivaluedMap<String, String> params = new MultivaluedMapImpl<>();
        params.add("mail", mail.orElse(null));
        params.add("relation", role.orElse(null));
        params.add("fName", fName.orElse(null));
        params.add("lName", lName.orElse(null));

        Optional<List<OrganizationContact>> data = cache
                .get(orgID, params, OrganizationContact.class,
                        () -> APIMiddleware.getAll(
                                i -> orgAPI.getOrganizationContactsWithSearch(orgID, i, mail.orElse(null),
                                        role.orElse(null), fName.orElse(null), lName.orElse(null)),
                                OrganizationContact.class));
        if (data.isEmpty()) {
            return Optional.empty();
        }
        return Optional.of(data.get().stream().map(OrganizationContactData::convert).collect(Collectors.toList()));
    }

    @Override
    public Optional<List<OrganizationContact>> getOrganizationContacts(String orgID, String userName) {
        return cache.get(orgID, new MultivaluedMapImpl<>(), OrganizationContact.class, () -> APIMiddleware
                .getAll(i -> orgAPI.getOrganizationContacts(orgID, i, userName), OrganizationContact.class));
    }

    @Override
    public boolean organizationContactHasRole(String orgID, String userName, String role) {
        Optional<List<OrganizationContact>> contacts = cache.get(orgID, new MultivaluedMapImpl<>(),
                OrganizationContact.class,
                () -> APIMiddleware.getAll(i -> orgAPI.getOrganizationContacts(orgID, i, userName, role),
                        OrganizationContact.class));
        // if we have results, then the relation exists for user
        return contacts.isPresent() && !contacts.get().isEmpty();
    }

    @Override
    public void removeOrganizationContact(String orgID, String userName, String role) {
        orgAPI.removeOrganizationContacts(orgID, userName, role);
    }

    @Override
    public OrganizationContact updateOrganizationContact(String orgID, OrganizationContact orgContact) {
        return orgAPI.updateOrganizationContacts(orgID, orgContact);
    }

    /**
     * Used to populate the cache and is therefore uncached. This should not be called outside of the loading cache
     * thread. AS this is typically called outside of the request context, a new context should be invoked around this
     * call to generate the JPA session.
     * 
     * @return list of member organizations
     */
    @ActivateRequestContext
    protected List<MemberOrganization> getAll() {
        return APIMiddleware.getAll(orgAPI::getOrganizations, Organization.class).stream()
                .map(this::convertToMemberOrganization).collect(Collectors.toList());
    }

    /**
     * Using SysRelation data and the passed organization, creates a member organization object that can be returned
     * which includes multiple tables of data.
     * 
     * @param org base organization of the member organization.
     * @return a member organization object containing additional contextual data about the org
     */
    private MemberOrganization convertToMemberOrganization(Organization org) {
        MemberOrganization out = new MemberOrganization();
        out.setOrganizationID(org.getOrganizationID());
        out.setName(org.getName1());

        // Get org information from eclipse db
        MultivaluedMap<String, String> params = new MultivaluedMapImpl<>();
        params.add(DefaultUrlParameterNames.ID.getName(), Integer.toString(org.getOrganizationID()));
        RDBMSQuery<OrganizationInformation> q = new RDBMSQuery<>(new RequestWrapper(),
                filters.get(OrganizationInformation.class), params);
        q.setRoot(false);
        // retrieve and handle the org info data
        List<OrganizationInformation> r = eDBdao.get(q);
        if (!r.isEmpty()) {
            OrganizationInformation info = r.get(0);
            // retrieve the descriptions of the organization
            MemberOrganizationDescription desc = new MemberOrganizationDescription();
            desc.setLongDescription(info.getLongDescription());
            desc.setShortDescription(info.getShortDescription());
            out.setDescription(desc);

            // retrieve the logos of the organization
            MemberOrganizationLogos logos = new MemberOrganizationLogos();
            if (StringUtils.isNotBlank(info.getLargeMime())) {
                logos.setFull(imageService.retrieveImageUrl(info::getLargeLogo,
                        Integer.toString(org.getOrganizationID()), info.getLargeMime(), Optional.of("full")));
            }
            if (StringUtils.isNotBlank(info.getSmallMime())) {
                logos.setSmall(imageService.retrieveImageUrl(info::getSmallLogo,
                        Integer.toString(org.getOrganizationID()), info.getSmallMime(), Optional.of("small")));
            }
            out.setLogos(logos);
        }

        // retrieve organization membership and create membership levels when possible
        List<OrganizationMembership> memberships = getCachedOrganizationMemberships(org);
        // using the system relations, create membership levels
        List<SysRelation> rels = getCachedRelations();
        out.setLevels(memberships.stream().map(membership -> {
            MembershipLevel l = new MembershipLevel();
            l.setDescription(getRelationDesc(membership.getCompositeId().getRelation(), rels));
            l.setLevel(membership.getCompositeId().getRelation());
            return l;
        }).collect(Collectors.toList()));

        // get org WGPA documents and convert to model to be returned with extra context
        Map<String, List<String>> wgpaDocIDs = wgService.getWGPADocumentIDs();
        List<OrganizationDocument> docs = getCachedOrganizationWGDocuments(org, wgpaDocIDs);
        out.setWgpas(docs.stream().map(wgpa -> generateOrganizationWorkingGroupPA(wgpa, wgpaDocIDs))
                .collect(Collectors.toList()));
        return out;
    }

    /**
     * Retrieves cached organization WGPA documents via a caching layer, returning an empty list if none are found.
     * 
     * @param org the organization to retrieve documents for.
     * @param wgpaDocIDs mapping representing the working group aliases to their working group participation agreement
     * document IDs
     * @return the list of WGPA documents for current working group or an empty list.
     */
    private List<OrganizationDocument> getCachedOrganizationWGDocuments(Organization org,
            Map<String, List<String>> wgpaDocIDs) {
        // gets all organization WG documents, using cache to reduce latency. Uses middleware for pagination
        return cache
                .get(Integer.toString(org.getOrganizationID()), new MultivaluedMapImpl<>(), OrganizationDocument.class,
                        () -> APIMiddleware.getAll(
                                i -> orgAPI.getOrganizationDocuments(Integer.toString(org.getOrganizationID()), i,
                                        wgpaDocIDs.values().stream().flatMap(List::stream)
                                                .collect(Collectors.toList())),
                                OrganizationDocument.class))
                .orElseGet(Collections::emptyList);
    }

    /**
     * Retrieves all membership relations for an organization, using caching+middleware to simplify and reduce latency
     * of calls.
     * 
     * @param org the organization to retrieve memberships for
     * @return the list of membership relations for the organizations or an empty list.
     */
    private List<OrganizationMembership> getCachedOrganizationMemberships(Organization org) {
        return cache.get(Integer.toString(org.getOrganizationID()), new MultivaluedMapImpl<>(),
                OrganizationMembership.class,
                () -> APIMiddleware.getAll(
                        i -> orgAPI.getOrganizationMembership(Integer.toString(org.getOrganizationID()), i),
                        OrganizationMembership.class))
                .orElseGet(Collections::emptyList);
    }

    /**
     * Retrieves cached system relations from external service. This is used to map the relation codes to human-readable
     * strings.
     * 
     * @return list of system relations, or an empty list.
     */
    private List<SysRelation> getCachedRelations() {
        return cache
                .get(ALL_LIST_CACHE_KEY, new MultivaluedMapImpl<>(), SysRelation.class,
                        () -> APIMiddleware.getAll(sysAPI::getSysRelations, SysRelation.class))
                .orElseGet(Collections::emptyList);
    }

    /**
     * Converts an organization document to a organization WGPA model with extra context.
     * 
     * @param wgpa the document to transform
     * @param wgpaDocIDs mapping representing the working group aliases to their working group participation agreement
     * document IDs
     * @return an enhanced document model with extra contextual data.
     */
    private OrganizationWGPA generateOrganizationWorkingGroupPA(OrganizationDocument wgpa,
            Map<String, List<String>> wgpaDocIDs) {
        OrganizationWGPA owgpa = new OrganizationWGPA();
        owgpa.setDocumentID(wgpa.getCompositeID().getDocumentID());
        owgpa.setLevel(wgpa.getRelation());
        // find the first entry that has a matching ID for current document
        Optional<Entry<String, List<String>>> wgID = wgpaDocIDs.entrySet().stream()
                .filter(e -> e.getValue().contains(owgpa.getDocumentID())).findFirst();
        // if this is missing then we have a document that wasn't in the list of IDs passed to fetch
        owgpa.setWorkingGroup(wgID.get().getKey());
        return owgpa;
    }

    /**
     * Using the relation code, searches the SysRelation entries to find the description of a relation.
     * 
     * @param relation relation code to retrieve a description for
     * @param rels the list of system relations so search for matching relation code.
     * @return the name/description of the relation if it can be found, otherwise null.
     */
    private String getRelationDesc(String relation, List<SysRelation> rels) {
        return rels.stream().filter(rel -> rel.getRelation().equals(relation)).findFirst().orElse(new SysRelation())
                .getDescription();
    }
}
