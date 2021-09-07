package org.eclipsefoundation.react.model;

/**
 * Working group partipaction agreement document for a given organization.
 * 
 * @author Martin Lowe
 *
 */
public class OrganizationWGPA {
    private String documentID;
    private String description;
    private String level;
    private String workingGroup;
    /**
     * @return the documentID
     */
    public String getDocumentID() {
        return documentID;
    }
    /**
     * @param documentID the documentID to set
     */
    public void setDocumentID(String documentID) {
        this.documentID = documentID;
    }
    /**
     * @return the description
     */
    public String getDescription() {
        return description;
    }
    /**
     * @param description the description to set
     */
    public void setDescription(String description) {
        this.description = description;
    }
    /**
     * @return the level
     */
    public String getLevel() {
        return level;
    }
    /**
     * @param level the level to set
     */
    public void setLevel(String level) {
        this.level = level;
    }
    /**
     * @return the workingGroup
     */
    public String getWorkingGroup() {
        return workingGroup;
    }
    /**
     * @param workingGroup the workingGroup to set
     */
    public void setWorkingGroup(String workingGroup) {
        this.workingGroup = workingGroup;
    }
    
}
