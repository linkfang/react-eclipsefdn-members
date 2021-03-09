import React from "react";

const MembershipContext = React.createContext({
    isExistingMember: false,
    setIsExistingMember: () => {},
    currentUser: {},
    setCurrentUser: () => {},
    currentFormId: "",
    setCurrentFormId: () => {}
});

export default MembershipContext