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
import org.eclipsefoundation.react.dto.FormOrganization;
import org.eclipsefoundation.react.dto.MembershipForm;
import org.eclipsefoundation.react.namespace.MembershipFormAPIParameterNames;
import org.jboss.resteasy.specimpl.MultivaluedMapImpl;

import io.quarkus.security.Authenticated;

/**
 * Handles organization CRUD requests.
 *
 * @author Martin Lowe
 */
@Authenticated
@Path("form/{id}/organizations")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class FormOrganizationsResource extends AbstractRESTResource {

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
        // retrieve the possible cached object
        List<FormOrganization> results = dao.get(new RDBMSQuery<>(wrap, filters.get(FormOrganization.class), params));
        if (results == null) {
            return Response.serverError().build();
        }
        // return the results as a response
        return Response.ok(results).build();
    }

    @POST
    public Response create(@PathParam("id") String formID, FormOrganization org) {
        // check if user is allowed to modify these resources
        Response r = checkAccess(formID);
        if (r != null) {
            return r;
        }
        // check if an org for this form already exists. If so, replace it with this one
        MultivaluedMap<String, String> params = new MultivaluedMapImpl<>();
        params.add(MembershipFormAPIParameterNames.FORM_ID.getName(), formID);
        List<FormOrganization> results = dao.get(new RDBMSQuery<>(wrap, filters.get(FormOrganization.class), params));
        if (results != null && !results.isEmpty()) {
            return update(formID, results.get(0).getId(), org);
        } else {
            MembershipForm form = dao.getReference(formID, MembershipForm.class);
            org.setForm(form);
            if (org.getAddress() != null) {
                org.getAddress().setOrganization(org);
            }
        }
        return Response.ok(dao.add(new RDBMSQuery<>(wrap, filters.get(FormOrganization.class)), Arrays.asList(org)))
                .build();
    }

    @GET
    @Path("{orgID}")
    public Response get(@PathParam("id") String formID, @PathParam("orgID") String id,
            @HeaderParam(value = CSRFHelper.CSRF_HEADER_NAME) String csrf) {
        // ensure csrf
        csrfHelper.compareCSRF(aud, csrf);
        Response r = checkAccess(formID);
        if (r != null) {
            return r;
        }

        // create parameter map
        MultivaluedMap<String, String> params = new MultivaluedMapImpl<>();
        params.add(DefaultUrlParameterNames.ID.getName(), id);
        params.add(MembershipFormAPIParameterNames.FORM_ID.getName(), formID);

        // retrieve the possible cached object
        List<FormOrganization> results = dao.get(new RDBMSQuery<>(wrap, filters.get(FormOrganization.class), params));
        if (results == null) {
            return Response.serverError().build();
        } else if (results.isEmpty()) {
            return Response.status(404).build();
        }
        // return the results as a response
        return Response.ok(results.get(0)).build();
    }

    @PUT
    @Path("{orgID}")
    public Response update(@PathParam("id") String formID, @PathParam("orgID") String id, FormOrganization org) {
        // need to fetch ref to use attached entity
        Response r = checkAccess(formID);
        if (r != null) {
            return r;
        }
        FormOrganization ref = dao.getReference(id, FormOrganization.class);
        org.cloneTo(ref);
        if (ref.getAddress() != null && org.getAddress() != null) {
            // if both remote + new set, update remote values
            org.getAddress().cloneTo(ref.getAddress());
        } else {
            // if remote or new are missing, replace remote w/ new value
            ref.setAddress(org.getAddress());
        }
        return Response.ok(dao.add(new RDBMSQuery<>(wrap, filters.get(FormOrganization.class)), Arrays.asList(ref)))
                .build();
    }

    @DELETE
    @Path("{orgID}")
    public Response delete(@PathParam("id") String formID, @PathParam("orgID") String id) {
        Response r = checkAccess(formID);
        if (r != null) {
            return r;
        }
        MultivaluedMap<String, String> params = new MultivaluedMapImpl<>();
        params.add(DefaultUrlParameterNames.ID.getName(), id);
        params.add(MembershipFormAPIParameterNames.FORM_ID.getName(), formID);

        dao.delete(new RDBMSQuery<>(wrap, filters.get(FormOrganization.class), params));
        return Response.ok().build();
    }
}
