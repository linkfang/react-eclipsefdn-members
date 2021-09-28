package org.eclipsefoundation.react.model;

import javax.json.bind.annotation.JsonbProperty;

import org.eclipsefoundation.api.model.OrganizationContact;

/**
 * Output data model for organization contact. Used to flatten and simplify the pure DB response.
 * 
 * @author Martin Lowe
 *
 */
public class OrganizationContactData {
    @JsonbProperty("organization_id")
    private int organizationID;
    @JsonbProperty("person_id")
    private String personID;
    private String relation;
    private String comments;
    private String title;

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
     * @return the personID
     */
    public String getPersonID() {
        return personID;
    }

    /**
     * @param personID the personID to set
     */
    public void setPersonID(String personID) {
        this.personID = personID;
    }

    /**
     * @return the relation
     */
    public String getRelation() {
        return relation;
    }

    /**
     * @param relation the relation to set
     */
    public void setRelation(String relation) {
        this.relation = relation;
    }

    /**
     * @return the comments
     */
    public String getComments() {
        return comments;
    }

    /**
     * @param comments the comments to set
     */
    public void setComments(String comments) {
        this.comments = comments;
    }

    /**
     * @return the title
     */
    public String getTitle() {
        return title;
    }

    /**
     * @param title the title to set
     */
    public void setTitle(String title) {
        this.title = title;
    }
    
    public static OrganizationContactData convert(OrganizationContact data) {
        OrganizationContactData out = new OrganizationContactData();
        out.setOrganizationID(data.getCompositeID().getOrganizationID());
        out.setPersonID(data.getCompositeID().getPersonID());
        out.setRelation(data.getCompositeID().getRelation());
        out.setTitle(data.getTitle());
        out.setComments(data.getComments());
        return out;
    }

}
