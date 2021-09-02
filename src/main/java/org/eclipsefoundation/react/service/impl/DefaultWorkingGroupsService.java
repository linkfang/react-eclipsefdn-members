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
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.inject.Instance;
import javax.inject.Inject;
import javax.json.bind.Jsonb;

import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.eclipsefoundation.react.model.WorkingGroup;
import org.eclipsefoundation.react.model.WorkingGroupMap;
import org.eclipsefoundation.react.model.WorkingGroupParticipationAgreement;
import org.eclipsefoundation.react.service.WorkingGroupsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import io.quarkus.runtime.Startup;

/**
 * Builds a list of working group definitions from an embedded list of working group definitions. This is an interim
 * solution to accelerate this project and should be replaced with a call to the foundation API to retrieve this data.
 * 
 * @author Martin Lowe
 */
@Startup
@ApplicationScoped
public class DefaultWorkingGroupsService implements WorkingGroupsService {
    public static final Logger LOGGER = LoggerFactory.getLogger(DefaultWorkingGroupsService.class);

    @ConfigProperty(name = "eclipse.working-groups.deny-list", defaultValue = "")
    Instance<List<String>> denyList;
    @ConfigProperty(name = "eclipse.working-groups.filepath")
    String filepath;

    @Inject
    Jsonb json;

    private Map<String, WorkingGroup> wgs;

    /**
     * At startup, will load the working groups and store them locally to be used throughout the servers life time. As
     * this resource is embedded within the Jar, we do not need to look for changes to the resource, as that would not
     * happen with a production server.
     * 
     * @throws IOException if there is an issue loading the working groups resource from within the Jar resources.
     */
    @PostConstruct
    void init() throws IOException {
        LOGGER.info("Starting init of working group levels static members");
        try (InputStream is = Thread.currentThread().getContextClassLoader().getResourceAsStream(filepath)) {
            WorkingGroupMap map = json.fromJson(is, WorkingGroupMap.class);
            this.wgs = new HashMap<>(map.getWorkingGroups());
            LOGGER.info("Initialized {} working group", wgs.size());
        }
    }

    @Override
    public Set<WorkingGroup> get() {
        return new HashSet<>(wgs.entrySet().stream().filter(entry -> !denyList().contains(entry.getKey()))
                .collect(Collectors.toMap(Entry::getKey, Entry::getValue)).values());
    }

    @Override
    public WorkingGroup getByName(String name) {
        return wgs.get(name);
    }

    @Override
    public Map<String, List<String>> getWGPADocumentIDs() {
        Map<String, List<String>> wgToDocument = new HashMap<>();
        wgs.values().stream().forEach(wg -> wgToDocument.put(wg.getAlias(), extractWGPADocumentIDs(wg)));
        return wgToDocument;
    }

    private List<String> denyList() {
        return denyList.stream().flatMap(List::stream).collect(Collectors.toList());
    }

    private List<String> extractWGPADocumentIDs(WorkingGroup wg) {
        List<String> ids = new ArrayList<>();
        WorkingGroupParticipationAgreement iwgpa = wg.getResources().getParticipationAgreements().getIndividual();
        if (iwgpa != null) {
            ids.add(iwgpa.getDocumentId());
        }
        WorkingGroupParticipationAgreement wgpa = wg.getResources().getParticipationAgreements().getOrganization();
        if (wgpa != null) {
            ids.add(wgpa.getDocumentId());
        }
        return ids;
    }
}
