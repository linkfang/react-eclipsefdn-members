package org.eclipsefoundation.api.model;

import java.util.Date;

public abstract class ScannedDocument {
    private double version;
    private Date receivedDate;
    private Date expirationDate;
    private String scannedDocumentFileName;
    private String comments;

    /**
     * @return the version
     */
    public double getVersion() {
        return version;
    }

    /**
     * @param version the version to set
     */
    public void setVersion(double version) {
        this.version = version;
    }

    /**
     * @return the receivedDate
     */
    public Date getReceivedDate() {
        return receivedDate;
    }

    /**
     * @param receivedDate the receivedDate to set
     */
    public void setReceivedDate(Date receivedDate) {
        this.receivedDate = receivedDate;
    }

    /**
     * @return the expirationDate
     */
    public Date getExpirationDate() {
        return expirationDate;
    }

    /**
     * @param expirationDate the expirationDate to set
     */
    public void setExpirationDate(Date expirationDate) {
        this.expirationDate = expirationDate;
    }

    /**
     * @return the scannedDocumentFileName
     */
    public String getScannedDocumentFileName() {
        return scannedDocumentFileName;
    }

    /**
     * @param scannedDocumentFileName the scannedDocumentFileName to set
     */
    public void setScannedDocumentFileName(String scannedDocumentFileName) {
        this.scannedDocumentFileName = scannedDocumentFileName;
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

}
