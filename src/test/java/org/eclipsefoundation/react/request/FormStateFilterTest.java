package org.eclipsefoundation.react.request;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Optional;
import java.util.UUID;

import javax.ws.rs.core.Response.Status;

import org.eclipsefoundation.persistence.dao.impl.DefaultHibernateDao;
import org.eclipsefoundation.persistence.dto.BareNode;
import org.eclipsefoundation.persistence.model.RDBMSQuery;
import org.eclipsefoundation.react.dto.Contact;
import org.eclipsefoundation.react.dto.FormOrganization;
import org.eclipsefoundation.react.dto.FormWorkingGroup;
import org.eclipsefoundation.react.dto.MembershipForm;
import org.eclipsefoundation.react.namespace.FormState;
import org.eclipsefoundation.react.test.helper.AuthHelper;
import org.eclipsefoundation.react.test.helper.DtoHelper;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.AdditionalAnswers;
import org.mockito.ArgumentMatcher;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;

import io.quarkus.test.junit.QuarkusTest;
import io.quarkus.test.junit.mockito.InjectMock;
import io.quarkus.test.security.TestSecurity;
import io.quarkus.test.security.oidc.Claim;
import io.quarkus.test.security.oidc.ConfigMetadata;
import io.quarkus.test.security.oidc.OidcSecurity;
import io.restassured.http.ContentType;

@QuarkusTest
class FormStateFilterTest {
    static final String GENERATED_RANDOM_HEADER = "sample-header-value";

    @InjectMock
    DefaultHibernateDao dao;

    // these will be reset before each test, do not rely on static data here
    MembershipForm inprogress;
    MembershipForm completed;
    MembershipForm submitted;
    Contact contact;
    FormOrganization org;
    FormWorkingGroup wg;

