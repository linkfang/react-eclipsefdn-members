package org.eclipsefoundation.react.resources;

import static io.restassured.RestAssured.given;
import static io.restassured.module.jsv.JsonSchemaValidator.matchesJsonSchemaInClasspath;

import java.sql.Date;
import java.util.Collections;
import java.util.Optional;

import javax.json.bind.Jsonb;

import org.eclipsefoundation.core.config.JsonBConfig;
import org.eclipsefoundation.core.helper.CSRFHelper;
import org.eclipsefoundation.react.model.Contact;
import org.eclipsefoundation.react.model.FormWorkingGroup;
import org.eclipsefoundation.react.namespace.ContactTypes;
import org.eclipsefoundation.react.test.helper.AuthHelper;
import org.eclipsefoundation.react.test.helper.SchemaNamespaceHelper;
import org.hamcrest.text.IsEmptyString;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import io.quarkus.test.common.QuarkusTestResource;
import io.quarkus.test.junit.QuarkusTest;
import io.quarkus.test.oidc.server.OidcWiremockTestResource;
import io.restassured.filter.session.SessionFilter;
import io.restassured.http.ContentType;

@QuarkusTest
@QuarkusTestResource(OidcWiremockTestResource.class)
public class FormWorkingGroupsResourceTest {
    public static final String SAMPLE_WORKING_GROUPS_ID = "sample_working_groups_id";

    public static final String FORM_WORKING_GROUPS_BASE_URL = MembershipFormResourceTest.FORMS_BY_ID_URL
            + "/working_groups";
    public static final String FORM_WORKING_GROUP_BY_ID_URL = FORM_WORKING_GROUPS_BASE_URL + "/{workingGroupId}";

    // JSONB object instantiated using config (rather than generic instance)
    private static Jsonb jsonb;

    @BeforeAll
    public static void init() {
        // following strategy is defined as default by internal API guidelines
        jsonb = new JsonBConfig().getContext(Void.class);
    }

    //
    // GET /form/{id}/contacts
    //
    @Test
    void getFormWorkingGroups_requireAuth() {
        // auth is triggered before CSRF (as the request is dumped before it gets
        // processed)
        given().auth().none().when().get(FORM_WORKING_GROUPS_BASE_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID)
                .then().statusCode(401);
    }

