import React, { useContext } from 'react';
import MultiStepForm from '../FormComponents/MultiStepForm';
import MembershipContext from '../../../Context/MembershipContext';
import SignIn from '../../Pages/SignIn/SignIn';

const FormWrapper = () => {
  const { currentUser, currentFormId } = useContext(MembershipContext);
  return (
    <div className="container eclipseFdn-membership-webform">
      {currentUser && currentFormId ? <MultiStepForm /> : <SignIn />}
    </div>
  );
};

export default FormWrapper;
