package org.eclipsefoundation.api.model;

import java.io.Serializable;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonProperty;

public class OrganizationContactID implements Serializable {
	private static final long serialVersionUID = 1L;
	@JsonProperty("organization_id")
	private int organizationID;
    @JsonProperty("person_id")
	private String personID;
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
	 * @return the personID
	 */
	public String getPersonID() {
		return personID;
	}

	/**
	 * @param personID the personID to set
	 */
	public void setPersonID(String personID) {
		this.personID = personID;
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
		return Objects.hash(organizationID, personID, relation);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		OrganizationContactID other = (OrganizationContactID) obj;
		return organizationID == other.organizationID && Objects.equals(personID, other.personID)
				&& Objects.equals(relation, other.relation);
	}
}