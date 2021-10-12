import { Button } from '@material-ui/core';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  ROUTE_MEMBERSHIP,
  ROUTE_REVIEW,
  ROUTE_SIGNING,
  ROUTE_SUBMITTED,
  ROUTE_WGS,
} from '../../../Constants/Constants';
import MembershipContext from '../../../Context/MembershipContext';
import { checkIsNotFurthestPage, focusOnInvalidField, validateGoBack } from '../../../Utils/formFunctionHelpers';
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
const CustomStepButton = ({
  previousPage,
  nextPage,
  checkIsEmpty,
  disableSubmit,
  formik,
  updatedFormValues,
  submitForm,
}) => {
  const history = useHistory();
  const [shouldOpen, setShouldOpen] = useState(false);
  const { furthestPage, setFurthestPage, currentStepIndex } = useContext(MembershipContext);

  const goToNextStep = (pageIndex, nextPage) => {
    if (furthestPage.index <= pageIndex) {
      setFurthestPage({ index: pageIndex + 1, pathName: nextPage });
    }
    history.push(nextPage);
  };

  const handleBackBtnClicked = () => {
    if (nextPage === ROUTE_SUBMITTED) {
      history.push(previousPage);
      return;
    }
    const isEmpty = checkIsEmpty();
    formik.validateForm().then((result) => {
      validateGoBack(
        isEmpty,
        result,
        submitForm,
        formik.setTouched,
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

  const navigate = () => {
    switch (window.location.hash) {
      case '#company-info':
        goToNextStep(1, ROUTE_MEMBERSHIP);
        break;
      case '#membership-level':
        goToNextStep(2, ROUTE_WGS);
        break;
      case '#working-groups':
        goToNextStep(3, ROUTE_SIGNING);
        break;
      case '#signing-authority':
        goToNextStep(4, ROUTE_REVIEW);
        break;
      case '#review':
        goToNextStep(5, ROUTE_SUBMITTED);
        break;
      default:
        break;
    }
  };

  const handleFormSubmit = async () => {
    if (!formik) {
      // Formik is false when it's review page. Should go to next page directly without validation
      navigate();
      return;
    }

    const result = await formik.validateForm();
    if (Object.keys(result).length > 0) {
      formik.setTouched(result);
      focusOnInvalidField();
      return;
    }
    submitForm();
    navigate();
  };
  return (
    <div className="button-container margin-top-20 margin-bottom-20">
      <ModalWindow
        title={'Go Back to Previous Step'}
        content={
          'The form submission for this step is incomplete or has errors. Are you sure you want to leave without saving?'
        }
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
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            disabled={disableSubmit}
            onClick={handleFormSubmit}
          >
            {nextPage === ROUTE_SUBMITTED ? 'Submit' : 'Next'}
          </Button>
        )}
      </MembershipContext.Consumer>
    </div>
  );
};

export default CustomStepButton;
