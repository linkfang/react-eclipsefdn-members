package org.eclipsefoundation.api.model;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Embeddable;

public class OrganizationContact {

	private OrganizationContactID compositeID;
	private String comments;
	private String title;

	/**
	 * @return the compositeID
	 */
	public OrganizationContactID getCompositeID() {
		return compositeID;
	}

	/**
	 * @param compositeID the compositeID to set
	 */
	public void setCompositeID(OrganizationContactID compositeID) {
		this.compositeID = compositeID;
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
	 * @return the title
	 */
	public String getTitle() {
		return title;
	}

	/**
	 * @param title the title to set
	 */
	public void setTitle(String title) {
		this.title = title;
	}

	@Embeddable
	public static class OrganizationContactID implements Serializable {
		private static final long serialVersionUID = 1L;
		private int organizationID;
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
}
