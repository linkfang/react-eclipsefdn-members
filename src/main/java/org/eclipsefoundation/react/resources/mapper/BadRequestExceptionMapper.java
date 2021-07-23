/*
 * Copyright (C) 2019 Eclipse Foundation and others.
 * 
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 * 
 * SPDX-License-Identifier: EPL-2.0
*/
package org.eclipsefoundation.react.resources.mapper;

import javax.ws.rs.BadRequestException;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import org.eclipsefoundation.core.model.Error;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 
 * @author Martin Lowe
 */
@Provider
public class BadRequestExceptionMapper implements ExceptionMapper<BadRequestException> {
	private static final Logger LOGGER = LoggerFactory.getLogger(BadRequestExceptionMapper.class);

	@Override
	public Response toResponse(BadRequestException exception) {
		LOGGER.error(exception.getMessage(), exception);
		return new Error(Status.BAD_REQUEST, "Could not process the given request: " + exception.getMessage()).asResponse();
	}
}
