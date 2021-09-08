import { useContext } from 'react';
import MembershipContext from '../../../Context/MembershipContext';
import WorkingGroupParticipationLevel from './WorkingGroupParticipationLevel';
import WorkingGroupsRepresentative from './WorkingGroupRepresentative';
import { deleteData, isProd } from '../../../Utils/formFunctionHelpers';
import {
  END_POINT,
  WORKING_GROUPS,
  workingGroups as workingGroupsLabel,
} from '../../../Constants/Constants';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles, TextField } from '@material-ui/core';
import { FieldArray } from 'formik';
import { initialValues } from '../../UIComponents/FormComponents/formFieldModel';

/**
 * Wrapper for Working Group Selector,
 * Participation Level selector, WorkingGroupEffectiveDate input,
 * and WorkingGroups Representative inputs components
 *
 *  - Props:
 *    - workingGroupsData: working group options to choose from; passed from WorkingGroupsWrapper to here
 *
 *    - arrayHelpers: from Formik library, passed from WorkingGroupsWrapper component, includes all array operations for inputs, please refer to https://formik.org/docs/api/fieldarray#fieldarray-helpers
 *
 *    - formField: the form field in formModels/formFieldModel.js
 */

const each_workingGroupField = initialValues.workingGroups[0];

const useStyles = makeStyles(() => ({
  textField: {
    marginBottom: 14,
    marginTop: 6,
    '& > div': {
      backgroundColor: 'white',
    },
  },
}));

