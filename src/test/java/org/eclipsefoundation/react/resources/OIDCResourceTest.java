package org.eclipsefoundation.react.resources;

import static io.restassured.RestAssured.given;

import org.eclipsefoundation.core.helper.CSRFHelper;
import org.eclipsefoundation.react.test.helper.AuthHelper;

import static org.hamcrest.CoreMatchers.*;

import java.util.Collections;

import org.junit.jupiter.api.Test;

import io.quarkus.test.common.QuarkusTestResource;
import io.quarkus.test.junit.QuarkusTest;
import io.quarkus.test.oidc.server.OidcWiremockTestResource;
import io.restassured.filter.session.SessionFilter;

/**
 * Tests OIDC Resource endpoints. Mainly looks to test the CSRF endpoint and
 * useragent, as the login and logout endpoints are stubs to facilitate better
 * usage of the oauth extension.
 * 
 * @author Martin Lowe <martin.lowe@eclipsefoundation.org>
 */
@QuarkusTest
@QuarkusTestResource(OidcWiremockTestResource.class)
class OIDCResourceTest {

    @Test
    void ensureCSRFEndpoint() {
        // ensure we get an unsecured endpoint that enables CSRF header retrieval for any requests
        given().auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
            .when().get("/csrf").then()
                .statusCode(200).and().header(CSRFHelper.CSRF_HEADER_NAME, notNullValue());
        given().auth().none()
            .when().get("/csrf").then()
                .statusCode(200).and().header(CSRFHelper.CSRF_HEADER_NAME, notNullValue());
    }

    @Test
    void userInfo_csrfGuard() {
        // no passed CSRF value should fail as userinfo can contain sensitive info
        given().auth().none().when().get("/userinfo").then().statusCode(204);
    }

    
    void userInfo_noauth() {
        SessionFilter sessionFilter = new SessionFilter();
        given().auth().none().header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
            .when().get("/userinfo").then().statusCode(204);
    }

    @Test
    void userInfo_auth() {
        // add session filter to capture and share session between calls
        SessionFilter sessionFilter = new SessionFilter();
        given().auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet())).filter(sessionFilter)
            .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).then()
                .when().get("/userinfo").then().statusCode(200);
    }

    @Test
    void userInfo_auth_passedData() {
        // add session filter to capture and share session between calls
        SessionFilter sessionFilter = new SessionFilter();
        given().auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet())).filter(sessionFilter)
            .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).then()
                .when().get("/userinfo").then().statusCode(200).assertThat()
                    .body("given_name", equalTo(AuthHelper.GIVEN_NAME_CLAIM_VALUE)).and()
                    .body("family_name", equalTo(AuthHelper.FAMILY_NAME_CLAIM_VALUE)).and()
                    .body("name", equalTo(AuthHelper.TEST_USER_NAME));
    }

}
