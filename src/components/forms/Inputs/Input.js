import React from "react";
import { Field } from "formik";

const Input = ({ name, labelName, placeholder, disableInput }) => {

  return (
    <>
    <label htmlFor={name}>{labelName}</label><br />
    <Field name={name}>
      {({
        field, // { name, value, onChange, onBlur }
        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        meta,
      }) => {
        
        // console.log(field.value)
        return (
        <div>
          <input {...field} className="form-control" type="text" placeholder={placeholder} disabled={disableInput} />
          {meta.touched && meta.error && (
            <div className="error">{meta.error}</div>
          )}
        </div>
      )}}
    </Field>
    </>
  )
}

export default Input