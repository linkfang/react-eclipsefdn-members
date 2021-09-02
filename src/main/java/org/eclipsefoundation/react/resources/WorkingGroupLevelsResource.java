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
package org.eclipsefoundation.react.resources;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.eclipsefoundation.react.service.WorkingGroupsService;

/**
 * Retrieves working group definitions from the working groups service.
 *
 * @author Martin Lowe
 */
@Path("working_groups")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class WorkingGroupLevelsResource extends AbstractRESTResource {

    @Inject
    WorkingGroupsService wgService;

    @GET
    public Response getWorkingGroups() {
        // return the results as a response
        return Response.ok(wgService.get()).build();
    }

    @GET
    @Path("{name}")
    public Response getWorkingGroups(@PathParam("name") String name) {
        // return the results as a response
        return Response.ok(wgService.getByName(name)).build();
    }
}
