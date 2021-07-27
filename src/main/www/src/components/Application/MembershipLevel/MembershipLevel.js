import MembershipLevelFeeTable from './MembershipLevelFeeTable';
import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from '@material-ui/core';
import CustomStepButton from '../../UIComponents/Button/CustomStepButton';
import { formField } from '../../UIComponents/FormComponents/formFieldModel';
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
  formControl: {
    width: '100%',
  },
  selectField: {
    backgroundColor: 'white',
    '& div:focus': {
      backgroundColor: 'white',
    },
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
        <h2 className="fw-600 h4" id={membershipLevel.name}>
          What is your intended Membership Level?
          <span className="orange-star margin-left-5">*</span>
        </h2>
        <div className="row">
          <div className="col-md-12">
            <FormControl
              margin="dense"
              variant="outlined"
              required={true}
              className={classes.formControl}
            >
              <InputLabel id="demo-simple-select-outlined-label">
                Select a level
              </InputLabel>
              <Select
                name={membershipLevel.name}
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={formik.values.membershipLevel || ''}
                onChange={formik.handleChange}
                label="Select a level *"
                className={classes.selectField}
              >
                <MenuItem value={'Strategic Member'}>Strategic Member</MenuItem>
                <MenuItem value={'Contributing Member'}>
                  Contributing Member (formerly referred to as Solutions
                  Members)
                </MenuItem>
                <MenuItem value={'Associate Member'}>Associate Member</MenuItem>
              </Select>
            </FormControl>
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
