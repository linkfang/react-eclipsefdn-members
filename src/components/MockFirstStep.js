import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import MembershipContext from "./MembershipContext";

const MockFirstStep = ({ setStep }) => {
  const history = useHistory();
  const navigateTo = () => history.push('/form')
  const { setIsExistingMember } = useContext(MembershipContext)
  const { allMembershipData } = useContext(MembershipContext)
  const { setMembershipData } = useContext(MembershipContext)
  const { setOrganiazationData } = useContext(MembershipContext)
  const { setContactData } = useContext(MembershipContext)

  const [currentSelection, setCurrentSelection] = useState("")
  
  const isMember = () => {
    setIsExistingMember(true)
    setMembershipData(allMembershipData.find(el => el.user_id === currentSelection))
    navigateTo()
    setStep(2)
  }

  const newMember = () => {
    setIsExistingMember(false)
    navigateTo()
    setStep(0)
  }

  const selectOnChange = (e) => {
    setCurrentSelection(e.target.value)
    console.log(allMembershipData.find(el => el.user_id === e.target.value))
    let pool = [fetch('membership_data/organizations.json'), fetch('membership_data/contacts.json')]
    Promise.all(pool)
            .then((res) => 
              Promise.all(res.map(r => r.json()))
            )
            .then(data => {
              let form = allMembershipData.find(el => el.user_id === e.target.value)
              setOrganiazationData(data[0].find(el => el.form_id === form?.form_id))
              setContactData(data[1].filter(el => el.form_id === form?.form_id))
            })
  }


  return (
    <>
      <h2> Which user are you? </h2>
      <select value={currentSelection} onChange={selectOnChange}>
        <option value="" label="select one">Select...</option>
      { allMembershipData.map(el => <option value={el.user_id} key={el.user_id} label={el.user_id}></option>)}
      </select>

      <button onClick={isMember}>Yes</button>

      <h2> Click here if you are new </h2>
      <button onClick={newMember}>I'm New</button>

        {/* <a className="btn btn-primary margin-10" href="http://localhost:8090/login">Login</a> */}
    </>
  )
}

export default MockFirstStep