import React, { useContext, useState } from 'react';
import MockFirstStep from './MockFirstStep';
import MultiStepForm from './MultiStepForm';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { initialValues, defineExistingInitialValues_II } from './formModels/formFieldModel';
import MembershipContext from "./MembershipContext";

const FormWrapper = () => {
    const {isExistingMember} = useContext(MembershipContext)
    const [step, setStep] = useState(0)

    const { organiazationData } = useContext(MembershipContext)
    const { contactData } = useContext(MembershipContext)
    const { membershipData } = useContext(MembershipContext)

    return (
        <Router>
        <div className="container">
        <Switch>
          <Route path="/login">
            <MockFirstStep setStep={setStep} />
          </Route>
          <Route path="/form">
          { isExistingMember && <MultiStepForm defineInitialData={defineExistingInitialValues_II(organiazationData, contactData, membershipData)} step={step} setStep={setStep} /> }
          { !isExistingMember && <MultiStepForm defineInitialData={initialValues} step={step} setStep={setStep} /> }
          </Route>
        </Switch>
        </div>
        </Router>
    )
}

export default FormWrapper