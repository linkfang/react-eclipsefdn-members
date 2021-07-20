package org.eclipsefoundation.react.service.impl;

import java.util.List;
import java.util.Optional;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.eclipsefoundation.react.dto.Contact;
import org.eclipsefoundation.react.dto.FormOrganization;
import org.eclipsefoundation.react.dto.FormWorkingGroup;
import org.eclipsefoundation.react.dto.MembershipForm;
import org.eclipsefoundation.react.service.MailerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import io.quarkus.mailer.Mail;
import io.quarkus.mailer.Mailer;
import io.quarkus.qute.Location;
import io.quarkus.qute.Template;
import io.quarkus.security.identity.SecurityIdentity;
import io.smallrye.jwt.auth.principal.DefaultJWTCallerPrincipal;

/**
 * Default implementation of the mailer service using the Qute templating engine and the mailer extensions built into
 * Quarkus.
 * 
 * @author Martin Lowe
 *
 */
@ApplicationScoped
public class DefaultMailerService implements MailerService {
    public static final Logger LOGGER = LoggerFactory.getLogger(DefaultMailerService.class);

    @ConfigProperty(name = "eclipse.mailer.membership.inbox")
    String membershipMailbox;
    @ConfigProperty(name = "eclipse.mailer.membership.author-message.bcc")
    Optional<List<String>> authorMessageMailboxBcc;
    @ConfigProperty(name = "eclipse.mailer.membership.membership-message.bcc")
    Optional<List<String>> membershipMessageMailboxBcc;

    @Inject
    SecurityIdentity ident;
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

    @Override
    public void sendToFormAuthor(MembershipForm form) {
        if (form == null) {
            throw new IllegalStateException("A form is required to submit for mailing");
        } else if (ident.isAnonymous()) {
            // in the future we should fall back to accounts API
            throw new IllegalStateException("A user must be logged in to send the author form message");
        }
        // convert the logged in user into a JWT token to read user claims
        DefaultJWTCallerPrincipal defaultPrin = (DefaultJWTCallerPrincipal) ident.getPrincipal();

        String name = generateName(defaultPrin);
        // send the email, using the users primary email address
        Mail m = Mail.withHtml(defaultPrin.getClaim("email"), "Thank you for completing the member enrollment form",
                authorTemplateWeb.data("form", form, "name", name).render());
        m.setText(authorTemplate.data("form", form, "name", name).render());
        // add BCC if set
        if (!authorMessageMailboxBcc.isEmpty()) {
            m.setBcc(authorMessageMailboxBcc.get());
        }
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
        String name = generateName((DefaultJWTCallerPrincipal) ident.getPrincipal());
        // generate the mail message, sending the messsage to the membershipMailbox
        Mail m = Mail.withHtml(membershipMailbox, "New Request to join working group(s) - " + name,
                membershipTemplateWeb.data("form", form, "org", org, "wgs", wgs, "contacts", contacts, "name", name)
                        .render());
        m.setText(membershipTemplate.data("form", form, "org", org, "wgs", wgs, "contacts", contacts, "name", name)
                .render());
        // add BCC if set
        if (!membershipMessageMailboxBcc.isEmpty()) {
            m.setBcc(membershipMessageMailboxBcc.get());
        }
        mailer.send(m);
    }

    private String generateName(DefaultJWTCallerPrincipal defaultPrin) {
        return new StringBuilder().append((String) defaultPrin.getClaim("given_name")).append(" ")
                .append((String) defaultPrin.getClaim("family_name")).toString();
    }
}
