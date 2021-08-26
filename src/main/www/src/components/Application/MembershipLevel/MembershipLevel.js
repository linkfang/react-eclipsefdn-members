import MembershipLevelFeeTable from './MembershipLevelFeeTable';
import CustomStepButton from '../../UIComponents/Button/CustomStepButton';
import { formField } from '../../UIComponents/FormComponents/formFieldModel';
import { useEffect } from 'react';
import { scrollToTop } from '../../../Utils/formFunctionHelpers';
import { MEMBERSHIP_LEVELS } from '../../../Constants/Constants';
import DropdownMenu from '../../UIComponents/Inputs/DropdownMenu';

/**
 * Render membership select component (use React-Select), with fetch and prefill data operation
 *
 *  - Props:
 *    -  otherProps: any other props passing down from FormikStepper components, including formik props of formik library (such as "formik.values", "formik.setFieldValue");
 *    - formField: the form field in formModels/formFieldModel.js;
 */

const MembershipLevel = ({ formik }) => {
  const { membershipLevel } = formField;

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <form onSubmit={formik.handleSubmit}>
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

      <CustomStepButton previousPage="/company-info" nextPage="/working-groups" pageIndex={2} />
    </form>
  );
};

export default MembershipLevel;
