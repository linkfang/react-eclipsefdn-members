package org.eclipsefoundation.react.response;

import java.io.IOException;
import java.util.List;

import javax.enterprise.inject.Instance;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;
import javax.ws.rs.ext.Provider;

import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Stops redirects from base Quarkus impl unless they are under given paths (based on regex expressions).
 * 
 * @author Martin Lowe
 */
@Provider
public class BlockRedirectResponseFilter implements ContainerResponseFilter {
    public static final Logger LOGGER = LoggerFactory.getLogger(BlockRedirectResponseFilter.class);

    @ConfigProperty(name = "eclipse.http.redirect-block.enabled", defaultValue = "false")
    Instance<Boolean> enabled;
    @ConfigProperty(name = "eclipse.http.redirect-block.patterns")
    Instance<List<String>> ignorePatterns;
    @ConfigProperty(name = "eclipse.http.redirect-block.code", defaultValue = "499")
    Instance<Integer> returnCode;

    @Override
    public void filter(ContainerRequestContext requestContext, ContainerResponseContext responseContext)
            throws IOException {
        // only act on filter data if filter is enabled, is a redirect, and falls under specified paths
        if (Boolean.TRUE.equals(enabled.get()) && Math.floorDiv(responseContext.getStatus(), 100) == 3
                && doesPathMatchIgnorePattern(requestContext.getUriInfo().getPath())) {
            responseContext.setStatus(returnCode.get());
        }
    }

    /**
     * Check path against the available ignore path patterns. If the path matches one of the patterns, then the method
     * will return true, otherwise it will return false.
     * 
     * @param path the URI path to check
     * @return true if the pattern matches an ignore path pattern, otherwise false.
     */
    private boolean doesPathMatchIgnorePattern(String path) {
        return ignorePatterns.stream().anyMatch(list -> list.stream().anyMatch(pattern -> {
            boolean matches = path.matches(pattern);
            if (matches) {
                LOGGER.debug("Found match with pattern '{}' for path '{}'", pattern, path);
            }
            return matches;
        }));
    }
}
