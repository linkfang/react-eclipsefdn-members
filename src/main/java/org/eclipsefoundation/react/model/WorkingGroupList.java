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

import java.util.List;
import java.util.Objects;

/**
 * JSON object for importing Working group JSON assets.
 * 
 * @author Martin Lowe <martin.lowe@eclipse-foundation.org>
 */
public class WorkingGroupList {
    private List<WorkingGroup> workingGroups;

    public WorkingGroupList() {
    }

    public WorkingGroupList(List<WorkingGroup> workingGroups) {
        this.workingGroups = workingGroups;
    }

    public List<WorkingGroup> getWorkingGroups() {
        return this.workingGroups;
    }

    public void setWorkingGroups(List<WorkingGroup> workingGroups) {
        this.workingGroups = workingGroups;
    }

    public WorkingGroupList workingGroups(List<WorkingGroup> workingGroups) {
        setWorkingGroups(workingGroups);
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof WorkingGroupList)) {
            return false;
        }
        WorkingGroupList workingGroupList = (WorkingGroupList) o;
        return Objects.equals(workingGroups, workingGroupList.workingGroups);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(workingGroups);
    }

}
