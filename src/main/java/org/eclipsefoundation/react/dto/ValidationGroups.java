package org.eclipsefoundation.react.dto;

import javax.validation.groups.Default;

/**
 * Used to differentiate some validation annotations from default to allow partial states.
 * 
 * @author Martin Lowe
 *
 */
public interface ValidationGroups {
    interface Completion extends Default {
    }
}
