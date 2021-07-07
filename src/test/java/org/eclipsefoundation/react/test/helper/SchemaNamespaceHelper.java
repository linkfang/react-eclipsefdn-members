package org.eclipsefoundation.react.test.helper;

/**
 * Indicates the file paths for the various schema files used to validate test objects and formats.
 * 
 * @author Martin Lowe
 *
 */
public class SchemaNamespaceHelper {
    public static final String BASE_SCHEMAS_PATH = "schemas/";
    public static final String BASE_SCHEMAS_PATH_SUFFIX = "-schema.json";

    public static final String MEMBERSHIP_FORM_SCHEMA_PATH = BASE_SCHEMAS_PATH + "membership-form"
            + BASE_SCHEMAS_PATH_SUFFIX;
    public static final String MEMBERSHIP_FORMS_SCHEMA_PATH = BASE_SCHEMAS_PATH + "membership-forms"
            + BASE_SCHEMAS_PATH_SUFFIX;
    public static final String MEMBERSHIP_FORM_PUSH_SCHEMA_PATH = BASE_SCHEMAS_PATH + "membership-form-push"
            + BASE_SCHEMAS_PATH_SUFFIX;

    public static final String CONTACTS_SCHEMA_PATH = BASE_SCHEMAS_PATH + "contacts" + BASE_SCHEMAS_PATH_SUFFIX;
    public static final String CONTACT_SCHEMA_PATH = BASE_SCHEMAS_PATH + "contact" + BASE_SCHEMAS_PATH_SUFFIX;
    public static final String CONTACT_PUSH_SCHEMA_PATH = BASE_SCHEMAS_PATH + "contact-push" + BASE_SCHEMAS_PATH_SUFFIX;

    public static final String ORGANIZATIONS_SCHEMA_PATH = BASE_SCHEMAS_PATH + "form-organizations"
            + BASE_SCHEMAS_PATH_SUFFIX;
    public static final String ORGANIZATION_SCHEMA_PATH = BASE_SCHEMAS_PATH + "form-organization"
            + BASE_SCHEMAS_PATH_SUFFIX;
    public static final String ORGANIZATION_PUSH_SCHEMA_PATH = BASE_SCHEMAS_PATH + "form-organization-push"
            + BASE_SCHEMAS_PATH_SUFFIX;

    public static final String WORKING_GROUPS_SCHEMA_PATH = BASE_SCHEMAS_PATH + "form-working-groups"
            + BASE_SCHEMAS_PATH_SUFFIX;
    public static final String WORKING_GROUP_SCHEMA_PATH = BASE_SCHEMAS_PATH + "form-working-group"
            + BASE_SCHEMAS_PATH_SUFFIX;
    public static final String WORKING_GROUP_PUSH_SCHEMA_PATH = BASE_SCHEMAS_PATH + "form-working-group-push"
            + BASE_SCHEMAS_PATH_SUFFIX;

    private SchemaNamespaceHelper() {
    }
}
