package org.eclipsefoundation.api;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;
import org.eclipsefoundation.api.model.Organization;
import org.eclipsefoundation.api.model.OrganizationMembership;

@Path("organizations")
@Produces(MediaType.APPLICATION_JSON)
@RegisterRestClient(configKey = "fdndb-api")
public interface OrganizationAPI {

    @GET
    public List<Organization> getOrganizations();

    @GET
    @Path("{id}")
    public Organization getOrganization(@PathParam("id") String id);

    @GET
    @Path("{id}/memberships")
    public List<OrganizationMembership> getOrganizationMembership(@PathParam("id") String id);
}
