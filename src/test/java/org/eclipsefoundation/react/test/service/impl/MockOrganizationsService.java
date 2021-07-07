package org.eclipsefoundation.react.test.service.impl;

import java.util.Collections;
import java.util.List;

import javax.enterprise.context.ApplicationScoped;

import org.eclipsefoundation.react.api.model.Organization;
import org.eclipsefoundation.react.service.OrganizationsService;

import io.quarkus.test.Mock;

@Mock
@ApplicationScoped
public class MockOrganizationsService implements OrganizationsService {

    @Override
    public List<Organization> get() {
        return Collections.emptyList();
    }

    @Override
    public Organization getByID(String id) {
        return null;
    }

}
