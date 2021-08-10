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

import java.util.Objects;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.json.bind.annotation.JsonbProperty;
import javax.json.bind.annotation.JsonbTransient;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.ws.rs.core.MultivaluedMap;

import org.eclipsefoundation.core.namespace.DefaultUrlParameterNames;
import org.eclipsefoundation.persistence.dto.BareNode;
import org.eclipsefoundation.persistence.dto.filter.DtoFilter;
import org.eclipsefoundation.persistence.model.DtoTable;
import org.eclipsefoundation.persistence.model.ParameterizedSQLStatement;
import org.eclipsefoundation.persistence.model.ParameterizedSQLStatementBuilder;
import org.eclipsefoundation.react.namespace.MembershipFormAPIParameterNames;
import org.hibernate.annotations.GenericGenerator;

@Table
@Entity
public class FormOrganization extends BareNode implements TargetedClone<FormOrganization> {
    public static final DtoTable TABLE = new DtoTable(FormOrganization.class, "o");

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    private String id;
    @NotBlank(message = "Legal name cannot be blank")
    private String legalName;
    @JsonbProperty("twitter")
    private String twitterHandle;
    private Integer employeeCount;
    private String aggregateRevenue;

    // form entity
    @OneToOne(targetEntity = MembershipForm.class)
    @JoinColumn(name = "form_id", unique = true)
    private MembershipForm form;
    @NotNull(message = "Organization Address must be set")
    @OneToOne(cascade = { CascadeType.ALL }, mappedBy = "organization")
    private Address address;

    @Override
    public String getId() {
        return id;
    }

    /** @param id the id to set */
    @JsonbTransient
    public void setId(String id) {
        this.id = id;
    }

    /** @return the formID */
    @JsonbTransient
    public MembershipForm getForm() {
        return form;
    }

    /** @param form the form to set */
    @JsonbTransient
    public void setForm(MembershipForm form) {
        this.form = form;
    }

    /** @return the legalName */
    public String getLegalName() {
        return legalName;
    }

    /** @param legalName the legalName to set */
    public void setLegalName(String legalName) {
        this.legalName = legalName;
    }

    /**
     * @return the twitterHandle
     */
    public String getTwitterHandle() {
        return twitterHandle;
    }

    /**
     * @param twitterHandle the twitterHandle to set
     */
    public void setTwitterHandle(String twitterHandle) {
        this.twitterHandle = twitterHandle;
    }

    /**
     * @return the employeeCount
     */
    public Integer getEmployeeCount() {
        return employeeCount;
    }

    /**
     * @param employeeCount the employeeCount to set
     */
    public void setEmployeeCount(Integer employeeCount) {
        this.employeeCount = employeeCount;
    }

    /**
     * @return the aggregateRevenue
     */
    public String getAggregateRevenue() {
        return aggregateRevenue;
    }

    /**
     * @param aggregateRevenue the aggregateRevenue to set
     */
    public void setAggregateRevenue(String aggregateRevenue) {
        this.aggregateRevenue = aggregateRevenue;
    }

    /** @return the address */
    public Address getAddress() {
        return address;
    }

    /** @param address the address to set */
    public void setAddress(Address address) {
        this.address = address;
    }

    @Override
    public FormOrganization cloneTo(FormOrganization target) {
        target.setLegalName(getLegalName());
        target.setTwitterHandle(getTwitterHandle());
        target.setAggregateRevenue(getAggregateRevenue());
        target.setEmployeeCount(getEmployeeCount());
        return target;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = super.hashCode();
        result = prime * result + Objects.hash(address, form, id, legalName, twitterHandle);
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
        FormOrganization other = (FormOrganization) obj;
        return Objects.equals(address, other.address) && Objects.equals(form, other.form)
                && Objects.equals(id, other.id) && Objects.equals(legalName, other.legalName)
                && Objects.equals(twitterHandle, other.twitterHandle)
                && Objects.equals(aggregateRevenue, other.aggregateRevenue)
                && Objects.equals(employeeCount, other.employeeCount);
    }

    @Override
    public String toString() {
        StringBuilder builder = new StringBuilder();
        builder.append("Organization [id=");
        builder.append(id);
        builder.append(", legalName=");
        builder.append(legalName);
        builder.append(", twitterHandle=");
        builder.append(twitterHandle);
        builder.append(", aggregateRevenue=");
        builder.append(aggregateRevenue);
        builder.append(", employeeCount=");
        builder.append(employeeCount);
        builder.append(", form=");
        builder.append(form);
        builder.append(", address=");
        builder.append(address);
        builder.append("]");
        return builder.toString();
    }

    @Singleton
    public static class FormOrganizationFilter implements DtoFilter<FormOrganization> {
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
            // user ID check
            String formId = params.getFirst(MembershipFormAPIParameterNames.FORM_ID.getName());
            if (formId != null) {
                stmt.addClause(new ParameterizedSQLStatement.Clause(TABLE.getAlias() + ".form.id = ?",
                        new Object[] { formId }));
            }
            return stmt;
        }

        @Override
        public Class<FormOrganization> getType() {
            return FormOrganization.class;
        }
    }
}
