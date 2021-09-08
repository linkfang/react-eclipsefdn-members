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

    @NotBlank(message = "Street cannot be blank")
    private String street;
    @NotBlank(message = "City cannot be blank")
    private String city;
    private String provinceState;
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
    public FormOrganization getOrganization() {
        return this.organization;
    }

    /** @param org the organization to set */
    public void setOrganization(FormOrganization org) {
        this.organization = org;
    }

    /** @return the steet */
    public String getStreet() {
        return street;
    }

    /** @param street the street to set */
    public void setStreet(String street) {
        this.street = street;
    }

    /** @return the city */
    public String getCity() {
        return city;
    }

    /** @param city the city to set */
    public void setCity(String city) {
        this.city = city;
    }

    /** @return the provinceState */
    public String getProvinceState() {
        return provinceState;
    }

    /** @param provinceState the provinceState to set */
    public void setProvinceState(String provinceState) {
        this.provinceState = provinceState;
    }

    /** @return the country */
    public String getCountry() {
        return country;
    }

    /** @param country the country to set */
    public void setCountry(String country) {
        this.country = country;
    }

    /** @return the postalCode */
    public String getPostalCode() {
        return postalCode;
    }

    /** @param postalCode the postalCode to set */
    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    @Override
    public Address cloneTo(Address target) {
        target.setCity(getCity());
        target.setCountry(getCountry());
        target.setPostalCode(getPostalCode());
        target.setProvinceState(getProvinceState());
        target.setStreet(getStreet());
        return target;
    }

    @Override
    public int hashCode() {
        return Objects.hash(city, country, id, postalCode, provinceState, street);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Address other = (Address) obj;
        return Objects.equals(city, other.city) && Objects.equals(country, other.country)
                && Objects.equals(id, other.id) && Objects.equals(postalCode, other.postalCode)
                && Objects.equals(provinceState, other.provinceState) && Objects.equals(street, other.street);
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
