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

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.inject.Inject;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.eclipse.microprofile.rest.client.inject.RestClient;
import org.eclipsefoundation.api.SysAPI;
import org.eclipsefoundation.api.model.OrganizationContact;
import org.eclipsefoundation.react.model.MemberOrganization;
import org.eclipsefoundation.react.request.RolesAllowed;
import org.eclipsefoundation.react.service.OrganizationsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import io.quarkus.security.Authenticated;

/**
 * Allows for external organizations data to be retrieved and displayed. This endpoint is unencrypted as all data
 * displayed is publicly available information.
 */
@Path("organizations")
@Produces(MediaType.APPLICATION_JSON)
public class OrganizationResource extends AbstractRESTResource {
    public static final Logger LOGGER = LoggerFactory.getLogger(OrganizationResource.class);

    @Inject
    OrganizationsService orgService;

    @RestClient
    @Inject
    SysAPI sysAPI;

    @GET
    public Response get() {
        List<MemberOrganization> orgs = orgService.get();
        if (orgs.isEmpty()) {
            return Response.noContent().build();
        }
        return Response.ok(new ArrayList<>(orgs)).build();
    }

    @GET
    @Path("{orgID}")
    public Response get(@PathParam("orgID") String organizationID) {
        Optional<MemberOrganization> org = orgService.getByID(organizationID);
        if (org.isEmpty()) {
            return Response.noContent().build();
        }
        return Response.ok(org.get()).build();
    }

    @GET
    @Authenticated
    @RolesAllowed({ "CR" })
    @Path("{orgID}/contacts")
    public Response getContactsWithSearch(@PathParam("orgID") String organizationID, @QueryParam("mail") String mail,
            @QueryParam("role") String role, @QueryParam("fname") String fName, @QueryParam("lname") String lName) {
        // TODO mail does nothing atm
        Optional<List<OrganizationContact>> contacts = orgService.getOrganizationContacts(organizationID,
                Optional.ofNullable(mail), Optional.ofNullable(role), Optional.ofNullable(fName),
                Optional.ofNullable(lName));
        if (contacts.isEmpty()) {
            return Response.noContent().build();
        }
        return Response.ok(contacts.get()).build();
    }

    @GET
    @Authenticated
    @RolesAllowed({ "CR" })
    @Path("{orgID}/contacts/{user}")
    public Response getContactsForUser(@PathParam("orgID") String organizationID, @PathParam("user") String username) {
        Optional<List<OrganizationContact>> contacts = orgService.getOrganizationContacts(organizationID, username);
        if (contacts.isEmpty()) {
            return Response.noContent().build();
        }
        return Response.ok(contacts.get()).build();
    }

    @GET
    @Authenticated
    @RolesAllowed({ "CR" })
    @Path("{orgID}/contacts/{user}/{relation}")
    public Response checkUserRelation(@PathParam("orgID") String organizationID, @PathParam("user") String username,
            @PathParam("relation") String relation) {
        Optional<List<OrganizationContact>> contacts = orgService.getOrganizationContacts(organizationID, username);
        if (contacts.isEmpty()) {
            return Response.noContent().build();
        }
        return Response.ok(contacts.get()).build();
    }

    @DELETE
    @Authenticated
    @RolesAllowed({ "CR" })
    @Path("{orgID}/contacts/{user}/{relation}")
    public Response deleteUserRelation(@PathParam("orgID") String organizationID, @PathParam("user") String username,
            @PathParam("relation") String relation) {
        orgService.removeOrganizationContact(organizationID, username, relation);
        return Response.ok().build();
    }
}