    @Test
    void getFormWorkingGroups_csrfGuard() {
        // happens after auth, once the request is processed
        given().auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet())).when()
                .get(FORM_WORKING_GROUPS_BASE_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID).then().statusCode(403);
    }

    @Test
    void getFormWorkingGroups_success() {
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).when()
                .get(FORM_WORKING_GROUPS_BASE_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID).then().statusCode(200);
    }

    @Test
    void getFormWorkingGroups_success_format() {
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).when()
                .get(FORM_WORKING_GROUPS_BASE_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID).then().assertThat()
                .body(matchesJsonSchemaInClasspath(SchemaNamespaceHelper.WORKING_GROUPS_SCHEMA_PATH));
    }

    //
    // GET /form/{id}/contacts/{contactId}
    //
    @Test
    void getFormWorkingGroupByID_requireAuth() {
        // auth is triggered before CSRF (as the request is dumped before it gets
        // processed)
        given().auth().none().when().get(FORM_WORKING_GROUP_BY_ID_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID,
                FormWorkingGroupsResourceTest.SAMPLE_WORKING_GROUPS_ID).then().statusCode(401);
    }

    @Test
    void getFormWorkingGroupByID_csrfGuard() {
        // happens after auth, once the request is processed
        given().auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet())).when()
                .get(FORM_WORKING_GROUP_BY_ID_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID,
                        FormWorkingGroupsResourceTest.SAMPLE_WORKING_GROUPS_ID)
                .then().statusCode(403);
    }

    @Test
    void getFormWorkingGroupByID_success() {
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).when()
                .get(FORM_WORKING_GROUP_BY_ID_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID,
                        FormWorkingGroupsResourceTest.SAMPLE_WORKING_GROUPS_ID)
                .then().statusCode(200);
    }

    @Test
    void getFormWorkingGroupByID_success_format() {
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).when()
                .get(FORM_WORKING_GROUP_BY_ID_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID,
                        FormWorkingGroupsResourceTest.SAMPLE_WORKING_GROUPS_ID)
                .then().assertThat()
                .body(matchesJsonSchemaInClasspath(SchemaNamespaceHelper.WORKING_GROUP_SCHEMA_PATH));
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).accept(ContentType.JSON)
                .when().get(FORM_WORKING_GROUP_BY_ID_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID,
                        FormWorkingGroupsResourceTest.SAMPLE_WORKING_GROUPS_ID)
                .then().statusCode(200);

        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).accept(ContentType.XML)
                .when().get(FORM_WORKING_GROUP_BY_ID_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID,
                        FormWorkingGroupsResourceTest.SAMPLE_WORKING_GROUPS_ID)
                .then().statusCode(500);
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).accept(ContentType.TEXT)
                .when().get(FORM_WORKING_GROUP_BY_ID_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID,
                        FormWorkingGroupsResourceTest.SAMPLE_WORKING_GROUPS_ID)
                .then().statusCode(500);
    }

    //
    // POST /form/{id}/contacts
    //
    @Test
    void postFormWorkingGroup_requireAuth() {
        // auth is triggered after CSRF for non GET requests
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).auth()
                .none().contentType(ContentType.JSON).body(generateSample(Optional.of(SAMPLE_WORKING_GROUPS_ID))).when()
                .post(FORM_WORKING_GROUPS_BASE_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID).then().statusCode(401);
    }

    @Test
    void postFormWorkingGroup_csrfGuard() {
        // happens after auth, once the request is processed
        given().auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet())).contentType(ContentType.JSON)
                .body(generateSample(Optional.of(SAMPLE_WORKING_GROUPS_ID))).when()
                .post(FORM_WORKING_GROUPS_BASE_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID).then().statusCode(403);
    }

    @Test
    void postFormWorkingGroup_success() {
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .contentType(ContentType.JSON).body(generateSample(Optional.of(SAMPLE_WORKING_GROUPS_ID))).when()
                .post(FORM_WORKING_GROUPS_BASE_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID).then().statusCode(200);
    }

    @Test
    void postFormWorkingGroup_success_pushFormat() {
        // Check that the input matches what is specified in spec
        String json = generateSample(Optional.of(SAMPLE_WORKING_GROUPS_ID));
        Assertions.assertTrue(
                matchesJsonSchemaInClasspath(SchemaNamespaceHelper.ORGANIZATION_PUSH_SCHEMA_PATH).matches(json));

        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .contentType(ContentType.JSON).body(json).when()
                .post(FORM_WORKING_GROUPS_BASE_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID).then().assertThat()
                .body(matchesJsonSchemaInClasspath(SchemaNamespaceHelper.WORKING_GROUPS_SCHEMA_PATH));
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .contentType(ContentType.JSON).body(json).when()
                .post(FORM_WORKING_GROUPS_BASE_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID).then().statusCode(200);

        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .contentType(ContentType.TEXT).body(json).when()
                .post(FORM_WORKING_GROUPS_BASE_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID).then().statusCode(500);
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .contentType(ContentType.XML).body(json).when()
                .post(FORM_WORKING_GROUPS_BASE_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID).then().statusCode(500);
    }

    @Test
    void postFormWorkingGroup_success_format() {
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .body(generateSample(Optional.of(SAMPLE_WORKING_GROUPS_ID))).contentType(ContentType.JSON).when()
                .post(FORM_WORKING_GROUPS_BASE_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID).then().assertThat()
                .body(matchesJsonSchemaInClasspath(SchemaNamespaceHelper.WORKING_GROUPS_SCHEMA_PATH));

        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .body(generateSample(Optional.of(SAMPLE_WORKING_GROUPS_ID))).when()
                .post(FORM_WORKING_GROUPS_BASE_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID).then().statusCode(500);
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .contentType(ContentType.TEXT).body(generateSample(Optional.of(SAMPLE_WORKING_GROUPS_ID))).when()
                .post(FORM_WORKING_GROUPS_BASE_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID).then().statusCode(500);
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .contentType(ContentType.XML).body(generateSample(Optional.of(SAMPLE_WORKING_GROUPS_ID))).when()
                .post(FORM_WORKING_GROUPS_BASE_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID).then().statusCode(500);
    }

    //
    // PUT /form/{id}/contacts/{contactId}
    //
    @Test
    void putFormWorkingGroupByID_requireAuth() {
        // auth is triggered after CSRF for non GET requests
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).auth()
                .none().contentType(ContentType.JSON).body(generateSample(Optional.of(SAMPLE_WORKING_GROUPS_ID))).when()
                .put(FORM_WORKING_GROUP_BY_ID_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID,
                        FormWorkingGroupsResourceTest.SAMPLE_WORKING_GROUPS_ID)
                .then().statusCode(401);
    }

    @Test
    void putFormWorkingGroupByID_csrfGuard() {
        // happens after auth, once the request is processed
        given().auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet())).contentType(ContentType.JSON)
                .body(generateSample(Optional.of(SAMPLE_WORKING_GROUPS_ID))).when()
                .put(FORM_WORKING_GROUP_BY_ID_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID,
                        FormWorkingGroupsResourceTest.SAMPLE_WORKING_GROUPS_ID)
                .then().statusCode(403);
    }

    @Test
    void putFormWorkingGroupByID_empty() {
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .contentType(ContentType.JSON).when()
                .put(FORM_WORKING_GROUP_BY_ID_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID,
                        FormWorkingGroupsResourceTest.SAMPLE_WORKING_GROUPS_ID)
                .then().statusCode(500);
    }

    @Test
    void putFormWorkingGroupByID_success() {
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .contentType(ContentType.JSON).body(generateSample(Optional.empty())).when()
                .put(FORM_WORKING_GROUP_BY_ID_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID,
                        FormWorkingGroupsResourceTest.SAMPLE_WORKING_GROUPS_ID)
                .then().statusCode(200);
    }

    @Test
    void putFormWorkingGroupByID_success_pushFormat() {
        SessionFilter sessionFilter = new SessionFilter();
        // Check that the input matches what is specified in spec
        String json = generateSample(Optional.empty());
        Assertions.assertTrue(
                matchesJsonSchemaInClasspath(SchemaNamespaceHelper.ORGANIZATION_PUSH_SCHEMA_PATH).matches(json));

        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).body(json)
                .contentType(ContentType.JSON).when()
                .put(FORM_WORKING_GROUP_BY_ID_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID,
                        FormWorkingGroupsResourceTest.SAMPLE_WORKING_GROUPS_ID)
                .then().statusCode(200);

        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).body(json).when()
                .put(FORM_WORKING_GROUP_BY_ID_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID,
                        FormWorkingGroupsResourceTest.SAMPLE_WORKING_GROUPS_ID)
                .then().statusCode(500);
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .contentType(ContentType.TEXT).body(json).when()
                .put(FORM_WORKING_GROUP_BY_ID_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID,
                        FormWorkingGroupsResourceTest.SAMPLE_WORKING_GROUPS_ID)
                .then().statusCode(500);
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .contentType(ContentType.XML).body(json).when()
                .put(FORM_WORKING_GROUP_BY_ID_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID,
                        FormWorkingGroupsResourceTest.SAMPLE_WORKING_GROUPS_ID)
                .then().statusCode(500);
    }

    @Test
    void putFormWorkingGroupByID_success_format() {
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .contentType(ContentType.JSON).body(generateSample(Optional.of(SAMPLE_WORKING_GROUPS_ID))).when()
                .put(FORM_WORKING_GROUP_BY_ID_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID,
                        FormWorkingGroupsResourceTest.SAMPLE_WORKING_GROUPS_ID)
                .then().assertThat()
                .body(matchesJsonSchemaInClasspath(SchemaNamespaceHelper.WORKING_GROUPS_SCHEMA_PATH));
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .contentType(ContentType.JSON).body(generateSample(Optional.of(SAMPLE_WORKING_GROUPS_ID))).when()
                .put(FORM_WORKING_GROUP_BY_ID_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID,
                        FormWorkingGroupsResourceTest.SAMPLE_WORKING_GROUPS_ID)
                .then().body(matchesJsonSchemaInClasspath(SchemaNamespaceHelper.MEMBERSHIP_FORMS_SCHEMA_PATH))
                .statusCode(200);

        // asserts content type of output for integrity
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .contentType(ContentType.JSON).accept(ContentType.TEXT)
                .body(generateSample(Optional.of(SAMPLE_WORKING_GROUPS_ID))).when()
                .put(FORM_WORKING_GROUP_BY_ID_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID,
                        FormWorkingGroupsResourceTest.SAMPLE_WORKING_GROUPS_ID)
                .then().statusCode(500);
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .contentType(ContentType.JSON).accept(ContentType.XML)
                .body(generateSample(Optional.of(SAMPLE_WORKING_GROUPS_ID))).when()
                .put(FORM_WORKING_GROUP_BY_ID_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID,
                        FormWorkingGroupsResourceTest.SAMPLE_WORKING_GROUPS_ID)
                .then().statusCode(500);
    }

    @Test
    void deleteFormWorkingGroupByID_requireAuth() {
        // auth is triggered after CSRF for non GET requests
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).auth()
                .none().when()
                .delete("/form/{id}/contacts/{MembershipFormResourceTest.SAMPLE_FORM_UUID}",
                        MembershipFormResourceTest.SAMPLE_FORM_UUID,
                        FormWorkingGroupsResourceTest.SAMPLE_WORKING_GROUPS_ID)
                .then().statusCode(401);
    }

    @Test
    void deleteFormWorkingGroupByID_csrfGuard() {
        // happens after auth, once the request is processed
        given().auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet())).when()
                .delete(FORM_WORKING_GROUP_BY_ID_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID,
                        FormWorkingGroupsResourceTest.SAMPLE_WORKING_GROUPS_ID)
                .then().statusCode(403);
    }

    @Test
    void deleteFormWorkingGroupByID_success() {
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).when()
                .delete(FORM_WORKING_GROUP_BY_ID_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID,
                        FormWorkingGroupsResourceTest.SAMPLE_WORKING_GROUPS_ID)
                .then().statusCode(200);
    }

    @Test
    void deleteFormWorkingGroupByID_success_format() {
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).when()
                .delete(FORM_WORKING_GROUP_BY_ID_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID,
                        FormWorkingGroupsResourceTest.SAMPLE_WORKING_GROUPS_ID)
                .then().assertThat().body(IsEmptyString.emptyString());
    }

    private FormWorkingGroup generateSampleRaw(Optional<String> id) {
        FormWorkingGroup out = new FormWorkingGroup();
        out.setEffectiveDate(new Date(System.currentTimeMillis()));
        out.setParticipationLevel("participant");
        out.setWorkingGroupID("internet-things-iot");
        id.ifPresent(out::setId);
        Contact c = new Contact();
        c.setEmail("sample@sample.com");
        c.setfName("First Name");
        c.setlName("Last Name");
        c.setTitle("sample title");
        c.setType(ContactTypes.ACCOUNTING);
        out.setContact(c);
        return out;
    }

    private String generateSample(Optional<String> id) {
        return FormWorkingGroupsResourceTest.jsonb.toJson(generateSampleRaw(id));
    }
}
