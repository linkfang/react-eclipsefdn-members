import React, { useContext } from 'react';
import { useFormikContext } from 'formik';
import MembershipContext from '../../../Context/MembershipContext';
import CustomSelectWrapper from '../Inputs/CustomSelect/CustomSelectWrapper';
import ParticipationLevel from './ParticipationLevel';
import EffectiveDate from './EffectiveDate';
import WorkingGroupsRepresentative from './WorkingGroupRepresentative';
import { deleteData } from '../../../Utils/formFunctionHelpers';
import { end_point, WORKING_GROUPS, workingGroups } from '../../../Constants/Constants';
import DefaultSelect from '../Inputs/CustomSelect/DefaultSelect';

/**
 * - Wrapper for Working Group Selector, Participation Level selector, EffectiveDate input, and WorkingGroups Representative inputs components
 * 
 *  - Props:
 *    - workingGroupsData: working group options to choose from; passed from MultiStepForm component to WorkingGroupsWrapper and to here
 * 
 *    - arrayHelpers: from Formik library, passed from WorkingGroupsWrapper component, includes all array operations for inputs, please refer to https://formik.org/docs/api/fieldarray#fieldarray-helpers 
 * 
 *    - formField: the form field in formModels/formFieldModel.js
 * **/

const WorkingGroup = ({ formField, workingGroupsData, arrayHelpers }) => {
  const { values } = useFormikContext();
  const { currentFormId } = useContext(MembershipContext);

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
        id: ''
      }
  }

  const removeWorkingGroupCall = (arrayHelpersRemove, index, id) => {

    // Call API to remove
    console.log('you called DELETE method with id: ' + id);
    deleteData(currentFormId, end_point.working_groups, id, arrayHelpersRemove, index);
  }

  return (
    <>
      { values.workingGroups && values.workingGroups.length > 0 && values.workingGroups.map((workingGroup, index) => (
        <div key={index}>
          <h2 className="h4 fw-600" id={`${workingGroups}.${index}.workingGroup`}>Which working group would you like to join? <span className="orange-star">*</span> </h2>
          <CustomSelectWrapper
            label={WORKING_GROUPS}
            name={`${workingGroups}.${index}.workingGroup`}
            participationLevel={`${workingGroups}.${index}.participationLevel`}
            srcData={workingGroups}
            options={workingGroupsData}
            renderComponent={DefaultSelect}
            ariaLabel={`${workingGroups}.${index}.workingGroup`}
          />

          { workingGroup.workingGroup && workingGroup.workingGroup.value !== "" ? 
            <>
              <ParticipationLevel name={`${workingGroups}.${index}.participationLevel`} workingGroup={workingGroup.workingGroup} />
              <EffectiveDate name={`${workingGroups}.${index}.effectiveDate`} label="Effective Date" />
              <WorkingGroupsRepresentative name={`${workingGroups}.${index}.workingGroupRepresentative`} formField={formField} label="Working Group Representative" />
            </>
            : null
          }
            { values.workingGroups.length > 1 &&
            <div className="text-center margin-bottom-20">
              <button className="btn btn-secondary padding-15" type="button" onClick={() => removeWorkingGroupCall(arrayHelpers.remove, index, values.workingGroups[index].id)}>
                Remove this group
              </button>
            </div>
            }
        </div>
      )) }
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

  );
};

export default WorkingGroup

