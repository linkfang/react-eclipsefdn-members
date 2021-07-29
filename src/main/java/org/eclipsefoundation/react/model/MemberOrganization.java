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

import java.util.List;

import javax.json.bind.annotation.JsonbProperty;

public class MemberOrganization {
    private int organizationID;
    private String name;
    private MemberOrganizationDescription description;
    private MemberOrganizationLogos logos;
    private String website;
    private List<MembershipLevel> levels;

    /**
     * @return the organizationID
     */
    public int getOrganizationID() {
        return organizationID;
    }

    /**
     * @param organizationID the organizationID to set
     */
    public void setOrganizationID(int organizationID) {
        this.organizationID = organizationID;
    }

    /**
     * @return the name
     */
    public String getName() {
        return name;
    }

    /**
     * @param name the name to set
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * @return the description
     */
    public MemberOrganizationDescription getDescription() {
        return description;
    }

    /**
     * @param description the description to set
     */
    public void setDescription(MemberOrganizationDescription description) {
        this.description = description;
    }

    /**
     * @return the logos
     */
    public MemberOrganizationLogos getLogos() {
        return logos;
    }

    /**
     * @param logos the logos to set
     */
    public void setLogos(MemberOrganizationLogos logos) {
        this.logos = logos;
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
     * @return the levels
     */
    public List<MembershipLevel> getLevels() {
        return levels;
    }

    /**
     * @param levels the levels to set
     */
    public void setLevels(List<MembershipLevel> levels) {
        this.levels = levels;
    }

    public static class MemberOrganizationDescription {
        @JsonbProperty("short")
        private String shortDescription;
        @JsonbProperty("long")
        private String longDescription;

        /**
         * @return the shortDescription
         */
        public String getShortDescription() {
            return shortDescription;
        }

        /**
         * @param shortDescription the shortDescription to set
         */
        public void setShortDescription(String shortDescription) {
            this.shortDescription = shortDescription;
        }

        /**
         * @return the longDescription
         */
        public String getLongDescription() {
            return longDescription;
        }

        /**
         * @param longDescription the longDescription to set
         */
        public void setLongDescription(String longDescription) {
            this.longDescription = longDescription;
        }
    }

    public static class MemberOrganizationLogos {
        private String small;
        private String full;

        /**
         * @return the small
         */
        public String getSmall() {
            return small;
        }

        /**
         * @param small the small to set
         */
        public void setSmall(String small) {
            this.small = small;
        }

        /**
         * @return the full
         */
        public String getFull() {
            return full;
        }

        /**
         * @param full the full to set
         */
        public void setFull(String full) {
            this.full = full;
        }

    }
}
