import React from 'react';
import Input from '../Inputs/Input';

/**
 * - Render Working Group Representative input component
 * 
 *  - Props:
 *    - name: fieldName (for Effective Date, an example would be: `workingGroups[i].workingGroupRepresentative`); this is handled by and passed from WorkingGroup component
 * 
 *    - formField: the form field in formModels/formFieldModel.js
 * 
 * **/

const WorkingGroupRepresentative = ({ name, formField }) => {

  const { workingGroupRepresentative } = formField;
  
  return (
    <>
      <h3 className="fw-600 h4">Who is the working group representative?<span className="orange-star margin-left-5">*</span></h3>
      <div className="row">
      { workingGroupRepresentative.map(el => 
          <div key={el.name} className="col-md-12">
            <Input name={`${name}.${el.name}`} labelName={el.label} placeholder={el.placeholder} />
          </div>
      ) }
      </div>
    </>
  );
};

export default WorkingGroupRepresentative