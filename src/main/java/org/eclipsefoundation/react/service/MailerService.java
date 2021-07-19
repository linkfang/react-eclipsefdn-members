package org.eclipsefoundation.react.service;

import java.util.List;

import org.eclipsefoundation.react.model.Contact;
import org.eclipsefoundation.react.model.FormOrganization;
import org.eclipsefoundation.react.model.FormWorkingGroup;
import org.eclipsefoundation.react.model.MembershipForm;

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
     * @param form the form that is being submitted
     */
    void sendToFormAuthor(MembershipForm form);

    /**
     * Sends an email message to the membership team regarding the submitted form. This should list all of the
     * information about the form and the submission for the membership team.
     * 
     * @param form the membership form that was submitted
     * @param org the organization associated with the membership form
     * @param wgs the working groups associated with the membership form
     * @param contacts contacts associated with the organization and working groups for the membership form
     */
    void sendToMembershipTeam(MembershipForm form, FormOrganization org, List<FormWorkingGroup> wgs,
            List<Contact> contacts);
}
