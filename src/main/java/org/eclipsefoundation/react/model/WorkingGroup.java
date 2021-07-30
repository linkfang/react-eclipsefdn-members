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

public class WorkingGroup {

    private String documentID;
    private String name;
    private List<WorkingGroupParticipationLevel> levels;

    public WorkingGroup(String documentID, String name, List<WorkingGroupParticipationLevel> levels) {
        this.documentID = documentID;
        this.name = name;
        this.levels = levels;
    }

    public WorkingGroup() {
    }

    public WorkingGroup(String documentID, String name) {
        this.documentID = documentID;
        this.name = name;
    }

    public String getDocumentID() {
        return this.documentID;
    }

    public void setDocumentID(String documentID) {
        this.documentID = documentID;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<WorkingGroupParticipationLevel> getLevels() {
        return this.levels;
    }

    public void setLevels(List<WorkingGroupParticipationLevel> levels) {
        this.levels = levels;
    }

    public WorkingGroup documentID(String documentID) {
        setDocumentID(documentID);
        return this;
    }

    public WorkingGroup name(String name) {
        setName(name);
        return this;
    }

    public WorkingGroup levels(List<WorkingGroupParticipationLevel> levels) {
        setLevels(levels);
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof WorkingGroup)) {
            return false;
        }
        WorkingGroup workingGroup = (WorkingGroup) o;
        return Objects.equals(documentID, workingGroup.documentID) && Objects.equals(name, workingGroup.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(documentID, name);
    }
}
