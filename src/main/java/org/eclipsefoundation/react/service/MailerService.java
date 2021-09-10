package org.eclipsefoundation.react.service;

import org.eclipsefoundation.react.model.MailerData;

/**
 * Interface defining emails that need to be generated and sent as part of the submission of the membership forms to the
 * membership team. This interface includes emails providing feedback to the user and to the membership team.
 * 
 * @author Martin Lowe
 *
 */
public interface MailerService {

    /**
     * Sends an EMail message to the author of the form thanking them for their submission and interest. This request is
     * asynchronous and has no return.
     * 
     * @param data the collected form data for the mailer
     */
    void sendToFormAuthor(MailerData data);

    /**
     * Sends an email message to the membership team regarding the submitted form. This should list all of the
     * information about the form and the submission for the membership team.
     * 
     * @param data the collected form data for the mailer
     */
    void sendToMembershipTeam(MailerData data);
}
