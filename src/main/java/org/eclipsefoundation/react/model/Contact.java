package org.eclipsefoundation.react.model;

import java.util.Objects;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.json.bind.annotation.JsonbProperty;
import javax.json.bind.annotation.JsonbTransient;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
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
 * A contact entity, representing a contact for an organization or working group.
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
    @JsonbTransient
    @ManyToOne
    @JoinColumn(name = "form_id", referencedColumnName = "id")
    private MembershipForm form;
    @Column(name = "form_id", updatable = false, insertable = false)
    private String formID;

    @JsonbProperty(value = "first_name")
    private String fName;
    @JsonbProperty(value = "last_name")
    private String lName;
    private String email;
    @JsonbProperty(value = "job_title")
    private String title;
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

    /** @return the formID */
    public String getFormID() {
        return formID;
    }

    /** @param formID the formID to set */
    public void setFormID(String formID) {
        this.formID = formID;
    }

    /**
     * @return the form
     */
    public MembershipForm getForm() {
        return form;
    }

    /**
     * @param form the form to set
     */
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
        target.setForm(getForm());
        return target;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = super.hashCode();
        result = prime * result + Objects.hash(email, fName, form, formID, id, lName, title, type);
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
                && Objects.equals(form, other.form) && Objects.equals(formID, other.formID)
                && Objects.equals(id, other.id) && Objects.equals(lName, other.lName)
                && Objects.equals(title, other.title) && type == other.type;
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
            // user ID check
            String formId = params.getFirst(MembershipFormAPIParameterNames.FORM_ID.getName());
            if (formId != null) {
                stmt.addClause(new ParameterizedSQLStatement.Clause(TABLE.getAlias() + ".form.id = ?",
                        new Object[] { formId }));
            }
            return stmt;
        }

        @Override
        public Class<Contact> getType() {
            return Contact.class;
        }
    }
}


