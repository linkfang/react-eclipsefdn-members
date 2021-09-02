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
package org.eclipsefoundation.react.model;

import java.util.Map;
import java.util.Objects;

/**
 * JSON object for importing Working group JSON assets.
 * 
 * @author Martin Lowe <martin.lowe@eclipse-foundation.org>
 */
public class WorkingGroupMap {
    private Map<String, WorkingGroup> workingGroups;

    public WorkingGroupMap() {
    }

    public WorkingGroupMap(Map<String, WorkingGroup> workingGroups) {
        this.workingGroups = workingGroups;
    }

    public Map<String, WorkingGroup> getWorkingGroups() {
        return this.workingGroups;
    }

    public void setWorkingGroups(Map<String, WorkingGroup> workingGroups) {
        this.workingGroups = workingGroups;
    }

    public WorkingGroupMap workingGroups(Map<String, WorkingGroup> workingGroups) {
        setWorkingGroups(workingGroups);
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof WorkingGroupMap)) {
            return false;
        }
        WorkingGroupMap workingGroupList = (WorkingGroupMap) o;
        return Objects.equals(workingGroups, workingGroupList.workingGroups);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(workingGroups);
    }

}
