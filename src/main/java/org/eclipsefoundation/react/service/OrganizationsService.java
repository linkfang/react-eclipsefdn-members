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

/**
 * Service for interacting with external organization entities. 
 * 
 * @author Martin Lowe
 *
 */
public interface OrganizationsService {
    /**
     * Retrieve a list of all member organizations available to the API.
     * 
     * @return a list of all member organizations.
     */
    List<MemberOrganization> get();

    /**
     * Retrieve a single member organization by its organization ID.
     * 
     * @param id the organization ID for the entry to retrieve
     * @return the member organization if it exists, otherwise an empty optional.
     */
    Optional<MemberOrganization> getByID(String id);

    /**
     * Retrieve a list of organization contacts that match the optional serach parameters below.
     * 
     * @param orgID the ID of the organization to search.
     * @param mail the email address to use as a search parameter
     * @param role the role to limit resulting users to.
     * @param fName the first name of the user (no fuzzy).
     * @param lName the last name of the user (no fuzzy).
     * @return a list of organization contacts that match the given parameters.
     */
    Optional<List<OrganizationContact>> getOrganizationContacts(String orgID, Optional<String> mail,
            Optional<String> role, Optional<String> fName, Optional<String> lName);

    /**
     * Retrieves all user relations for a given organzation for a user.
     * 
     * @param orgID the ID of the organization to search.
     * @param userName the username of the contact to retrieve entries for.
     * @return list of user relations for the given user in organization if they exist
     */
    Optional<List<OrganizationContact>> getOrganizationContacts(String orgID, String userName);

    /**
     * Updates the organization contact with the given model.
     * 
     * @param orgID the ID of the organization to search.
     * @param orgContact the updated organization contact to set
     * @return the updated entity from the external service.
     */
    OrganizationContact updateOrganizationContact(String orgID, OrganizationContact orgContact);

    /**
     * Checks the external org service for a given user relation.
     * 
     * @param orgID the ID of the organization to search.
     * @param userName the username of the contact to update.
     * @param role the role of the user to check for.
     * @return true if the user has the role, false otherwise.
     */
    boolean organizationContactHasRole(String orgID, String userName, String role);

    /**
     * Triggers a deletion call in the external organization service for a contact.
     * 
     * @param orgID the ID of the organization to search.
     * @param userName the username of the contact to update.
     * @param role the role of the user to remove.
     */
    void removeOrganizationContact(String orgID, String userName, String role);
}