    /**
     * Set up all of the fake data for every request. While not a perfect representation of data, is "good enough" for
     * sake of testing.
     */
    @BeforeEach
    void setup() {
        // INPROGRESS
        inprogress = (MembershipForm) getForm(FormState.INPROGRESS);
        Mockito.when(dao.get(ArgumentMatchers.argThat(new ArgumentMatcher<RDBMSQuery<BareNode>>() {
            @Override
            public boolean matches(RDBMSQuery<BareNode> argument) {
                return argument != null && MembershipForm.class.equals(argument.getDocType())
                        && FormState.INPROGRESS.name().equals(argument.getWrapper().getHeader(GENERATED_RANDOM_HEADER));
            }
        }))).thenReturn(new ArrayList<BareNode>(Arrays.asList(inprogress)));
        Mockito.when(
                dao.getReference(ArgumentMatchers.eq(inprogress.getId()), ArgumentMatchers.eq(MembershipForm.class)))
                .thenReturn(inprogress);

        // SUBMITTED
        submitted = (MembershipForm) getForm(FormState.SUBMITTED);
        Mockito.when(dao.get(ArgumentMatchers.argThat(new ArgumentMatcher<RDBMSQuery<BareNode>>() {
            @Override
            public boolean matches(RDBMSQuery<BareNode> argument) {
                return argument != null && MembershipForm.class.equals(argument.getDocType())
                        && FormState.SUBMITTED.name().equals(argument.getWrapper().getHeader(GENERATED_RANDOM_HEADER));
            }
        }))).thenReturn(new ArrayList<BareNode>(Arrays.asList(submitted)));
        Mockito.when(
                dao.getReference(ArgumentMatchers.eq(submitted.getId()), ArgumentMatchers.eq(MembershipForm.class)))
                .thenReturn(submitted);

        // COMPLETE
        completed = (MembershipForm) getForm(FormState.COMPLETE);
        Mockito.when(dao.get(ArgumentMatchers.argThat(new ArgumentMatcher<RDBMSQuery<BareNode>>() {
            @Override
            public boolean matches(RDBMSQuery<BareNode> argument) {
                return argument != null && MembershipForm.class.equals(argument.getDocType())
                        && FormState.COMPLETE.name().equals(argument.getWrapper().getHeader(GENERATED_RANDOM_HEADER));
            }
        }))).thenReturn(new ArrayList<BareNode>(Arrays.asList(completed)));
        Mockito.when(
                dao.getReference(ArgumentMatchers.eq(completed.getId()), ArgumentMatchers.eq(MembershipForm.class)))
                .thenReturn(completed);

        // contact data mocks
        contact = DtoHelper.generateContact(completed, Optional.empty());
        contact.setId(UUID.randomUUID().toString());
        Mockito.when(dao.get(ArgumentMatchers.argThat(new ArgumentMatcher<RDBMSQuery<Contact>>() {
            @Override
            public boolean matches(RDBMSQuery<Contact> argument) {
                return argument != null && Contact.class.equals(argument.getDocType());
            }
        }))).thenReturn(new ArrayList<Contact>(Arrays.asList(contact)));
        Mockito.when(dao.getReference(ArgumentMatchers.eq(contact.getId()), ArgumentMatchers.eq(Contact.class)))
                .thenReturn(contact);

        // organization data mocks
        org = DtoHelper.generateOrg(completed);
        org.setId(UUID.randomUUID().toString());
        Mockito.when(dao.get(ArgumentMatchers.argThat(new ArgumentMatcher<RDBMSQuery<FormOrganization>>() {
            @Override
            public boolean matches(RDBMSQuery<FormOrganization> argument) {
                return argument != null && FormOrganization.class.equals(argument.getDocType());
            }
        }))).thenReturn(new ArrayList<FormOrganization>(Arrays.asList(org)));
        Mockito.when(dao.getReference(ArgumentMatchers.eq(org.getId()), ArgumentMatchers.eq(FormOrganization.class)))
                .thenReturn(org);

        // form working group mock
        wg = DtoHelper.generateWorkingGroup(completed);
        wg.setId(UUID.randomUUID().toString());
        Mockito.when(dao.get(ArgumentMatchers.argThat(new ArgumentMatcher<RDBMSQuery<FormWorkingGroup>>() {
            @Override
            public boolean matches(RDBMSQuery<FormWorkingGroup> argument) {
                return argument != null && FormWorkingGroup.class.equals(argument.getDocType());
            }
        }))).thenReturn(new ArrayList<FormWorkingGroup>(Arrays.asList(wg)));
        Mockito.when(dao.getReference(ArgumentMatchers.eq(wg.getId()), ArgumentMatchers.eq(FormWorkingGroup.class)))
                .thenReturn(wg);

        // handle attempts to add by returning the list (not exact match of func, but close enough)
        Mockito.when(dao.add(ArgumentMatchers.any(), ArgumentMatchers.anyList()))
                .then(AdditionalAnswers.returnsSecondArg());
    }

    @Test
    @TestSecurity(user = AuthHelper.TEST_USER_NAME, roles = AuthHelper.DEFAULT_ROLE)
    @OidcSecurity(claims = { @Claim(key = AuthHelper.EMAIL_CLAIM_KEY, value = AuthHelper.EMAIL_CLAIM_VALUE),
            @Claim(key = AuthHelper.GIVEN_NAME_CLAIM_KEY, value = AuthHelper.GIVEN_NAME_CLAIM_VALUE),
            @Claim(key = AuthHelper.FAMILY_NAME_CLAIM_KEY, value = AuthHelper.FAMILY_NAME_CLAIM_VALUE) }, userinfo = {}, config = {
                    @ConfigMetadata(key = AuthHelper.ISSUER_FIELD_KEY, value = AuthHelper.ISSUER_FIELD_VALUE) })
    void filterInprogressForms_mutator() {
        // attempting to modify submitted forms should pass
        testMutatorsWithStatus(submitted.getId(), FormState.INPROGRESS, Status.OK.getStatusCode());
    }

    @Test
    @TestSecurity(user = AuthHelper.TEST_USER_NAME, roles = AuthHelper.DEFAULT_ROLE)
    @OidcSecurity(claims = { @Claim(key = AuthHelper.EMAIL_CLAIM_KEY, value = AuthHelper.EMAIL_CLAIM_VALUE),
            @Claim(key = AuthHelper.GIVEN_NAME_CLAIM_KEY, value = AuthHelper.GIVEN_NAME_CLAIM_VALUE),
            @Claim(key = AuthHelper.FAMILY_NAME_CLAIM_KEY, value = AuthHelper.FAMILY_NAME_CLAIM_VALUE) }, userinfo = {}, config = {
                    @ConfigMetadata(key = AuthHelper.ISSUER_FIELD_KEY, value = AuthHelper.ISSUER_FIELD_VALUE) })
    void filterSubmittedForms_mutator() {
        // attempting to modify submitted forms should fail
        testMutatorsAssertBadRequest(submitted.getId(), FormState.SUBMITTED);
    }

