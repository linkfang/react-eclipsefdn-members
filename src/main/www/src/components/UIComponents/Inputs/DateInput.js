import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
}));

const DateInput = ({ ariaLabel, onChange, name, value }) => {
  const classes = useStyles();

  return (
    <div className="date-input">
      <TextField
        id="date"
        type="date"
        name={name}
        required={true}
        className={classes.root}
        onChange={onChange}
        value={value}
        InputProps={{
          inputProps: {
            'aria-labelledby': ariaLabel,
          },
        }}
      />
    </div>
  );
};

export default DateInput;
