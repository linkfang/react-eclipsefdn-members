import React, { useState, useEffect } from "react";
import MembershipContext from "./MembershipContext";

const MembershipProvider = ({ children }) => {

    const [isExistingMember, setIsExistingMember] = useState(false)
    const [allMembershipData, setAllMembershipData] = useState([])
    const [membershipData, setMembershipData] = useState('')
    const [organiazationData, setOrganiazationData] = useState('')
    const [contactData, setContactData] = useState([])

    // useEffect(() => {
        // If has login data, can put here to set if is existing member
    // })

    useEffect(() => {
      fetch('membership_data/membership.json',{
        headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }})
      .then(resp => resp.json())
      .then(data => {
        setAllMembershipData(data)
      })
    }, [])

    return (
        <MembershipContext.Provider value={{
            isExistingMember,
            setIsExistingMember: (val) => setIsExistingMember(val),
            membershipData,
            setMembershipData: (val) => setMembershipData(val),
            organiazationData,
            setOrganiazationData: (val) => setOrganiazationData(val),
            contactData,
            setContactData: (val) => setContactData(val),
            allMembershipData,
            setAllMembershipData: (val) => setAllMembershipData(val),
        }}>
            {children}
        </MembershipContext.Provider>
    )

}

export default MembershipProvider