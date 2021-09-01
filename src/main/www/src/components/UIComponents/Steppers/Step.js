import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import MembershipContext from '../../../Context/MembershipContext';
import { isObjectEmpty } from '../../../Utils/formFunctionHelpers';

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
}) => {
  const isActive = useRouteMatch(pathName);
  const history = useHistory();
  const { furthestPage, setFurthestPage } = useContext(MembershipContext);

  const navigateTo = (result, currentIndex, destinatedPath, formik) => {
    // If validation result is NOT empty, it means something fail to pass validation
    if (Object.keys(result).length > 0) {
      formik.setTouched(result);
      return;
    }
    // Only call submit func when user can navigate using stepper
    furthestPage.index >= currentIndex && formik.submitForm(true);
    furthestPage.index <= currentIndex && setFurthestPage({ index: currentIndex + 1, pathName: destinatedPath });
    history.push(pathName);
  };

  const handleSubmit = () => {
    switch (window.location.hash) {
      case '#company-info':
        // const a = isObjectEmpty(formikCompanyInfo.values.organization);
        console.log(formikCompanyInfo.values)
        // const a = isObjectEmpty(formikCompanyInfo.values.representative);
        const a = isObjectEmpty(formikCompanyInfo.values.purchasingAndVAT);

        console.log('is empty: ', a);

        // formikCompanyInfo.validate().then((result) => navigateTo(result, 1, '/membership-level', formikCompanyInfo));
        break;
      case '#membership-level':
        formikMembershipLevel
          .validate()
          .then((result) => navigateTo(result, 2, '/working-groups', formikMembershipLevel));
        break;
      case '#working-groups':
        formikWorkingGroups
          .validate()
          .then((result) => navigateTo(result, 3, '/signing-authority', formikWorkingGroups));
        break;
      case '#signing-authority':
        formikSigningAuthority.validate().then((result) => navigateTo(result, 4, '/review', formikSigningAuthority));
        break;
      case '#review':
        history.push(pathName);
        break;
      default:
        break;
    }
  };
  return (
    <div className="step" onClick={handleSubmit}>
      <span className="step-span-index">{index + 1}</span>
      <div className="step-span">
        <div className={isActive ? 'step-title-container-active' : 'step-title-container'}>
          <span className="step-title">{title}</span>
        </div>
      </div>
    </div>
  );
};

export default Step;
