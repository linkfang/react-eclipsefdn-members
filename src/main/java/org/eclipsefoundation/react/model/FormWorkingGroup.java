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

import java.util.Date;
import java.util.Objects;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.json.bind.annotation.JsonbTransient;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.ws.rs.core.MultivaluedMap;

import com.fasterxml.jackson.annotation.JsonProperty;

import org.eclipsefoundation.core.namespace.DefaultUrlParameterNames;
import org.eclipsefoundation.persistence.dto.BareNode;
import org.eclipsefoundation.persistence.dto.filter.DtoFilter;
import org.eclipsefoundation.persistence.model.DtoTable;
import org.eclipsefoundation.persistence.model.ParameterizedSQLStatement;
import org.eclipsefoundation.persistence.model.ParameterizedSQLStatementBuilder;
import org.eclipsefoundation.react.namespace.MembershipFormAPIParameterNames;
import org.hibernate.annotations.GenericGenerator;

/**
 * Represents a prospective Working Group relationship with the current
 * organization (based on the form)
 * 
 * @author Martin Lowe
 */
@Table
@Entity
public class FormWorkingGroup extends BareNode implements TargetedClone<FormWorkingGroup> {
    public static final DtoTable TABLE = new DtoTable(FormWorkingGroup.class, "wg");

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    private String id;
    @JsonProperty("working_group")
    private String workingGroupID;
    private String participationLevel;
    private Date effectiveDate;

    // form entity
    @OneToOne(targetEntity = MembershipForm.class)
    @JoinColumn(name = "form_id")
    private MembershipForm form;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(referencedColumnName = "id", unique = true)
    private Contact contact;

    /**
     * @return the id
     */
    @Override
    public String getId() {
        return id;
    }

    /**
     * @param id the id to set
     */
    public void setId(String id) {
        this.id = id;
    }

    /**
     * @return the form
     */
    @JsonbTransient
    public MembershipForm getForm() {
        return form;
    }

    /**
     * @param form the form to set
     */
    public void setForm(MembershipForm form) {
        this.form = form;
    }

    /**
     * @return the workingGroupID
     */
    public String getWorkingGroupID() {
        return workingGroupID;
    }

    /**
     * @param workingGroupID the workingGroupID to set
     */
    public void setWorkingGroupID(String workingGroupID) {
        this.workingGroupID = workingGroupID;
    }

    /**
     * @return the participationLevel
     */
    public String getParticipationLevel() {
        return participationLevel;
    }

    /**
     * @param participationLevel the participationLevel to set
     */
    public void setParticipationLevel(String participationLevel) {
        this.participationLevel = participationLevel;
    }

    /**
     * @return the effectiveDate
     */
    public Date getEffectiveDate() {
        return effectiveDate;
    }

    /**
     * @param effectiveDate the effectiveDate to set
     */
    public void setEffectiveDate(Date effectiveDate) {
        this.effectiveDate = effectiveDate;
    }

    /**
     * @return the contact
     */
    public Contact getContact() {
        return contact;
    }

    /**
     * @param contact the contact to set
     */
    public void setContact(Contact contact) {
        this.contact = contact;
    }

    @Override
    public FormWorkingGroup cloneTo(FormWorkingGroup target) {
        target.setEffectiveDate(getEffectiveDate());
        target.setParticipationLevel(getParticipationLevel());
        target.setWorkingGroupID(getWorkingGroupID());
        return target;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = super.hashCode();
        result = prime * result + Objects.hash(contact, effectiveDate, form, id, participationLevel, workingGroupID);
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
        FormWorkingGroup other = (FormWorkingGroup) obj;
        return Objects.equals(contact, other.contact) && Objects.equals(effectiveDate, other.effectiveDate)
                && Objects.equals(form, other.form) && Objects.equals(id, other.id)
                && Objects.equals(participationLevel, other.participationLevel)
                && Objects.equals(workingGroupID, other.workingGroupID);
    }

    @Override
    public String toString() {
        StringBuilder builder = new StringBuilder();
        builder.append("WorkingGroup [id=");
        builder.append(id);
        builder.append(", workingGroupID=");
        builder.append(workingGroupID);
        builder.append(", participationLevel=");
        builder.append(participationLevel);
        builder.append(", effectiveDate=");
        builder.append(effectiveDate);
        builder.append(", form=");
        builder.append(form);
        builder.append(", contact=");
        builder.append(contact);
        builder.append("]");
        return builder.toString();
    }

    @Singleton
    public static class FormWorkingGroupFilter implements DtoFilter<FormWorkingGroup> {
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
        public Class<FormWorkingGroup> getType() {
            return FormWorkingGroup.class;
        }
    }
}
