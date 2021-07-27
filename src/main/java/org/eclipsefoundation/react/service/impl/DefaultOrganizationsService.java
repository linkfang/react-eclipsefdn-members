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

import org.eclipse.microprofile.graphql.NonNull;
import org.eclipse.microprofile.rest.client.inject.RestClient;
import org.eclipsefoundation.api.APIMiddleware;
import org.eclipsefoundation.api.OrganizationAPI;
import org.eclipsefoundation.api.SysAPI;
import org.eclipsefoundation.api.model.Organization;
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
 * Builds a list of working group definitions from an embedded list of working group definitions. This is an interim
 * solution to accelerate this project and should be replaced with a call to the foundation API to retrieve this data.
 * 
 * @author Martin Lowe
 */
@ApplicationScoped
public class DefaultOrganizationsService implements OrganizationsService {
    public static final Logger LOGGER = LoggerFactory.getLogger(DefaultOrganizationsService.class);

    private static final String ALL_LIST_CACHE_KEY = "allEntries";

    // Use middleware to handle the pagination
    @Inject
    APIMiddleware mw;

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
        loadingCache = Caffeine.newBuilder().buildAsync(new AsyncCacheLoader<String, List<MemberOrganization>>() {
            @Override
            public @NonNull CompletableFuture<List<MemberOrganization>> asyncLoad(String key,
                    @NonNull Executor executor) {
                CompletableFuture<List<MemberOrganization>> future = new CompletableFuture<>();
                if (key.equals(ALL_LIST_CACHE_KEY)) {
                    return future.completeAsync(() -> getAll());
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
            throw new RuntimeException(e);
        } catch (ExecutionException e) {
            throw new RuntimeException(e);
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

    private List<MemberOrganization> getAll() {
        return mw.getAll(page -> orgAPI.getOrganizationsResponse(page), Organization.class).stream()
                .map(this::convertToMemberOrganization).collect(Collectors.toList());
    }

    private List<OrganizationMembership> getAllMemberships(String id) {
        return mw.getAll(page -> orgAPI.getOrganizationMembershipResponse(id, page), OrganizationMembership.class);
    }

    private List<SysRelation> getRelations() {
        return cache
                .get(ALL_LIST_CACHE_KEY, new MultivaluedMapImpl<>(), SysRelation.class,
                        () -> mw.getAll(p -> sysAPI.getSysRelationsResponse(p), SysRelation.class))
                .orElseGet(Collections::emptyList);

    }

    private MemberOrganization convertToMemberOrganization(Organization org) {
        List<SysRelation> rels = getRelations();
        MemberOrganization out = new MemberOrganization();
        out.setOrganizationID(org.getOrganizationID());
        Optional<List<OrganizationMembership>> memberships = cache.get(Integer.toString(org.getOrganizationID()),
                new MultivaluedMapImpl<>(), MemberOrganization.class,
                () -> getAllMemberships(Integer.toString(org.getOrganizationID())));
        if (memberships.isPresent()) {
            out.setLevels(memberships.get().stream().map(membership -> {
                MembershipLevel l = new MembershipLevel();
                l.setDescription(getRelationDesc(membership.getCompositeId().getRelation(), rels));
                l.setLevel(membership.getCompositeId().getRelation());
                return l;
            }).collect(Collectors.toList()));
        }
        return out;
    }

    private String getRelationDesc(String relation, List<SysRelation> rels) {
        return rels.stream().filter(rel -> rel.getRelation().equals(relation)).findFirst().orElse(new SysRelation())
                .getDescription();
    }
}
