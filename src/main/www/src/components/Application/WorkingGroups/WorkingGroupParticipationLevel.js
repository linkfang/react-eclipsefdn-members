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

const ParticipationLevel = ({ name, workingGroupUserJoined, fullWorkingGroupList, formik, index }) => {
  const [participationLevelOptions, setParticipationLevelOptions] = useState([]);
  const [selectedWG, setSelectedWG] = useState();
  const theIndex = index;

  useEffect(() => {
    // If have selected working group, find this working group's
    // participation levels, and pass to the react-select option
    if (fullWorkingGroupList) {
      let selectedWG = fullWorkingGroupList?.find((item) => workingGroupUserJoined.value === item.value);
      setSelectedWG(selectedWG);
      // extract all the participation_levels
      let optionsForParticipationLevels = selectedWG?.participation_levels
        ? selectedWG?.participation_levels.map((item) => item.description)
        : [];

      // the Set will deduplicate participation_levels options
      optionsForParticipationLevels = [...new Set(optionsForParticipationLevels)];

      optionsForParticipationLevels = optionsForParticipationLevels.map((item) => {
        return { value: item, label: item };
      });
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
              inputValue={formik.values.workingGroups[theIndex]['participationLevel']}
              optionsArray={participationLevelOptions}
              handleChange={formik.handleChange}
            />
          )}
        </div>
      </div>
      <p>
        Each Working Group has different participation levels and restrictions on who can join at those levels (e.g.,
        Guest Member level is typically restricted to non-profit organizations). See the{' '}
        <a target="_blank" rel="noreferrer" href={selectedWG?.charter}>
          charter
        </a>{' '}
        for full details on which choice is best for you, and to see the working group fees associated with joining this
        working group. Note: working group fees are in addition to the membership fees associated with joining the
        Eclipse Foundation. Please{' '}
        <a href="mailto:membership.coordination@eclipse-foundation.org">contact our membership team</a> with any
        questions.
      </p>
    </>
  );
};

export default ParticipationLevel;
