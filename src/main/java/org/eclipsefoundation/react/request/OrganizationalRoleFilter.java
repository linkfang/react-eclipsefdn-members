package org.eclipsefoundation.react.request;

import java.io.IOException;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.enterprise.inject.Instance;
import javax.inject.Inject;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.ext.Provider;

import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.eclipse.microprofile.rest.client.inject.RestClient;
import org.eclipsefoundation.api.APIMiddleware;
import org.eclipsefoundation.api.OrganizationAPI;
import org.eclipsefoundation.api.model.OrganizationContact;
import org.eclipsefoundation.core.exception.FinalUnauthorizedException;
import org.eclipsefoundation.core.service.CachingService;
import org.eclipsefoundation.react.namespace.MembershipFormAPIParameterNames;
import org.jboss.resteasy.core.interception.jaxrs.PostMatchContainerRequestContext;
import org.jboss.resteasy.specimpl.MultivaluedMapImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import io.quarkus.security.identity.SecurityIdentity;

/**
 * Filters requests post-matching to secure PII data for organizations to people associated with said organization.
 * 
 * @author martin
 *
 */
@Provider
public class OrganizationalRoleFilter implements ContainerRequestFilter {
    public static final Logger LOGGER = LoggerFactory.getLogger(OrganizationalRoleFilter.class);

    private static final Pattern ORGANIZATION_ID_URL_PATTERN = Pattern.compile("/organizations/([^/]+).*");

    @ConfigProperty(name = "eclipse.api.organization-role-filter.allowed-admin-roles", defaultValue = "eclipsefdn_membership_portal_admin")
    Instance<List<String>> allowedAdminRoles;
    @ConfigProperty(name = "eclipse.api.organization-role-filter.enabled", defaultValue = "true")
    Instance<Boolean> isEnabled;

    @Inject
    CachingService cache;
    @Inject
    SecurityIdentity identity;
    @RestClient
    Instance<OrganizationAPI> orgAPI;

    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {
        // check if this filter is enabled (may be disabled on development
        if (Boolean.TRUE.equals(isEnabled.get())) {
            // if current logged in user is an admin, do not stop request
            if (allowedAdminRoles.stream().flatMap(List<String>::stream).anyMatch(role -> identity.hasRole(role))) {
                return;
            }
            // check if we are in a resolvable resource before reflecting
            Matcher matcher = ORGANIZATION_ID_URL_PATTERN.matcher(requestContext.getUriInfo().getPath());
            if (matcher.matches()) {
                // check annotation on target endpoint to be sure that user is allowed to access the resources
                Method m = ((PostMatchContainerRequestContext) requestContext).getResourceMethod().getMethod();
                RolesAllowed rolesAnnotation = m.getAnnotation(RolesAllowed.class);
                if (rolesAnnotation != null && !isAllowedToAccess(matcher.group(1), rolesAnnotation)) {
                    throw new FinalUnauthorizedException("Current user cannot access this functionality");
                }
            }
        }
    }

    private boolean isAllowedToAccess(String orgId, RolesAllowed rolesAnnotation) {
        List<String> roles = Arrays.asList(rolesAnnotation.value());
        LOGGER.debug("Checking userID '{}' for access of level '{}' in org '{}'", identity.getPrincipal().getName(),
                roles, orgId);
        MultivaluedMap<String, String> params = new MultivaluedMapImpl<>();
        params.add(MembershipFormAPIParameterNames.USER_ID.getName(), identity.getPrincipal().getName());
        Optional<List<OrganizationContact>> contacts = cache.get(orgId, params, OrganizationContact.class,
                () -> APIMiddleware.getAll(
                        i -> orgAPI.get().getOrganizationContacts(orgId, i, identity.getPrincipal().getName()),
                        OrganizationContact.class));
        // only check if we have contacts, otherwise assume that user does not have access
        if (contacts.isPresent()) {
            for (OrganizationContact contact : contacts.get()) {
                if (roles.contains(contact.getCompositeID().getRelation())) {
                    return true;
                }
            }
        }
        return false;
    }
}
