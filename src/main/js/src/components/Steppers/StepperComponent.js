import React from 'react';
import Stepper from './Stepper';
import Step from './Step';

/**
 * - Wrapper for Stepper and Step component
 * 
 *  - Props:
 *    - step: current step you are in, passed from FormikStepper
 * 
 *    - setStep: setStep function passed from MultiStepForm to FormikStepper and to here
 * 
 *    - childrenArray: array of React components, an example here is: [<CompanyInformation>, <MembershipLevel>, <WorkingGroupsWrapper>, <SigningAuthority>], passed from FormikStepper;
 *        ** Note: another example can be passed from <SignIn> component, a fake childrenArray, which is defined in Constants/Constants.js, because the only thing needed is the `label`to show title on the stepper (`title={child.props.label}`)
 * 
 *    - completed: completed steps set, passed from FormikStepper, defined: `const [completed, setCompleted] = useState(new Set())`; 
 * 
 *    - formRef: Formik ref passed from FormikStepper, in order to has access to formik API, so that <Step> component can execute submit / validation action when being clicked on
 * 
 *    - setCurrentFormId: setCurrentFormId Function, passed from FormikStepper, defined in Context
 * **/

const StepperComponent = ({ step, setStep, childrenArray, completed, formRef, setCurrentFormId }) => {

  // Check if the current step is completed
  /**
   * @param step - 
   *          step index, to check if current step is completed, if yes, can click on the step navigation and navigate to the step
   * **/
  function isStepComplete(step) {
    if (completed) {
      return completed.has(step);
    }
  }

  // Check if current step is SignIn step
  // I forced it to be -1, which is passed from SignIn component
  const isSignInPage = () => {
    return step === -1;
  }
  
  // If click on the signIn step, set current form Id to empty, and clear all form states (reset the form)
  const handleSignIn = () => {
      if(setCurrentFormId) {
        setCurrentFormId('');
      }
  }

  return (
      <Stepper>
      {/* Special for Sign In page */}
      <Step
        width={100 / childrenArray.length + 1}
        title="Sign In"
        onClick={handleSignIn}
        active={isSignInPage()}
        index = {-1}
        completed={true}  // Sign In step can be always reachable 
        stepReached={true} // Sign In step can be always reachable 
        formikErrors={formRef?.current?.errors}
        currentStep={step}
        validateForm={formRef?.current?.validateForm}
        formRef={formRef}
      />
      {/* For real form steps */}
      {childrenArray.map((child, index) => {
        return (
          <Step
            key={index}
            width={100 / childrenArray.length + 1}
            title={child.props.label}
            onClick={setStep}
            active={index === step}
            completed={isStepComplete(index)}
            index={index}
            stepReached={isStepComplete(index-1)}  // the current step has been reached, if the prev step is completed
            formikErrors={formRef?.current?.errors}
            currentStep={step}
            validateForm={formRef?.current?.validateForm}
            formRef={formRef}
          />
        )
      })}
    </Stepper>
  )

}

export default StepperComponent