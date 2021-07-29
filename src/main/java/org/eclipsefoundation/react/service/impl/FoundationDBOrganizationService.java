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
import java.util.Optional;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Executor;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.ServerErrorException;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response.Status;

import org.eclipse.microprofile.graphql.NonNull;
import org.eclipse.microprofile.rest.client.inject.RestClient;
import org.eclipsefoundation.api.OrganizationAPI;
import org.eclipsefoundation.api.SysAPI;
import org.eclipsefoundation.api.model.Organization;
import org.eclipsefoundation.api.model.OrganizationContact;
import org.eclipsefoundation.api.model.OrganizationMembership;
import org.eclipsefoundation.api.model.SysRelation;
import org.eclipsefoundation.core.service.CachingService;
import org.eclipsefoundation.react.model.MemberOrganization;
import org.eclipsefoundation.react.model.MembershipLevel;
import org.eclipsefoundation.react.service.OrganizationsService;
import org.jboss.resteasy.specimpl.MultivaluedMapImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.github.benmanes.caffeine.cache.AsyncCacheLoader;
import com.github.benmanes.caffeine.cache.AsyncLoadingCache;
import com.github.benmanes.caffeine.cache.Caffeine;

/**
 * Builds a list of working group definitions from the FoundationDB, making use of some data from the FoundationDB
 * system API to retrieve common values such as relation descriptions.
 * 
 * @author Martin Lowe
 */
@ApplicationScoped
public class FoundationDBOrganizationService implements OrganizationsService {
    public static final Logger LOGGER = LoggerFactory.getLogger(FoundationDBOrganizationService.class);

    private static final String ALL_LIST_CACHE_KEY = "allEntries";

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
        Optional<Organization> org = cache.get(id, new MultivaluedMapImpl<>(), Organization.class,
                () -> orgAPI.getOrganization(id));
        if (org.isEmpty()) {
            return Optional.empty();
        }
        return Optional.of(convertToMemberOrganization(org.get()));
    }

    @Override
    public Optional<List<OrganizationContact>> getOrganizationContacts(String orgID, Optional<String> mail,
            Optional<String> role, Optional<String> fName, Optional<String> lName) {
        // create param map to properly generate a cache key
        MultivaluedMap<String, String> params = new MultivaluedMapImpl<>();
        params.add("mail", mail.isPresent() ? mail.get() : null);
        params.add("relation", role.isPresent() ? role.get() : null);
        params.add("fName", fName.isPresent() ? fName.get() : null);
        params.add("lName", lName.isPresent() ? lName.get() : null);
        return cache.get(orgID, params, OrganizationContact.class,
                () -> orgAPI.getOrganizationContactsWithSearch(orgID, mail.isPresent() ? mail.get() : null,
                        role.isPresent() ? role.get() : null, fName.isPresent() ? fName.get() : null,
                        lName.isPresent() ? lName.get() : null));
    }

    @Override
    public Optional<List<OrganizationContact>> getOrganizationContacts(String orgID, String userName) {
        return cache.get(orgID, new MultivaluedMapImpl<>(), OrganizationContact.class,
                () -> orgAPI.getOrganizationContacts(orgID, userName));
    }

    @Override
    public boolean organizationContactHasRole(String orgID, String userName, String role) {
        Optional<List<OrganizationContact>> contacts = cache.get(orgID, new MultivaluedMapImpl<>(),
                OrganizationContact.class, () -> orgAPI.getOrganizationContacts(orgID, userName, role));
        // if we have results, then the relation exists for user
        return contacts.isPresent() && !contacts.get().isEmpty();
    }

    @Override
    public void removeOrganizationContact(String orgID, String userName, String role) {
        // if there as an error, it will throw up
        orgAPI.removeOrganizationContacts(orgID, userName, role);
    }

    protected List<MemberOrganization> getAll() {
        return orgAPI.getOrganizations().stream().map(this::convertToMemberOrganization).collect(Collectors.toList());
    }

    private List<SysRelation> getRelations() {
        return cache.get(ALL_LIST_CACHE_KEY, new MultivaluedMapImpl<>(), SysRelation.class, sysAPI::getSysRelations)
                .orElseGet(Collections::emptyList);
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

        // retrieve organization membership and create membership levels when possible
        Optional<List<OrganizationMembership>> memberships = cache.get(Integer.toString(org.getOrganizationID()),
                new MultivaluedMapImpl<>(), MemberOrganization.class,
                () -> orgAPI.getOrganizationMembership(Integer.toString(org.getOrganizationID())));
        if (memberships.isPresent()) {
            // using the system relations, create membership levels
            List<SysRelation> rels = getRelations();
            out.setLevels(memberships.get().stream().map(membership -> {
                MembershipLevel l = new MembershipLevel();
                l.setDescription(getRelationDesc(membership.getCompositeId().getRelation(), rels));
                l.setLevel(membership.getCompositeId().getRelation());
                return l;
            }).collect(Collectors.toList()));
        }
        return out;
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
