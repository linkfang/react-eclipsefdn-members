package org.eclipsefoundation.react.namespace;

public enum OrganizationalUserType {
    CR("Company Representative"), MR("Marketing Representative"), CM("Committer"), DE("Delegate"), EMPLY("Employee"), PE("Page Editor");

    private final String label;

    private OrganizationalUserType(String label) {
        this.label = label;
    }

    /**
     * Gets the label for the user type.
     * 
     * @return
     */
    public String getLabel() {
        return this.label;
    }

}
