package org.eclipsefoundation.react.model;

import java.util.Objects;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.json.bind.annotation.JsonbTransient;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.ws.rs.core.MultivaluedMap;

import org.eclipsefoundation.core.namespace.DefaultUrlParameterNames;
import org.eclipsefoundation.persistence.dto.BareNode;
import org.eclipsefoundation.persistence.dto.filter.DtoFilter;
import org.eclipsefoundation.persistence.model.DtoTable;
import org.eclipsefoundation.persistence.model.ParameterizedSQLStatement;
import org.eclipsefoundation.persistence.model.ParameterizedSQLStatementBuilder;
import org.eclipsefoundation.react.namespace.MembershipFormAPIParameterNames;
import org.hibernate.annotations.GenericGenerator;

@Table
@Entity
public class MembershipForm extends BareNode implements TargetedClone<MembershipForm>{
    public static final DtoTable TABLE = new DtoTable(MembershipForm.class, "m");

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    private String id;
    private String userID;
    private String membershipLevel;
    private boolean signingAuthority;

    /** @return the id */
    @Override
    public String getId() {
        return id;
    }

    /** @param id the id to set */
    @JsonbTransient
    public void setId(String id) {
        this.id = id;
    }

    /** @return the userId */
    public String getUserID() {
        return userID;
    }

    /** @param userID the userId to set */
    @JsonbTransient
    public void setUserID(String userID) {
        this.userID = userID;
    }

    /** @return the membershipLevel */
    public String getMembershipLevel() {
        return membershipLevel;
    }

    /** @param membershipLevel the membershipLevel to set */
    public void setMembershipLevel(String membershipLevel) {
        this.membershipLevel = membershipLevel;
    }

    /** @return the signingAuthority */
    public boolean isSigningAuthority() {
        return signingAuthority;
    }

    /** @param signingAuthority the signingAuthority to set */
    public void setSigningAuthority(boolean signingAuthority) {
        this.signingAuthority = signingAuthority;
    }

    @Override
    public MembershipForm cloneTo(MembershipForm target) {
        target.setUserID(getUserID());
        target.setMembershipLevel(getMembershipLevel());
        target.setSigningAuthority(isSigningAuthority());
        return target;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = super.hashCode();
        result = prime * result + Objects.hash(id, membershipLevel, signingAuthority, userID);
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (!super.equals(obj))
            return false;
        if (getClass() != obj.getClass())
            return false;
        MembershipForm other = (MembershipForm) obj;
        return Objects.equals(id, other.id) && Objects.equals(membershipLevel, other.membershipLevel)
                && signingAuthority == other.signingAuthority && Objects.equals(userID, other.userID);
    }

    @Override
    public String toString() {
        StringBuilder builder = new StringBuilder();
        builder.append("MembershipForm [id=");
        builder.append(id);
        builder.append(", userID=");
        builder.append(userID);
        builder.append(", membershipLevel=");
        builder.append(membershipLevel);
        builder.append(", signingAuthority=");
        builder.append(signingAuthority);
        builder.append("]");
        return builder.toString();
    }

    @Singleton
    public static class MembershipFormFilter implements DtoFilter<MembershipForm> {
        @Inject
        ParameterizedSQLStatementBuilder builder;

        @Override
        public ParameterizedSQLStatement getFilters(MultivaluedMap<String, String> params, boolean isRoot) {
            ParameterizedSQLStatement stmt = builder.build(TABLE);
            if (isRoot) {
                // ID check
                String id = params.getFirst(DefaultUrlParameterNames.ID.getName());
                if (id != null) {
                    stmt.addClause(
                            new ParameterizedSQLStatement.Clause(TABLE.getAlias() + ".id = ?", new Object[] { id }));
                }
            }
            // user ID check
            String userId = params.getFirst(MembershipFormAPIParameterNames.USER_ID.getName());
            if (userId != null) {
                stmt.addClause(new ParameterizedSQLStatement.Clause(TABLE.getAlias() + ".userID = ?",
                        new Object[] { userId }));
            }
            return stmt;
        }

        @Override
        public Class<MembershipForm> getType() {
            return MembershipForm.class;
        }
    }
}
