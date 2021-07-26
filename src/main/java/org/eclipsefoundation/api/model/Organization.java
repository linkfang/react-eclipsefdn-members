package org.eclipsefoundation.api.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.eclipsefoundation.persistence.dto.BareNode;
import org.eclipsefoundation.persistence.model.DtoTable;

@Entity
@Table(name = "Organizations")
public class Organization extends BareNode {
	public static final DtoTable TABLE = new DtoTable(Organization.class, "o");
	
	@Id
	private int organizationID;
	private String name1;
	private String name2;
	private String phone;
	private String fax;
	private String comments;
	private Date memberSince;
	@Column(name = "LAT_LONG")
	private String latLong;
	@Column(name = "SCRM_GUID")
	private String scrmGUID;
	@Column(name = "ts")
	private Date ts;
	
	@Override
	public Object getId() {
		return getOrganizationID();
	}

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
	 * @return the name1
	 */
	public String getName1() {
		return name1;
	}

	/**
	 * @param name1 the name1 to set
	 */
	public void setName1(String name1) {
		this.name1 = name1;
	}

	/**
	 * @return the name2
	 */
	public String getName2() {
		return name2;
	}

	/**
	 * @param name2 the name2 to set
	 */
	public void setName2(String name2) {
		this.name2 = name2;
	}

	/**
	 * @return the phone
	 */
	public String getPhone() {
		return phone;
	}

	/**
	 * @param phone the phone to set
	 */
	public void setPhone(String phone) {
		this.phone = phone;
	}

	/**
	 * @return the fax
	 */
	public String getFax() {
		return fax;
	}

	/**
	 * @param fax the fax to set
	 */
	public void setFax(String fax) {
		this.fax = fax;
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
	 * @return the memberSince
	 */
	public Date getMemberSince() {
		return memberSince;
	}

	/**
	 * @param memberSince the memberSince to set
	 */
	public void setMemberSince(Date memberSince) {
		this.memberSince = memberSince;
	}

	/**
	 * @return the latLong
	 */
	public String getLatLong() {
		return latLong;
	}

	/**
	 * @param latLong the latLong to set
	 */
	public void setLatLong(String latLong) {
		this.latLong = latLong;
	}

	/**
	 * @return the scrmGUID
	 */
	public String getScrmGUID() {
		return scrmGUID;
	}

	/**
	 * @param scrmGUID the scrmGUID to set
	 */
	public void setScrmGUID(String scrmGUID) {
		this.scrmGUID = scrmGUID;
	}

	/**
	 * @return the ts
	 */
	public Date getTs() {
		return ts;
	}

	/**
	 * @param ts the ts to set
	 */
	public void setTs(Date ts) {
		this.ts = ts;
	}

}
