import React from "react";

const MembershipContext = React.createContext({
    isExistingMember: false,
    setIsExistingMember: () => {},
    membershipData: {},
    setMembershipData: () => {},
    organiazationData: {},
    setOrganiazationData: () => {},
    contactData: [],
    setContactData: () => {},
    allMembershipData: [],
    setAllMembershipData: () => {}
});

export default MembershipContext