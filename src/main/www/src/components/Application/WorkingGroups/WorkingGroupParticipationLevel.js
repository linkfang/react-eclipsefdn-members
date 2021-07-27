import { useState, useEffect } from 'react';
import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from '@material-ui/core';

/**
 * Render Participation level selector component (React-Select)
 *
 * - Props:
 *   - name: fieldName (for participation level, an example would be: `workingGroups[i].participationLevel`); this is handled by and passed from WorkingGroup component
 *
 *   - workingGroup: selected working group
 */

const useStyles = makeStyles(() => ({
  textField: {
    marginBottom: 14,
    marginTop: 6,
    backgroundColor: 'white',
  },
  formControl: {
    width: '100%',
  },
  selectField: {
    backgroundColor: 'white',
    '& div:focus': {
      backgroundColor: 'white',
    },
  },
}));

const ParticipationLevel = ({
  name,
  workingGroupUserJoined,
  fullWorkingGroupList,
  formik,
  index,
}) => {
  const classes = useStyles();
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
      const optionsForParticipationLevels = temp?.participation_levels
        ? temp?.participation_levels.map((item) => item.level)
        : [];

      // the Set will deduplicate participation_levels options
      setParticipationLevelOptions([...new Set(optionsForParticipationLevels)]);
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
          <FormControl
            margin="dense"
            variant="outlined"
            required={true}
            className={classes.formControl}
          >
            <InputLabel id="demo-simple-select-outlined-label">
              Select a level
            </InputLabel>
            <Select
              name={name}
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={
                formik.values.workingGroups[theIndex]['participationLevel'] ||
                ''
              }
              onChange={formik.handleChange}
              label="Select a level *"
              className={classes.selectField}
            >
              {participationLevelOptions.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
    </>
  );
};

export default ParticipationLevel;
