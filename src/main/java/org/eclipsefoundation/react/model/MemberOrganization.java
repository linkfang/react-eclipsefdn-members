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

public class MemberOrganization {
    private int organizationID;
    private List<MembershipLevel> levels;
    /**
     * @return the organizationID
     */
    public int getOrganizationID() {
        return organizationID;
    }
    /**
     * @param organizationID the organizationID to set
     */
    public void setOrganizationID(int organizationID) {
        this.organizationID = organizationID;
    }
    /**
     * @return the levels
     */
    public List<MembershipLevel> getLevels() {
        return levels;
    }
    /**
     * @param levels the levels to set
     */
    public void setLevels(List<MembershipLevel> levels) {
        this.levels = levels;
    }
    
    
}
