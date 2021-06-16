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

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

import org.eclipse.microprofile.rest.client.inject.RestClient;
import org.eclipsefoundation.core.service.CachingService;
import org.eclipsefoundation.react.api.OrganizationAPI;
import org.eclipsefoundation.react.api.model.Organization;
import org.eclipsefoundation.react.service.OrganizationsService;
import org.jboss.resteasy.specimpl.MultivaluedMapImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import io.quarkus.runtime.Startup;

/**
 * Builds a list of working group definitions from an embedded list of working
 * group definitions. This is an interim solution to accelerate this project and
 * should be replaced with a call to the foundation API to retrieve this data.
 * 
 * @author Martin Lowe
 */
@Startup
@ApplicationScoped
public class DefaultOrganizationsService implements OrganizationsService {
    public static final Logger LOGGER = LoggerFactory.getLogger(DefaultOrganizationsService.class);

    @RestClient
    @Inject
    OrganizationAPI orgAPI;
    @Inject
    CachingService cache;

    @PostConstruct
    void init() throws IOException {
        LOGGER.info("Starting init of cached organizations");
        Optional<List<Organization>> orgs = cache.get("all", new MultivaluedMapImpl<>(), Organization.class, () -> getAll(null));
        if (orgs.isEmpty()) {
            throw new RuntimeException("Could not load organizations");
        }
    }

    @Override
    public List<Organization> get() {
        Optional<List<Organization>> orgs = cache.get("all", new MultivaluedMapImpl<>(), Organization.class, () -> getAll(null));
        if (orgs.isEmpty()) {
            return Collections.emptyList();
        }
        return new ArrayList<>(orgs.get());
    }

    @Override
    public Organization getByID(String id) {
        return orgAPI.organizationByID(id);
    }

    private List<Organization> getAll(String workingGroup) {
        String actualWG = workingGroup == null ? "" : workingGroup;
        List<Organization> orgs = new LinkedList<>();
        Set<Organization> tmp = Collections.emptySet();
        int count = 1;
        do {
            tmp = orgAPI.organizations(actualWG, count);
            orgs.addAll(tmp);
            count++;
        } while(!tmp.isEmpty() && tmp != null);
        return orgs;
    }
}
