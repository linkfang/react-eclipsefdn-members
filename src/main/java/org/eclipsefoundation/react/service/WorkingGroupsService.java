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

import java.util.List;
import java.util.Map;
import java.util.Set;

import org.eclipsefoundation.react.model.WorkingGroup;

/**
 * Defines a service that will return available working group data, allowing for retrieval by alias name, or the full
 * set.
 * 
 * @author Martin Lowe
 *
 */
public interface WorkingGroupsService {
    public Set<WorkingGroup> get();

    public WorkingGroup getByName(String name);
    
    public Map<String, List<String>> getWGPADocumentIDs();
}
