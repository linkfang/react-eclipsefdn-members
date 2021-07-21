package org.eclipsefoundation.react.model;

import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.ConstraintViolation;

import org.eclipsefoundation.persistence.dto.BareNode;

/**
 * Factory for building wrapped constraint violation objects. These are to be returned in the case of requests that are
 * manually validated to better inform the user of the issues with the request.
 * 
 * @author Martin Lowe
 */
public class ConstraintViolationWrapFactory {

    /**
     * Builds the set of constraint violation wrapped objects from the violation object set from the validator.
     * 
     * @param <T> the DTO type object that was validated
     * @param inner the constraint violation object that should be wrapped
     * @return a set of wrapped constraint violation objects representing the passed collection
     */
    public <T extends BareNode> Set<ConstraintViolationWrap> build(Set<ConstraintViolation<T>> inner) {
        return inner.stream().map(this::build).collect(Collectors.toSet());
    }

    private <T extends BareNode> ConstraintViolationWrap build(ConstraintViolation<T> inner) {
        return new ConstraintViolationWrap(inner.getRootBean().getId(), inner.getRootBeanClass().getSimpleName(),
                inner.getInvalidValue(), inner.getPropertyPath().toString());
    }

    /**
     * Wrap class for the {@link ConstraintViolation} object to allow for simple JSON printing.
     * 
     * @author Martin Lowe
     */
    public class ConstraintViolationWrap {
        private Object rootID;
        private String type;
        private Object value;
        private String path;

        ConstraintViolationWrap(Object rootID, String type, Object value, String path) {
            this.type = type;
            this.rootID = rootID;
            this.value = value;
            this.path = path;
        }

        /**
         * @return the rootID
         */
        public Object getRootID() {
            return rootID;
        }

        /**
         * @return the type
         */
        public String getType() {
            return type;
        }

        /**
         * @return the value
         */
        public Object getValue() {
            return value;
        }

        /**
         * @return the path
         */
        public String getPath() {
            return path;
        }
    }
}
