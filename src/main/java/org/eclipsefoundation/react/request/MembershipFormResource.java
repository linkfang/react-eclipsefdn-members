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

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;

import org.eclipsefoundation.core.helper.CSRFHelper;
import org.eclipsefoundation.core.namespace.DefaultUrlParameterNames;
import org.eclipsefoundation.persistence.model.RDBMSQuery;
import org.eclipsefoundation.react.model.Contact;
import org.eclipsefoundation.react.model.FormOrganization;
import org.eclipsefoundation.react.model.FormWorkingGroup;
import org.eclipsefoundation.react.model.MembershipForm;
import org.eclipsefoundation.react.namespace.FormState;
import org.eclipsefoundation.react.namespace.MembershipFormAPIParameterNames;
import org.eclipsefoundation.react.service.MailerService;
import org.jboss.resteasy.specimpl.MultivaluedMapImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import io.quarkus.security.Authenticated;

/**
 * Handles membership form CRUD requests.
 *
 * @author Martin Lowe
 */
@Authenticated
@Path("form")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class MembershipFormResource extends AbstractRESTResource {
    public static final Logger LOGGER = LoggerFactory.getLogger(MembershipFormResource.class);

    @Inject
    MailerService mailer;

    @GET
    public Response getAll(@HeaderParam(value = CSRFHelper.CSRF_HEADER_NAME) String csrf) {
        // ensure csrf
        csrfHelper.compareCSRF(aud, csrf);

        // create parameter map
        MultivaluedMap<String, String> params = new MultivaluedMapImpl<>();
        params.add(MembershipFormAPIParameterNames.USER_ID.getName(), ident.getPrincipal().getName());
        // retrieve the possible cached object
        List<MembershipForm> results = dao.get(new RDBMSQuery<>(wrap, filters.get(MembershipForm.class), params));
        if (results == null) {
            return Response.serverError().build();
        }
        // return the results as a response
        return Response.ok(results).build();
    }

    @GET
    @Path("{id}")
    public Response get(@PathParam("id") String formID, @HeaderParam(value = CSRFHelper.CSRF_HEADER_NAME) String csrf) {
        // ensure csrf
        csrfHelper.compareCSRF(aud, csrf);
        // check if user is allowed to modify these resources
        Response r = checkAccess(formID);
        if (r != null) {
            return r;
        }
        // create parameter map
        MultivaluedMap<String, String> params = new MultivaluedMapImpl<>();
        params.add(DefaultUrlParameterNames.ID.getName(), formID);

        // retrieve the possible cached object
        List<MembershipForm> results = dao.get(new RDBMSQuery<>(wrap, filters.get(MembershipForm.class), params));
        if (results == null) {
            return Response.serverError().build();
        } else if (results.isEmpty()) {
            return Response.status(404).build();
        }
        // return the results as a response
        return Response.ok(results.get(0)).build();
    }

    @POST
    public List<MembershipForm> create(MembershipForm mem) {
        mem.setUserID(ident.getPrincipal().getName());
        mem.setDateCreated(System.currentTimeMillis());
        return dao.add(new RDBMSQuery<>(wrap, filters.get(MembershipForm.class)), Arrays.asList(mem));
    }

    @PUT
    @Path("{id}")
    public Response update(@PathParam("id") String formID, MembershipForm mem) {
        // make sure we have something to put
        if (mem == null) {
            return Response.status(500).build();
        }
        // check if user is allowed to modify these resources
        Response r = checkAccess(formID);
        if (r != null) {
            return r;
        }
        mem.setUserID(ident.getPrincipal().getName());
        // need to fetch ref to use attached entity
        MembershipForm ref = mem.cloneTo(dao.getReference(formID, MembershipForm.class));
        return Response.ok(dao.add(new RDBMSQuery<>(wrap, filters.get(MembershipForm.class)), Arrays.asList(ref)))
                .build();
    }

    @DELETE
    @Path("{id}")
    public Response delete(@PathParam("id") String formID) {
        // check if user is allowed to modify these resources
        Response r = checkAccess(formID);
        if (r != null) {
            return r;
        }
        MultivaluedMap<String, String> params = new MultivaluedMapImpl<>();
        params.add(DefaultUrlParameterNames.ID.getName(), formID);

        dao.delete(new RDBMSQuery<>(wrap, filters.get(MembershipForm.class), params));
        return Response.ok().build();
    }

    @POST
    @Path("{id}/complete")
    public Response completeForm(@PathParam("id") String formID, @QueryParam("force") boolean force) {
        // check if user is allowed to modify these resources
        Response r = checkAccess(formID);
        if (r != null) {
            return r;
        }
        // create parameter map
        MultivaluedMap<String, String> params = new MultivaluedMapImpl<>();
        params.add(DefaultUrlParameterNames.ID.getName(), formID);

        // retrieve the possible cached object
        List<MembershipForm> results = dao.get(new RDBMSQuery<>(wrap, filters.get(MembershipForm.class), params));
        if (results == null) {
            return Response.serverError().build();
        } else if (results.isEmpty()) {
            return Response.status(404).build();
        } else if (!force && (FormState.SUBMITTED.equals(results.get(0).getState())
                || FormState.COMPLETE.equals(results.get(0).getState()))) {
            // dont send email if force param is not true and form already submitted
            return Response.status(204).build();
        }
        // send the form to the mailing service
        MembershipForm mf = results.get(0);
        mailer.sendToFormAuthor(mf);

        // retrieve all of the info needed to post the form email
        MultivaluedMap<String, String> extraparams = new MultivaluedMapImpl<>();
        extraparams.add(MembershipFormAPIParameterNames.FORM_ID.getName(), formID);
        List<FormOrganization> org = dao.get(new RDBMSQuery<>(wrap, filters.get(FormOrganization.class), extraparams));
        List<FormWorkingGroup> wgs = dao.get(new RDBMSQuery<>(wrap, filters.get(FormWorkingGroup.class), extraparams));
        List<Contact> contacts = dao.get(new RDBMSQuery<>(wrap, filters.get(Contact.class), extraparams));
        // send the membership team email message
        mailer.sendToMembershipTeam(mf, !org.isEmpty() ? org.get(0) : null, wgs, contacts);

        // update the state and push the update
        mf.setState(FormState.SUBMITTED);

        return Response.ok(dao.add(new RDBMSQuery<>(wrap, filters.get(MembershipForm.class)), Arrays.asList(mf)))
                .build();
    }
}
