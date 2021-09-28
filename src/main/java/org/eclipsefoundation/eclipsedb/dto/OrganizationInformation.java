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
package org.eclipsefoundation.eclipsedb.dto;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.ws.rs.core.MultivaluedMap;

import org.eclipsefoundation.core.namespace.DefaultUrlParameterNames;
import org.eclipsefoundation.persistence.dto.BareNode;
import org.eclipsefoundation.persistence.dto.filter.DtoFilter;
import org.eclipsefoundation.persistence.model.DtoTable;
import org.eclipsefoundation.persistence.model.ParameterizedSQLStatement;
import org.eclipsefoundation.persistence.model.ParameterizedSQLStatementBuilder;

@Table
@Entity
public class OrganizationInformation extends BareNode {
    public static final DtoTable TABLE = new DtoTable(OrganizationInformation.class, "oi");

    @Id
    @Column(name = "OrganizationID")
    private Integer organizationID;
    @Column(name = "short_description")
    private String shortDescription;
    @Column(name = "long_description")
    private String longDescription;
    @Column(name = "company_url")
    private String companyUrl;
    @Column(name = "small_mime")
    private String smallMime;
    @Column(name = "small_logo")
    private byte[] smallLogo;
    @Column(name = "small_width")
    private int smallWidth;
    @Column(name = "small_height")
    private int smallHeight;
    @Column(name = "large_mime")
    private String largeMime;
    @Column(name = "large_logo")
    private byte[] largeLogo;
    @Column(name = "large_width")
    private int largeWidth;
    @Column(name = "large_height")
    private int largeHeight;

    @Override
    public Integer getId() {
        return getOrganizationID();
    }

    /**
     * @return the organizationID
     */
    public Integer getOrganizationID() {
        return organizationID;
    }

    /**
     * @param organizationID the organizationID to set
     */
    public void setOrganizationID(Integer organizationID) {
        this.organizationID = organizationID;
    }

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

    /**
     * @return the companyUrl
     */
    public String getCompanyUrl() {
        return companyUrl;
    }

    /**
     * @param companyUrl the companyUrl to set
     */
    public void setCompanyUrl(String companyUrl) {
        this.companyUrl = companyUrl;
    }

    /**
     * @return the smallMime
     */
    public String getSmallMime() {
        return smallMime;
    }

    /**
     * @param smallMime the smallMime to set
     */
    public void setSmallMime(String smallMime) {
        this.smallMime = smallMime;
    }

    /**
     * @return the smallLogo
     */
    public byte[] getSmallLogo() {
        return smallLogo;
    }

    /**
     * @param smallLogo the smallLogo to set
     */
    public void setSmallLogo(byte[] smallLogo) {
        this.smallLogo = smallLogo;
    }

    /**
     * @return the smallWidth
     */
    public int getSmallWidth() {
        return smallWidth;
    }

    /**
     * @param smallWidth the smallWidth to set
     */
    public void setSmallWidth(int smallWidth) {
        this.smallWidth = smallWidth;
    }

    /**
     * @return the smallHeight
     */
    public int getSmallHeight() {
        return smallHeight;
    }

    /**
     * @param smallHeight the smallHeight to set
     */
    public void setSmallHeight(int smallHeight) {
        this.smallHeight = smallHeight;
    }

    /**
     * @return the largeMime
     */
    public String getLargeMime() {
        return largeMime;
    }

    /**
     * @param largeMime the largeMime to set
     */
    public void setLargeMime(String largeMime) {
        this.largeMime = largeMime;
    }

    /**
     * @return the largeLogo
     */
    public byte[] getLargeLogo() {
        return largeLogo;
    }

    /**
     * @param largeLogo the largeLogo to set
     */
    public void setLargeLogo(byte[] largeLogo) {
        this.largeLogo = largeLogo;
    }

    /**
     * @return the largeWidth
     */
    public int getLargeWidth() {
        return largeWidth;
    }

    /**
     * @param largeWidth the largeWidth to set
     */
    public void setLargeWidth(int largeWidth) {
        this.largeWidth = largeWidth;
    }

    /**
     * @return the largeHeight
     */
    public int getLargeHeight() {
        return largeHeight;
    }

    /**
     * @param largeHeight the largeHeight to set
     */
    public void setLargeHeight(int largeHeight) {
        this.largeHeight = largeHeight;
    }

    @Singleton
    public static class OrganizationInformationFilter implements DtoFilter<OrganizationInformation> {
        @Inject
        ParameterizedSQLStatementBuilder builder;

        @Override
        public ParameterizedSQLStatement getFilters(MultivaluedMap<String, String> params, boolean isRoot) {
            ParameterizedSQLStatement stmt = builder.build(TABLE);
            if (isRoot) {
                // ID check
                String id = params.getFirst(DefaultUrlParameterNames.ID.getName());
                if (id != null) {
                    stmt.addClause(new ParameterizedSQLStatement.Clause(TABLE.getAlias() + ".organizationID = ?",
                            new Object[] { Integer.valueOf(id) }));
                }
            }

            return stmt;
        }

        @Override
        public Class<OrganizationInformation> getType() {
            return OrganizationInformation.class;
        }
    }
}
