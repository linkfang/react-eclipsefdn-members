import React from "react";

const CustomStepButton = ({step, isSubmitting, setStep, isLastStep}) => {

  const handleClick = () => {
    setStep((s) => s - 1)
  }

  return (
    <div>
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
          // startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
          disabled={isSubmitting}
          // variant="contained"
          // color="primary"
          className="btn btn-primary float-right"
          type="submit"
        >
          {isSubmitting ? 'Submitting' : isLastStep() ? 'Submit' : 'Next'}
        </button> 
    </div>
  )
};

export default CustomStepButton