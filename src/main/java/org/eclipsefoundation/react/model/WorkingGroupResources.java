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
package org.eclipsefoundation.react.model;

import java.util.Objects;

import javax.json.bind.annotation.JsonbProperty;

public class WorkingGroupResources {
    private String charter;
    @JsonbProperty("participation_agreements")
    private WorkingGroupParticipationAgreements participationAgreements;
    private String website;
    private String members;
    private String sponsorship;
    private String contactForm;

    /**
     * @return the charter
     */
    public String getCharter() {
        return charter;
    }

    /**
     * @param charter the charter to set
     */
    public void setCharter(String charter) {
        this.charter = charter;
    }


    /**
     * @return the participationAgreements
     */
    public WorkingGroupParticipationAgreements getParticipationAgreements() {
        return participationAgreements;
    }

    /**
     * @param participationAgreements the participationAgreements to set
     */
    public void setParticipationAgreements(WorkingGroupParticipationAgreements participationAgreements) {
        this.participationAgreements = participationAgreements;
    }

    /**
     * @return the website
     */
    public String getWebsite() {
        return website;
    }

    /**
     * @param website the website to set
     */
    public void setWebsite(String website) {
        this.website = website;
    }

    /**
     * @return the members
     */
    public String getMembers() {
        return members;
    }

    /**
     * @param members the members to set
     */
    public void setMembers(String members) {
        this.members = members;
    }

    /**
     * @return the sponsorship
     */
    public String getSponsorship() {
        return sponsorship;
    }

    /**
     * @param sponsorship the sponsorship to set
     */
    public void setSponsorship(String sponsorship) {
        this.sponsorship = sponsorship;
    }

    /**
     * @return the contactForm
     */
    public String getContactForm() {
        return contactForm;
    }

    /**
     * @param contactForm the contactForm to set
     */
    public void setContactForm(String contactForm) {
        this.contactForm = contactForm;
    }

    @Override
    public int hashCode() {
        return Objects.hash(charter, contactForm, members, sponsorship, website, participationAgreements);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        WorkingGroupResources other = (WorkingGroupResources) obj;
        return Objects.equals(charter, other.charter) && Objects.equals(contactForm, other.contactForm)
                && Objects.equals(members, other.members) && Objects.equals(sponsorship, other.sponsorship)
                && Objects.equals(website, other.website) && Objects.equals(participationAgreements, other.participationAgreements);
    }

}
