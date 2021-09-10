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
package org.eclipsefoundation.react.dto;

import java.util.List;
import java.util.Objects;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.json.bind.annotation.JsonbProperty;
import javax.json.bind.annotation.JsonbTransient;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.ws.rs.core.MultivaluedMap;

import org.eclipsefoundation.core.namespace.DefaultUrlParameterNames;
import org.eclipsefoundation.persistence.dto.BareNode;
import org.eclipsefoundation.persistence.dto.filter.DtoFilter;
import org.eclipsefoundation.persistence.model.DtoTable;
import org.eclipsefoundation.persistence.model.ParameterizedSQLStatement;
import org.eclipsefoundation.persistence.model.ParameterizedSQLStatementBuilder;
import org.eclipsefoundation.react.namespace.MembershipFormAPIParameterNames;
import org.hibernate.annotations.GenericGenerator;

/**
 * The address for an organization entity being defined in a form.
 * 
 * @author Martin Lowe
 *
 */
@Table
@Entity
public class Address extends BareNode implements TargetedClone<Address> {
    public static final DtoTable TABLE = new DtoTable(Address.class, "a");

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    private String id;

    @JsonbTransient
    @OneToOne
    @JoinColumn(name = "organization_id", unique = true)
    private FormOrganization organization;

    @NotBlank(message = "First address line cannot be blank")
    @JsonbProperty("address_line_1")
    private String addressLine1;
    @JsonbProperty("address_line_2")
    private String addressLine2;
    @NotBlank(message = "Locality cannot be blank")
    private String locality;
    private String administrativeArea;
    @NotBlank(message = "Country cannot be blank")
    private String country;
    private String postalCode;

    /** @return the id */
    @Override
    public String getId() {
        return id;
    }

    /** @param id the id to set */
    public void setId(String id) {
        this.id = id;
    }

    /** @return the organization */
    @JsonbTransient
    public FormOrganization getOrganization() {
        return this.organization;
    }

    /** @param org the organization to set */
    public void setOrganization(FormOrganization org) {
        this.organization = org;
    }

    /**
     * @return the addressLine1
     */
    public String getAddressLine1() {
        return addressLine1;
    }

    /**
     * @param addressLine1 the addressLine1 to set
     */
    public void setAddressLine1(String addressLine1) {
        this.addressLine1 = addressLine1;
    }

    /**
     * @return the addressLine2
     */
    public String getAddressLine2() {
        return addressLine2;
    }

    /**
     * @param addressLine2 the addressLine2 to set
     */
    public void setAddressLine2(String addressLine2) {
        this.addressLine2 = addressLine2;
    }

    /**
     * @return the locality
     */
    public String getLocality() {
        return locality;
    }

    /**
     * @param locality the locality to set
     */
    public void setLocality(String locality) {
        this.locality = locality;
    }

    /**
     * @return the administrativeArea
     */
    public String getAdministrativeArea() {
        return administrativeArea;
    }

    /**
     * @param administrativeArea the administrativeArea to set
     */
    public void setAdministrativeArea(String administrativeArea) {
        this.administrativeArea = administrativeArea;
    }

    /**
     * @return the country
     */
    public String getCountry() {
        return country;
    }

    /**
     * @param country the country to set
     */
    public void setCountry(String country) {
        this.country = country;
    }

    /**
     * @return the postalCode
     */
    public String getPostalCode() {
        return postalCode;
    }

    /**
     * @param postalCode the postalCode to set
     */
    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = super.hashCode();
        result = prime * result
                + Objects.hash(addressLine1, addressLine2, administrativeArea, country, id, locality, postalCode);
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (!super.equals(obj))
            return false;
        if (getClass() != obj.getClass())
            return false;
        Address other = (Address) obj;
        return Objects.equals(addressLine1, other.addressLine1) && Objects.equals(addressLine2, other.addressLine2)
                && Objects.equals(administrativeArea, other.administrativeArea)
                && Objects.equals(country, other.country) && Objects.equals(id, other.id)
                && Objects.equals(locality, other.locality) && Objects.equals(postalCode, other.postalCode);
    }

    @Override
    public Address cloneTo(Address target) {
        target.setAddressLine1(getAddressLine1());
        target.setAddressLine2(getAddressLine2());
        target.setLocality(getLocality());
        target.setAdministrativeArea(getAdministrativeArea());
        target.setCountry(getCountry());
        target.setPostalCode(getPostalCode());
        return target;
    }

    /**
     * Filter for selecting the address within the database.
     * 
     * @author Martin Lowe
     */
    @Singleton
    public static class AddressFilter implements DtoFilter<Address> {
        @Inject
        ParameterizedSQLStatementBuilder builder;

        @Override
        public ParameterizedSQLStatement getFilters(MultivaluedMap<String, String> params, boolean isRoot) {
            ParameterizedSQLStatement stmt = builder.build(TABLE);
            if (isRoot) {
                // ID check
                String id = params.getFirst(DefaultUrlParameterNames.ID.getName());
                if (id != null) {
                    stmt.addClause(
                            new ParameterizedSQLStatement.Clause(TABLE.getAlias() + ".id = ?", new Object[] { id }));
                }
            }
            // form IDs check
            List<String> formIds = params.get(MembershipFormAPIParameterNames.FORM_IDS.getName());
            if (formIds != null) {
                stmt.addClause(new ParameterizedSQLStatement.Clause(TABLE.getAlias() + ".organization.form.id IN ?",
                        new Object[] { formIds }));
            }
            return stmt;
        }

        @Override
        public Class<Address> getType() {
            return Address.class;
        }
    }

}
