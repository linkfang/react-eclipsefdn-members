package org.eclipsefoundation.api.model;

public class OrganizationContact {
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
