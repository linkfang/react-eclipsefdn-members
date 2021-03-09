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

const WorkingGroup = ({ formField, workingGroupsData, arrayHelpers }) => {
  const { values } = useFormikContext();
  const { isExistingMember } = useContext(MembershipContext);
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
            isExistingMember={isExistingMember}
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

