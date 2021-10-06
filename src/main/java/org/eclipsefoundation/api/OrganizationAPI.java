package org.eclipsefoundation.api;

import java.util.List;

import javax.annotation.security.RolesAllowed;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;
import org.eclipsefoundation.api.model.Organization;
import org.eclipsefoundation.api.model.OrganizationContact;

import io.quarkus.oidc.client.filter.OidcClientFilter;

@OidcClientFilter
@Path("organizations")
@Produces(MediaType.APPLICATION_JSON)
@RegisterRestClient(configKey = "fdndb-api")
public interface OrganizationAPI {

    @GET
    @RolesAllowed("fdb_read_organization")
    Response getOrganizations(@QueryParam("page") Integer page);

    @GET
    @Path("{id}")
    @RolesAllowed("fdb_read_organization")
    Organization getOrganization(@PathParam("id") String id);

    @GET
    @Path("{id}/memberships")
    @RolesAllowed("fdb_read_organization")
    Response getOrganizationMembership(@PathParam("id") String id, @QueryParam("page") Integer page);

    @GET
    @Path("{id}/contacts")
    @RolesAllowed("fdb_read_organization")
    Response getOrganizationContactsWithSearch(@PathParam("id") String id, @QueryParam("page") Integer page,
            @QueryParam("mail") String mail, @QueryParam("relation") String role, @QueryParam("fName") String fName,
            @QueryParam("lName") String lName);

    @GET
    @Path("{id}/contacts/{personID}")
    @RolesAllowed("fdb_read_organization")
    Response getOrganizationContacts(@PathParam("id") String id, @QueryParam("page") Integer page,
            @PathParam("personID") String contactId);
    @GET
    @Path("{id}/documents")
    @RolesAllowed("fdb_read_organization_documents")
    Response getOrganizationDocuments(@PathParam("id") String id, @QueryParam("page") Integer page,
            @QueryParam("documentIDs") List<String> documentIDs);

    @GET
    @Path("{id}/contacts/{personID}")
    @RolesAllowed("fdb_read_organization_employment")
    Response getOrganizationContacts(@PathParam("id") String id, @QueryParam("page") Integer page,
            @PathParam("personID") String contactId, @QueryParam("relation") String role);

    @PUT
    @Path("{id}/contacts")
    @RolesAllowed("fdb_write_organization_employment")
    OrganizationContact updateOrganizationContacts(@PathParam("id") String id, OrganizationContact contact);

    @DELETE
    @Path("{id}/contacts/{personID}/{relation}")
    @RolesAllowed("fdb_delete_organization_employment")
    Response removeOrganizationContacts(@PathParam("id") String id, @PathParam("personID") String contactId,
            @PathParam("relation") String relation);
}
