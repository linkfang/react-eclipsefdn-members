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
package org.eclipsefoundation.react.api.model;

import javax.json.bind.annotation.JsonbProperty;

public class OrganizationDescription {

    @JsonbProperty("short")
    private String shortDesc;
    private String full;

    public String getShortDesc() {
        return this.shortDesc;
    }

    public void setShortDesc(String shortDesc) {
        this.shortDesc = shortDesc;
    }

    public String getFull() {
        return this.full;
    }

    public void setFull(String full) {
        this.full = full;
    }

}
