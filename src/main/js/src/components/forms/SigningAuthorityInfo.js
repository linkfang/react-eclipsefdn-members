import React from "react";
import Input from './Inputs/Input';

const SigningAuthorityInfo = ({ formField }) => {

  const {
    signingAuthorityRepresentative
    } = formField;
  
  return (
    <>
      <h3>Who should be the signing authority?</h3>
      <hr />
      { signingAuthorityRepresentative.map(el => <Input name={el.name} labelName={el.label} placeholder={el.placeholder} key={el.name} />) }
    </>
    )
}

export default SigningAuthorityInfo