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

public class OrganizationLogos {

    @JsonbProperty("small")
    private String compressedLogoUrl;

    @JsonbProperty("full")
    private String fullResolutionLogoUrl;

    public String getCompressedLogoUrl() {
        return this.compressedLogoUrl;
    }

    public void setCompressedLogoUrl(String compressedLogoUrl) {
        this.compressedLogoUrl = compressedLogoUrl;
    }

    public String getFullResolutionLogoUrl() {
        return this.fullResolutionLogoUrl;
    }

    public void setFullResolutionLogoUrl(String fullResolutionLogoUrl) {
        this.fullResolutionLogoUrl = fullResolutionLogoUrl;
    }

}
