import React from 'react';

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