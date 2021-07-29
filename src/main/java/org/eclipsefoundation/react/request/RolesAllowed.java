package org.eclipsefoundation.react.request;

import static java.lang.annotation.ElementType.METHOD;
import static java.lang.annotation.ElementType.TYPE;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;

@Retention(RUNTIME)
@Target({ TYPE, METHOD })
public @interface RolesAllowed {
    /**
     * The organizational roles that are allowed to make the given request.
     * 
     * @return
     */
    String[] value();
}
