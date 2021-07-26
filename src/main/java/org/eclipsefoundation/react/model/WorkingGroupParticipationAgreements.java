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

import java.util.Objects;

/**
 * Represents the available participation agreements for a working group
 * 
 * @author Martin Lowe
 *
 */
public class WorkingGroupParticipationAgreements {
    private WorkingGroupParticipationAgreement individual;
    private WorkingGroupParticipationAgreement organization;

    /**
     * @return the individual
     */
    public WorkingGroupParticipationAgreement getIndividual() {
        return individual;
    }

    /**
     * @param individual the individual to set
     */
    public void setIndividual(WorkingGroupParticipationAgreement individual) {
        this.individual = individual;
    }

    /**
     * @return the organization
     */
    public WorkingGroupParticipationAgreement getOrganization() {
        return organization;
    }

    /**
     * @param organization the organization to set
     */
    public void setOrganization(WorkingGroupParticipationAgreement organization) {
        this.organization = organization;
    }

    @Override
    public int hashCode() {
        return Objects.hash(individual, organization);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        WorkingGroupParticipationAgreements other = (WorkingGroupParticipationAgreements) obj;
        return Objects.equals(individual, other.individual) && Objects.equals(organization, other.organization);
    }

}
