package org.eclipsefoundation.api.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class OrganizationDocument extends ScannedDocument {

    @JsonProperty("composite_id")
    private OrganizationDocumentID compositeID;
    private Date effectiveDate;
    private Float dues;
    private String currency;
    private String relation;
    private Integer invoiceMonth;

    /**
     * @return the effectiveDate
     */
    public OrganizationDocumentID getCompositeID() {
        return this.compositeID;
    }

    /**
     * @param compositeID the compositeID to set
     */
    public void setCompositeID(OrganizationDocumentID compositeID) {
        this.compositeID = compositeID;
    }

    /**
     * @return the effectiveDate
     */
    public Date getEffectiveDate() {
        return effectiveDate;
    }

    /**
     * @param effectiveDate the effectiveDate to set
     */
    public void setEffectiveDate(Date effectiveDate) {
        this.effectiveDate = effectiveDate;
    }

    /**
     * @return the dues
     */
    public Float getDues() {
        return dues;
    }

    /**
     * @param dues the dues to set
     */
    public void setDues(Float dues) {
        this.dues = dues;
    }

    /**
     * @return the currency
     */
    public String getCurrency() {
        return currency;
    }

    /**
     * @param currency the currency to set
     */
    public void setCurrency(String currency) {
        this.currency = currency;
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

    /**
     * @return the invoiceMonth
     */
    public Integer getInvoiceMonth() {
        return invoiceMonth;
    }

    /**
     * @param invoiceMonth the invoiceMonth to set
     */
    public void setInvoiceMonth(Integer invoiceMonth) {
        this.invoiceMonth = invoiceMonth;
    }

    public static class OrganizationDocumentID {

        @JsonProperty("organization_id")
        private Integer organizationID;
        @JsonProperty("document_id")
        private String documentID;

        /**
         * @return the organizationID
         */
        public Integer getOrganizationID() {
            return organizationID;
        }

        /**
         * @param organizationID the organizationID to set
         */
        public void setOrganizationID(Integer organizationID) {
            this.organizationID = organizationID;
        }

        /**
         * @return the documentID
         */
        public String getDocumentID() {
            return documentID;
        }

        /**
         * @param documentID the documentID to set
         */
        public void setDocumentID(String documentID) {
            this.documentID = documentID;
        }

    }
}
