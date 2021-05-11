import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    '& div.MuiInputBase-root': {
      fontSize: 14,
    },
  },
}));

const today = new Date().toISOString().substring(0, 10);

const DateInput = (props) => {
  const classes = useStyles();

  return (
    <div className="date-input">
      <TextField
        id="date"
        type="date"
        defaultValue={today}
        className={classes.root}
      />
    </div>
  );
};

export default DateInput;
