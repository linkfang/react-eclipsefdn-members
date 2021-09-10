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

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * Definition representing data about a working group, including the core information about the group, links to
 * resources for the group, and available participation levels.
 * 
 * @author Martin Lowe
 *
 */
public class WorkingGroup {
    private String alias;
    private String title;
    private String status;
    private String logo;
    private String description;
    private WorkingGroupResources resources;
    private List<WorkingGroupParticipationLevel> levels;

    /**
     * @return the alias
     */
    public String getAlias() {
        return alias;
    }

    /**
     * @param alias the alias to set
     */
    public void setAlias(String alias) {
        this.alias = alias;
    }

    /**
     * @return the title
     */
    public String getTitle() {
        return title;
    }

    /**
     * @param title the title to set
     */
    public void setTitle(String title) {
        this.title = title;
    }

    /**
     * @return the status
     */
    public String getStatus() {
        return status;
    }

    /**
     * @param status the status to set
     */
    public void setStatus(String status) {
        this.status = status;
    }

    /**
     * @return the logo
     */
    public String getLogo() {
        return logo;
    }

    /**
     * @param logo the logo to set
     */
    public void setLogo(String logo) {
        this.logo = logo;
    }

    /**
     * @return the description
     */
    public String getDescription() {
        return description;
    }

    /**
     * @param description the description to set
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * @return the resources
     */
    public WorkingGroupResources getResources() {
        return resources;
    }

    /**
     * @param resources the resources to set
     */
    public void setResources(WorkingGroupResources resources) {
        this.resources = resources;
    }

    public List<WorkingGroupParticipationLevel> getLevels() {
        return new ArrayList<>(this.levels);
    }

    public void setLevels(List<WorkingGroupParticipationLevel> levels) {
        this.levels = new ArrayList<>(levels);
    }

    @Override
    public int hashCode() {
        return Objects.hash(alias, description, levels, logo, resources, status, title);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        WorkingGroup other = (WorkingGroup) obj;
        return Objects.equals(alias, other.alias) && Objects.equals(description, other.description)
                && Objects.equals(levels, other.levels) && Objects.equals(logo, other.logo)
                && Objects.equals(resources, other.resources) && Objects.equals(status, other.status)
                && Objects.equals(title, other.title);
    }

}
