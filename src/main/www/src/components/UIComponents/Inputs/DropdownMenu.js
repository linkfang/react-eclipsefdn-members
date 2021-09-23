import { FormControl, FormHelperText, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  formControl: {
    width: '100%',
    marginBottom: 14,
    marginTop: 6,
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
  explanationHelperText,
  error,
  helperText,
}) {
  const classes = useStyles();

  return (
    <FormControl margin="dense" variant="outlined" required={true} className={classes.formControl} error={error}>
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
      {error && <FormHelperText>{helperText}</FormHelperText>}
      {explanationHelperText && <FormHelperText>{explanationHelperText}</FormHelperText>}
    </FormControl>
  );
}
