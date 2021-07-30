package org.eclipsefoundation.react.resources;

import static io.restassured.RestAssured.given;
import static io.restassured.module.jsv.JsonSchemaValidator.matchesJsonSchemaInClasspath;

import java.util.Collections;
import java.util.Optional;

import javax.json.bind.Jsonb;

import org.eclipsefoundation.core.config.JsonBConfig;
import org.eclipsefoundation.core.helper.CSRFHelper;
import org.eclipsefoundation.react.dto.Contact;
import org.eclipsefoundation.react.namespace.ContactTypes;
import org.eclipsefoundation.react.test.helper.AuthHelper;
import org.eclipsefoundation.react.test.helper.DtoHelper;
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
public class ContactResourceTest {
    public static final String SAMPLE_CONTACT_ID = "sample_contact_id";

    public static final String CONTACTS_BASE_URL = MembershipFormResourceTest.FORMS_BY_ID_URL + "/contacts";
    public static final String CONTACTS_BY_ID_URL = CONTACTS_BASE_URL + "/{contactId}";

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
    void getContacts_requireAuth() {
        // auth is triggered before CSRF (as the request is dumped before it gets
        // processed)
        given().auth().none().when().get(CONTACTS_BASE_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID).then()
                .statusCode(401);
    }

    @Test
    void getContacts_csrfGuard() {
        // happens after auth, once the request is processed
        given().auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet())).when()
                .get(CONTACTS_BASE_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID).then().statusCode(403);
    }

    @Test
    void getContacts_success() {
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).when()
                .get(CONTACTS_BASE_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID).then().statusCode(200);
    }

    @Test
    void getContacts_success_format() {
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).when()
                .get(CONTACTS_BASE_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID).then().assertThat()
                .body(matchesJsonSchemaInClasspath(SchemaNamespaceHelper.CONTACTS_SCHEMA_PATH));
    }

    //
    // GET /form/{id}/contacts/{contactId}
    //
    @Test
    void getContactByID_requireAuth() {
        // auth is triggered before CSRF (as the request is dumped before it gets
        // processed)
        given().auth().none().when().get(CONTACTS_BY_ID_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID,
                ContactResourceTest.SAMPLE_CONTACT_ID).then().statusCode(401);
    }

    @Test
    void getContactByID_csrfGuard() {
        // happens after auth, once the request is processed
        given().auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet())).when().get(CONTACTS_BY_ID_URL,
                MembershipFormResourceTest.SAMPLE_FORM_UUID, ContactResourceTest.SAMPLE_CONTACT_ID).then()
                .statusCode(403);
    }

    @Test
    void getContactByID_success() {
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).when()
                .get(CONTACTS_BY_ID_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID,
                        ContactResourceTest.SAMPLE_CONTACT_ID)
                .then().statusCode(200);
    }

    @Test
    void getContactByID_success_format() {
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).when()
                .get(CONTACTS_BY_ID_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID,
                        ContactResourceTest.SAMPLE_CONTACT_ID)
                .then().assertThat().body(matchesJsonSchemaInClasspath(SchemaNamespaceHelper.CONTACT_SCHEMA_PATH))
                .statusCode(200);
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).accept(ContentType.JSON)
                .when().get(CONTACTS_BY_ID_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID, SAMPLE_CONTACT_ID).then()
                .body(matchesJsonSchemaInClasspath(SchemaNamespaceHelper.ORGANIZATION_SCHEMA_PATH)).statusCode(200);

        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).accept(ContentType.XML)
                .when().get(CONTACTS_BY_ID_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID, SAMPLE_CONTACT_ID).then()
                .statusCode(500);
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).accept(ContentType.TEXT)
                .when().get(CONTACTS_BY_ID_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID, SAMPLE_CONTACT_ID).then()
                .statusCode(500);
    }

    //
    // POST /form/{id}/contacts
    //
    @Test
    void postContact_requireAuth() {
        // auth is triggered after CSRF for non GET requests
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).auth()
                .none().contentType(ContentType.JSON).body(generateSample(Optional.of(SAMPLE_CONTACT_ID))).when()
                .post(CONTACTS_BASE_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID).then().statusCode(401);
    }

    @Test
    void postContact_csrfGuard() {
        // happens after auth, once the request is processed
        given().auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet())).contentType(ContentType.JSON)
                .body(generateSample(Optional.of(SAMPLE_CONTACT_ID))).when()
                .post(CONTACTS_BASE_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID).then().statusCode(403);
    }

    @Test
    void postContact_success() {
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .contentType(ContentType.JSON).body(generateSample(Optional.of(SAMPLE_CONTACT_ID))).when()
                .post(CONTACTS_BASE_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID).then().statusCode(200);
    }

    @Test
    void postContact_success_pushFormat() {
        // Check that the input matches what is specified in spec
        String json = generateSample(Optional.of(SAMPLE_CONTACT_ID));
        Assertions
                .assertTrue(matchesJsonSchemaInClasspath(SchemaNamespaceHelper.CONTACT_PUSH_SCHEMA_PATH).matches(json));

        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .contentType(ContentType.JSON).body(json).when()
                .post(CONTACTS_BASE_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID).then()
                .body(matchesJsonSchemaInClasspath(SchemaNamespaceHelper.ORGANIZATIONS_SCHEMA_PATH)).statusCode(200);

        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).body(json).when()
                .post(CONTACTS_BASE_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID).then().statusCode(500);
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .contentType(ContentType.TEXT).body(json).when()
                .post(CONTACTS_BASE_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID).then().statusCode(500);
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .contentType(ContentType.XML).body(json).when()
                .post(CONTACTS_BASE_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID).then().statusCode(500);
    }

    @Test
    void postContact_success_format() {
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .contentType(ContentType.JSON).body(generateSample(Optional.of(SAMPLE_CONTACT_ID))).when()
                .post(CONTACTS_BASE_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID).then().assertThat()
                .body(matchesJsonSchemaInClasspath(SchemaNamespaceHelper.CONTACTS_SCHEMA_PATH)).statusCode(200);

        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .body(generateSample(Optional.of(SAMPLE_CONTACT_ID))).when()
                .post(CONTACTS_BASE_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID).then().statusCode(500);
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .contentType(ContentType.TEXT).body(generateSample(Optional.of(SAMPLE_CONTACT_ID))).when()
                .post(CONTACTS_BASE_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID).then().statusCode(500);
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .contentType(ContentType.XML).body(generateSample(Optional.of(SAMPLE_CONTACT_ID))).when()
                .post(CONTACTS_BASE_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID).then().statusCode(500);
    }

    //
    // PUT /form/{id}/contacts/{contactId}
    //
    @Test
    void putContactByID_requireAuth() {
        // auth is triggered after CSRF for non GET requests
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).auth()
                .none().contentType(ContentType.JSON).body(generateSample(Optional.of(SAMPLE_CONTACT_ID))).when()
                .put(CONTACTS_BY_ID_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID,
                        ContactResourceTest.SAMPLE_CONTACT_ID)
                .then().statusCode(401);
    }

    @Test
    void putContactByID_csrfGuard() {
        // happens after auth, once the request is processed
        given().auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet())).contentType(ContentType.JSON)
                .body(generateSample(Optional.of(SAMPLE_CONTACT_ID))).when().put(CONTACTS_BY_ID_URL,
                        MembershipFormResourceTest.SAMPLE_FORM_UUID, ContactResourceTest.SAMPLE_CONTACT_ID)
                .then().statusCode(403);
    }

    @Test
    void putContactByID_empty() {
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .contentType(ContentType.JSON).when().put(CONTACTS_BY_ID_URL,
                        MembershipFormResourceTest.SAMPLE_FORM_UUID, ContactResourceTest.SAMPLE_CONTACT_ID)
                .then().statusCode(500);
    }

    @Test
    void putContactByID_success() {
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .contentType(ContentType.JSON).body(generateSample(Optional.empty())).when().put(CONTACTS_BY_ID_URL,
                        MembershipFormResourceTest.SAMPLE_FORM_UUID, ContactResourceTest.SAMPLE_CONTACT_ID)
                .then().statusCode(200);

        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .body(generateSample(Optional.empty())).when()
                .put(CONTACTS_BY_ID_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID,
                        FormOrganizationResourceTest.SAMPLE_ORGANIZATION_ID)
                .then().statusCode(500);
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .contentType(ContentType.TEXT).body(generateSample(Optional.empty())).when()
                .put(CONTACTS_BY_ID_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID,
                        FormOrganizationResourceTest.SAMPLE_ORGANIZATION_ID)
                .then().statusCode(500);
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .contentType(ContentType.XML).body(generateSample(Optional.empty())).when()
                .put(CONTACTS_BY_ID_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID,
                        FormOrganizationResourceTest.SAMPLE_ORGANIZATION_ID)
                .then().statusCode(500);
    }

    @Test
    void putContactByID_success_pushFormat() {
        // Check that the input matches what is specified in spec
        String json = generateSample(Optional.of(SAMPLE_CONTACT_ID));
        Assertions
                .assertTrue(matchesJsonSchemaInClasspath(SchemaNamespaceHelper.CONTACT_PUSH_SCHEMA_PATH).matches(json));

        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .contentType(ContentType.JSON).body(json).when().put(CONTACTS_BY_ID_URL,
                        MembershipFormResourceTest.SAMPLE_FORM_UUID, ContactResourceTest.SAMPLE_CONTACT_ID)
                .then().statusCode(200);
    }

    @Test
    void putContactByID_success_format() {
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .contentType(ContentType.JSON).body(generateSample(Optional.of(SAMPLE_CONTACT_ID))).when()
                .put(CONTACTS_BY_ID_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID,
                        ContactResourceTest.SAMPLE_CONTACT_ID)
                .then().assertThat().body(matchesJsonSchemaInClasspath(SchemaNamespaceHelper.CONTACTS_SCHEMA_PATH));
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .contentType(ContentType.JSON).accept(ContentType.JSON)
                .body(generateSample(Optional.of(SAMPLE_CONTACT_ID))).when()
                .put(CONTACTS_BY_ID_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID,
                        FormOrganizationResourceTest.SAMPLE_ORGANIZATION_ID)
                .then().body(matchesJsonSchemaInClasspath(SchemaNamespaceHelper.MEMBERSHIP_FORMS_SCHEMA_PATH))
                .statusCode(200);

        // asserts content type of output for integrity
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .contentType(ContentType.JSON).accept(ContentType.TEXT)
                .body(generateSample(Optional.of(SAMPLE_CONTACT_ID))).when()
                .put(CONTACTS_BY_ID_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID,
                        FormOrganizationResourceTest.SAMPLE_ORGANIZATION_ID)
                .then().statusCode(500);
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .contentType(ContentType.JSON).accept(ContentType.XML)
                .body(generateSample(Optional.of(SAMPLE_CONTACT_ID))).when()
                .put(CONTACTS_BY_ID_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID,
                        FormOrganizationResourceTest.SAMPLE_ORGANIZATION_ID)
                .then().statusCode(500);
    }

    @Test
    void deleteContactByID_requireAuth() {
        // auth is triggered after CSRF for non GET requests
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).auth()
                .none().when()
                .delete("/form/{id}/contacts/{MembershipFormResourceTest.SAMPLE_FORM_UUID}",
                        MembershipFormResourceTest.SAMPLE_FORM_UUID, ContactResourceTest.SAMPLE_CONTACT_ID)
                .then().statusCode(401);
    }

    @Test
    void deleteContactByID_csrfGuard() {
        // happens after auth, once the request is processed
        given().auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet())).when().delete(CONTACTS_BY_ID_URL,
                MembershipFormResourceTest.SAMPLE_FORM_UUID, ContactResourceTest.SAMPLE_CONTACT_ID).then()
                .statusCode(403);
    }

    @Test
    void deleteContactByID_success() {
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).when()
                .delete(CONTACTS_BY_ID_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID,
                        ContactResourceTest.SAMPLE_CONTACT_ID)
                .then().statusCode(200);
    }

    @Test
    void deleteContactByID_success_format() {
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).when()
                .delete(CONTACTS_BY_ID_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID,
                        ContactResourceTest.SAMPLE_CONTACT_ID)
                .then().assertThat().body(IsEmptyString.emptyString());
    }

    private String generateSample(Optional<String> id) {
        Contact out = DtoHelper.generateContact(DtoHelper.generateForm(Optional.of(AuthHelper.TEST_USER_NAME)),
                Optional.of(ContactTypes.ACCOUNTING));
        id.ifPresent(out::setId);
        return ContactResourceTest.jsonb.toJson(out);
    }
}
