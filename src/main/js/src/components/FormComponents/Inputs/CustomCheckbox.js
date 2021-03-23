import React from 'react';
import { Field } from 'formik';

/**
 * A simple reusable checkbox wrapped with Formik Field
 * The value is boolean
 * 
 * Props: 
 *    - name: Field Name
 *    - label: label to be shown with the checkbox
 * **/

const CustomCheckbox = ({ name, label }) => {
  return (
    <Field name={name}>
    {
      ({ field }) => {
        return (
          <>
        <label className="verical-center margin-top-20 margin-bottom-20">
          <input
            {...field}
            id={field.name}
            value={field.value}
            checked={field.value}
            name={field.name}
            type="checkbox"
            aria-checked={field.value}
            aria-label={name}
          />
          <span>{label}</span>
        </label>
          </>
        )
      }
    }
    </Field>
  )
}

export default CustomCheckbox
