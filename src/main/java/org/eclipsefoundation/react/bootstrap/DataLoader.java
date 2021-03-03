package org.eclipsefoundation.react.bootstrap;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import javax.annotation.PostConstruct;
import javax.enterprise.event.Observes;
import javax.inject.Inject;
import javax.inject.Singleton;

import org.apache.commons.lang3.RandomStringUtils;
import org.eclipsefoundation.core.model.RequestWrapper;
import org.eclipsefoundation.persistence.dao.PersistenceDao;
import org.eclipsefoundation.persistence.model.RDBMSQuery;
import org.eclipsefoundation.persistence.service.FilterService;
import org.eclipsefoundation.react.model.Address;
import org.eclipsefoundation.react.model.Contact;
import org.eclipsefoundation.react.model.MembershipForm;
import org.eclipsefoundation.react.model.Organization;
import org.eclipsefoundation.react.model.WorkingGroup;
import org.eclipsefoundation.react.namespace.ContactTypes;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import io.quarkus.runtime.StartupEvent;
import io.quarkus.runtime.configuration.ProfileManager;

/**
 * Injects data into the dataset once persistence engine is loaded in the given contexts. This allows for random data to
 * be injected on start up rather than rely on scrubbed production data for datasets. While this could be accomplished
 * with SQL, this allows for scaling of the data to larger datasets more easily.
 * 
 * @author Martin Lowe
 *
 */
@Singleton
public class DataLoader {
    public static final Logger LOGGER = LoggerFactory.getLogger(DataLoader.class);

    @Inject
    DataLoaderConfig config;

    @Inject
    PersistenceDao dao;
    @Inject
    FilterService filters;

    // used for random picking, not cryptographic
    private Random r = new Random();

    /**
     * After loading, this bean will generate a number of forms in the database for the given application if it is in
     * one of the applicable application profiles (dev and staging by default).
     * 
     * @param ev startup event, injected by CDI
     */
    @PostConstruct
    public void init(@Observes StartupEvent ev) {
        // if running in dev mode, preload a bunch of data using dao
        LOGGER.debug("Current mode: {}", ProfileManager.getActiveProfile());
        if (config.isEnabled()
                && config.getDataLoaderProfiles().contains(ProfileManager.getActiveProfile())) {
            RequestWrapper wrap = new RequestWrapper();
            List<MembershipForm> forms = new ArrayList<>(config.getFormCount());
            for (int i = 0; i < config.getFormCount(); i++) {
                MembershipForm mf = new MembershipForm();
                String userID = config.getUserIDs().get(r.nextInt(config.getUserIDs().size()));

                mf.setUserID(userID);
                mf.setMembershipLevel(config.getMembershipLevels().get(r.nextInt(config.getMembershipLevels().size())));
                mf.setSigningAuthority(Math.random() > 0.5);
                forms.add(mf);
            }

            // batch add the entities
            forms = dao.add(new RDBMSQuery<>(wrap, filters.get(MembershipForm.class)), forms);
            LOGGER.debug("Created {} forms", forms.size());
            List<Organization> organizations = new ArrayList<>(forms.size());
            List<Contact> contacts = new ArrayList<>(forms.size() * ContactTypes.values().length);
            List<WorkingGroup> wgs = new ArrayList<>();
            for (MembershipForm mf : forms) {
                Organization o = new Organization();
                o.setForm(mf);
                o.setLegalName(RandomStringUtils.randomAlphabetic(4, 10));
                o.setTwitterHandle(RandomStringUtils.randomAlphabetic(4, 10));
                Address a = new Address();
                a.setCity(RandomStringUtils.randomAlphabetic(4, 10));
                a.setCountry(RandomStringUtils.randomAlphabetic(4, 10));
                a.setPostalCode(RandomStringUtils.randomAlphabetic(4, 10));
                a.setProvinceState(RandomStringUtils.randomAlphabetic(2));
                a.setStreet(RandomStringUtils.randomAlphabetic(4, 10));
                a.setOrganizationID(o.getId());
                o.setAddress(a);
                organizations.add(o);
                for (int j = 0; j < ContactTypes.values().length; j++) {
                    // randomly skip contacts
                    if (Math.random() > 0.5) {
                        continue;
                    }
                    Contact c = new Contact();
                    c.setForm(mf);
                    c.setTitle("Sample Title");
                    c.setfName(RandomStringUtils.randomAlphabetic(4, 10));
                    c.setlName(RandomStringUtils.randomAlphabetic(4, 10));
                    c.setType(ContactTypes.values()[j]);
                    c.setEmail(RandomStringUtils.randomAlphabetic(4, 10));
                    contacts.add(c);
                }
                // randomly create WG entries
                while (Math.random() > 0.5) {
                    WorkingGroup wg = new WorkingGroup();
                    wg.setWorkingGroupID(config.getWorkingGroups().get(r.nextInt(config.getWorkingGroups().size())));
                    wg.setParticipationLevel(
                            config.getParticipationLevels().get(r.nextInt(config.getParticipationLevels().size())));
                    // get a random instance of time
                    Instant inst = Instant.now().minus(r.nextInt(1000000), ChronoUnit.SECONDS);
                    wg.setEffectiveDate(new Date(inst.getEpochSecond()));
                    wg.setContact(generateContact(mf, Optional.empty()));
                    wg.setForm(mf);
                    wgs.add(wg);
                }
            }
            organizations = dao.add(new RDBMSQuery<>(wrap, filters.get(Organization.class)), organizations);
            contacts = dao.add(new RDBMSQuery<>(wrap, filters.get(Contact.class)), contacts);
            wgs = dao.add(new RDBMSQuery<>(wrap, filters.get(WorkingGroup.class)), wgs);
            LOGGER.debug("Created {} contacts", contacts.size());
            LOGGER.debug("Created {} organizations", organizations.size());
            LOGGER.debug("Created {} working groups", wgs.size());
        }
    }

    private Contact generateContact(MembershipForm form, Optional<ContactTypes> type) {
        Contact c = new Contact();
        c.setForm(form);
        c.setTitle("Sample Title");
        c.setfName(RandomStringUtils.randomAlphabetic(4, 10));
        c.setlName(RandomStringUtils.randomAlphabetic(4, 10));
        c.setType(type.orElse(ContactTypes.WORKING_GROUP));
        c.setEmail(RandomStringUtils.randomAlphabetic(4, 10));
        return c;
    }

}
