package org.eclipsefoundation.react.test.helper;

import static io.restassured.RestAssured.given;

import org.eclipsefoundation.core.helper.CSRFHelper;

import io.restassured.filter.session.SessionFilter;
import io.restassured.specification.RequestSpecification;

/**
 * Contains central values for testing authentication in application. This helps reduce variables in testing and
 * concentrate on the actual code being tested.
 * 
 * @author Martin Lowe
 *
 */
public class AuthHelper {
    public static final String TEST_USER_NAME = "opearson";
    public static final String EMAIL_CLAIM_VALUE = "oli.pearson@eclipse.org";
    public static final String FAMILY_NAME_CLAIM_VALUE = "Pearson";
    public static final String GIVEN_NAME_CLAIM_VALUE = "Oli";
    public static final String EMAIL_CLAIM_KEY = "family_name";
    public static final String FAMILY_NAME_CLAIM_KEY = "family_name";
    public static final String GIVEN_NAME_CLAIM_KEY = "given_name";
    public static final String ISSUER_FIELD_KEY = "issuer";
    public static final String ISSUER_FIELD_VALUE = "https://auth.eclipse.org";
    
    public static final String DEFAULT_ROLE = "user";

    /**
     * Retrieves a CSRF value for the given session using restassured.
     * 
     * @param sessionFilter the current session object (needed for consistent CSRF value)
     * @return
     */
    public static String getCSRFValue(SessionFilter sessionFilter) {
        return given().when().filter(sessionFilter).get("/csrf").then().extract().header(CSRFHelper.CSRF_HEADER_NAME);
    }

    public static RequestSpecification getCSRFDefinedResteasyRequest() {
        SessionFilter sessionFilter = new SessionFilter();
        return given().filter(sessionFilter).header(CSRFHelper.CSRF_HEADER_NAME,
                AuthHelper.getCSRFValue(sessionFilter));
    }

    private AuthHelper() {
    }
}
