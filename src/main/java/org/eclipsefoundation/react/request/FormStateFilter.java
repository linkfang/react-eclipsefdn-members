package org.eclipsefoundation.react.request;

import java.io.IOException;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.inject.Inject;
import javax.ws.rs.BadRequestException;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.ext.Provider;

import org.eclipsefoundation.core.model.RequestWrapper;
import org.eclipsefoundation.core.namespace.DefaultUrlParameterNames;
import org.eclipsefoundation.persistence.dao.impl.DefaultHibernateDao;
import org.eclipsefoundation.persistence.model.RDBMSQuery;
import org.eclipsefoundation.persistence.service.FilterService;
import org.eclipsefoundation.react.dto.MembershipForm;
import org.eclipsefoundation.react.namespace.FormState;
import org.jboss.resteasy.specimpl.MultivaluedMapImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import io.undertow.httpcore.HttpMethodNames;

/**
 * Stops requests to update form objects when the form has already been submitted. Currently reacts to all mutation
 * events under /form/{id}.
 * 
 * @author Martin Lowe
 *
 */
@Provider
public class FormStateFilter implements ContainerRequestFilter {
    public static final Logger LOGGER = LoggerFactory.getLogger(FormStateFilter.class);

    private static final Pattern SPECIFIC_FORM_URI_PATTERN = Pattern.compile("^\\/form\\/([^\\/]+)\\/?.*");

    @Inject
    DefaultHibernateDao dao;
    @Inject
    FilterService filters;

    @Inject
    RequestWrapper wrap;

    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {
        // check if update method
        String httpMethod = requestContext.getMethod();
        if (httpMethod.equalsIgnoreCase(HttpMethodNames.POST) || httpMethod.equalsIgnoreCase(HttpMethodNames.PUT)
                || httpMethod.equalsIgnoreCase(HttpMethodNames.DELETE)) {
            // check if path indicates a specific form
            String path = requestContext.getUriInfo().getPath();
            Matcher m = SPECIFIC_FORM_URI_PATTERN.matcher(path);
            if (m.matches()) {
                // get form object to check if it has been submitted
                String formID = m.group(1);
                // create parameter map to check for current form
                MultivaluedMap<String, String> params = new MultivaluedMapImpl<>();
                params.add(DefaultUrlParameterNames.ID.getName(), formID);
                List<MembershipForm> results = dao
                        .get(new RDBMSQuery<>(wrap, filters.get(MembershipForm.class), params));
                if (!results.isEmpty() && !FormState.INPROGRESS.equals(results.get(0).getState())) {
                    LOGGER.debug("Form with ID '{}' was not updated as it is not in progress. ('{}')", formID,
                            results.get(0).getState());
                    throw new BadRequestException("Form should not be updated if it is not inprogress");
                }
            }
        }
    }

}
