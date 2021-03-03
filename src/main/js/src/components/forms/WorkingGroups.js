import React, { useContext } from "react";
import { useFormikContext } from 'formik';
import MembershipContext from "../MembershipContext";
import CustomSelectWrapper from "./Inputs/CustomSelect/CustomSelectWrapper";
import CustomAsyncSelect from "./Inputs/CustomSelect/CustomAsyncSelect";
import ParticipationLevel from './ParticipationLevel';
import EffectiveDate from './EffectiveDate';
import WorkingGroupsRepresentative from './WorkingGroupRepresentative';

const WorkingGroups = ({ formField }) => {
  const { values } = useFormikContext()
  const {isExistingMember} = useContext(MembershipContext)

  return (
    <>
      <h4>Which working group would you like to join? </h4>
      <CustomSelectWrapper
        label="Working Groups"
        name="workingGroup"
        srcData="workingGroups"
        isExistingMember={isExistingMember}
        renderComponent={CustomAsyncSelect}
      />

      { values.workingGroup.value ? 
        <>
          <ParticipationLevel formField={formField} label="Participation Level" participationLevels={values.workingGroup.participation_levels} />
          <EffectiveDate formField={formField} label="Effective Date" />
        </>
        : null
      }
        <WorkingGroupsRepresentative formField={formField} label="Working Group Representative" />
    </>
  );
};

export default WorkingGroups

