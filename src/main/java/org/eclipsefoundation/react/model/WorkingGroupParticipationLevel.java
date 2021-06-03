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

public class WorkingGroupParticipationLevel  {
    private String documentID;
    private String level;
    private String price;
    private int revenueTop;
    private int revenueBottom;
    private Integer companySize;

    public String getDocumentID() {
        return this.documentID;
    }

    public void setDocumentID(String documentID) {
        this.documentID = documentID;
    }

    public String getLevel() {
        return this.level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public String getPrice() {
        return this.price;
    }

    public void setPrice(String price) {
        this.price = price;
    }


    public int getRevenueTop() {
        return this.revenueTop;
    }

    public void setRevenueTop(int revenueTop) {
        this.revenueTop = revenueTop;
    }

    public int getRevenueBottom() {
        return this.revenueBottom;
    }

    public void setRevenueBottom(int revenueBottom) {
        this.revenueBottom = revenueBottom;
    }

    public Integer getCompanySize() {
        return this.companySize;
    }

    public void setCompanySize(Integer companySize) {
        this.companySize = companySize;
    }

}
