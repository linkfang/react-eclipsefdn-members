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
package org.eclipsefoundation.react.api.model;

import java.util.HashSet;
import java.util.Set;

public class Organization {
    private Integer id;
    private String name;
    private OrganizationMembershipLevel memberLevel;
    private OrganizationDescription description;
    private String website;
    private OrganizationLogos logos;
    private Set<WorkingGroupParticipationAgreement> wgpa;

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public OrganizationMembershipLevel getMemberLevel() {
        return this.memberLevel;
    }

    public void setMemberLevel(OrganizationMembershipLevel memberLevel) {
        this.memberLevel = memberLevel;
    }

    public OrganizationDescription getDescription() {
        return this.description;
    }

    public void setDescription(OrganizationDescription description) {
        this.description = description;
    }

    public String getWebsite() {
        return this.website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public OrganizationLogos getLogos() {
        return this.logos;
    }

    public void setLogos(OrganizationLogos logos) {
        this.logos = logos;
    }

    public Set<WorkingGroupParticipationAgreement> getWgpa() {
        return new HashSet<>(this.wgpa);
    }

    public void setWgpa(Set<WorkingGroupParticipationAgreement> wgpa) {
        this.wgpa = new HashSet<>(wgpa);
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
