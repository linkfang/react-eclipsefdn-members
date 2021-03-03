package org.eclipsefoundation.react.request;

import java.net.URI;
import java.net.URISyntaxException;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import io.quarkus.security.Authenticated;
import io.smallrye.jwt.auth.principal.DefaultJWTCallerPrincipal;

/**
 * Handles OIDC routing for the request.
 *
 * @author Martin Lowe
 */
@Path("")
public class OIDCResource extends AbstractRESTResource {

    @GET
    @Authenticated
    @Path("/login")
    public Response routeLogin() throws URISyntaxException {
        return redirect("/");
    }

    /**
     * While OIDC plugin takes care of actual logout, a route is needed to properly reroute anon user to home page.
     *
     * @throws URISyntaxException
     */
    @GET
    @Path("/logout")
    public Response routeLogout() throws URISyntaxException {
        return redirect("/");
    }

    @GET
    @Path("userinfo")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUserInfo() {
        if (!ident.isAnonymous()) {
            // cast the principal to a JWT token (which is the type for OIDC)
            DefaultJWTCallerPrincipal defaultPrin = (DefaultJWTCallerPrincipal) ident.getPrincipal();
            // create wrapper around data for output
            InfoWrapper uiw = new InfoWrapper();
            uiw.name = defaultPrin.getName();
            uiw.givenName = defaultPrin.getClaim("given_name");
            uiw.familyName = defaultPrin.getClaim("family_name");
            return Response.ok(uiw).build();
        } else {
            return Response.ok().build();
        }
    }

    @GET
    @Path("csrf")
    public Response generateCSRF() {
        if (!ident.isAnonymous()) {
            aud.setCsrf(csrfHelper.getNewCSRFToken());
            wrap.setHeader("csrf", aud.getCsrf());
            return Response.ok().build();
        } else {
            return Response.status(403).build();
        }
    }

    private Response redirect(String location) throws URISyntaxException {
        return Response.temporaryRedirect(new URI(location)).build();
    }

    
    public static class InfoWrapper {
        String name;
        String givenName;
        String familyName;

        /**
         * @return the name
         */
        public String getName() {
            return name;
        }

        /**
         * @param name the name to set
         */
        public void setName(String name) {
            this.name = name;
        }

        /**
         * @return the givenName
         */
        public String getGivenName() {
            return givenName;
        }

        /**
         * @param givenName the givenName to set
         */
        public void setGivenName(String givenName) {
            this.givenName = givenName;
        }

        /**
         * @return the familyName
         */
        public String getFamilyName() {
            return familyName;
        }

        /**
         * @param familyName the familyName to set
         */
        public void setFamilyName(String familyName) {
            this.familyName = familyName;
        }

    }
}
