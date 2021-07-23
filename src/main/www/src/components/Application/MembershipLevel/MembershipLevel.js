import MembershipLevelFeeTable from './MembershipLevelFeeTable';
import { makeStyles, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CustomStepButton from '../../UIComponents/Button/CustomStepButton';
import { formField } from '../../UIComponents/FormComponents/formFieldModel';
import { MEMBERSHIP_LEVELS } from '../../../Constants/Constants';
import { useEffect } from 'react';
import { scrollToTop } from '../../../Utils/formFunctionHelpers';

/**
 * Render membership select component (use React-Select), with fetch and prefill data operation
 *
 *  - Props:
 *    -  otherProps: any other props passing down from FormikStepper components, including formik props of formik library (such as "formik.values", "formik.setFieldValue");
 *    - formField: the form field in formModels/formFieldModel.js;
 */

const useStyles = makeStyles(() => ({
  textField: {
    marginBottom: 14,
    marginTop: 6,
    backgroundColor: 'white',
  },
}));

const MembershipLevel = ({ formik }) => {
  const { membershipLevel } = formField;
  const classes = useStyles();

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="align-center">
        <h1 className="fw-600 h2">Membership Level</h1>
        <p>
          Please indicate the class of membership for which you are applying
        </p>
        <h2 className="fw-600 h3" id={membershipLevel.name}>
          What is your intended Membership Level?
        </h2>
        <div className="row">
          <div className="col-md-12">
            <Autocomplete
              id={membershipLevel.name}
              options={MEMBERSHIP_LEVELS}
              fullWidth={true}
              getOptionLabel={(option) => (option?.label ? option.label : '')}
              getOptionSelected={(option, value) => {
                return option.value === value.value;
              }}
              onChange={(ev, value) => {
                // this is only for display
                formik.setFieldValue(
                  `${membershipLevel.name}-label`,
                  value ? value : null
                );

                // this is the data will be actually used
                formik.setFieldValue(
                  membershipLevel.name,
                  value ? value.value : null
                );
              }}
              value={
                formik.values['membershipLevel-label']
                  ? formik.values['membershipLevel-label']
                  : null
              }
              renderInput={(params) => {
                params.inputProps = {
                  ...params.inputProps,
                  'aria-labelledby': membershipLevel.name,
                };
                return (
                  <TextField
                    {...params}
                    label="Select a level"
                    placeholder="Select a level"
                    variant="outlined"
                    size="small"
                    required={true}
                    className={classes.textField}
                  />
                );
              }}
            />
          </div>
        </div>
        <MembershipLevelFeeTable />
      </div>

      <CustomStepButton
        previousPage="/company-info"
        nextPage="/working-groups"
        pageIndex={2}
      />
    </form>
  );
};

export default MembershipLevel;
