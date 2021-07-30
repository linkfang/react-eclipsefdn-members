import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
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

export default function DropdownMenu({
  inputLabel,
  inputName,
  inputValue,
  optionsArray,
  handleChange,
}) {
  const classes = useStyles();

  return (
    <FormControl
      margin="dense"
      variant="outlined"
      required={true}
      className={classes.formControl}
    >
      <InputLabel>{inputLabel}</InputLabel>
      <Select
        name={inputName}
        value={inputValue || ''}
        onChange={handleChange}
        label={`${inputLabel} *`}
        className={classes.selectField}
      >
        {optionsArray.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
