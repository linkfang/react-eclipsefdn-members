package org.eclipsefoundation.react.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.eclipsefoundation.react.dto.Contact;
import org.eclipsefoundation.react.dto.FormOrganization;
import org.eclipsefoundation.react.dto.FormWorkingGroup;
import org.eclipsefoundation.react.dto.MembershipForm;

import io.quarkus.qute.TemplateData;

@TemplateData
public class MailerData {
    public final MembershipForm form;
    public final FormOrganization org;
    public final List<FormWorkingGroup> wgs;
    public final List<Contact> contacts;

    public MailerData(MembershipForm form, FormOrganization org, List<FormWorkingGroup> wgs, List<Contact> contacts) {
        this.form = form;
        this.org = org;
        this.wgs = Collections.unmodifiableList(wgs != null ? wgs: new ArrayList<>());
        this.contacts = Collections.unmodifiableList(contacts != null ? contacts : new ArrayList<>());
    }
}
