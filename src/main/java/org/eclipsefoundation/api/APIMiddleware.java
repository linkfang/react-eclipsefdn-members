package org.eclipsefoundation.api;

import java.io.InputStream;
import java.net.URI;
import java.util.LinkedList;
import java.util.List;
import java.util.function.IntFunction;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.ws.rs.core.Response;

import org.jboss.resteasy.spi.LinkHeader;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Serves as a middleware for the FoundationDB api. This generalizes retrieving multiple pages of data using the Link
 * header rather than manually iterating over the data or using less robust checks (such as no data in response).
 * 
 * @author Martin Lowe
 *
 */
public class APIMiddleware {
    private static final Pattern PAGE_QUERY_STRING_PARAM_MATCHER = Pattern.compile(".*[\\?&]?page=(\\d+).*");

    /**
     * Returns the full list of data for the given API call, using a function that accepts the page number to iterate
     * over the pages of data. The Link header is scraped off of the first request and is used to determine how many
     * calls need to be made to get the full data set.
     * 
     * @param <T> the type of data that is retrieved
     * @param supplier function that accepts a page number and makes an API call for the given page.
     * @param type class for the entity type returned for the response.
     * @return the full list of results for the given endpoint.
     */
    public static <T> List<T> getAll(IntFunction<Response> supplier, Class<T> type) {
        ObjectMapper objectMapper = new ObjectMapper();
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

    private static int getLastPageIndex(Response r) {
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

    private APIMiddleware() {
    }
}
