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
package org.eclipsefoundation.react.request;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.eclipsefoundation.react.api.model.Organization;
import org.eclipsefoundation.react.service.OrganizationsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Allows for external organizations data to be retrieved and displayed. This
 * endpoint is unencrypted as all data displayed is publicly available
 * information.
 */
@Path("organizations")
@Produces(MediaType.APPLICATION_JSON)
public class OrganizationResource extends AbstractRESTResource {
    public static final Logger LOGGER = LoggerFactory.getLogger(OrganizationResource.class);

    @Inject
    OrganizationsService orgAPI;

    @GET
    public Response get() {
        List<Organization> orgs = orgAPI.get();
        if (orgs.isEmpty()) {
            return Response.noContent().build();
        }
        return Response.ok(new ArrayList<>(orgs)).build();
    }

    @GET
    @Path("{orgID}")
    public Response get(@PathParam("orgID") String organizationID) {
        Organization org = orgAPI.getByID(organizationID);
        if (org == null) {
            return Response.noContent().build();
        }
        return Response.ok(org).build();
    }
}
