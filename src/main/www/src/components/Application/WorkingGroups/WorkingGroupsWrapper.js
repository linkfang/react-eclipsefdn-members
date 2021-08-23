import { useState, useContext, useEffect } from 'react';
import MembershipContext from '../../../Context/MembershipContext';
import WorkingGroup from './WorkingGroup';
import { deleteData, scrollToTop } from '../../../Utils/formFunctionHelpers';
import { END_POINT } from '../../../Constants/Constants';
import CustomStepButton from '../../UIComponents/Button/CustomStepButton';
import { FormikProvider } from 'formik';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
} from '@material-ui/core';
import { initialValues } from '../../UIComponents/FormComponents/formFieldModel';

/**
 * Wrapper for FieldArray of WorkingGroup component,
 * with fetch and prefill data operation
 *
 * Note: FieldArray is from Formik library that add/remove
 * easily in an array of same field inputs,
 * please refer to https://formik.org/docs/api/fieldarray
 *
 *  - Props:
 *    - workingGroupsData: working group options to choose from;
 *
 *    - otherProps: any other props passing down from FormikStepper components, including formik props of formik library (such as "formik.values", "formik.setFieldValue");
 *
 *    - formField: the form field in formModels/formFieldModel.js
 */

const WorkingGroupsWrapper = ({ formik, formikOrgValue, fullWorkingGroupList, workingGroupsUserJoined }) => {
  const { currentFormId } = useContext(MembershipContext);
  const [shouldOpen, setShouldOpen] = useState(false);

  const handleSkipJoiningWG = () => {
    const skipJoiningWG = formik.values.skipJoiningWG;

    if (skipJoiningWG) {
      formik.setFieldValue('skipJoiningWG', !skipJoiningWG);
      formik.setFieldValue('workingGroups', initialValues.workingGroups);
    } else {
      setShouldOpen(true);
    }
  };

  const closeModal = () => {
    setShouldOpen(false);
  };

  const handleClearData = () => {
    // if user uncheck it, then we need to reset WG form
    formik.values.workingGroups.map((item) => {
      deleteData(currentFormId, END_POINT.working_groups, item.id, formik.resetForm, '');
      return null;
    });
    formik.setFieldValue('skipJoiningWG', !formik.values.skipJoiningWG);
    closeModal();
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormikProvider value={formik}>
        <div id="working-groups-page" className="align-center margin-top-50 margin-bottom-30">
          <Dialog
            open={shouldOpen}
            onClose={closeModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{'Skip Joining a Working Group'}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                This will clear all saved data in this step. Proceed to uncheck?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeModal}>Cancel</Button>
              <Button onClick={handleClearData} color="primary" autoFocus>
                Yes
              </Button>
            </DialogActions>
          </Dialog>

          <h1 className="fw-600 h2">Working Group</h1>
          <p>
            Eclipse Foundation hosts a number of industry collaboration initiatives called Working Groups. While not
            required, most Member organizations participate in one or more working groups. See a full list of Eclipse
            Foundation working groups.
          </p>
          <p>
            Please complete the following details for joining a Working Group or you can skip joining a Working Group.
          </p>
          <FormControlLabel
            control={
              <Checkbox
                name="skipJoiningWG"
                color="primary"
                checked={formik.values.skipJoiningWG}
                onChange={() => handleSkipJoiningWG()}
              />
            }
            label="Skip joining a Working Group"
          />
          {!formik.values.skipJoiningWG && (
            <>
              <p className="margin-top-5">Please complete the following details for joining a Working Group</p>

              <WorkingGroup
                formik={formik}
                formikOrgValue={formikOrgValue}
                workingGroupsUserJoined={workingGroupsUserJoined}
                fullWorkingGroupList={fullWorkingGroupList}
              />
            </>
          )}
        </div>
        <CustomStepButton previousPage="/membership-level" nextPage="/signing-authority" pageIndex={3} />
      </FormikProvider>
    </form>
  );
};

export default WorkingGroupsWrapper;
