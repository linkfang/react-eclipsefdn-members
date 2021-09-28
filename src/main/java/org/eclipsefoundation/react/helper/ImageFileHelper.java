/**
 * Copyright (c) 2021 Eclipse Foundation
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * Author: Martin Lowe <martin.lowe@eclipse-foundation.org>
 *
 * SPDX-License-Identifier: EPL-2.0
 */
package org.eclipsefoundation.react.helper;

import java.util.Optional;

import org.eclipsefoundation.react.exception.UnsupportedImageFormatException;

/**
 * Helper class when handling Image files and their names.
 * 
 * @author Martin Lowe
 *
 */
public final class ImageFileHelper {
    public static final String SEPARATOR = "-";

    /**
     * Sanitize the organization name to normalize access to image store.
     * 
     * @param name organizations name, pre-normalization
     * @return normalized and sanitized organization name.
     */
    public static String sanitizeFileName(String name, Optional<String> format) {
        if (name == null) {
            return null;
        } else if (format.isPresent()) {
            // also sanitize the format to prevent bad inputs
            return sanitizeString(name).toLowerCase() + SEPARATOR + sanitizeString(format.get()).toLowerCase();
        } else {
            return sanitizeString(name).toLowerCase();
        }
    }

    /**
     * Retrieves a file name for an image given the mime type and organization name.
     * 
     * @param name organizations name, pre-normalization
     * @param mimeType the mime type of the file to be written
     * @return
     */
    public static String getFileNameWithExtension(String name, Optional<String> format, String mimeType) {
        return sanitizeFileName(name, format) + convertMimeType(mimeType);
    }

    /**
     * Converts the mimetype to a file extension. This is only for image formats and does not contain other formats.
     * 
     * @param mime the image mimetype
     * @return the extension corresponding to the mimetype, defaulting to .jpg.
     */
    public static String convertMimeType(String mime) {
        String ext;
        switch (mime) {
            case "image/bmp":
                ext = ".bmp";
                break;
            case "image/gif":
                ext = ".gif";
                break;
            case "image/jpeg":
            case "image/pjpeg":
                ext = ".jpg";
                break;
            case "image/png":
            case "image/x-png":
                ext = ".png";
                break;
            default:
                throw new UnsupportedImageFormatException(
                        String.format("Format %s is not supported currently and will not be accepted", mime));
        }
        return ext;
    }

    /**
     * Centralize calls to clean strings for use in file names.
     * 
     * @param val the string to sanitize
     * @return the sanitized string
     */
    private static String sanitizeString(String val) {
        // replace non-word characters w/ separator character, and remove leading/trailing separators
        return val.replaceAll("[^\\w]+", SEPARATOR).replaceAll(SEPARATOR + "+$", "").replaceAll('^' + SEPARATOR + '+',
                "");
    }

    private ImageFileHelper() {

    }
}
