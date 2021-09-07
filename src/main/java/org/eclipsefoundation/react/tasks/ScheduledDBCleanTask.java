package org.eclipsefoundation.react.tasks;

import java.time.Duration;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.core.MultivaluedMap;

import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.eclipsefoundation.core.model.RequestWrapper;
import org.eclipsefoundation.core.namespace.DefaultUrlParameterNames;
import org.eclipsefoundation.persistence.dao.PersistenceDao;
import org.eclipsefoundation.persistence.dto.BareNode;
import org.eclipsefoundation.persistence.model.RDBMSQuery;
import org.eclipsefoundation.persistence.service.FilterService;
import org.eclipsefoundation.react.dto.Contact;
import org.eclipsefoundation.react.dto.FormOrganization;
import org.eclipsefoundation.react.dto.FormWorkingGroup;
import org.eclipsefoundation.react.dto.MembershipForm;
import org.eclipsefoundation.react.helper.TimeHelper;
import org.eclipsefoundation.react.namespace.FormState;
import org.eclipsefoundation.react.namespace.MembershipFormAPIParameterNames;
import org.jboss.resteasy.specimpl.MultivaluedMapImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import io.quarkus.scheduler.Scheduled;

/**
 * Schedules a task everyday to batch cleanup documents that are older than the given maxage duration.
 * 
 * @author Martin Lowe
 *
 */
@ApplicationScoped
public class ScheduledDBCleanTask {
    public static final Logger LOGGER = LoggerFactory.getLogger(ScheduledDBCleanTask.class);

    @ConfigProperty(name = "eclipse.scheduled.membership.enabled", defaultValue = "true")
    boolean enabled;
    @ConfigProperty(name = "eclipse.scheduled.membership.max-age", defaultValue = "P60D")
    Duration maxAgeBeforeDeletion;

    @Inject
    PersistenceDao dao;
    @Inject
    FilterService filters;

    /**
     * Schedule the task every day from start up to clean up unused form entries.
     */
    @Scheduled(every = "P1D")
    void schedule() {
        if (enabled) {
            ZonedDateTime maxAge = TimeHelper.now().minus(maxAgeBeforeDeletion);
            LOGGER.info("Checking for database entries updated before {}", maxAge);
            // create parameter map for inprogress documents older than the configured period
            MultivaluedMap<String, String> params = new MultivaluedMapImpl<>();
            params.add(MembershipFormAPIParameterNames.BEFORE_DATE_UPDATED_IN_MILLIS.getName(), Long.toString(TimeHelper.getMillis(maxAge)));
            params.add(MembershipFormAPIParameterNames.FORM_STATE.getName(), FormState.INPROGRESS.name());

            // generate the query to get expired documents
            RDBMSQuery<MembershipForm> initialQuery = new RDBMSQuery<>(new RequestWrapper(), filters.get(MembershipForm.class),
                    params);
            initialQuery.setRoot(false);
            // get the expired form objects
            long size = dao.count(initialQuery);
            List<MembershipForm> forms = new ArrayList<>();
            int count = 0;
            while (forms.size() <= size) {
                // update the query to get the next page
                params.add(DefaultUrlParameterNames.PAGE.getName(), Integer.toString(++count));
                RDBMSQuery<MembershipForm> q = new RDBMSQuery<>(new RequestWrapper(), filters.get(MembershipForm.class), params);
                q.setRoot(false);
                forms.addAll(dao.get(q));
            }

            // build batch parameters to delete old documents
            MultivaluedMap<String, String> formFKParams = new MultivaluedMapImpl<>();
            formFKParams.addAll(MembershipFormAPIParameterNames.FORM_IDS.getName(),
                    forms.stream().map(MembershipForm::getId).collect(Collectors.toList()));

            // log useful information about removed entries
            LOGGER.info("Removing {} form entries from the database", size);
            if (LOGGER.isDebugEnabled()) {
                LOGGER.debug("Entries being removed {}",
                        formFKParams.get(MembershipFormAPIParameterNames.FORM_IDS.getName()));
            }
            // delete the downstream entities in bulk
            dao.delete(generateQuery(formFKParams, FormWorkingGroup.class));
            dao.delete(generateQuery(formFKParams, Contact.class));
            dao.delete(generateQuery(formFKParams, FormOrganization.class));
            // delete the forms last
            dao.delete(initialQuery);
        } else {
            LOGGER.warn("DB clean scheduled task not run as task has been disabled through configuration");
        }
    }

    private <T extends BareNode> RDBMSQuery<T> generateQuery(MultivaluedMap<String, String> params, Class<T> type) {
        RDBMSQuery<T> out = new RDBMSQuery<>(new RequestWrapper(), filters.get(type), params);
        out.setRoot(false);
        return out;
    }
}
