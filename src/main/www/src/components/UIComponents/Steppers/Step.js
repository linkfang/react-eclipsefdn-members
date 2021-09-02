import { useContext, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import MembershipContext from '../../../Context/MembershipContext';
import { isObjectEmpty, validateGoBack } from '../../../Utils/formFunctionHelpers';
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

const Step = ({
  index,
  title,
  pathName,
  formikCompanyInfo,
  formikMembershipLevel,
  formikWorkingGroups,
  formikSigningAuthority,
  updatedFormValues,
}) => {
  const isActive = useRouteMatch(pathName);
  const history = useHistory();
  const [shouldOpen, setShouldOpen] = useState(false);
  const [currentFormik, setCurrentFormik] = useState(formikCompanyInfo);
  const { furthestPage, setFurthestPage } = useContext(MembershipContext);

  const navigateTo = (result, currentIndex, destinatedPath, formik, isEmpty) => {
    if (index < currentIndex) {
      // means go back
      validateGoBack(isEmpty, result, formik, setShouldOpen, () => history.push(pathName), setCurrentFormik);
      return;
    }

    // If validation result is NOT empty, it means something fail to pass validation
    if (Object.keys(result).length > 0) {
      formik.setTouched(result);
      return;
    }

    formik.submitForm();
    furthestPage.index <= currentIndex && setFurthestPage({ index: currentIndex + 1, pathName: destinatedPath });
    history.push(pathName);
  };

  const handleGoBack = () => {
    setShouldOpen(false);
    currentFormik.setValues(updatedFormValues);
    history.push(pathName);
  };

  const handleSubmit = () => {
    let isEmpty = true;
    switch (window.location.hash) {
      case '#company-info':
        isEmpty =
          isObjectEmpty(formikCompanyInfo.values.organization) &&
          isObjectEmpty(formikCompanyInfo.values.representative) &&
          isObjectEmpty(formikCompanyInfo.values.purchasingAndVAT);

        formikCompanyInfo
          .validateForm()
          .then((result) => navigateTo(result, 1, '/membership-level', formikCompanyInfo, isEmpty));
        break;

      case '#membership-level':
        isEmpty = isObjectEmpty(formikMembershipLevel.values.membershipLevel);
        formikMembershipLevel
          .validateForm()
          .then((result) => navigateTo(result, 2, '/working-groups', formikMembershipLevel, isEmpty));
        break;

      case '#working-groups':
        isEmpty = true;
        const workingGroups = formikWorkingGroups.values.workingGroups;
        for (let i = 0; i < workingGroups.length; i++) {
          if (!isObjectEmpty(workingGroups[i])) {
            isEmpty = false;
            break;
          }
        }
        formikWorkingGroups
          .validateForm()
          .then((result) => navigateTo(result, 3, '/signing-authority', formikWorkingGroups, isEmpty));
        break;

      case '#signing-authority':
        isEmpty = isObjectEmpty(formikSigningAuthority.values.signingAuthorityRepresentative);
        formikSigningAuthority
          .validateForm()
          .then((result) => navigateTo(result, 4, '/review', formikSigningAuthority, isEmpty));
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
        content={'You will lose all the new changes in this step without finishing it. Proceed to go back?'}
        handleProceed={handleGoBack}
        shouldOpen={shouldOpen}
        setShouldOpen={setShouldOpen}
      />
      <div className="step" onClick={handleSubmit}>
        <span className="step-span-index">{index + 1}</span>
        <div className="step-span">
          <div className={isActive ? 'step-title-container-active' : 'step-title-container'}>
            <span className="step-title">{title}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Step;
