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
    public static final UrlParameter FORM_IDS = new UrlParameter("formIDs");
    public static final UrlParameter FORM_STATE = new UrlParameter("state");
    public static final UrlParameter BEFORE_DATE_UPDATED_IN_MILLIS = new UrlParameter("beforeDateUpdatedMillis");

    private static final List<UrlParameter> params = Collections
            .unmodifiableList(Arrays.asList(USER_ID, FORM_ID, FORM_IDS, FORM_STATE, BEFORE_DATE_UPDATED_IN_MILLIS));

    @Override
    public List<UrlParameter> getParameters() {
        return new ArrayList<>(params);
    }
}
