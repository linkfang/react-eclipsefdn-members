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
import org.eclipsefoundation.react.dto.Contact;
import org.eclipsefoundation.react.dto.MembershipForm;
import org.eclipsefoundation.react.namespace.MembershipFormAPIParameterNames;
import org.jboss.resteasy.specimpl.MultivaluedMapImpl;

import io.quarkus.security.Authenticated;

/**
 * Handles contact CRUD requests.
 *
 * @author Martin Lowe
 */
@Authenticated
@Path("form/{id}/contacts")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ContactsResource extends AbstractRESTResource {

    @GET
    public Response getAll(@PathParam("id") String formID,
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
        List<Contact> results = dao.get(new RDBMSQuery<>(wrap, filters.get(Contact.class), params));
        if (results == null) {
            return Response.serverError().build();
        }
        // return the results as a response
        return Response.ok(results).build();
    }

    @POST
    public Response create(@PathParam("id") String formID, Contact contact) {
        // check if user is allowed to modify these resources
        Response r = checkAccess(formID);
        if (r != null) {
            return r;
        }
        contact.setForm(dao.getReference(formID, MembershipForm.class));
        return Response.ok(dao.add(new RDBMSQuery<>(wrap, filters.get(Contact.class)), Arrays.asList(contact))).build();
    }

    @GET
    @Path("{contactID}")
    public Response get(@PathParam("id") String formID, @PathParam("contactID") String contactID,
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
        params.add(DefaultUrlParameterNames.ID.getName(), contactID);

        // retrieve the possible object
        List<Contact> results = dao.get(new RDBMSQuery<>(wrap, filters.get(Contact.class), params));
        if (results == null) {
            return Response.serverError().build();
        } else if (results.isEmpty()) {
            return Response.status(404).build();
        }
        // return the results as a response
        return Response.ok(results.get(0)).build();
    }

    @PUT
    @Path("{contactID}")
    public Response update(@PathParam("id") String formID, @PathParam("contactID") String id, Contact contact) {
        // check if user is allowed to modify these resources
        Response r = checkAccess(formID);
        if (r != null) {
            return r;
        }
        // need to fetch ref to use attached entity
        Contact ref = contact.cloneTo(dao.getReference(id, Contact.class));
        ref.setForm(dao.getReference(formID, MembershipForm.class));
        return Response.ok(dao.add(new RDBMSQuery<>(wrap, filters.get(Contact.class)), Arrays.asList(ref))).build();
    }

    @DELETE
    @Path("{contactID}")
    public Response delete(@PathParam("id") String formID, @PathParam("contactID") String id) {
        // check if user is allowed to modify these resources
        Response r = checkAccess(formID);
        if (r != null) {
            return r;
        }
        MultivaluedMap<String, String> params = new MultivaluedMapImpl<>();
        params.add(DefaultUrlParameterNames.ID.getName(), id);
        params.add(MembershipFormAPIParameterNames.FORM_ID.getName(), formID);

        dao.delete(new RDBMSQuery<>(wrap, filters.get(Contact.class), params));
        return Response.ok().build();
    }
}
