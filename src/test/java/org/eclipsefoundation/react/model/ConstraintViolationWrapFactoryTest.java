package org.eclipsefoundation.react.model;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.inject.Inject;
import javax.validation.ConstraintViolation;
import javax.validation.Validator;

import org.eclipsefoundation.react.dto.MembershipForm;
import org.eclipsefoundation.react.model.ConstraintViolationWrapFactory.ConstraintViolationWrap;
import org.eclipsefoundation.react.test.helper.DtoHelper;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import io.quarkus.test.junit.QuarkusTest;

@QuarkusTest
class ConstraintViolationWrapFactoryTest {

    @Inject
    Validator validator;

    @Test
    void testBuild_success() {
        // generate an invalid validatable resource
        MembershipForm f = DtoHelper.generateForm(Optional.empty());
        f.setUserID(null);
        f.setMembershipLevel(null);

        Set<ConstraintViolation<MembershipForm>> violations = validator.validate(f);
        Set<ConstraintViolationWrap> out = new ConstraintViolationWrapFactory().build(violations);

        compareConstraints(out, violations, f);
    }

    @Test
    void testBuild_acceptsEmpty() {
        Set<ConstraintViolationWrap> out = new ConstraintViolationWrapFactory().build(Collections.emptySet());
        Assertions.assertNotNull(out);
        Assertions.assertTrue(out.isEmpty());
    }

    @Test
    void testBuild_stateless() {
        // generate an invalid validatable resource
        MembershipForm f1 = DtoHelper.generateForm(Optional.empty());
        f1.setUserID(null);
        f1.setMembershipLevel(null);

        MembershipForm f2 = DtoHelper.generateForm(Optional.empty());
        f2.setPurchaseOrderRequired(null);
        f2.setState(null);
        ConstraintViolationWrapFactory factory = new ConstraintViolationWrapFactory();

        Set<ConstraintViolation<MembershipForm>> violations1 = validator.validate(f1);
        Set<ConstraintViolation<MembershipForm>> violations2 = validator.validate(f2);

        // run 2 build operations with same factory
        Set<ConstraintViolationWrap> out1 = factory.build(violations1);
        Set<ConstraintViolationWrap> out2 = factory.build(violations2);
        // check that the violations are properly mapped to the given form objects still
        compareConstraints(out1, violations1, f1);
        compareConstraints(out2, violations2, f2);
    }

    void compareConstraints(Set<ConstraintViolationWrap> out, Set<ConstraintViolation<MembershipForm>> violations,
            MembershipForm f) {
        // same size in and out
        Assertions.assertEquals(violations.size(), out.size());
        for (ConstraintViolationWrap wrap : out) {
            // match on property path (most unique value)
            List<ConstraintViolation<MembershipForm>> violationMatches = violations.stream()
                    .filter(v -> v.getPropertyPath().toString().equals(wrap.getPath())).collect(Collectors.toList());
            // that they match one to one
            Assertions.assertEquals(1, violationMatches.size());

            // match the field values to expected values
            ConstraintViolation<MembershipForm> violation = violationMatches.get(0);
            Assertions.assertEquals(violation.getInvalidValue(), wrap.getValue());
            Assertions.assertEquals(violation.getPropertyPath().toString(), wrap.getPath());
            Assertions.assertEquals(f.getId(), wrap.getRootID());
            Assertions.assertEquals(f.getClass().getSimpleName(), wrap.getType());
        }
    }
}
