import React from 'react';
import Stepper from './Stepper';
import Step from './Step';

const StepperComponent = ({ step, setStep, childrenArray, completed, formRef, setCurrentFormId }) => {

  function isStepComplete(step) {
    if (completed) {
      return completed.has(step);
    }
  }
  const isSignInPage = () => {
    return step === -1;
  }
  
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
        index = {0}
        completed={true}
        stepReached={true}
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
            index={index + 1}
            stepReached={isStepComplete(index-1)}
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