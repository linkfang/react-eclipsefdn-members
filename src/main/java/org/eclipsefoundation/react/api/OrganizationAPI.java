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
package org.eclipsefoundation.react.api;

import java.util.Set;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;
import org.eclipsefoundation.react.api.model.Organization;

/**
 * REST API binding for the external Foundation Organizations API. This endpoint
 * allows for the retrieval of Eclipse Foundation members, and for filtering by
 * page, working group ID, or ID of the organization.
 */
@Path("member")
@RegisterRestClient(configKey = "fdn-api")
public interface OrganizationAPI {

    /**
     * Retrieves a set of organizations from the external endpoing, allowing for
     * simple pagination of the results and filtering by organizations participation
     * within a working group.
     * 
     * @param workingGroup optional string to filter organizations by working group
     *                     participation, given the ID
     * @param page         the page of results ro retrieve
     * @return the set of organizations for the given query parameters, or an empty
     *         set if none are found.
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    Set<Organization> organizations(@QueryParam("working_group") String workingGroup, @QueryParam("page") int page);

    /**
     * Retrieves a single organization by ID from the external endpoint.
     * 
     * @param id the ID of the organization that should be retrieved.
     * @return the organization data if it exists as an Eclipse Foundation member,
     *         or null if there is no member with the given ID.
     */
    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    Organization organizationByID(@PathParam("id") String id);

}
