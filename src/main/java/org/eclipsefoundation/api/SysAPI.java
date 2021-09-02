package org.eclipsefoundation.api;

import javax.annotation.security.RolesAllowed;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

import io.quarkus.oidc.client.filter.OidcClientFilter;

@Path("sys")
@Produces(MediaType.APPLICATION_JSON)
@RegisterRestClient(configKey = "fdndb-api")
@OidcClientFilter
public interface SysAPI {

    @GET
    @Path("relations")
    @RolesAllowed("fdb_read_sys")
    public Response getSysRelations(@QueryParam("page") Integer page);
}
