import React from "react";
import { Field } from 'formik';
import SigningAuthorityInfo from './SigningAuthorityInfo';

const SigningAuthority = ({ formField, showHidden, setShowHidden, formDataStates }) => {

  // const { 
  //   signingAuthority
  // } = formField

  // console.log("ischanging?" + formDataStates.signingAuthority)

  const handleOnChange = (val) => {
    if (val === "haveSigningAuthority") {
        setShowHidden(false)
    }
    if (val === "noSigningAuthority") {
        setShowHidden(true)
    }
  }

  return (
    <>
    <h3>Do you have the authority to sign legal agreements on behalf of your organization?</h3>
    <Field name="signingAuthority">
    {
      ({
        field, // { name, value, onChange, onBlur }
        form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        meta,
      }) => {
        return (
          <>
            <div className="radio-item">
              <input
                {...field}
                id="haveSigningAuthority"
                value="haveSigningAuthority"
                checked={field.value === 'haveSigningAuthority'}
                name="signingAuthority"
                type="radio"
                onChange={changeEvent => {
                    form.setFieldValue(field.name, changeEvent.target.value);
                    handleOnChange(changeEvent.target.value);
                  }}
              />
              <label htmlFor="haveSigningAuthority">Yes</label>
            </div>
            <div className="radio-item">
              <input
                {...field}
                id="noSigningAuthority"
                value="noSigningAuthority"
                name="signingAuthority"
                checked={field.value === 'noSigningAuthority'}
                type="radio"
                onChange={changeEvent => {
                    form.setFieldValue(field.name, changeEvent.target.value);
                    handleOnChange(changeEvent.target.value);
                  }}
              />
              <label htmlFor="noSigningAuthority">No</label>
            </div>
            {meta.touched && meta.error && (
              <div className="error">{meta.error}</div>
            )}
          </>
        )
      }

    }
    </Field>

    { showHidden && <SigningAuthorityInfo formField={formField} /> }
    </>
  )

}

export default SigningAuthority