    @Test
    @TestSecurity(user = AuthHelper.TEST_USER_NAME, roles = AuthHelper.DEFAULT_ROLE)
    @OidcSecurity(claims = { @Claim(key = AuthHelper.EMAIL_CLAIM_KEY, value = AuthHelper.EMAIL_CLAIM_VALUE),
            @Claim(key = AuthHelper.GIVEN_NAME_CLAIM_KEY, value = AuthHelper.GIVEN_NAME_CLAIM_VALUE),
            @Claim(key = AuthHelper.FAMILY_NAME_CLAIM_KEY, value = AuthHelper.FAMILY_NAME_CLAIM_VALUE) }, userinfo = {}, config = {
                    @ConfigMetadata(key = AuthHelper.ISSUER_FIELD_KEY, value = AuthHelper.ISSUER_FIELD_VALUE) })
    void filterCompleteForms_mutator() {
        // attempting to modify complete forms should fail
        testMutatorsAssertBadRequest(completed.getId(), FormState.COMPLETE);
    }

    /**
     * Checks to make sure accessors are not affected when state is {@link FormState.SUBMITTED}
     */
    @Test
    @TestSecurity(user = AuthHelper.TEST_USER_NAME, roles = AuthHelper.DEFAULT_ROLE)
    @OidcSecurity(claims = { @Claim(key = AuthHelper.EMAIL_CLAIM_KEY, value = AuthHelper.EMAIL_CLAIM_VALUE),
            @Claim(key = AuthHelper.GIVEN_NAME_CLAIM_KEY, value = AuthHelper.GIVEN_NAME_CLAIM_VALUE),
            @Claim(key = AuthHelper.FAMILY_NAME_CLAIM_KEY, value = AuthHelper.FAMILY_NAME_CLAIM_VALUE) }, userinfo = {}, config = {
                    @ConfigMetadata(key = AuthHelper.ISSUER_FIELD_KEY, value = AuthHelper.ISSUER_FIELD_VALUE) })
    void filterSubmittedForms_accessor() {
        testAccessors(submitted.getId(), FormState.SUBMITTED);
    }

    /**
     * Checks to make sure accessors are not affected when state is {@link FormState.COMPLETE}
     */
    @Test
    @TestSecurity(user = AuthHelper.TEST_USER_NAME, roles = AuthHelper.DEFAULT_ROLE)
    @OidcSecurity(claims = { @Claim(key = AuthHelper.EMAIL_CLAIM_KEY, value = AuthHelper.EMAIL_CLAIM_VALUE),
            @Claim(key = AuthHelper.GIVEN_NAME_CLAIM_KEY, value = AuthHelper.GIVEN_NAME_CLAIM_VALUE),
            @Claim(key = AuthHelper.FAMILY_NAME_CLAIM_KEY, value = AuthHelper.FAMILY_NAME_CLAIM_VALUE) }, userinfo = {}, config = {
                    @ConfigMetadata(key = AuthHelper.ISSUER_FIELD_KEY, value = AuthHelper.ISSUER_FIELD_VALUE) })
    void filterCompletedForms_accessor() {
        testAccessors(completed.getId(), FormState.COMPLETE);
    }

    private void testMutatorsAssertBadRequest(String formID, FormState state) {
        testMutatorsWithStatus(formID, state, Status.BAD_REQUEST.getStatusCode());
    }

