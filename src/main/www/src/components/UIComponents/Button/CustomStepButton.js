import { Button } from '@material-ui/core';
import React from 'react';
import { NavLink } from 'react-router-dom';
import MembershipContext from '../../../Context/MembershipContext';

/**
 * Button on each step, conduct "Next" or "Back" or "Submit"
 *
 * props:
 *   - step: step state
 *   - setStep: set step state function
 *   - isSubmitting: boolean, wehther the form is performing submit action; When the form is submitting, you can disable the button or show a spinning, so that the user won't click several times to submit repeatedly
 *   - isLastStep: boolean, whether it's the final step (preview step) or not
 */
const CustomStepButton = ({ previousPage, nextPage, disableSubmit }) => {
  return (
    <div className="button-container margin-top-20 margin-bottom-20">
      {previousPage ? (
        <NavLink to={previousPage}>
          <Button variant="contained" color="primary" size="large">
            Back
          </Button>
        </NavLink>
      ) : null}

      <MembershipContext.Consumer>
        {() => (
          <Button variant="contained" color="primary" size="large" type="submit" disabled={disableSubmit}>
            {nextPage === '/submitted' ? 'Submit' : 'Next'}
          </Button>
        )}
      </MembershipContext.Consumer>
    </div>
  );
};

export default CustomStepButton;
