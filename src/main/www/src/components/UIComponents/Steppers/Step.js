import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import MembershipContext from '../../../Context/MembershipContext';

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
  submitCompanyInfo,
  submitMembershipLevel,
  submitWorkingGroups,
  submitSigningAuthority,
}) => {
  const isActive = useRouteMatch(pathName);
  const history = useHistory();
  const { furthestPage } = useContext(MembershipContext);
  const handleSubmit = () => {
    // Only call submit func when user can navigate using stepper
    switch (window.location.hash) {
      case '#company-info':
        furthestPage.index > 1 && submitCompanyInfo(true);
        break;
      case '#membership-level':
        furthestPage.index > 2 && submitMembershipLevel(true);
        break;
      case '#working-groups':
        furthestPage.index > 3 && submitWorkingGroups(true);
        break;
      case '#signing-authority':
        furthestPage.index > 4 && submitSigningAuthority(true);
        break;
      default:
        break;
    }
    history.push(pathName);
  };
  return (
    <div className="step" onClick={handleSubmit}>
      <span className="step-span-index">{index + 2}</span>
      <div className="step-span">
        <div className={isActive ? 'step-title-container-active' : 'step-title-container'}>
          <span className="step-title">{title}</span>
        </div>
      </div>
    </div>
  );
};

export default Step;
