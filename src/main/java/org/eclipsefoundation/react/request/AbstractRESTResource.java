/**
 * Copyright (c) 2021 Eclipse Foundation
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * Author: Martin Lowe <martin.lowe@eclipse-foundation.org>
 *
 * SPDX-License-Identifier: EPL-2.0
 */
package org.eclipsefoundation.react.request;

import javax.inject.Inject;
import javax.ws.rs.core.Response;

import org.eclipsefoundation.core.helper.CSRFHelper;
import org.eclipsefoundation.core.helper.ResponseHelper;
import org.eclipsefoundation.core.model.AdditionalUserData;
import org.eclipsefoundation.core.model.RequestWrapper;
import org.eclipsefoundation.core.service.CachingService;
import org.eclipsefoundation.persistence.dao.PersistenceDao;
import org.eclipsefoundation.persistence.service.FilterService;
import org.eclipsefoundation.react.dto.MembershipForm;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import io.quarkus.security.identity.SecurityIdentity;

/**
 * Provides access to commonly required services and containers for REST request serving.
 *
 * @author Martin Lowe
 */
public abstract class AbstractRESTResource {
    private static final Logger LOGGER = LoggerFactory.getLogger(AbstractRESTResource.class);
    public static final String ALL_CACHE_PLACEHOLDER = "all";

    @Inject
    PersistenceDao dao;
    @Inject
    FilterService filters;
    @Inject
    CachingService cache;

    @Inject
    RequestWrapper wrap;
    @Inject
    ResponseHelper responseBuider;

    @Inject
    CSRFHelper csrfHelper;
    @Inject
    AdditionalUserData aud;
    @Inject
    SecurityIdentity ident;

    /**
     * Check if the current user has access to the current resource, based on owner of form and current logged in user.
     * 
     * @param formId the form ID that is being loaded, or has assets that are to be loaded/modified.
     * @return a response if there is an access error, or null if there is no access error.
     */
    protected Response checkAccess(String formId) {
        // check if there is a logged in user
        if (ident.isAnonymous()) {
            return Response.status(401).build();
        }
        // check if user is allowed to get these resources
        MembershipForm form = dao.getReference(formId, MembershipForm.class);
        if (form == null) {
            return Response.status(404).build();
        }
        // check that the logged in user is the creator of the form
        if (!form.getUserID().equalsIgnoreCase(ident.getPrincipal().getName())) {
            LOGGER.warn("User with name '{}' attempted to access form data for user '{}'",
                    ident.getPrincipal().getName(), form.getUserID());
            return Response.status(403).build();
        }
        // if there is no issue, return no response
        return null;
    }
}
