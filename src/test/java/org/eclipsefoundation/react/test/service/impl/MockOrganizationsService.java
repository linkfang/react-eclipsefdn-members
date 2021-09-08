package org.eclipsefoundation.react.test.service.impl;

import java.util.List;
import java.util.Optional;

import javax.enterprise.context.ApplicationScoped;

import org.eclipsefoundation.api.model.OrganizationContact;
import org.eclipsefoundation.react.model.MemberOrganization;
import org.eclipsefoundation.react.model.OrganizationContactData;
import org.eclipsefoundation.react.service.OrganizationsService;

import io.quarkus.test.Mock;

@Mock
@ApplicationScoped
public class MockOrganizationsService implements OrganizationsService {

    @Override
    public List<MemberOrganization> get() {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Optional<MemberOrganization> getByID(String id) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Optional<List<OrganizationContactData>> getOrganizationContacts(String orgID, Optional<String> mail,
            Optional<String> role, Optional<String> fName, Optional<String> lName) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Optional<List<OrganizationContact>> getOrganizationContacts(String orgID, String userName) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public OrganizationContact updateOrganizationContact(String orgID, OrganizationContact orgContact) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public boolean organizationContactHasRole(String orgID, String userName, String role) {
        // TODO Auto-generated method stub
        return false;
    }

    @Override
    public void removeOrganizationContact(String orgID, String userName, String role) {
        // TODO Auto-generated method stub

    }

}
