package org.eclipsefoundation.react.service;

import java.util.Optional;
import java.util.function.Supplier;

/**
 * Defines writing, retrieval, and deletion of live images using byte arrays. This does not represent storage of files,
 * but just the live representation of this data for consumption in browsers.
 * 
 * @author Martin Lowe
 */
public interface LiveImageService {

    /**
     * Retrieves image URL, using previously created image when possible, and recreating using provided supplier to
     * retrieve the data for writing otherwise.
     * 
     * @param imageBytes supplier of byte arrays for image contents. This is done to leverage lazy-load from Hibernate
     * to save network traffic when not needed
     * @param organization name of the organization
     * @param mimeType file mime-type of the image
     * @param format the name of the format to retrieve images for
     * @return absolute path to access the live image
     */
    String retrieveImageUrl(Supplier<byte[]> imageBytes, String organization, String mimeType, Optional<String> format);

    /**
     * Writes the image to the services providing system (remote, filesystem, etc.). This should overwrite existing
     * files when present.
     * 
     * @param imageBytes supplier of byte arrays for image contents. This is done to leverage lazy-load from Hibernate
     * to save network traffic when not needed
     * @param organization name of the organization
     * @param mimeType file mime-type of the image
     * @param format the name of the format to write the image for
     * @return absolute path to access the live image
     */
    String writeImage(Supplier<byte[]> imageBytes, String organization, String mimeType, Optional<String> format);

    /**
     * Remove images associated with the given organization. This should clear all images that exist for the
     * organization to make sure that any '' images/data are cleared.
     * 
     * @param organization the organization name for the logo
     * @param format the name of the format to remove images for
     */
    void removeImages(String organization, Optional<String> format);

}