    private void testMutatorsWithStatus(String formID, FormState state, int status) {
        String headerValue = state.name();
        // get the correct form for current calls
        MembershipForm form;
        switch (state) {
            case COMPLETE:
                form = completed;
                break;
            case SUBMITTED:
                form = submitted;
                break;
            default:
                form = inprogress;
        }
        // test the PUT, POST, and DELETE calls for all form endpoints
        AuthHelper.getCSRFDefinedResteasyRequest().header(GENERATED_RANDOM_HEADER, headerValue)
                .contentType(ContentType.JSON).accept(ContentType.JSON).body(form).when().put("/form/{id}", formID)
                .then().statusCode(status);
        AuthHelper.getCSRFDefinedResteasyRequest().header(GENERATED_RANDOM_HEADER, headerValue).when()
                .delete("/form/{id}", formID).then().statusCode(status);
        AuthHelper.getCSRFDefinedResteasyRequest().header(GENERATED_RANDOM_HEADER, headerValue)
                .contentType(ContentType.JSON).accept(ContentType.JSON).body(contact).when()
                .post("/form/{id}/contacts", formID).then().statusCode(status);
        AuthHelper.getCSRFDefinedResteasyRequest().header(GENERATED_RANDOM_HEADER, headerValue)
                .contentType(ContentType.JSON).accept(ContentType.JSON).body(contact).when()
                .put("/form/{id}/contacts/{contactID}", formID, contact.getId()).then().statusCode(status);
        AuthHelper.getCSRFDefinedResteasyRequest().header(GENERATED_RANDOM_HEADER, headerValue).when()
                .delete("/form/{id}/contacts/{contactID}", formID, contact.getId()).then().statusCode(status);
        AuthHelper.getCSRFDefinedResteasyRequest().header(GENERATED_RANDOM_HEADER, headerValue)
                .contentType(ContentType.JSON).accept(ContentType.JSON).body(org).when()
                .post("/form/{id}/organizations", formID).then().statusCode(status);
        AuthHelper.getCSRFDefinedResteasyRequest().header(GENERATED_RANDOM_HEADER, headerValue)
                .contentType(ContentType.JSON).accept(ContentType.JSON).body(org).when()
                .put("/form/{id}/organizations/{orgID}", formID, org.getId()).then().statusCode(status);
        AuthHelper.getCSRFDefinedResteasyRequest().header(GENERATED_RANDOM_HEADER, headerValue).when()
                .delete("/form/{id}/organizations/{orgID}", formID, org.getId()).then().statusCode(status);
        AuthHelper.getCSRFDefinedResteasyRequest().header(GENERATED_RANDOM_HEADER, headerValue)
                .contentType(ContentType.JSON).accept(ContentType.JSON).body(wg).when()
                .post("/form/{id}/working_groups", formID).then().statusCode(status);
        AuthHelper.getCSRFDefinedResteasyRequest().header(GENERATED_RANDOM_HEADER, headerValue)
                .contentType(ContentType.JSON).accept(ContentType.JSON).body(wg).when()
                .put("/form/{id}/working_groups/{wgID}", formID, wg.getId()).then().statusCode(status);
        AuthHelper.getCSRFDefinedResteasyRequest().header(GENERATED_RANDOM_HEADER, headerValue).when()
                .delete("/form/{id}/working_groups/{wgID}", formID, wg.getId()).then().statusCode(status);
    }

    private void testAccessors(String formID, FormState state) {
        String headerValue = state.name();
        AuthHelper.getCSRFDefinedResteasyRequest().header(GENERATED_RANDOM_HEADER, headerValue).when()
                .get("/form/{id}", formID).then().statusCode(200).body("state", Matchers.equalTo(state.name()));
        AuthHelper.getCSRFDefinedResteasyRequest().header(GENERATED_RANDOM_HEADER, headerValue).when()
                .get("/form/{id}/contacts", formID).then().statusCode(200);
        AuthHelper.getCSRFDefinedResteasyRequest().header(GENERATED_RANDOM_HEADER, headerValue).when()
                .get("/form/{id}/organizations", formID).then().statusCode(200);
        AuthHelper.getCSRFDefinedResteasyRequest().header(GENERATED_RANDOM_HEADER, headerValue).when()
                .get("/form/{id}/working_groups", formID).then().statusCode(200);
    }

    /**
     * Generates a form with an ID and given state.
     * 
     * @param state the state to set into the form
     * @return the new mock form
     */
    private BareNode getForm(FormState state) {
        MembershipForm out = DtoHelper.generateForm(Optional.of(AuthHelper.TEST_USER_NAME));
        out.setState(state);
        out.setId(UUID.randomUUID().toString());
        return out;
    }

}
