import React, { useState, useContext } from "react";
import FormikStepper from './forms/FormikStepper';
import CompanyInformation from "./forms/CompanyInformation";
import MembershipLevel from "./forms/MembershipLevel";
import WorkingGroups from "./forms/WorkingGroups";
import SigningAuthority from './forms/SigningAuthority';
import Preview from "./forms/Preview";
import { formField } from './formModels/formFieldModel';
import MembershipContext from "./MembershipContext";

const MultiStepForm = ({ defineInitialData, step, setStep }) => {
  const {isExistingMember} = useContext(MembershipContext)
  const [formDataStates, setFormDataStates] = useState(defineInitialData)
  const [showHidden, setShowHidden] = useState(false)

  const [addMKTRepre, setAddMKTRepre] = useState(false)
  const [addACCRepre, setAddACCRepre] = useState(false)

  const [disableInput, setDisableInput] = useState(false)

  const handleSubmit = (values) => {  // This is for final submit, after preview
      console.log(values)
  }
  
  return (
    <>
      <FormikStepper
        enableReinitialize
        initialValues={formDataStates}
        onSubmit={handleSubmit}
        formDataStates={formDataStates}
        setFormDataStates={setFormDataStates}
        step={step}
        setStep={setStep}
      >
        <CompanyInformation
          formField={formField}
          label="Company Information"
          skipped={isExistingMember ? true : false}
          addMKTRepre={addMKTRepre}
          setAddMKTRepre={setAddMKTRepre}
          addACCRepre={addACCRepre}
          setAddACCRepre={setAddACCRepre}
          disableInput={disableInput}
          setDisableInput={setDisableInput}
        />

        <MembershipLevel
          formField={formField}
          label="Membership Level"
          skipped={isExistingMember ? true : false}
        />

        <WorkingGroups
          formField={formField}
          label="Working Groups"
        />

        <SigningAuthority
          formField={formField}
          showHidden={showHidden}
          setShowHidden={setShowHidden}
          formDataStates={formDataStates}
          label="Signing Authority" 
        />
        
        <Preview formField={formField} previewData={formDataStates} label="Preview" />

      </FormikStepper>
    </>
  )
};

export default MultiStepForm