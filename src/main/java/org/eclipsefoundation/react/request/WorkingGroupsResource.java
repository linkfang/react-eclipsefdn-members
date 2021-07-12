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

import java.util.Arrays;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;

import org.eclipsefoundation.core.helper.CSRFHelper;
import org.eclipsefoundation.core.namespace.DefaultUrlParameterNames;
import org.eclipsefoundation.persistence.model.RDBMSQuery;
import org.eclipsefoundation.react.model.Contact;
import org.eclipsefoundation.react.model.MembershipForm;
import org.eclipsefoundation.react.model.FormWorkingGroup;
import org.eclipsefoundation.react.namespace.MembershipFormAPIParameterNames;
import org.jboss.resteasy.specimpl.MultivaluedMapImpl;

import io.quarkus.security.Authenticated;

/**
 * Handles organization CRUD requests.
 *
 * @author Martin Lowe
 */
@Authenticated
@Path("form/{id}/working_groups")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class WorkingGroupsResource extends AbstractRESTResource {

    @GET
    public Response getWorkingGroups(@PathParam("id") String formID,
            @HeaderParam(value = CSRFHelper.CSRF_HEADER_NAME) String csrf) {
        // ensure csrf
        csrfHelper.compareCSRF(aud, csrf);
        // check if user is allowed to modify these resources
        Response r = checkAccess(formID);
        if (r != null) {
            return r;
        }
        // create parameter map
        MultivaluedMap<String, String> params = new MultivaluedMapImpl<>();
        params.add(MembershipFormAPIParameterNames.FORM_ID.getName(), formID);
        // retrieve the possible object
        List<FormWorkingGroup> results = dao.get(new RDBMSQuery<>(wrap, filters.get(FormWorkingGroup.class), params));
        if (results == null) {
            return Response.serverError().build();
        }
        // return the results as a response
        return Response.ok(results).build();
    }

    @POST
    public Response createWorkingGroup(@PathParam("id") String formID, FormWorkingGroup wg) {
        // check if user is allowed to modify these resources
        Response r = checkAccess(formID);
        if (r != null) {
            return r;
        }
        MembershipForm form = dao.getReference(formID, MembershipForm.class);
        wg.setForm(dao.getReference(formID, MembershipForm.class));
        // update the nested contact
        if (wg.getContact() != null) {
            if (wg.getContact().getId() != null) {
                // update the contact object to get entity wg if set
                Contact c = dao.getReference(wg.getContact().getId(), Contact.class);
                wg.setContact(wg.getContact().cloneTo(c));
            }
            // set the form back for wgerences
            wg.getContact().setForm(form);
        }
        return Response.ok(dao.add(new RDBMSQuery<>(wrap, filters.get(FormWorkingGroup.class)), Arrays.asList(wg)))
                .build();
    }

    @GET
    @Path("{wgID}")
    public Response getWorkingGroup(@PathParam("id") String formID, @PathParam("wgID") String wgID,
            @HeaderParam(value = CSRFHelper.CSRF_HEADER_NAME) String csrf) {
        // ensure csrf
        csrfHelper.compareCSRF(aud, csrf);
        // check if user is allowed to modify these resources
        Response r = checkAccess(formID);
        if (r != null) {
            return r;
        }
        // create parameter map
        MultivaluedMap<String, String> params = new MultivaluedMapImpl<>();
        params.add(DefaultUrlParameterNames.ID.getName(), wgID);
        params.add(MembershipFormAPIParameterNames.FORM_ID.getName(), formID);
        // retrieve the possible object
        List<FormWorkingGroup> results = dao.get(new RDBMSQuery<>(wrap, filters.get(FormWorkingGroup.class), params));
        if (results == null) {
            return Response.serverError().build();
        } else if (results.isEmpty()) {
            return Response.status(404).build();
        }
        
        // return the results as a response
        return Response.ok(results.get(0)).build();
    }

    @PUT
    @Path("{wgID}")
    public Response updateWorkingGroup(@PathParam("id") String formID, FormWorkingGroup wg,
            @PathParam("wgID") String wgID) {
        // check if user is allowed to modify these resources
        Response r = checkAccess(formID);
        if (r != null) {
            return r;
        }
        // need to fetch ref to use attached entity
        FormWorkingGroup ref = wg.cloneTo(dao.getReference(wgID, FormWorkingGroup.class));
        ref.setForm(dao.getReference(formID, MembershipForm.class));
        // update the nested contact
        if (ref.getContact() != null && wg.getContact() != null) {
            wg.getContact().cloneTo(ref.getContact());
        } else {
            ref.setContact(wg.getContact());
            // set the form back for references
            if (ref.getContact() != null) {
                ref.getContact().setForm(ref.getForm());
            }
        }
        return Response.ok(dao.add(new RDBMSQuery<>(wrap, filters.get(FormWorkingGroup.class)), Arrays.asList(ref)))
                .build();
    }

    @DELETE
    @Path("{wgID}")
    public Response deleteWorkingGroup(@PathParam("id") String formID, @PathParam("wgID") String id) {
        // check if user is allowed to modify these resources
        Response r = checkAccess(formID);
        if (r != null) {
            return r;
        }
        MultivaluedMap<String, String> params = new MultivaluedMapImpl<>();
        params.add(DefaultUrlParameterNames.ID.getName(), id);
        params.add(MembershipFormAPIParameterNames.USER_ID.getName(), ident.getPrincipal().getName());

        dao.delete(new RDBMSQuery<>(wrap, filters.get(FormWorkingGroup.class), params));
        return Response.ok().build();
    }
}
