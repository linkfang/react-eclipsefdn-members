package org.eclipsefoundation.api.model;

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
@JsonIgnoreProperties(ignoreUnknown = true)
public class OrganizationMembership {

    @JsonProperty("composite_id")
    private OrganizationMembershipID compositeId;
    private Date entryDate;
    private Date expiryDate;
    private String comments;
    private boolean issuesPending;
    private int duesTier;
    private String renewalProb;
    private int invoiceMonth;

    /**
     * @return the organizationID
     */
    public OrganizationMembershipID getCompositeId() {
        return compositeId;
    }

    /**
     * @param compositeId the organizationID to set
     */
    public void setCompositeId(OrganizationMembershipID compositeId) {
        this.compositeId = compositeId;
    }

    /**
     * @return the entryDate
     */
    public Date getEntryDate() {
        return entryDate;
    }

    /**
     * @param entryDate the entryDate to set
     */
    public void setEntryDate(Date entryDate) {
        this.entryDate = entryDate;
    }

    /**
     * @return the expiryDate
     */
    public Date getExpiryDate() {
        return expiryDate;
    }

    /**
     * @param expiryDate the expiryDate to set
     */
    public void setExpiryDate(Date expiryDate) {
        this.expiryDate = expiryDate;
    }

    /**
     * @return the comments
     */
    public String getComments() {
        return comments;
    }

    /**
     * @param comments the comments to set
     */
    public void setComments(String comments) {
        this.comments = comments;
    }

    /**
     * @return the issuesPending
     */
    public boolean isIssuesPending() {
        return issuesPending;
    }

    /**
     * @param issuesPending the issuesPending to set
     */
    public void setIssuesPending(boolean issuesPending) {
        this.issuesPending = issuesPending;
    }

    /**
     * @return the duesTier
     */
    public int getDuesTier() {
        return duesTier;
    }

    /**
     * @param duesTier the duesTier to set
     */
    public void setDuesTier(int duesTier) {
        this.duesTier = duesTier;
    }

    /**
     * @return the renewalProb
     */
    public String getRenewalProb() {
        return renewalProb;
    }

    /**
     * @param renewalProb the renewalProb to set
     */
    public void setRenewalProb(String renewalProb) {
        this.renewalProb = renewalProb;
    }

    /**
     * @return the invoiceMonth
     */
    public int getInvoiceMonth() {
        return invoiceMonth;
    }

    /**
     * @param invoiceMonth the invoiceMonth to set
     */
    public void setInvoiceMonth(int invoiceMonth) {
        this.invoiceMonth = invoiceMonth;
    }

    public static class OrganizationMembershipID implements Serializable {
        private static final long serialVersionUID = 1L;

        @JsonProperty("organization_id")
        private Integer organizationID;
        private String relation;

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
         * @return the relation
         */
        public String getRelation() {
            return relation;
        }

        /**
         * @param relation the relation to set
         */
        public void setRelation(String relation) {
            this.relation = relation;
        }

        @Override
        public int hashCode() {
            return Objects.hash(organizationID, relation);
        }

        @Override
        public boolean equals(Object obj) {
            if (this == obj)
                return true;
            if (obj == null)
                return false;
            if (getClass() != obj.getClass())
                return false;
            OrganizationMembershipID other = (OrganizationMembershipID) obj;
            return organizationID == other.organizationID && Objects.equals(relation, other.relation);
        }
    }
}
