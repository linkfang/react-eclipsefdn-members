package org.eclipsefoundation.react.model;

import java.util.Objects;

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
