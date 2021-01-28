import React from 'react';
import { Field, ErrorMessage } from 'formik';

const CustomSelectWrapper = ({ name, srcData, isExistingMember, setDisableInput, organiazationData, renderComponent }) => {

  return (
    <>
    <Field
      name={name}
      component={renderComponent}
      srcData={srcData}
      isExistingMember={isExistingMember}
      setDisableInput={setDisableInput}
      organiazationData={organiazationData}
    />
    <ErrorMessage className="error" component="div" name={name} />
    </>
  )
}

export default CustomSelectWrapper