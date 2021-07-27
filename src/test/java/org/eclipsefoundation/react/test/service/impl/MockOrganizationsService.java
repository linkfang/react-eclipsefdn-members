package org.eclipsefoundation.react.test.service.impl;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import javax.enterprise.context.ApplicationScoped;

import org.eclipsefoundation.react.model.MemberOrganization;
import org.eclipsefoundation.react.service.OrganizationsService;

import io.quarkus.test.Mock;

@Mock
@ApplicationScoped
public class MockOrganizationsService implements OrganizationsService {

    @Override
    public List<MemberOrganization> get() {
        return Collections.emptyList();
    }

    @Override
    public Optional<MemberOrganization> getByID(String id) {
        return Optional.empty();
    }

}
