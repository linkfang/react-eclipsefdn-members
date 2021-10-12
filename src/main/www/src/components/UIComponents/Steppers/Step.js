import { useContext, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { ROUTE_MEMBERSHIP, ROUTE_REVIEW, ROUTE_SIGNING, ROUTE_WGS } from '../../../Constants/Constants';
import MembershipContext from '../../../Context/MembershipContext';
import {
  checkIsNotFurthestPage,
  focusOnInvalidField,
  isObjectEmpty,
  validateGoBack,
} from '../../../Utils/formFunctionHelpers';
import ModalWindow from '../Notifications/ModalWindow';

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

const Step = ({ index, title, pathName, formik, updatedFormValues }) => {
  const isActive = useRouteMatch(pathName);
  const history = useHistory();
  const [shouldOpen, setShouldOpen] = useState(false);
  const { furthestPage, setFurthestPage, currentStepIndex } = useContext(MembershipContext);

  const navigateTo = (result, destinatedPath, submitForm, isEmpty) => {
    if (index < currentStepIndex) {
      // means go back
      validateGoBack(
        isEmpty,
        result,
        submitForm,
        formik.setTouched,
        setShouldOpen,
        () => history.push(pathName),
        checkIsNotFurthestPage(currentStepIndex, furthestPage.index)
      );
      return;
    }

    // If validation result is NOT empty, it means something fail to pass validation
    if (Object.keys(result).length > 0) {
      formik.setTouched(result);
      focusOnInvalidField();
      return;
    }

    submitForm();
    furthestPage.index <= currentStepIndex &&
      setFurthestPage({ index: currentStepIndex + 1, pathName: destinatedPath });
    history.push(pathName);
  };

  const handleGoBack = () => {
    setShouldOpen(false);
    // Reset/roll back formik values
    formik.setValues(updatedFormValues);
    history.push(pathName);
  };

  const handleSubmit = (ev) => {
    let isEmpty = true;
    switch (window.location.hash) {
      case '#company-info':
        isEmpty =
          isObjectEmpty(formik.values.organization) &&
          isObjectEmpty(formik.values.representative) &&
          isObjectEmpty(formik.values.purchasingAndVAT);

        formik.validateForm().then((result) => navigateTo(result, ROUTE_MEMBERSHIP, formik.submitCompanyInfo, isEmpty));
        break;

      case '#membership-level':
        isEmpty = isObjectEmpty(formik.values.membershipLevel);
        formik.validateForm().then((result) => navigateTo(result, ROUTE_WGS, formik.submitMembershipLevel, isEmpty));
        break;

      case '#working-groups':
        isEmpty = true;
        const workingGroups = formik.values.workingGroups;
        for (let i = 0; i < workingGroups.length; i++) {
          if (!isObjectEmpty(workingGroups[i])) {
            isEmpty = false;
            break;
          }
        }
        formik.validateForm().then((result) => navigateTo(result, ROUTE_SIGNING, formik.submitWorkingGroups, isEmpty));
        break;

      case '#signing-authority':
        isEmpty = isObjectEmpty(formik.values.signingAuthorityRepresentative);
        formik
          .validateForm()
          .then((result) => navigateTo(result, ROUTE_REVIEW, formik.submitSigningAuthority, isEmpty));
        break;
      case '#review':
        history.push(pathName);
        break;
      default:
        break;
    }
  };
  return (
    <>
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
      <button className="step" type="submit" onClick={handleSubmit}>
        <span className="step-span-index">{index + 1}</span>
        <div className="step-span">
          <div className={isActive ? 'step-title-container-active' : 'step-title-container'}>
            <span className="step-title">{title}</span>
          </div>
        </div>
      </button>
    </>
  );
};

export default Step;