const WorkingGroup = ({ formik, fullWorkingGroupList, formikOrgValue, updatedFormValues, setUpdatedFormValues }) => {
  const classes = useStyles();
  const { currentFormId } = useContext(MembershipContext);

  const removeWorkingGroupCall = (arrayHelpersRemove, index, id) => {
    // Call API to remove
    !isProd && console.log('you called DELETE method with id: ', id);
    deleteData(currentFormId, END_POINT.working_groups, id, arrayHelpersRemove, index);
    const newWGs = updatedFormValues.workingGroups.filter((wg, theIndex) => theIndex !== index);
    setUpdatedFormValues({ ...updatedFormValues, workingGroups: newWGs });
  };

  const updateValidationSchema = (workingGroupsLabel, index) => {
    const allWorkingGroups = fullWorkingGroupList.map((item) => item.label);
    const savedAllWorkingGroups =
      formik.values.workingGroups?.[index]?.['allWorkingGroups'];
    if (
      (!savedAllWorkingGroups || savedAllWorkingGroups.length === 0) &&
      allWorkingGroups.length > 0
    ) {
      // using setTimeout here will avoid a React warning:
      // "Cannot update a component (`Application`) while rendering a different component (`FieldArrayInner`)"
      // with setTimeout, formik.setFieldValue will run after FieldArrayInner finishes rendering
      setTimeout(() => {
        formik.setFieldValue(
          `${workingGroupsLabel}.${index}.allWorkingGroups`,
          allWorkingGroups
        );
      }, 0);
    }
  };

  return (
    <FieldArray
      name={workingGroupsLabel}
      render={(arrayHelpers) => (
        <>
          {formik.values.workingGroups?.length > 0 &&
            formik.values.workingGroups.map((workingGroup, index) => (
              <div key={index}>
                {updateValidationSchema(workingGroupsLabel, index)}
                <h2
                  className="h4 fw-600"
                  id={`${formik.values.workingGroups}.${index}.workingGroup`}
                >
                  Which working group would you like to join?
                  <span className="orange-star">*</span>
                </h2>

                <Autocomplete
                  id={`${workingGroupsLabel}.${index}.workingGroup`}
                  options={fullWorkingGroupList}
                  getOptionLabel={(option) => option?.label || ''}
                  getOptionSelected={(option, value) =>
                    option.value === value.value
                  }
                  getOptionDisabled={(option) => {
                    // getOptionDisabled needs a boolen,
                    // so here we use !! for the result of array.find
                    // selectedWG will be true if the WG is already selected
                    // In this way, all selected WGs will be disabled
                    const selectedWG = !!formik.values.workingGroups.find(
                      (selectedWG) =>
                        selectedWG?.workingGroup?.label === option?.label
                    );
                    return selectedWG;
                  }}
                  fullWidth={true}
                  freeSolo={true}
                  openOnFocus={true}
                  onChange={(ev, value) => {
                    const currentValue = formik.values.workingGroups[index];
                    const updatedValue = {
                      ...currentValue,
                      // this to clear the participation level when user selects another working group
                      participationLevel: '',
                      'workingGroup-label': value?.label || null,
                      workingGroup: value || null,
                    };
                    formik.setFieldValue(
                      `workingGroups.${index}`,
                      updatedValue
                    );
                  }}
                  value={
                    formik.values.workingGroups[index]['workingGroup'] || null
                  }
                  renderInput={(params) => {
                    params.inputProps = {
                      ...params.inputProps,
                      'aria-labelledby': `${workingGroupsLabel}.${index}.workingGroup`,
                    };

                    return (
                      <TextField
                        {...params}
                        onChange={(ev) => {
                          const inputValue = ev.target.value;
                          const wgLabelPropery = `${workingGroupsLabel}.${index}.workingGroup-label`;

                          // if array.find returns a wg obejct, then it means it's already selected
                          const selectedWGValue = formik.values.workingGroups.find(
                            (item) =>
                              item.workingGroup?.label === inputValue && item['workingGroup-label'] === inputValue
                          );

                          // if the wg user types is already selected somewhere else,
                          // then make the validation fail and show error message
                          if (selectedWGValue) {
                            formik.setFieldValue(wgLabelPropery, `${inputValue} already selected`);
                          } else {
                            formik.setFieldValue(wgLabelPropery, inputValue || null);
                          }
                        }}
                        label={WORKING_GROUPS}
                        placeholder="Select a group"
                        variant="outlined"
                        size="small"
                        required={true}
                        className={classes.textField}
                        error={Boolean(
                          formik.touched.workingGroups?.[index]?.['workingGroup'] &&
                            formik.errors.workingGroups?.[index]?.['workingGroup']
                        )}
                        helperText={
                          formik.touched.workingGroups?.[index]?.['workingGroup'] &&
                          formik.errors.workingGroups?.[index]?.['workingGroup']
                        }
                      />
                    );
                  }}
                />

                {workingGroup.workingGroup && (
                  <>
                    <WorkingGroupParticipationLevel
                      name={`${workingGroupsLabel}.${index}.participationLevel`}
                      workingGroupsLabel={workingGroupsLabel}
                      index={index}
                      workingGroupUserJoined={workingGroup.workingGroup}
                      fullWorkingGroupList={fullWorkingGroupList}
                      formik={formik}
                    />
                    <WorkingGroupsRepresentative
                      formikOrgValue={formikOrgValue}
                      name={`${workingGroupsLabel}.${index}.workingGroupRepresentative`}
                      index={index}
                      label="Working Group Representative"
                      formik={formik}
                    />
                  </>
                )}

                {formik.values.workingGroups.length > 1 && (
                  <div className="text-center margin-bottom-20">
                    <button
                      className="btn btn-secondary padding-15"
                      type="button"
                      onClick={() =>
                        removeWorkingGroupCall(
                          arrayHelpers.remove,
                          index,
                          formik.values.workingGroups[index].id
                        )
                      }
                    >
                      Remove this group
                    </button>
                  </div>
                )}
              </div>
            ))}
          <div className="text-center margin-bottom-20">
            <button
              className="btn btn-secondary padding-15"
              type="button"
              onClick={() => arrayHelpers.push(each_workingGroupField)}
            >
              Add another working group
            </button>
          </div>
        </>
      )}
    />
  );
};

export default WorkingGroup;
