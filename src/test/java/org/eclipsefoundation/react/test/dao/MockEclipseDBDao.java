package org.eclipsefoundation.react.test.dao;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;

import org.eclipsefoundation.eclipsedb.dao.EclipseDBPersistenceDAO;
import org.eclipsefoundation.eclipsedb.dto.OrganizationInformation;
import org.eclipsefoundation.persistence.dto.BareNode;
import org.eclipsefoundation.persistence.model.RDBMSQuery;

import io.quarkus.test.Mock;

/**
 * To keep tests separate from datastore, set up a dummy endpoint that returns copies of static data.
 *
 * @author Martin Lowe
 */
@Mock
@ApplicationScoped
public class MockEclipseDBDao extends EclipseDBPersistenceDAO {
    private Map<Class<?>, List<? extends BareNode>> mockData;

    // allow query to be captured and exposed for test validation
    public RDBMSQuery<?> capturedQuery;

    /** Set up mock data so that different types will return basic stub data */
    @PostConstruct
    public void init() {
        this.mockData = new HashMap<>();
        mockData.put(OrganizationInformation.class, Arrays.asList(new OrganizationInformation()));
    }

    @Override
    public <T extends BareNode> List<T> get(RDBMSQuery<T> q) {
        capturedQuery = q;
        // if this is ever wrong, then there was bad mock data
        @SuppressWarnings("unchecked")
        List<T> o = (List<T>) mockData.get(q.getDocType());
        if (o != null) {
            return new ArrayList<>(o);
        }
        return Collections.emptyList();
    }

    @Override
    public <T extends BareNode> List<T> add(RDBMSQuery<T> q, List<T> documents) {
        capturedQuery = q;
        mockData.put(q.getDocType(), documents);
        return documents;
    }

    @Override
    public Long count(RDBMSQuery<?> q) {
        capturedQuery = q;

        return 0L;
    }

    @Override
    public <T extends BareNode> void delete(RDBMSQuery<T> q) {
        capturedQuery = q;
    }

    @Override
    public <T extends BareNode> T getReference(Object id, Class<T> type) {
        // if this is ever wrong, then there was bad mock data
        @SuppressWarnings("unchecked")
        List<T> o = (List<T>) mockData.get(type);
        if (o != null) {
            // return the first entry for now (we're just doing dumb tests)
            return o.get(0);
        }
        return null;
    }
}
