package org.eclipsefoundation.api;

import java.io.InputStream;
import java.net.URI;
import java.util.LinkedList;
import java.util.List;
import java.util.function.IntFunction;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.core.Response;

import org.jboss.resteasy.spi.LinkHeader;

import com.fasterxml.jackson.databind.ObjectMapper;

@ApplicationScoped
public class APIMiddleware {
    private static final Pattern PAGE_QUERY_STRING_PARAM_MATCHER = Pattern.compile(".*[\\?&]?page=(\\d+).*");

    // JSONb doesn't handle list roots well, so using Jackson
    @Inject
    ObjectMapper objectMapper;

    public <T> List<T> getAll(IntFunction<Response> supplier, Class<T> type) {
        // get initial response
        int count = 1;
        Response r = supplier.apply(count);
        // get the Link response header values
        int lastPage = getLastPageIndex(r);
        List<T> out = new LinkedList<>();
        try {
            out.addAll(objectMapper.readerForListOf(type).readValue((InputStream) r.getEntity()));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        // iterate through all pages before returning results
        while (++count <= lastPage) {
            r = supplier.apply(count);
            try {
                out.addAll(objectMapper.readerForListOf(type).readValue((InputStream) r.getEntity()));
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
        return out;
    }

    private int getLastPageIndex(Response r) {
        List<Object> links = r.getHeaders().get("Link");
        // convert it to retrieve the index of the last page
        if (links != null && !links.isEmpty()) {
            LinkHeader h = LinkHeader.valueOf(links.get(0).toString());
            // check what the last page link has as its 'page' param val
            URI lastLink = h.getLinkByRelationship("last").getUri();
            Matcher m = PAGE_QUERY_STRING_PARAM_MATCHER.matcher(lastLink.getQuery());
            if (m.matches()) {
                return Integer.parseInt(m.group(1));
            }
        }
        return 0;
    }
}
