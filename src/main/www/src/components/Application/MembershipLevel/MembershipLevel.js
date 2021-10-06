import MembershipLevelFeeTable from './MembershipLevelFeeTable';
import CustomStepButton from '../../UIComponents/Button/CustomStepButton';
import { formField } from '../../UIComponents/FormComponents/formFieldModel';
import { useContext, useEffect } from 'react';
import { isObjectEmpty, scrollToTop } from '../../../Utils/formFunctionHelpers';
import { MEMBERSHIP_LEVELS, ROUTE_COMPANY, ROUTE_WGS } from '../../../Constants/Constants';
import DropdownMenu from '../../UIComponents/Inputs/DropdownMenu';
import MembershipContext from '../../../Context/MembershipContext';

/**
 * Render membership select component (use React-Select), with fetch and prefill data operation
 *
 *  - Props:
 *    -  otherProps: any other props passing down from FormikStepper components, including formik props of formik library (such as "formik.values", "formik.setFieldValue");
 *    - formField: the form field in formModels/formFieldModel.js;
 */

const MembershipLevel = ({ formik, updatedFormValues }) => {
  const { membershipLevel } = formField;
  const { setCurrentStepIndex } = useContext(MembershipContext);

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    setCurrentStepIndex(2);
  }, [setCurrentStepIndex]);

  return (
    <>
      <div className="align-center">
        <h1 className="fw-600 h2">Membership Level</h1>
        <p>
          Please indicate the class of membership for which you are applying. Note that most new members choose
          Contributing.
        </p>
        <h2 className="fw-600 h4" id={membershipLevel.name}>
          What is your intended Membership Level?
          <span className="orange-star margin-left-5">*</span>
        </h2>
        <div className="row">
          <div className="col-md-12">
            <DropdownMenu
              inputLabel="Select a level"
              inputName={membershipLevel.name}
              inputValue={formik.values.membershipLevel}
              optionsArray={MEMBERSHIP_LEVELS}
              handleChange={formik.handleChange}
              error={formik.touched.membershipLevel && Boolean(formik.errors.membershipLevel)}
              helperText={formik.errors.membershipLevel}
            />
          </div>
        </div>
        <MembershipLevelFeeTable />
      </div>

      <CustomStepButton
        previousPage={ROUTE_COMPANY}
        nextPage={ROUTE_WGS}
        checkIsEmpty={() => isObjectEmpty(formik.values.membershipLevel)}
        formik={formik}
        updatedFormValues={updatedFormValues}
        handleSubmit={formik.handleSubmit}
      />
    </>
  );
};

export default MembershipLevel;
