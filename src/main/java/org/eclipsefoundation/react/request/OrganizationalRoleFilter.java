package org.eclipsefoundation.react.request;

import java.io.IOException;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.enterprise.inject.Instance;
import javax.inject.Inject;
import javax.ws.rs.client.ClientRequestContext;
import javax.ws.rs.client.ClientRequestFilter;
import javax.ws.rs.core.Context;
import javax.ws.rs.ext.Provider;

import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.eclipse.microprofile.rest.client.inject.RestClient;
import org.eclipsefoundation.api.OrganizationAPI;
import org.eclipsefoundation.api.model.OrganizationContact;
import org.jboss.resteasy.microprofile.client.utils.ClientRequestContextUtils;

import io.quarkus.security.UnauthorizedException;
import io.quarkus.security.identity.SecurityIdentity;

@Provider
public class OrganizationalRoleFilter implements ClientRequestFilter {
    private static final Pattern ORGANIZATION_ID_URL_PATTERN = Pattern.compile("/organizations/([^/]+)");

    @ConfigProperty(name = "eclipse.api.allowed-admin-roles", defaultValue = "eclipsefdn_portal_admin")
    Instance<List<String>> allowedAdminRoles;

    @Context
    SecurityIdentity identity;
    @Inject
    @RestClient
    OrganizationAPI orgAPI;

    @Override
    public void filter(ClientRequestContext requestContext) throws IOException {
        // if current logged in user is an admin, do not stop request
        if (allowedAdminRoles.stream().flatMap(List<String>::stream)
                .anyMatch(role -> identity.getRoles().contains(role))) {
            return;
        }
        Matcher matcher = ORGANIZATION_ID_URL_PATTERN.matcher(requestContext.getUri().getPath());
        Method m = ClientRequestContextUtils.getMethod(requestContext);
        RolesAllowed rolesAnnotation = m.getAnnotation(RolesAllowed.class);
        if (rolesAnnotation != null && matcher.matches() && !isAllowedToAccess(matcher.group(1), rolesAnnotation)) {
            throw new UnauthorizedException("Current user cannot access this functionality");
        }
    }

    private boolean isAllowedToAccess(String orgId, RolesAllowed rolesAnnotation) {
        List<String> roles = Arrays.asList(rolesAnnotation.value());
        List<OrganizationContact> contacts = orgAPI.getOrganizationContacts(orgId, identity.getPrincipal().getName());
        for (OrganizationContact contact : contacts) {
            if (roles.contains(contact.getCompositeID().getRelation())) {
                return true;
            }
        }
        return false;
    }
}
