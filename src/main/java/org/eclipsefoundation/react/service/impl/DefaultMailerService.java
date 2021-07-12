package org.eclipsefoundation.react.service.impl;

import java.util.List;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.eclipse.microprofile.rest.client.inject.RestClient;
import org.eclipsefoundation.react.api.AccountsAPI;
import org.eclipsefoundation.react.api.model.EclipseUser;
import org.eclipsefoundation.react.model.Contact;
import org.eclipsefoundation.react.model.FormOrganization;
import org.eclipsefoundation.react.model.FormWorkingGroup;
import org.eclipsefoundation.react.model.MembershipForm;
import org.eclipsefoundation.react.service.MailerService;

import io.quarkus.mailer.Mail;
import io.quarkus.mailer.Mailer;
import io.quarkus.qute.Location;
import io.quarkus.qute.Template;

/**
 * Default implementation of the mailer service using the Qute templating engine and the mailer extensions built into
 * Quarkus.
 * 
 * @author Martin Lowe
 *
 */
@ApplicationScoped
public class DefaultMailerService implements MailerService {
    @ConfigProperty(name = "eclipse.mailer.membership.inbox")
    String membershipMailbox;

    @Inject
    Mailer mailer;

    // Qute templates, generates email bodies
    @Location("emails/form_author_email_web_template")
    Template authorTemplateWeb;
    @Location("emails/form_author_email_template")
    Template authorTemplate;

    @Location("emails/form_membership_email_web_template")
    Template membershipTemplateWeb;
    @Location("emails/form_membership_email_template")
    Template membershipTemplate;

    @Inject
    @RestClient
    AccountsAPI accounts;

    @Override
    public void sendToFormAuthor(MembershipForm form) {
        if (form == null) {
            throw new IllegalStateException("A form is required to submit for mailing");
        }
        // get the user object for the current form
        List<EclipseUser> users = accounts.getUsers(form.getUserID(), null, null);
        if (users == null || users.isEmpty()) {
            throw new IllegalStateException("Could not find user with ID " + form.getUserID());
        }
        EclipseUser user = users.get(0);
        // TODO use this for mail TO field rather than webdev
        user.getMail();
        // send the email, using the users primary email address
        Mail m = Mail.withHtml("webdev@eclipse-foundation.org", "Thank you for completing the member enrollment form",
                authorTemplateWeb.data("form", form).render());
        m.setText(authorTemplate.data("form", form).render());
        mailer.send(m);
    }

    @Override
    public void sendToMembershipTeam(MembershipForm form, FormOrganization org, List<FormWorkingGroup> wgs,
            List<Contact> contacts) {
        if (form == null) {
            throw new IllegalStateException("A form is required to submit for mailing");
        } else if (org == null || wgs == null || wgs.isEmpty() || contacts == null || contacts.isEmpty()) {
            throw new IllegalStateException(
                    "Could not find a fully complete form for form with ID '" + form.getId() + "'");
        }

        // generate the mail message, sending the messsage to the membershipMailbox
        Mail m = Mail.withHtml(membershipMailbox, "A NEW CHALLENGER APPROACHES",
                membershipTemplateWeb.data("form", form, "org", org, "wgs", wgs, "contacts", contacts).render());
        m.setText(membershipTemplate.data("form", form, "org", org, "wgs", wgs, "contacts", contacts).render());
        mailer.send(m);
    }

}
