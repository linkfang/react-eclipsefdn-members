package org.eclipsefoundation.react.model;

import javax.validation.ConstraintViolation;

import org.eclipsefoundation.persistence.dto.BareNode;

public class ConstraintViolationWrapFactory {

    public <T extends BareNode> ConstraintViolationWrap build(T object, ConstraintViolation<T> inner) {
        return new ConstraintViolationWrap(object.getId(), object.getClass().getSimpleName(), inner.getInvalidValue(),
                inner.getPropertyPath().toString());
    }

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
