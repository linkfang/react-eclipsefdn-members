package org.eclipsefoundation.api;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;
import org.eclipsefoundation.api.model.SysRelation;

@Path("sys")
@Produces(MediaType.APPLICATION_JSON)
@RegisterRestClient(configKey = "fdndb-api")
public interface SysAPI {

    public default List<SysRelation> getSysRelations() {
        return APIMiddleware.getAll(this::getSysRelations, SysRelation.class);
    }

    @GET
    @Path("relations")
    public Response getSysRelations(@QueryParam("page") Integer page);
}
