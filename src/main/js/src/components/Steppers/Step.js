import React from 'react';
import { getStyles } from './stepHelpers';

/**
 * Props:
 *    - active: boolean; If user is on the step
 *    - completed: boolean; if the step is completed
 *    - index: the index of the step element of the step array
 *    - onClick: the function to be executed when click on the step
 *          **Notes: 
 *                 - for SignIn Component, this is handleSignIn() function 
 *                 - for FormikStepper Component, this is setStep() function 
 *    - stepReached: boolean, if the step has been reached (can be not finished, but the prev step is finished)
 *    - title: step title to be shown
 *    - currentStep: the index of the current step that the user is currently on
 *    - formRef: Passed from FormikStepper. Can use Formik API
 * **/

const Step = (props) => {

  const { active, completed, index, onClick, stepReached, title, currentStep, formRef } = props;
  const styles = getStyles(props);

    const handleClick = async (e) => {
      // If go to the sign in step, 
      // execute handleSignIn() function passed as onClick() prop from StepperComponent
      if (index === -1) {
        onClick();
      }

      // If go to the steps after the current step
      // Need to validate inputs and do submission
      // then if no error, execute setStep() passed from StepperComponent as onClick prop
      if (index > currentStep) {
        if (formRef.current) {
          await formRef.current.submitForm();
          if (Object.keys(formRef.current.errors).length === 0) {
            onClick(index);
          }
        }
      }

      // If go to the steps before the current step
      // Set current step to the step you are going to
      // execute setStep() passed from StepperComponent as onClick prop
      else if(index <= currentStep) {
        onClick(index);
      }

    }

    return (
    <div style={styles.index} className="step" onClick={ (completed || stepReached) ? handleClick : null} >
      <span className="step-span-index">{index + 2}</span>
      <div className="step-span">
        <div className={ active ? "step-title-container-active" : "step-title-container"}>
          <span className="step-title">{title}</span>
        </div>
      </div>
    </div>
    )
}

export default Step