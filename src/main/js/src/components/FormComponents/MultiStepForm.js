import React, { useState, useEffect } from 'react';
import FormikStepper from './FormikStepper/FormikStepper';
import CompanyInformation from './CompanyInformation/CompanyInformation';
import MembershipLevel from './MembershipLevel/MembershipLevel';
import WorkingGroupsWrapper from './WorkingGroups/WorkingGroupsWrapper';
import SigningAuthority from './SigningAuthority/SigningAuthority';
import Preview from './Preview/Preview';
import { formField, initialValues } from './formModels/formFieldModel';
import { 
  COMPANY_INFORMATION,
  MEMBERSHIP_LEVEL,
  WORKING_GROUPS,
  SIGNING_AUTHORITY,
  REVIEW,
  FETCH_HEADER
} from '../../Constants/Constants';

/**
 * Wrapper for the FormikStepper and FormikStepper's children steps
 * 
 * useEffect() fetch the working group options from `public/workingGroups.json`, and store the option in the session for reusage in WorkingGroup Component; 
 * Use session storage to help reduce the API calls, and has the ability to update the data once the browser closes
 * 
 * **/

const MultiStepForm = () => {

  const [step, setStep] = useState(0);
  const workingGroupsData = JSON.parse(sessionStorage.getItem('workingGroupsData'));
  const [workingGroupsDataState, setWorkingGroupsDataState] = useState(workingGroupsData);

  // Fetch data only once and prefill data, behaves as componentDidMount
  useEffect(() => {
    // Fetch working groups data
    if (!workingGroupsData) {
      fetch('workingGroups.json' , { headers: FETCH_HEADER })
      .then(res=>res.json())
      .then(data => {
        let options = data.working_groups.map(item => ({ label: item.name, value: item.id, participation_levels: item.participation_levels }))
        sessionStorage.setItem('workingGroupsData', JSON.stringify(options));
        setWorkingGroupsDataState(options);
      })
    }

  }, [workingGroupsData])

  const handleSubmit = (values) => {  // This is for final submit, after preview
      console.log(values)
  }
  
  return (
    <>
      <FormikStepper
        initialValues={initialValues}
        onSubmit={handleSubmit}
        step={step}
        setStep={setStep}
      >
        <CompanyInformation
          formField={formField}
          label={COMPANY_INFORMATION}
        />

        <MembershipLevel
          formField={formField}
          label={MEMBERSHIP_LEVEL}
        />

        <WorkingGroupsWrapper
          formField={formField}
          label={WORKING_GROUPS}
          workingGroupsData={workingGroupsDataState}
        />

        <SigningAuthority
          formField={formField}
          label={SIGNING_AUTHORITY}
        />
        
        <Preview formField={formField} label={REVIEW} />

      </FormikStepper>
    </>
  )
};

export default MultiStepForm