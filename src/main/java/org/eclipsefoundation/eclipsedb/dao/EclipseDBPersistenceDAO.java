package org.eclipsefoundation.eclipsedb.dao;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.inject.Named;
import javax.persistence.EntityManager;

import org.eclipsefoundation.persistence.dao.impl.BaseHibernateDao;

/**
 * Allows for EclipseDB entities to be retrieved.
 * 
 * @author Martin Lowe
 *
 */
@ApplicationScoped
public class EclipseDBPersistenceDAO extends BaseHibernateDao {

    @Named("eclipsedb")
    @Inject
    EntityManager em;

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }
}
