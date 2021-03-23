import React from "react";

/**
 * User and form Id context shared among the whole App
 * 
 * For more about context, please refer to: https://reactjs.org/docs/context.html
 * 
 * It is simliar to state, but you can export and import anywhere, no need to pass all the way down to the child component 
 * **/

const MembershipContext = React.createContext({
    currentUser: {},
    setCurrentUser: () => {},
    currentFormId: "",
    setCurrentFormId: () => {}
});

export default MembershipContext