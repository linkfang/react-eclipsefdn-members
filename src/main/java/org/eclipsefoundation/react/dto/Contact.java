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
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.ws.rs.core.MultivaluedMap;

import org.eclipsefoundation.core.namespace.DefaultUrlParameterNames;
import org.eclipsefoundation.persistence.dto.BareNode;
import org.eclipsefoundation.persistence.dto.filter.DtoFilter;
import org.eclipsefoundation.persistence.model.DtoTable;
import org.eclipsefoundation.persistence.model.ParameterizedSQLStatement;
import org.eclipsefoundation.persistence.model.ParameterizedSQLStatementBuilder;
import org.eclipsefoundation.react.namespace.ContactTypes;
import org.eclipsefoundation.react.namespace.MembershipFormAPIParameterNames;
import org.hibernate.annotations.GenericGenerator;

/**
 * A contact entity, representing a contact for an organization or working
 * group.
 * 
 * @author Martin Lowe
 */
@Table
@Entity
public class Contact extends BareNode implements TargetedClone<Contact> {
    public static final DtoTable TABLE = new DtoTable(Contact.class, "c");

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    private String id;

    // form entity for FK relation
    @ManyToOne(targetEntity = MembershipForm.class)
    @JoinColumn(name = "form_id")
    private MembershipForm form;


    @NotBlank(message = "First name cannot be blank")
    @JsonbProperty(value = "first_name")
    private String fName;
    @NotBlank(message = "Last name cannot be blank")
    @JsonbProperty(value = "last_name")
    private String lName;
    @Email(message = "Email address is not valid")
    private String email;
    @NotBlank(message = "Job title cannot be blank")
    @JsonbProperty(value = "job_title")
    private String title;
    @NotNull(message = "Contact type cannot be empty")
    @Enumerated(EnumType.STRING)
    private ContactTypes type;

    @Override
    public String getId() {
        return id;
    }

    /** @param id the id to set */
    public void setId(String id) {
        this.id = id;
    }

    /** @return the form */
    @JsonbTransient
    public MembershipForm getForm() {
        return form;
    }

    /** @param form the form to set */
    public void setForm(MembershipForm form) {
        this.form = form;
    }

    /** @return the fName */
    public String getfName() {
        return fName;
    }

    /** @param fName the fName to set */
    public void setfName(String fName) {
        this.fName = fName;
    }

    /** @return the lName */
    public String getlName() {
        return lName;
    }

    /** @param lName the lName to set */
    public void setlName(String lName) {
        this.lName = lName;
    }

    /** @return the email */
    public String getEmail() {
        return email;
    }

    /** @param email the email to set */
    public void setEmail(String email) {
        this.email = email;
    }

    /** @return the title */
    public String getTitle() {
        return title;
    }

    /** @param title the title to set */
    public void setTitle(String title) {
        this.title = title;
    }

    /** @return the type */
    public ContactTypes getType() {
        return type;
    }

    /** @param type the type to set */
    public void setType(ContactTypes type) {
        this.type = type;
    }

    @Override
    public Contact cloneTo(Contact target) {
        target.setEmail(getEmail());
        target.setfName(getfName());
        target.setlName(getlName());
        target.setTitle(getTitle());
        target.setType(getType());
        return target;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = super.hashCode();
        result = prime * result + Objects.hash(email, fName, form, id, lName, title, type);
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
        Contact other = (Contact) obj;
        return Objects.equals(email, other.email) && Objects.equals(fName, other.fName)
                && Objects.equals(form, other.form) && Objects.equals(id, other.id)
                && Objects.equals(lName, other.lName) && Objects.equals(title, other.title) && type == other.type;
    }

    @Singleton
    public static class ContactFilter implements DtoFilter<Contact> {
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
            // form ID check
            String formId = params.getFirst(MembershipFormAPIParameterNames.FORM_ID.getName());
            if (formId != null) {
                stmt.addClause(new ParameterizedSQLStatement.Clause(TABLE.getAlias() + ".form.id = ?",
                        new Object[] { formId }));
            }
            // form IDs check
            List<String> formIds = params.get(MembershipFormAPIParameterNames.FORM_IDS.getName());
            if (formIds != null) {
                stmt.addClause(new ParameterizedSQLStatement.Clause(TABLE.getAlias() + ".form.id IN ?",
                        new Object[] { formIds }));
            }
            return stmt;
        }

        @Override
        public Class<Contact> getType() {
            return Contact.class;
        }
    }
}
