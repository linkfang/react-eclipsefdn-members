import React, { useState, useEffect } from 'react';
import DefaultSelect from '../Inputs/CustomSelect/DefaultSelect';
import CustomSelectWrapper from '../Inputs/CustomSelect/CustomSelectWrapper';

const ParticipationLevel = ({name, workingGroup}) => {
  const workingGroupsData = JSON.parse(sessionStorage.getItem('workingGroupsData'));
  const [participationLevels, setParticipationLevels] = useState([]);

  useEffect(() => {
    if(workingGroupsData) {
      let temp = workingGroupsData?.find(item => workingGroup.value === item.value);
      setParticipationLevels(temp?.participation_levels);
    }
    // eslint-disable-next-line
  }, [workingGroup.value])

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