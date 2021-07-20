package org.eclipsefoundation.react.service.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import javax.inject.Inject;

import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.eclipsefoundation.react.dto.Contact;
import org.eclipsefoundation.react.dto.FormOrganization;
import org.eclipsefoundation.react.dto.FormWorkingGroup;
import org.eclipsefoundation.react.dto.MembershipForm;
import org.eclipsefoundation.react.test.helper.AuthHelper;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import io.quarkus.mailer.Mail;
import io.quarkus.mailer.MockMailbox;
import io.quarkus.test.common.QuarkusTestResource;
import io.quarkus.test.junit.QuarkusTest;
import io.quarkus.test.oidc.server.OidcWiremockTestResource;
import io.quarkus.test.security.TestSecurity;

@QuarkusTest
@QuarkusTestResource(OidcWiremockTestResource.class)
class DefaultMailerServiceTest {
    // temp value, will eventually be the email claim of the test user
    public static final String TO_ADDRESS = "webdev@eclipse-foundation.org";

    @ConfigProperty(name = "eclipse.mailer.membership.inbox")
    String membershipMailbox;

    @Inject
    MockMailbox mailbox;

    @Inject
    DefaultMailerService mailerService;

    @BeforeEach
    void init() {
        mailbox.clear();
    }

    // Test disabled temporarily. Quarkus 2.x adds better support for mocked users and should be more easily able to test
    //@Test
    //@TestSecurity(user = AuthHelper.TEST_USER_NAME, roles = "viewer")
    void sendToFormAuthor_success() {
        // set up form to submit through mock service
        MembershipForm f = new MembershipForm();
        f.setUserID(AuthHelper.TEST_USER_NAME);

        // perform the action
        mailerService.sendToFormAuthor(f);

        // verify that it was sent
        List<Mail> sent = mailbox.getMessagesSentTo(TO_ADDRESS);
        Assertions.assertEquals(1, sent.size());

        Mail actual = sent.get(0);
        // email should have both Text and HTML contents
        Assertions.assertNotNull(actual.getText());
        Assertions.assertNotNull(actual.getHtml());
        // should only send 1 message out
        Assertions.assertEquals(1, mailbox.getTotalMessagesSent());
    }

    @Test
    void sendToFormAuthor_anon() {
        // set up form to submit through mock service
        MembershipForm f = new MembershipForm();
        f.setUserID(AuthHelper.TEST_USER_NAME);

        // verify that it failed to send due to state exception
        Assertions.assertThrows(IllegalStateException.class, () -> {
            mailerService.sendToFormAuthor(f);
        });
        // verify that no messages were sent
        Assertions.assertEquals(0, mailbox.getTotalMessagesSent());
    }

    @Test
    void sendToFormAuthor_missingData() {
        // perform the action
        Assertions.assertThrows(IllegalStateException.class, () -> {
            mailerService.sendToFormAuthor(null);
        });
        // verify that no messages were sent
        List<Mail> sent = mailbox.getMessagesSentTo(membershipMailbox);
        Assertions.assertTrue(sent == null || sent.isEmpty());
        Assertions.assertEquals(0, mailbox.getTotalMessagesSent());
    }

    //@Test
    //@TestSecurity(user = AuthHelper.TEST_USER_NAME, roles = "viewer")
    void sendToMembershipTeam_success() {
        // set up form to submit through mock service
        MembershipForm f = new MembershipForm();
        FormOrganization org = new FormOrganization();
        FormWorkingGroup wg = new FormWorkingGroup();
        List<FormWorkingGroup> wgs = new ArrayList<>(Arrays.asList(wg));
        Contact c = new Contact();
        List<Contact> contacts = new ArrayList<>(Arrays.asList(c));

        // perform the action
        mailerService.sendToMembershipTeam(f, org, wgs, contacts);

        // verify that it was sent
        List<Mail> sent = mailbox.getMessagesSentTo(membershipMailbox);
        Assertions.assertEquals(1, sent.size());

        Mail actual = sent.get(0);
        // email should have both Text and HTML contents
        Assertions.assertNotNull(actual.getText());
        Assertions.assertNotNull(actual.getHtml());
        // should only send 1 message out
        Assertions.assertEquals(1, mailbox.getTotalMessagesSent());
    }

    @Test
    void sendToMembershipTeam_missingData() {
        // set up form to submit through mock service
        MembershipForm f = new MembershipForm();
        FormOrganization org = new FormOrganization();
        FormWorkingGroup wg = new FormWorkingGroup();
        List<FormWorkingGroup> wgs = Arrays.asList(wg);
        Contact c = new Contact();
        List<Contact> contacts = Arrays.asList(c);

        // perform the action
        Assertions.assertThrows(IllegalStateException.class, () -> {
            mailerService.sendToMembershipTeam(null, org, wgs, contacts);
        });
        Assertions.assertThrows(IllegalStateException.class, () -> {
            mailerService.sendToMembershipTeam(f, null, wgs, contacts);
        });
        Assertions.assertThrows(IllegalStateException.class, () -> {
            mailerService.sendToMembershipTeam(f, org, null, contacts);
        });
        Assertions.assertThrows(IllegalStateException.class, () -> {
            mailerService.sendToMembershipTeam(f, org, wgs, null);
        });
        Assertions.assertThrows(IllegalStateException.class, () -> {
            mailerService.sendToMembershipTeam(f, org, Collections.emptyList(), contacts);
        });
        Assertions.assertThrows(IllegalStateException.class, () -> {
            mailerService.sendToMembershipTeam(f, org, wgs, Collections.emptyList());
        });
        // verify that no messages were sent
        List<Mail> sent = mailbox.getMessagesSentTo(membershipMailbox);
        Assertions.assertTrue(sent == null || sent.isEmpty());
        Assertions.assertEquals(0, mailbox.getTotalMessagesSent());
    }
}
