import React from 'react';
import Input from '../Inputs/Input';

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