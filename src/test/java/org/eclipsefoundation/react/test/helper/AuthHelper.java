package org.eclipsefoundation.react.test.helper;

import static io.restassured.RestAssured.given;

import java.util.Collections;
import java.util.Set;

import org.eclipsefoundation.core.helper.CSRFHelper;

import io.restassured.filter.session.SessionFilter;
import io.restassured.specification.RequestSpecification;
import io.smallrye.jwt.build.Jwt;

public class AuthHelper {
    public static final String TEST_USER_NAME = "sample_user";
    public static final String FAMILY_NAME_CLAIM_VALUE = "Lowe";
    public static final String GIVEN_NAME_CLAIM_VALUE = "Martin";
    public static final String FAMILY_NAME_CLAIM_KEY = "family_name";
    public static final String GIVEN_NAME_CLAIM_KEY = "given_name";

    /**
     * Retrieves a CSRF value for the given session using restassured.
     * 
     * @param sessionFilter the current session object (needed for consistent CSRF value)
     * @return
     */
    public static String getCSRFValue(SessionFilter sessionFilter) {
        return given().when().filter(sessionFilter).get("/csrf").then().extract().header(CSRFHelper.CSRF_HEADER_NAME);
    }

    /**
     * Creates a fake user token for usage in tests. Allows for different group scopes to be set for tests to allow some
     * minor flexibility.
     * 
     * @param groups set of group scopes to include in the access token
     * @return a stringified access token using mostly static fields for easy testing
     */
    public static String getAccessToken(Set<String> groups) {
        // first name and given name are claims provided by KC, mocked here
        return Jwt.preferredUserName(TEST_USER_NAME).claim(GIVEN_NAME_CLAIM_KEY, GIVEN_NAME_CLAIM_VALUE)
                .claim(FAMILY_NAME_CLAIM_KEY, FAMILY_NAME_CLAIM_VALUE).groups(groups)
                .issuer("https://server.example.com").audience("https://service.example.com").jws().keyId("1").sign();
    }
    
    public static RequestSpecification getAuthorizedResteasyRequest() {
        SessionFilter sessionFilter = new SessionFilter();
        return given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter));
    }

    private AuthHelper() {
    }
}
