import { useState, useEffect } from 'react';
import DropdownMenu from '../../UIComponents/Inputs/DropdownMenu';

/**
 * Render Participation level selector component (React-Select)
 *
 * - Props:
 *   - name: fieldName (for participation level, an example would be: `workingGroups[i].participationLevel`); this is handled by and passed from WorkingGroup component
 *
 *   - workingGroup: selected working group
 */

const ParticipationLevel = ({
  name,
  workingGroupUserJoined,
  fullWorkingGroupList,
  formik,
  index,
}) => {
  const [participationLevelOptions, setParticipationLevelOptions] = useState(
    []
  );

  const theIndex = index;
  useEffect(() => {
    // If have selected working group, find this working group's
    // participation levels, and pass to the react-select option
    if (fullWorkingGroupList) {
      let temp = fullWorkingGroupList?.find(
        (item) => workingGroupUserJoined.value === item.value
      );

      // extract all the participation_levels
      let optionsForParticipationLevels = temp?.participation_levels
        ? temp?.participation_levels.map(
            (item) => item.description || item.level
          )
        : [];

      // the Set will deduplicate participation_levels options
      optionsForParticipationLevels = [
        ...new Set(optionsForParticipationLevels),
      ];

      optionsForParticipationLevels = optionsForParticipationLevels.map(
        (item) => {
          return { value: item, label: item };
        }
      );
      setParticipationLevelOptions(optionsForParticipationLevels);
    }
  }, [workingGroupUserJoined, fullWorkingGroupList]);

  return (
    <>
      <h3 className="fw-600 margin-top-20 h4" id={name}>
        What is your intended participation level?
        <span className="orange-star margin-left-5">*</span>
      </h3>
      <div className="row">
        <div className="col-md-12">
          {participationLevelOptions.length > 0 && (
            <DropdownMenu
              inputLabel="Select a level"
              inputName={name}
              inputValue={
                formik.values.workingGroups[theIndex]['participationLevel']
              }
              optionsArray={participationLevelOptions}
              handleChange={formik.handleChange}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ParticipationLevel;
