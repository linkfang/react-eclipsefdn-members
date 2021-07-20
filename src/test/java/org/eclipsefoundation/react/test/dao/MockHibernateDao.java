package org.eclipsefoundation.react.test.dao;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;

import org.eclipse.microprofile.health.HealthCheckResponse;
import org.eclipsefoundation.persistence.dao.PersistenceDao;
import org.eclipsefoundation.persistence.dto.BareNode;
import org.eclipsefoundation.persistence.model.RDBMSQuery;
import org.eclipsefoundation.react.dto.Address;
import org.eclipsefoundation.react.dto.Contact;
import org.eclipsefoundation.react.dto.FormOrganization;
import org.eclipsefoundation.react.dto.FormWorkingGroup;
import org.eclipsefoundation.react.dto.MembershipForm;
import org.eclipsefoundation.react.namespace.ContactTypes;
import org.eclipsefoundation.react.resources.ContactResourceTest;
import org.eclipsefoundation.react.resources.FormOrganizationResourceTest;
import org.eclipsefoundation.react.resources.FormWorkingGroupsResourceTest;
import org.eclipsefoundation.react.test.helper.AuthHelper;

import io.quarkus.test.Mock;

/**
 * To keep tests separate from datastore, set up a dummy endpoint that returns copies of static data.
 *
 * @author Martin Lowe
 */
@Mock
@ApplicationScoped
public class MockHibernateDao implements PersistenceDao {
    private Map<Class<?>, List<? extends BareNode>> mockData;

    // allow query to be captured and exposed for test validation
    public RDBMSQuery<?> capturedQuery;

    /** Set up mock data so that different types will return basic stub data */
    @PostConstruct
    public void init() {
        this.mockData = new HashMap<>();
        MembershipForm mf = new MembershipForm();
        mf.setId("form-uuid");
        mf.setUserID(AuthHelper.TEST_USER_NAME);
        mf.setMembershipLevel("sample");
        mf.setSigningAuthority(Math.random() > 0.5);
        mockData.put(MembershipForm.class, Arrays.asList(mf));
        
        FormOrganization formOrg = new FormOrganization();
        formOrg.setId(FormOrganizationResourceTest.SAMPLE_ORGANIZATION_ID);
        formOrg.setLegalName("Sample Organization");
        formOrg.setTwitterHandle("TwitterHandle");
        Address a = new Address();
        a.setCity("Sample");
        a.setCountry("Country");
        a.setPostalCode("Postal Code");
        a.setProvinceState("ON");
        a.setStreet("Sample street rd");
        formOrg.setAddress(a);
        mockData.put(FormOrganization.class, Arrays.asList(formOrg));
        
        Contact formContact = new Contact();
        formContact.setId(ContactResourceTest.SAMPLE_CONTACT_ID);
        formContact.setEmail("sample@sample.com");
        formContact.setfName("First Name");
        formContact.setlName("Last Name");
        formContact.setTitle("sample title");
        formContact.setType(ContactTypes.ACCOUNTING);
        mockData.put(Contact.class, Arrays.asList(formContact));
        
        FormWorkingGroup wg = new FormWorkingGroup();
        wg.setEffectiveDate(new Date(System.currentTimeMillis()));
        wg.setParticipationLevel("participant");
        wg.setWorkingGroupID("internet-things-iot");
        wg.setId(FormWorkingGroupsResourceTest.SAMPLE_WORKING_GROUPS_ID);
        Contact c = new Contact();
        c.setEmail("sample@sample.com");
        c.setfName("First Name");
        c.setlName("Last Name");
        c.setTitle("sample title");
        c.setType(ContactTypes.ACCOUNTING);
        wg.setContact(c);
        mockData.put(FormWorkingGroup.class, Arrays.asList(wg));
        
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
    public HealthCheckResponse call() {
        return null;
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
