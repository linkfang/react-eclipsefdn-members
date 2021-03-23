import React, { useState, useEffect } from 'react';
import DefaultSelect from '../Inputs/CustomSelect/DefaultSelect';
import CustomSelectWrapper from '../Inputs/CustomSelect/CustomSelectWrapper';

/**
 * - Render Participation level selector component (React-Select)
 * 
 *  - Props:
 *    - name: fieldName (for participation level, an example would be: `workingGroups[i].participationLevel`); this is handled by and passed from WorkingGroup component
 * 
 *    - workingGroup: selected working group
 * **/

const ParticipationLevel = ({name, workingGroup}) => {
  const workingGroupsData = JSON.parse(sessionStorage.getItem('workingGroupsData'));
  const [participationLevels, setParticipationLevels] = useState([]);

  useEffect(() => {
    // If have selected working group, find this working group's participation levels, and pass to the react-select option
    if(workingGroupsData) {
      let temp = workingGroupsData?.find(item => workingGroup.value === item.value);
      setParticipationLevels(temp?.participation_levels);
    }
  }, [workingGroupsData, workingGroup.value])

  // Need to have {label: foo, value: foo} format for react-select v2 to work properly, please refer to: https://react-select.com/home 
  const renderOptions = (array) => {
    return array?.map(el => ({ label: el, value: el }))
  }

  return (
    <>
      <h3 className="fw-600 margin-top-30 h4" id={name}>What is your intended participation level?<span className="orange-star margin-left-5">*</span></h3>
      <div className="row">
        <div className="col-md-12">
          <CustomSelectWrapper
            name={name}
            renderComponent={DefaultSelect}
            options={renderOptions(participationLevels)}
            ariaLabel={name}
          />
        </div>
      </div>
    </>
  );
};

export default ParticipationLevel