package org.eclipsefoundation.react.model;

/**
 * Indicates the the object should be able to clone itself into Target Object. This allows for entity refs retrieved
 * from JDBC to be filled easily from JSON data entities. For this reason, ID fields should never be updated using this
 * clone method (which breaks the entity reference).
 * 
 * @author Martin Lowe
 * @param <T> the type of object that will be cloned.
 */
public interface TargetedClone<T> {

    /**
     * Dump the values from current into target object and return the reference for any possible chaining. ID fields
     * should not be changed to not break entity references created/maintained by proxy classes.
     * 
     * @param target the object to copy values into.
     * @return
     */
    T cloneTo(T target);
}
