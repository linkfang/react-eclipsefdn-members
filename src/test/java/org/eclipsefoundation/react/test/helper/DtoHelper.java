package org.eclipsefoundation.react.test.helper;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.apache.commons.lang3.RandomStringUtils;
import org.eclipsefoundation.react.dto.Address;
import org.eclipsefoundation.react.dto.Contact;
import org.eclipsefoundation.react.dto.FormOrganization;
import org.eclipsefoundation.react.dto.FormWorkingGroup;
import org.eclipsefoundation.react.dto.MembershipForm;
import org.eclipsefoundation.react.namespace.ContactTypes;
import org.eclipsefoundation.react.namespace.FormState;

/**
 * Helper for creating valid random DTO objects for use in testing.
 * 
 * @author Martin Lowe
 *
 */
public class DtoHelper {

    // used for random picking, not cryptographic
    private static final Random r = new Random();

    /**
     * Generates a random valid form for use in tests.
     * 
     * @param userID optional userID to set if needed
     * @return valid membership form data
     */
    public static MembershipForm generateForm(Optional<String> userID) {
        MembershipForm mf = new MembershipForm();
        mf.setUserID(userID.orElseGet(() -> RandomStringUtils.randomAlphabetic(10)));
        mf.setMembershipLevel(RandomStringUtils.randomAlphabetic(10));
        mf.setSigningAuthority(Math.random() > 0.5);
        mf.setRegistrationCountry("CA");
        mf.setVatNumber(RandomStringUtils.randomNumeric(10));
        mf.setPurchaseOrderRequired(Math.random() > 0.5 ? "yes" : "no");
        mf.setDateCreated(Math.random() > 0.5 ? System.currentTimeMillis() + r.nextInt(10000)
                : System.currentTimeMillis() - r.nextInt(10000));
        mf.setState(FormState.INPROGRESS);
        return mf;
    }

    public static FormOrganization generateOrg(MembershipForm mf) {
        FormOrganization o = new FormOrganization();
        o.setForm(mf);
        o.setLegalName(RandomStringUtils.randomAlphabetic(4, 10));
        o.setTwitterHandle("@" + RandomStringUtils.randomAlphabetic(4, 10));
        Address a = new Address();
        a.setCity(RandomStringUtils.randomAlphabetic(4, 10));
        a.setCountry(RandomStringUtils.randomAlphabetic(4, 10));
        a.setPostalCode(RandomStringUtils.randomAlphabetic(4, 10));
        a.setProvinceState(RandomStringUtils.randomAlphabetic(2));
        a.setStreet(RandomStringUtils.randomAlphabetic(4, 10));
        a.setOrganization(o);
        o.setAddress(a);
        return o;
    }

    public static List<Contact> generateContacts(MembershipForm form) {
        List<Contact> out = new ArrayList<>();
        for (int j = 0; j < ContactTypes.values().length; j++) {
            // randomly skip contacts
            if (Math.random() > 0.5) {
                continue;
            }
            out.add(generateContact(form, Optional.of(ContactTypes.values()[j])));
        }
        return out;
    }

    public static Contact generateContact(MembershipForm form, Optional<ContactTypes> type) {
        Contact c = new Contact();
        c.setForm(form);
        c.setTitle("Sample Title");
        c.setfName(RandomStringUtils.randomAlphabetic(4, 10));
        c.setlName(RandomStringUtils.randomAlphabetic(4, 10));
        c.setType(type.orElse(ContactTypes.WORKING_GROUP));
        c.setEmail(generateEmail());
        return c;
    }

    public static List<FormWorkingGroup> generateWorkingGroups(MembershipForm form) {
        List<FormWorkingGroup> wgs = new ArrayList<>();
        // randomly create WG entries
        while (true) {
            FormWorkingGroup wg = new FormWorkingGroup();
            wg.setWorkingGroupID(RandomStringUtils.randomAlphabetic(4, 10));
            wg.setParticipationLevel(RandomStringUtils.randomAlphabetic(4, 10));
            // get a random instance of time
            Instant inst = Instant.now().minus(r.nextInt(1000000), ChronoUnit.SECONDS);
            wg.setEffectiveDate(new Date(inst.getEpochSecond()));
            wg.setContact(generateContact(form, Optional.empty()));
            wg.setForm(form);
            wgs.add(wg);
            
            if (Math.random() > 0.5) {
                break;
            }
        }
        return wgs;
    }

    private static String generateEmail() {
        StringBuilder sb = new StringBuilder();
        sb.append(RandomStringUtils.randomAlphabetic(4, 10));
        sb.append("@");
        sb.append(RandomStringUtils.randomAlphabetic(4, 10));
        sb.append(".");
        sb.append(RandomStringUtils.randomAlphabetic(2));
        return sb.toString();
    }

    private DtoHelper() {
    }
}
