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
package org.eclipsefoundation.react.service;

import java.util.Set;

import org.eclipsefoundation.react.model.WorkingGroup;

public interface WorkingGroupsService {
    public Set<WorkingGroup> get();

    public WorkingGroup getByName(String name);
}
