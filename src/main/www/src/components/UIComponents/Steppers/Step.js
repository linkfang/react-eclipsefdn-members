import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

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
  const { index, title, pathName } = props;
  const [isActive, setIsActive] = useState(false);
  return (
    <div className="step">
      <NavLink
        to={pathName}
        isActive={(match) => {
          if (match) setIsActive(true);
          else setIsActive(false);
        }}
      >
        <span className="step-span-index">{index + 2}</span>
        <div className="step-span">
          <div
            className={
              isActive ? 'step-title-container-active' : 'step-title-container'
            }
          >
            <span className="step-title">{title}</span>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default Step;
