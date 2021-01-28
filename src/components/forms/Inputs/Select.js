import React from "react";
import { Field, ErrorMessage } from "formik";

const Select = (props) => {
  const { label, name, options, /*...rest*/ } = props
  return (
    <>
    <label htmlFor={name}>{label}</label>
    <Field name={name}>
      {({
        field, // { name, value, onChange, onBlur }
        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        meta,
      }) => {
        if (name === "membershipLevel") {
          return (
            <select {...field} className="form-control">
              {options.map(option => 
                (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                )
              )}
            </select>
          )
        }

        if (name === "participationLevel") {
          return (
            <select {...field} className="form-control">
              <option value="" key="none">Please select</option>
              {options.map(option => 
                (
                  <option key={option} value={option}>
                    {option}
                  </option>
                )
              )}
            </select>
          )
        }
        return (
          <></>
        )
      }}
    </Field>
      {/* <Field as='select' id={name} name={name} {...rest}>
        {options.map(option => {
          return (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          )
        })}
      </Field> */}
      <ErrorMessage className="error" component="div" name={name} />
    </>
  )
}

export default Select