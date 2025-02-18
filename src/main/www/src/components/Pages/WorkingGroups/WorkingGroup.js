import React, { useContext, useEffect, useState } from 'react';
import MembershipContext from '../../../Context/MembershipContext';
import WorkingGroupParticipationLevel from './WorkingGroupParticipationLevel';
import WorkingGroupEffectiveDate from './WorkingGroupEffectiveDate';
import WorkingGroupsRepresentative from './WorkingGroupRepresentative';
import { deleteData } from '../../../Utils/formFunctionHelpers';
import {
  end_point,
  FETCH_HEADER,
  WORKING_GROUPS,
  workingGroups as workingGroupsLabel,
} from '../../../Constants/Constants';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles, TextField } from '@material-ui/core';
import { FieldArray } from 'formik';

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

const each_workingGroupField = {
  id: '',
  workingGroup: '',
  participationLevel: '',
  effectiveDate: '',
  workingGroupRepresentative: {
    firstName: '',
    lastName: '',
    jobtitle: '',
    email: '',
    id: '',
  },
};

const useStyles = makeStyles(() => ({
  textField: {
    marginBottom: 14,
    marginTop: 6,
    backgroundColor: 'white',
  },
}));

const WorkingGroup = ({ formik }) => {
  const classes = useStyles();
  const { currentFormId } = useContext(MembershipContext);
  const [workingGroupListData, setWorkingGroupListData] = useState([]); // the working groups data, all available ones

  const removeWorkingGroupCall = (arrayHelpersRemove, index, id) => {
    // Call API to remove
    console.log('you called DELETE method with id: ' + id);
    deleteData(
      currentFormId,
      end_point.working_groups,
      id,
      arrayHelpersRemove,
      index
    );
  };

  const fetchAvailableWorkingGroups = () => {
    fetch('workingGroups.json', { headers: FETCH_HEADER })
      .then((res) => res.json())
      .then((data) => {
        let options = data.working_groups.map((item) => ({
          label: item.name,
          value: item.id,
          participation_levels: item.participation_levels,
        }));
        setWorkingGroupListData(options);
      });
  };

  useEffect(() => {
    fetchAvailableWorkingGroups();
  }, []);

  return (
    <FieldArray
      name={workingGroupsLabel}
      render={(arrayHelpers) => (
        <>
          {formik.values.workingGroups?.length > 0 &&
            formik.values.workingGroups.map((workingGroup, index) => (
              <div key={index}>
                <h2
                  className="h4 fw-600"
                  id={`${formik.values.workingGroups}.${index}.workingGroup`}
                >
                  Which working group would you like to join?{' '}
                  <span className="orange-star">*</span>{' '}
                </h2>
                <Autocomplete
                  id={`${workingGroupsLabel}.${index}.workingGroup`}
                  options={workingGroupListData}
                  getOptionLabel={(option) =>
                    option?.label ? option.label : ''
                  }
                  fullWidth={true}
                  onChange={(ev, value) => {
                    // this is only for display
                    formik.setFieldValue(
                      `${workingGroupsLabel}.${index}.workingGroup-label`,
                      value ? value : null
                    );

                    // this is the data will be actually used
                    formik.setFieldValue(
                      `${workingGroupsLabel}.${index}.workingGroup`,
                      value ? value.value : null
                    );
                  }}
                  value={
                    formik.values.workingGroups[index]['workingGroup-label']
                      ? formik.values.workingGroups[index]['workingGroup-label']
                      : null
                  }
                  renderInput={(params) => {
                    params.inputProps = {
                      ...params.inputProps,
                      'aria-labelledby': `${workingGroupsLabel}.${index}.workingGroup`,
                    };

                    return (
                      <TextField
                        {...params}
                        label={WORKING_GROUPS}
                        placeholder="Select a group"
                        variant="outlined"
                        size="small"
                        required={true}
                        className={classes.textField}
                      />
                    );
                  }}
                />

                {workingGroup.workingGroup && (
                  <>
                    <WorkingGroupParticipationLevel
                      name={`${workingGroupsLabel}.${index}.participationLevel`}
                      index={index}
                      workingGroup={workingGroup.workingGroup}
                      workingGroupListData={workingGroupListData}
                      formik={formik}
                    />
                    <WorkingGroupEffectiveDate
                      name={`${workingGroupsLabel}.${index}.effectiveDate`}
                      index={index}
                      label="Effective Date"
                      formik={formik}
                    />
                    <WorkingGroupsRepresentative
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
                          workingGroupsLabel[index].id
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
