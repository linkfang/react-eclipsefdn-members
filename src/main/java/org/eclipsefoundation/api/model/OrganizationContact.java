package org.eclipsefoundation.api.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class OrganizationContact {
    @JsonProperty("composite_id")
    private OrganizationContactID compositeID;
    private String comments;
    private String title;

    /**
     * @return the compositeID
     */
    public OrganizationContactID getCompositeID() {
        return compositeID;
    }

    /**
     * @param compositeID the compositeID to set
     */
    public void setCompositeID(OrganizationContactID compositeID) {
        this.compositeID = compositeID;
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
}
