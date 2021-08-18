package org.eclipsefoundation.api;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;
import org.eclipsefoundation.api.model.Organization;

@Path("organizations")
@Produces(MediaType.APPLICATION_JSON)
@RegisterRestClient(configKey = "fdndb-api")
public interface OrganizationAPI {

    @GET
    Response getOrganizations(@QueryParam("page") Integer page);

    @GET
    @Path("{id}")
    Organization getOrganization(@PathParam("id") String id);

    @GET
    @Path("{id}/memberships")
    Response getOrganizationMembership(@PathParam("id") String id, @QueryParam("page") Integer page);

    @GET
    @Path("{id}/contacts")
    Response getOrganizationContactsWithSearch(@PathParam("id") String id, @QueryParam("page") Integer page,
            @QueryParam("mail") String mail, @QueryParam("relation") String role, @QueryParam("fName") String fName,
            @QueryParam("lName") String lName);

    @GET
    @Path("{id}/contacts/{personID}")
    Response getOrganizationContacts(@PathParam("id") String id, @QueryParam("page") Integer page,
            @PathParam("personID") String contactId);

    @GET
    @Path("{id}/contacts/{personID}")
    Response getOrganizationContacts(@PathParam("id") String id, @QueryParam("page") Integer page,
            @PathParam("personID") String contactId, @QueryParam("relation") String role);

    @DELETE
    @Path("{id}/contacts/{personID}/{relation}")
    Response removeOrganizationContacts(@PathParam("id") String id, @PathParam("personID") String contactId,
            @PathParam("relation") String relation);
}
