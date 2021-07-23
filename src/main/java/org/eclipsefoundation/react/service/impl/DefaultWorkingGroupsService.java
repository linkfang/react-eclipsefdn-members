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
import java.io.InputStream;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.json.bind.Jsonb;

import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.eclipsefoundation.react.model.WorkingGroup;
import org.eclipsefoundation.react.model.WorkingGroupMap;
import org.eclipsefoundation.react.service.WorkingGroupsService;
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
public class DefaultWorkingGroupsService implements WorkingGroupsService {
    public static final Logger LOGGER = LoggerFactory.getLogger(DefaultWorkingGroupsService.class);

    @ConfigProperty(name = "eclipse.working-groups.filepath")
    String filepath;

    @Inject
    Jsonb json;

    private Map<String, WorkingGroup> wgs;

    @PostConstruct
    void init() throws IOException {
        LOGGER.info("Starting init of working group levels static members");
        try (InputStream is = Thread.currentThread().getContextClassLoader().getResourceAsStream(filepath)) {
            WorkingGroupMap map = json.fromJson(is, WorkingGroupMap.class);
            this.wgs = map.getWorkingGroups();
            LOGGER.info("Initialized {} working group", wgs.size());
        }
    }

    @Override
    public Set<WorkingGroup> get() {
        return new HashSet<>(wgs.values());
    }

    @Override
    public WorkingGroup getByName(String name) {
        return wgs.get(name);
    }
}
