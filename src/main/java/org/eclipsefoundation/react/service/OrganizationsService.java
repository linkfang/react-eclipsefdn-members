/**
 * Copyright (c) 2021 Eclipse Foundation
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * Author: Martin Lowe <martin.lowe@eclipse-foundation.org>
 *
 * SPDX-License-Identifier: EPL-2.0
 */
package org.eclipsefoundation.react.service;

import java.util.List;
import java.util.Optional;

import org.eclipsefoundation.api.model.OrganizationContact;
import org.eclipsefoundation.react.model.MemberOrganization;

public interface OrganizationsService {
    List<MemberOrganization> get();

    Optional<MemberOrganization> getByID(String id);

    Optional<List<OrganizationContact>> getOrganizationContacts(String orgID, Optional<String> mail,
            Optional<String> role, Optional<String> fName, Optional<String> lName);

    Optional<List<OrganizationContact>> getOrganizationContacts(String orgID, String userName);

    boolean organizationContactHasRole(String orgID, String userName, String role);
    
    void removeOrganizationContact(String orgID, String userName, String role);
}
