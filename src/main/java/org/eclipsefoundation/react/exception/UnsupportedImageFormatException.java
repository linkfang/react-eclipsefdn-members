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
package org.eclipsefoundation.react.exception;

/**
 * Exception thrown when a bad image format is passed to be persisted.
 * 
 * @author Martin Lowe
 *
 */
public class UnsupportedImageFormatException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public UnsupportedImageFormatException() {
    }

    public UnsupportedImageFormatException(Throwable t) {
        super(t);
    }

    public UnsupportedImageFormatException(String message) {
        super(message);
    }

    public UnsupportedImageFormatException(String message, Throwable t) {
        super(message, t);
    }
}
