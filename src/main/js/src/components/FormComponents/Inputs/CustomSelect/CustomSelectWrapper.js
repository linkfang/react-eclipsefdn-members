import React from 'react';
import { Field } from 'formik';

/**
 * Wrapper for Select Field
 * 
 * - Props:
 *    - name: FieldName
 * 
 *    - srcData: to define whether I am using the select for organization, participationLevel, workingGroups, or membershipLevel
 * 
 *    - participationLevel: passed from WorkingGroups/WorkingGroup.js, used to check if the current select has participationLevel associated, need this to reset participationLevel once selecting a different working group
 * 
 *    - renderComponent: the real select component passed to Field to render
 * 
 *    - options: required, to render options
 * 
 *    - ariaLabel: for Accessbilities
 * 
 *    - All the props above will be passing down to <renderComponent />, the real select component that will be rendered
 * 
 * **/

const CustomSelectWrapper = ({ name, srcData, participationLevel, renderComponent, options, ariaLabel }) => {

  return (
    <Field
      name={name}
      component={renderComponent}
      ariaLabel={ariaLabel}
      srcData={srcData}
      participationLevel={participationLevel}
      options={options}
    />
  )
}

export default CustomSelectWrapper