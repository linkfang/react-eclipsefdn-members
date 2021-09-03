import { Button } from '@material-ui/core';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MembershipContext from '../../../Context/MembershipContext';
import { checkIsNotFurthestPage, validateGoBack } from '../../../Utils/formFunctionHelpers';
import ModalWindow from '../Notifications/ModalWindow';

/**
 * Button on each step, conduct "Next" or "Back" or "Submit"
 *
 * props:
 *   - step: step state
 *   - setStep: set step state function
 *   - isSubmitting: boolean, wehther the form is performing submit action; When the form is submitting, you can disable the button or show a spinning, so that the user won't click several times to submit repeatedly
 *   - isLastStep: boolean, whether it's the final step (preview step) or not
 */
const CustomStepButton = ({ previousPage, nextPage, checkIsEmpty, disableSubmit, formik, updatedFormValues }) => {
  const history = useHistory();
  const [shouldOpen, setShouldOpen] = useState(false);
  const { furthestPage, currentStepIndex } = useContext(MembershipContext);

  const handleBackBtnClicked = () => {
    if (nextPage === '/submitted') {
      history.push(previousPage);
      return;
    }
    const isEmpty = checkIsEmpty();
    formik.validateForm().then((result) => {
      validateGoBack(
        isEmpty,
        result,
        formik,
        setShouldOpen,
        () => history.push(previousPage),
        checkIsNotFurthestPage(currentStepIndex, furthestPage.index)
      );
    });
  };

  const handleGoBack = () => {
    setShouldOpen(false);
    formik.setValues(updatedFormValues);
    history.push(previousPage);
  };
  return (
    <div className="button-container margin-top-20 margin-bottom-20">
      <ModalWindow
        title={'Go Back to Previous Step'}
        content={'The form submission for this step is incomplete or has errors. Are you sure you want to leave without saving?'}
        handleProceed={handleGoBack}
        shouldOpen={shouldOpen}
        setShouldOpen={setShouldOpen}
        yesText={'Leave'}
        cancelText={'Keep Editing'}
      />
      {previousPage && (
        <Button variant="contained" color="primary" size="large" onClick={handleBackBtnClicked}>
          Back
        </Button>
      )}

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
