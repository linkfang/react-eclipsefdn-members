package org.eclipsefoundation.react.namespace;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import javax.inject.Singleton;

import org.eclipsefoundation.core.namespace.UrlParameterNamespace;

@Singleton
public final class MembershipFormAPIParameterNames implements UrlParameterNamespace {
    public static final UrlParameter USER_ID = new UrlParameter("userID");
    public static final UrlParameter FORM_ID = new UrlParameter("formID");
    public static final UrlParameter FORM_STATE = new UrlParameter("state");

    private static final List<UrlParameter> params = Collections
            .unmodifiableList(Arrays.asList(USER_ID, FORM_ID, FORM_STATE));

    @Override
    public List<UrlParameter> getParameters() {
        return new ArrayList<>(params);
    }
}
