import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    marginBottom: 14,
    marginTop: 6,
  },
  input: {
    backgroundColor: 'white',
  },
}));

export default function ReadOnlyInput({ value, label, required }) {
  const classes = useStyles();

  return (
    <TextField
      value={value || 'Not Provided'}
      label={label}
      disabled={!value}
      required={required}
      size="small"
      variant="outlined"
      className={classes.root}
      fullWidth
      InputProps={{
        className: classes.input,
        inputProps: {
          readOnly: true,
          maxLength: 255,
        },
      }}
    />
  );
}
