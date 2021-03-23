import React from 'react';

/**
 * Button on each step, conduct "Next" or "Back" or "Submit"
 * 
 * props:
 *     - step: step state
 *     - setStep: set step state function
 *     - isSubmitting: boolean, wehther the form is performing submit action; When the form is submitting, you can disable the button or show a spinning, so that the user won't click several times to submit repeatedly
 *     - isLastStep: boolean, whether it's the final step (preview step) or not
 * **/

const CustomStepButton = ({step, isSubmitting, setStep, isLastStep}) => {
  
  const handleClick = () => {
    setStep((s) => s - 1)
  }

  return (
    <>
    <div className="button-container margin-top-20 margin-bottom-20">
      {step > 0 ? (
          <button
            disabled={isSubmitting}
            className="btn btn-primary"
            type="button"
            onClick={handleClick}
          >
            Back
          </button>
      ) : null}
        <button
          disabled={isSubmitting}
          className={`btn ${isLastStep() ? 'btn-secondary' : 'btn-primary' }`}
          type="submit"
        >
          {isSubmitting ? 'Submitting' : isLastStep() ? 'Submit' : 'Next'}
        </button> 
    </div>
    </>
  )
};

export default CustomStepButton