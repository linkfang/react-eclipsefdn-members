import React from 'react';
import Select from 'react-select';
import { selectTheme, generateCustomStyles } from './customSelectStyle';
import { useField } from 'formik';

const DefaultSelect = (props) => {

  const [, meta] = useField(props.field.name);

  const handleSelect = (option, action) => {

    if (option && action !== 'clear') {
        props.form.setFieldValue(props.field.name, option);
        // If changing the selected working group, reset the participation level value
        if (props.participationLevel && option.value !== props.field.value.value) {
          props.form.setFieldValue(props.participationLevel, '');
        }
    }

    if (action.action === 'clear') {
        props.form.setFieldValue(props.field.name, '');
        // reset the participation level value when clearing the working group select field
        if (props.participationLevel) {
          props.form.setFieldValue(props.participationLevel, '');
        }
    }
  }

  return (
    <Select
      aria-labelledby={props.ariaLabel}
      isClearable
      isSearchable
      options={props.options}
      value={props.field.value || ''}
      onChange={(option, action) => {
        handleSelect(option, action)
      }}
      onBlur={props.form.handleBlur(props.field.name)}
      className="margin-bottom-10 form-group"
      styles={generateCustomStyles(false, meta.error)}
      theme={selectTheme}
    />
  )

}

export default DefaultSelect