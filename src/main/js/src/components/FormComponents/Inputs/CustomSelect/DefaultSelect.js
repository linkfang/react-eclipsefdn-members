import React from 'react';
import Select from 'react-select';
import { selectTheme, generateCustomStyles } from './customSelectStyle';
import { useField } from 'formik';

/**
 * Select used for Membership Level, Participation Level, and working groups
 * 
 * Please refer to https://react-select.com/home for more details how to use React-Select
 * 
 * For more about how to use Formik + React-select, please refer to: 
 * https://gist.github.com/hubgit/e394e9be07d95cd5e774989178139ae8
 * and
 * you can check their github community: https://github.com/formium/formik and https://github.com/JedWatson/react-select
 * 
 * - Props: the same from CustomSelectWrapper.js
 * 
 *  useField(), will allow you to get [field, meta], the current Field Props
 * 
 * For accessbilities, please refer: https://react-select.com/advanced
 * **/

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
      onBlur={props.form.handleBlur(props.field.name)}  // Inherit the handleBlur from formik
      className="margin-bottom-10 form-group"
      styles={generateCustomStyles(false, meta.error)}
      theme={selectTheme}
    />
  )

}

export default DefaultSelect