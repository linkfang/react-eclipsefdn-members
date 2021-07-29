package org.eclipsefoundation.api;

import java.util.List;

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
import org.eclipsefoundation.api.model.OrganizationContact;
import org.eclipsefoundation.api.model.OrganizationMembership;

@Path("organizations")
@Produces(MediaType.APPLICATION_JSON)
@RegisterRestClient(configKey = "fdndb-api")
public interface OrganizationAPI {

    @GET
    Response getOrganizations(@QueryParam("page") Integer page);

    /**
     * Simplifies use of API middleware to get all orgs.
     * 
     * @return all paged organizations
     */
    default List<Organization> getOrganizations() {
        return APIMiddleware.getAll(this::getOrganizations, Organization.class);
    }

    @GET
    @Path("{id}")
    public Organization getOrganization(@PathParam("id") String id);

    @GET
    @Path("{id}/memberships")
    Response getOrganizationMembership(@PathParam("id") String id, @QueryParam("page") Integer page);

    /**
     * Simplifies use of API middleware to get all org memberships.
     * 
     * @param id the organization ID
     * @return all paged membership objects for current organization given ID
     */
    default List<OrganizationMembership> getOrganizationMembership(@PathParam("id") String id) {
        return APIMiddleware.getAll(p -> getOrganizationMembership(id, p), OrganizationMembership.class);
    }

    @GET
    @Path("{id}/contacts")
    Response getOrganizationContactsWithSearch(@PathParam("id") String id, @QueryParam("page") Integer page,
            @QueryParam("mail") String mail, @QueryParam("relation") String role, @QueryParam("fName") String fName,
            @QueryParam("lName") String lName);

    default List<OrganizationContact> getOrganizationContactsWithSearch(String id, String mail, String role,
            String fName, String lName) {
        return APIMiddleware.getAll(p -> getOrganizationContactsWithSearch(id, p, mail, role, fName, lName),
                OrganizationContact.class);
    }

    @GET
    @Path("{id}/contacts/{personID}")
    Response getOrganizationContacts(@PathParam("id") String id, @QueryParam("page") Integer page,
            @PathParam("personID") String contactId);

    default List<OrganizationContact> getOrganizationContacts(String id, String contactId) {
        return APIMiddleware.getAll(p -> getOrganizationContacts(id, p, contactId), OrganizationContact.class);
    }

    @GET
    @Path("{id}/contacts/{personID}")
    Response getOrganizationContacts(@PathParam("id") String id, @QueryParam("page") Integer page,
            @PathParam("personID") String contactId, @QueryParam("relation") String role);

    default List<OrganizationContact> getOrganizationContacts(String id, String contactId, String role) {
        return APIMiddleware.getAll(p -> getOrganizationContacts(id, p, contactId, role), OrganizationContact.class);
    }

    @DELETE
    @Path("{id}/contacts/{personID}/{relation}")
    Response removeOrganizationContacts(@PathParam("id") String id, @PathParam("personID") String contactId,
            @PathParam("relation") String relation);
}
