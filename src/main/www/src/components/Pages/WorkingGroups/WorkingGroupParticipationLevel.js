import { useState, useEffect } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles, TextField } from '@material-ui/core';

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
      setParticipationLevelOptions(temp?.participation_levels);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workingGroupUserJoined, fullWorkingGroupList]);

  return (
    <>
      <h3 className="fw-600 margin-top-30 h4" id={name}>
        What is your intended participation level?
        <span className="orange-star margin-left-5">*</span>
      </h3>
      <div className="row">
        <div className="col-md-12">
          <Autocomplete
            options={participationLevelOptions || []}
            getOptionLabel={(option) => (option ? option : '')}
            fullWidth={true}
            onChange={(ev, value) => {
              formik.setFieldValue(name, value ? value : null);
            }}
            value={
              formik.values.workingGroups[theIndex]['participationLevel']
                ? formik.values.workingGroups[theIndex]['participationLevel']
                : null
            }
            renderInput={(params) => {
              params.inputProps = {
                ...params.inputProps,
                'aria-labelledby': name,
              };
              return (
                <TextField
                  {...params}
                  label="Select a level"
                  placeholder="Select a level"
                  variant="outlined"
                  size="small"
                  required={true}
                  className={classes.textField}
                />
              );
            }}
          />
        </div>
      </div>
    </>
  );
};

export default ParticipationLevel;
