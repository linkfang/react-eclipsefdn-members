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

import javax.json.bind.annotation.JsonbProperty;

/**
 * Defines a PDF version of a blank participation agreement, as well as the document ID for the document within the
 * Eclipse databases.
 * 
 * @author Martin Lowe
 *
 */
public class WorkingGroupParticipationAgreement {
    @JsonbProperty("document_id")
    private String documentId;
    private String pdf;

    /**
     * @return the documentId
     */
    public String getDocumentId() {
        return documentId;
    }

    /**
     * @param documentId the documentId to set
     */
    public void setDocumentId(String documentId) {
        this.documentId = documentId;
    }

    /**
     * @return the pdf
     */
    public String getPdf() {
        return pdf;
    }

    /**
     * @param pdf the pdf to set
     */
    public void setPdf(String pdf) {
        this.pdf = pdf;
    }

    @Override
    public int hashCode() {
        return Objects.hash(documentId, pdf);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        WorkingGroupParticipationAgreement other = (WorkingGroupParticipationAgreement) obj;
        return Objects.equals(documentId, other.documentId) && Objects.equals(pdf, other.pdf);
    }

}
