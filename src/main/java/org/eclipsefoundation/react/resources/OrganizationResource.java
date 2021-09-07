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

import static org.eclipsefoundation.react.namespace.OrganizationalUserType.CR;
import static org.eclipsefoundation.react.namespace.OrganizationalUserType.DE;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.inject.Inject;
import javax.ws.rs.BadRequestException;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.eclipse.microprofile.rest.client.inject.RestClient;
import org.eclipsefoundation.api.APIMiddleware;
import org.eclipsefoundation.api.SysAPI;
import org.eclipsefoundation.api.model.OrganizationContact;
import org.eclipsefoundation.api.model.OrganizationContactID;
import org.eclipsefoundation.api.model.SysRelation;
import org.eclipsefoundation.react.model.MemberOrganization;
import org.eclipsefoundation.react.request.RolesAllowed;
import org.eclipsefoundation.react.service.OrganizationsService;
import org.eclipsefoundation.react.service.WorkingGroupsService;
import org.jboss.resteasy.specimpl.MultivaluedMapImpl;
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
    @Inject
    WorkingGroupsService wgService;

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
    @RolesAllowed({ CR, DE })
    @Path("{orgID}/contacts")
    public Response getContactsWithSearch(@PathParam("orgID") String organizationID, @QueryParam("mail") String mail,
            @QueryParam("role") String role, @QueryParam("fname") String fName, @QueryParam("lname") String lName) {
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
    @RolesAllowed({ CR, DE })
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
    @RolesAllowed({ CR, DE })
    @Path("{orgID}/contacts/{user}/{relation}")
    public Response checkUserRelation(@PathParam("orgID") String organizationID, @PathParam("user") String username,
            @PathParam("relation") String relation) {
        Optional<List<OrganizationContact>> contacts = orgService.getOrganizationContacts(organizationID, username);
        if (contacts.isEmpty()) {
            return Response.noContent().build();
        }
        return Response.ok(contacts.get()).build();
    }

    @POST
    @Authenticated
    @RolesAllowed({ CR, DE })
    @Path("{orgID}/contacts/{user}/{relation}")
    public Response addUserRelation(@PathParam("orgID") String organizationID, @PathParam("user") String username,
            @PathParam("relation") String relation) {
        // check that the relation is real before trying to post it
        if (!checkRelationExists(relation)) {
            throw new BadRequestException("The following relation does not exist in service: " + relation);
        }

        // marshal the contact information into an entity to push to the service
        OrganizationContact contact = new OrganizationContact();
        OrganizationContactID contactID = new OrganizationContactID();
        contactID.setOrganizationID(Integer.valueOf(organizationID));
        contactID.setPersonID(username.toLowerCase());
        contactID.setRelation(relation.toUpperCase());
        contact.setCompositeID(contactID);
        // indicate who updated the entry as there would be no record otherwise
        contact.setComments("Relation created through the Membership Portal by " + ident.getPrincipal().getName());

        // update the entity and return the result
        return Response.ok(orgService.updateOrganizationContact(organizationID, contact)).build();
    }

    @DELETE
    @Authenticated
    @RolesAllowed({ CR, DE })
    @Path("{orgID}/contacts/{user}/{relation}")
    public Response deleteUserRelation(@PathParam("orgID") String organizationID, @PathParam("user") String username,
            @PathParam("relation") String relation) {
        orgService.removeOrganizationContact(organizationID, username, relation);
        return Response.ok().build();
    }

    @GET
    @Path("{orgID}/working_groups")
    public Response getWorkingGroups(@PathParam("orgID") String organizationID) {
        Optional<MemberOrganization> memberOrg = orgService.getByID(organizationID);
        if (memberOrg.isEmpty()) {
            return Response.noContent().build();
        }
        // get the working groups for each WGPA the org has
        return Response.ok(memberOrg.get().getWgpas().stream().map(wgpa -> wgService.getByName(wgpa.getWorkingGroup()))
                .collect(Collectors.toList())).build();
    }

    /**
     * Check if the passed relation matches an existing relation from the sys API.
     * 
     * @param relation the relation to check
     * @return true if the relation exists, false otherwise
     */
    private boolean checkRelationExists(String relation) {
        Optional<List<SysRelation>> relations = cache.get(ALL_CACHE_PLACEHOLDER, new MultivaluedMapImpl<>(),
                SysRelation.class, () -> APIMiddleware.getAll(sysAPI::getSysRelations, SysRelation.class));
        if (relations.isEmpty()) {
            throw new IllegalStateException("Could not retrieve any relations from upstream, service may be down.");
        }
        return relations.get().stream().anyMatch(r -> r.getRelation().equalsIgnoreCase(relation));
    }
}
