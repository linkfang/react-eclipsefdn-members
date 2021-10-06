package org.eclipsefoundation.react.resources;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.notNullValue;

import org.eclipsefoundation.core.helper.CSRFHelper;
import org.eclipsefoundation.react.test.helper.AuthHelper;
import org.junit.jupiter.api.Test;

import io.quarkus.test.junit.QuarkusTest;
import io.quarkus.test.security.TestSecurity;
import io.quarkus.test.security.oidc.Claim;
import io.quarkus.test.security.oidc.ConfigMetadata;
import io.quarkus.test.security.oidc.OidcSecurity;
import io.restassured.filter.session.SessionFilter;

/**
 * Tests OIDC Resource endpoints. Mainly looks to test the CSRF endpoint and useragent, as the login and logout
 * endpoints are stubs to facilitate better usage of the oauth extension.
 * 
 * @author Martin Lowe <martin.lowe@eclipsefoundation.org>
 */
@QuarkusTest
class OIDCResourceTest {

    @Test
    @TestSecurity(user = AuthHelper.TEST_USER_NAME, roles = AuthHelper.DEFAULT_ROLE)
    @OidcSecurity(claims = { @Claim(key = AuthHelper.EMAIL_CLAIM_KEY, value = AuthHelper.EMAIL_CLAIM_VALUE),
            @Claim(key = AuthHelper.GIVEN_NAME_CLAIM_KEY, value = AuthHelper.GIVEN_NAME_CLAIM_VALUE),
            @Claim(key = AuthHelper.FAMILY_NAME_CLAIM_KEY, value = AuthHelper.FAMILY_NAME_CLAIM_VALUE) }, userinfo = {}, config = {
                    @ConfigMetadata(key = AuthHelper.ISSUER_FIELD_KEY, value = AuthHelper.ISSUER_FIELD_VALUE) })
    void ensureCSRFEndpoint() {
        // ensure we get an unsecured endpoint that enables CSRF header retrieval for any requests
        given().when().get("/csrf").then().statusCode(200).and().header(CSRFHelper.CSRF_HEADER_NAME, notNullValue());
        given().auth().none().when().get("/csrf").then().statusCode(200).and().header(CSRFHelper.CSRF_HEADER_NAME,
                notNullValue());
    }

    @Test
    void userInfo_csrfGuard() {
        // no passed CSRF value should fail as userinfo can contain sensitive info
        given().auth().none().when().get("/userinfo").then().statusCode(204);
    }

    void userInfo_noauth() {
        SessionFilter sessionFilter = new SessionFilter();
        given().auth().none().header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).when()
                .get("/userinfo").then().statusCode(204);
    }

    @Test
    @TestSecurity(user = AuthHelper.TEST_USER_NAME, roles = AuthHelper.DEFAULT_ROLE)
    @OidcSecurity(claims = { @Claim(key = AuthHelper.EMAIL_CLAIM_KEY, value = AuthHelper.EMAIL_CLAIM_VALUE),
            @Claim(key = AuthHelper.GIVEN_NAME_CLAIM_KEY, value = AuthHelper.GIVEN_NAME_CLAIM_VALUE),
            @Claim(key = AuthHelper.FAMILY_NAME_CLAIM_KEY, value = AuthHelper.FAMILY_NAME_CLAIM_VALUE) }, userinfo = {}, config = {
                    @ConfigMetadata(key = AuthHelper.ISSUER_FIELD_KEY, value = AuthHelper.ISSUER_FIELD_VALUE) })
    void userInfo_auth() {
        // add session filter to capture and share session between calls
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).then()
                .when().get("/userinfo").then().statusCode(200);
    }

    @Test
    @TestSecurity(user = AuthHelper.TEST_USER_NAME, roles = AuthHelper.DEFAULT_ROLE)
    @OidcSecurity(claims = { @Claim(key = AuthHelper.EMAIL_CLAIM_KEY, value = AuthHelper.EMAIL_CLAIM_VALUE),
            @Claim(key = AuthHelper.GIVEN_NAME_CLAIM_KEY, value = AuthHelper.GIVEN_NAME_CLAIM_VALUE),
            @Claim(key = AuthHelper.FAMILY_NAME_CLAIM_KEY, value = AuthHelper.FAMILY_NAME_CLAIM_VALUE) }, userinfo = {}, config = {
                    @ConfigMetadata(key = AuthHelper.ISSUER_FIELD_KEY, value = AuthHelper.ISSUER_FIELD_VALUE) })
    void userInfo_auth_passedData() {
        // add session filter to capture and share session between calls
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).then()
                .when().get("/userinfo").then().statusCode(200).assertThat()
                .body(AuthHelper.GIVEN_NAME_CLAIM_KEY, equalTo(AuthHelper.GIVEN_NAME_CLAIM_VALUE)).and()
                .body(AuthHelper.FAMILY_NAME_CLAIM_KEY, equalTo(AuthHelper.FAMILY_NAME_CLAIM_VALUE)).and()
                .body("name", equalTo(AuthHelper.TEST_USER_NAME));
    }

}
