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

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.json.bind.annotation.JsonbTransient;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.ws.rs.core.MultivaluedMap;

import org.eclipsefoundation.core.namespace.DefaultUrlParameterNames;
import org.eclipsefoundation.persistence.dto.BareNode;
import org.eclipsefoundation.persistence.dto.filter.DtoFilter;
import org.eclipsefoundation.persistence.model.DtoTable;
import org.eclipsefoundation.persistence.model.ParameterizedSQLStatement;
import org.eclipsefoundation.persistence.model.ParameterizedSQLStatementBuilder;
import org.eclipsefoundation.persistence.model.SortableField;
import org.eclipsefoundation.react.namespace.MembershipFormAPIParameterNames;
import org.hibernate.annotations.GenericGenerator;

@Table
@Entity
public class MembershipForm extends BareNode implements TargetedClone<MembershipForm> {
    public static final DtoTable TABLE = new DtoTable(MembershipForm.class, "m");

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    private String id;
    private String userID;
    private String membershipLevel;
    private boolean signingAuthority;
    private String purchaseOrderRequired;
    private String vatNumber;
    private String registrationCountry;
    @SortableField
    private Long dateCreated;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "form_id")
    private List<Contact> contacts;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "form_id")
    private List<FormWorkingGroup> workingGroups;
    @OneToOne(mappedBy = "form", orphanRemoval = true)
    private FormOrganization organization;

    /** @return the id */
    @Override
    public String getId() {
        return id;
    }

    /** @param id the id to set */
    @JsonbTransient
    public void setId(String id) {
        this.id = id;
    }

    /** @return the userId */
    public String getUserID() {
        return userID;
    }

    /** @param userID the userId to set */
    @JsonbTransient
    public void setUserID(String userID) {
        this.userID = userID;
    }

    /** @return the membershipLevel */
    public String getMembershipLevel() {
        return membershipLevel;
    }

    /** @param membershipLevel the membershipLevel to set */
    public void setMembershipLevel(String membershipLevel) {
        this.membershipLevel = membershipLevel;
    }

    /** @return the signingAuthority */
    public boolean isSigningAuthority() {
        return signingAuthority;
    }

    /** @param signingAuthority the signingAuthority to set */
    public void setSigningAuthority(boolean signingAuthority) {
        this.signingAuthority = signingAuthority;
    }

    public String getPurchaseOrderRequired() {
        return this.purchaseOrderRequired;
    }

    public void setPurchaseOrderRequired(String purchaseOrderRequired) {
        this.purchaseOrderRequired = purchaseOrderRequired;
    }

    public String getVatNumber() {
        return this.vatNumber;
    }

    public void setVatNumber(String vatNumber) {
        this.vatNumber = vatNumber;
    }

    public String getRegistrationCountry() {
        return this.registrationCountry;
    }

    public void setRegistrationCountry(String registrationCountry) {
        this.registrationCountry = registrationCountry;
    }

    public Long getDateCreated() {
        return this.dateCreated;
    }

    @JsonbTransient
    public void setDateCreated(Long dateCreated) {
        this.dateCreated = dateCreated;
    }

    /**
     * @return the contacts
     */
    @JsonbTransient
    public List<Contact> getContacts() {
        return new ArrayList<>(contacts);
    }

    /**
     * @return the workingGroups
     */
    @JsonbTransient
    public List<FormWorkingGroup> getWorkingGroups() {
        return new ArrayList<>(workingGroups);
    }

    /**
     * @return the organization
     */
    @JsonbTransient
    public FormOrganization getOrganization() {
        return organization;
    }

    @Override
    public MembershipForm cloneTo(MembershipForm target) {
        target.setUserID(getUserID());
        target.setMembershipLevel(getMembershipLevel());
        target.setSigningAuthority(isSigningAuthority());
        target.setPurchaseOrderRequired(getPurchaseOrderRequired());
        target.setRegistrationCountry(getRegistrationCountry());
        target.setVatNumber(getVatNumber());
        if (getDateCreated() != null) {
            target.setDateCreated(getDateCreated());
        }
        return target;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = super.hashCode();
        result = prime * result + Objects.hash(id, membershipLevel, signingAuthority, userID, vatNumber,
                registrationCountry, purchaseOrderRequired, dateCreated);
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
        MembershipForm other = (MembershipForm) obj;
        return Objects.equals(id, other.id) && Objects.equals(membershipLevel, other.membershipLevel)
                && signingAuthority == other.signingAuthority && Objects.equals(userID, other.userID)
                && Objects.equals(vatNumber, other.vatNumber) && Objects.equals(dateCreated, other.dateCreated)
                && Objects.equals(registrationCountry, other.registrationCountry)
                && Objects.equals(purchaseOrderRequired, other.purchaseOrderRequired);
    }

    @Override
    public String toString() {
        StringBuilder builder = new StringBuilder();
        builder.append("MembershipForm [id=");
        builder.append(id);
        builder.append(", userID=");
        builder.append(userID);
        builder.append(", membershipLevel=");
        builder.append(membershipLevel);
        builder.append(", signingAuthority=");
        builder.append(signingAuthority);
        builder.append(", purchaseOrderRequired=");
        builder.append(purchaseOrderRequired);
        builder.append(", registrationCountry=");
        builder.append(registrationCountry);
        builder.append(", vatNumber=");
        builder.append(vatNumber);
        builder.append(", dateCreated=");
        builder.append(dateCreated);
        builder.append("]");
        return builder.toString();
    }

    @Singleton
    public static class MembershipFormFilter implements DtoFilter<MembershipForm> {
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
            String userId = params.getFirst(MembershipFormAPIParameterNames.USER_ID.getName());
            if (userId != null) {
                stmt.addClause(new ParameterizedSQLStatement.Clause(TABLE.getAlias() + ".userID = ?",
                        new Object[] { userId }));
            }
            return stmt;
        }

        @Override
        public Class<MembershipForm> getType() {
            return MembershipForm.class;
        }
    }
}
