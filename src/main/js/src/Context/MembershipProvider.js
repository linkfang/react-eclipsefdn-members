import React, { useState } from "react";
import MembershipContext from "./MembershipContext";

const MembershipProvider = ({ children }) => {

    const [isExistingMember, setIsExistingMember] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)
    const [currentFormId, setCurrentFormId] = useState("")

    // useEffect(() => {
        // If has login data, can put here to set if is existing member
    // })

    // useEffect(() => {
    //   fetch('membership_data/fake_user.json',{
    //     headers : {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json'
    //    }})
    //   .then(resp => resp.json())
    //   .then(data => {
    //     setCurrentUser(data);
    //   })
    // }, [])

    return (
        <MembershipContext.Provider value={{
            isExistingMember,
            setIsExistingMember: (val) => setIsExistingMember(val),
            currentUser,
            setCurrentUser: (val) => setCurrentUser(val),
            currentFormId,
            setCurrentFormId: (val) => setCurrentFormId(val)

        }}>
            {children}
        </MembershipContext.Provider>
    )

}

export default MembershipProvider