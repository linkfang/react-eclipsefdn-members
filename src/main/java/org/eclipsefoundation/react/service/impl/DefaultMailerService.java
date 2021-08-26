package org.eclipsefoundation.react.service.impl;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.eclipsefoundation.react.model.MailerData;
import org.eclipsefoundation.react.service.MailerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.openhtmltopdf.outputdevice.helper.BaseRendererBuilder.PageSizeUnits;
import com.openhtmltopdf.pdfboxout.PdfRendererBuilder;

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

    private static final String EMAIL_INCLUDE_PREAMBLE_VAR = "includePreamble";
    private static final String EMAIL_DATA_VAR = "data";
    private static final String EMAIL_NOW_VAR = "now";
    private static final String EMAIL_NAME_VAR = "name";

    @ConfigProperty(name = "eclipse.mailer.membership.inbox")
    String membershipMailbox;
    @ConfigProperty(name = "eclipse.mailer.membership.author-message.bcc")
    Optional<List<String>> authorMessageMailboxBcc;
    @ConfigProperty(name = "eclipse.mailer.membership.membership-message.bcc")
    Optional<List<String>> membershipMessageMailboxBcc;
    @ConfigProperty(name = "eclipse.mailer.membership.doc-storage-root", defaultValue = "/tmp")
    String temporaryDocumentStorage;

    @Inject
    SecurityIdentity ident;
    @Inject
    Mailer mailer;

    // Qute templates, generates email bodies
    @Location("emails/form_membership_email_web_template")
    Template membershipTemplateWeb;
    @Location("emails/form_membership_email_template")
    Template membershipTemplate;

    @Override
    public void sendToFormAuthor(MailerData data) {
        if (data == null || data.form == null) {
            throw new IllegalStateException("A form is required to submit for mailing");
        } else if (data.org == null || data.wgs == null || data.contacts == null || data.contacts.isEmpty()) {
            throw new IllegalStateException(
                    "Could not find a fully complete form for form with ID '" + data.form.getId() + "'");
        } else if (ident.isAnonymous()) {
            // in the future we should fall back to accounts API
            throw new IllegalStateException("A user must be logged in to send the author form message");
        }
        // convert the logged in user into a JWT token to read user claims
        DefaultJWTCallerPrincipal defaultPrin = (DefaultJWTCallerPrincipal) ident.getPrincipal();
        Mail m = getMail(defaultPrin.getClaim("email"), "Thank you for completing the member enrollment form", data,
                true);
        // add BCC if set
        if (!authorMessageMailboxBcc.isEmpty()) {
            m.setBcc(authorMessageMailboxBcc.get());
        }
        mailer.send(m);
    }

    @Override
    public void sendToMembershipTeam(MailerData data) {
        if (data == null || data.form == null) {
            throw new IllegalStateException("A form is required to submit for mailing");
        } else if (data.org == null || data.wgs == null || data.contacts == null || data.contacts.isEmpty()) {
            throw new IllegalStateException(
                    "Could not find a fully complete form for form with ID '" + data.form.getId() + "'");
        }
        DefaultJWTCallerPrincipal defaultPrin = (DefaultJWTCallerPrincipal) ident.getPrincipal();
        Mail m = getMail(membershipMailbox, "New Request to join working group(s) - " + generateName(defaultPrin), data,
                false);
        // add BCC if set
        if (!membershipMessageMailboxBcc.isEmpty()) {
            m.setBcc(membershipMessageMailboxBcc.get());
        }
        // add the PDF attachment
        m.addAttachment("membership-enrollment-" + generateName(defaultPrin).toLowerCase().replace(" ", "-") + ".pdf",
                renderHTMLPDF(
                        membershipTemplateWeb
                                .data(EMAIL_DATA_VAR, data, EMAIL_NAME_VAR, generateName(defaultPrin), EMAIL_NOW_VAR,
                                        LocalDateTime.now(), EMAIL_INCLUDE_PREAMBLE_VAR, false, "isPDF", true)
                                .render()),
                "application/pdf");
        mailer.send(m);
    }

    /**
     * Centralize the creation of the mail object to reduce repetition. A preamble may be included at the top of the
     * message based on the includePreamble argument.
     * 
     * @param recipient the recipient of the mail message
     * @param subject the subject line for the message
     * @param data the collected form data that is the base of the email.
     * @param includePreamble whether or not to include the preamble in the email.
     * @return the mail message with text and HTML versions set.
     */
    private Mail getMail(String recipient, String subject, MailerData data, boolean includePreamble) {
        String name = generateName((DefaultJWTCallerPrincipal) ident.getPrincipal());
        // generate the mail message, sending the messsage to the membershipMailbox
        Mail m = Mail.withHtml(recipient, subject, membershipTemplateWeb.data(EMAIL_DATA_VAR, data, EMAIL_NAME_VAR,
                name, EMAIL_NOW_VAR, LocalDateTime.now(), EMAIL_INCLUDE_PREAMBLE_VAR, includePreamble).render());
        m.setText(membershipTemplate.data(EMAIL_DATA_VAR, data, EMAIL_NAME_VAR, name, EMAIL_NOW_VAR,
                LocalDateTime.now(), EMAIL_INCLUDE_PREAMBLE_VAR, includePreamble).render());
        return m;
    }

    /**
     * Render the PDF document using HTML generated by the Qute template engine.
     * 
     * @param html the HTML for the PDF document.
     * @return the file that represents the document. This should be in a temporary directory so that it gets cleaned on
     * occasion.
     */
    private File renderHTMLPDF(String html) {
        // create a unique file name for temporary storage
        File f = new File(temporaryDocumentStorage + '/' + UUID.randomUUID().toString() + ".pdf");
        try (OutputStream os = new FileOutputStream(f)) {
            PdfRendererBuilder builder = new PdfRendererBuilder();
            builder.withHtmlContent(html, temporaryDocumentStorage);
            // using a4 measurements
            builder.useDefaultPageSize(210, 297, PageSizeUnits.MM);
            builder.toStream(os);
            builder.run();
        } catch (IOException e) {
            throw new RuntimeException("Could not build PDF document", e);
        }
        return f;
    }

    private String generateName(DefaultJWTCallerPrincipal defaultPrin) {
        return new StringBuilder().append((String) defaultPrin.getClaim("given_name")).append(" ")
                .append((String) defaultPrin.getClaim("family_name")).toString();
    }
}
