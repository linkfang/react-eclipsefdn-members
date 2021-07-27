package org.eclipsefoundation.api;

import java.util.Set;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;
import org.eclipsefoundation.api.model.Organization;
import org.eclipsefoundation.api.model.OrganizationMembership;

@Path("organizations")
@Produces(MediaType.APPLICATION_JSON)
@RegisterRestClient(configKey = "fdndb-api")
public interface OrganizationAPI {

    @GET
    public Set<Organization> getOrganizations(@QueryParam("page") Integer page);

    @GET
    public Response getOrganizationsResponse(@QueryParam("page") Integer page);

    @GET
    @Path("{id}")
    public Organization getOrganization(@PathParam("id") String id);

    @GET
    @Path("{id}/memberships")
    public Set<OrganizationMembership> getOrganizationMembership(@PathParam("id") String id,
            @QueryParam("page") Integer page);

    @GET
    @Path("{id}/memberships")
    public Response getOrganizationMembershipResponse(@PathParam("id") String id, @QueryParam("page") Integer page);
}
