import React from "react";
import Input from './Inputs/Input';

const WorkingGroupRepresentative = ({ formField }) => {

  const {
    wgRepresentative
  } = formField;
  
  return (
    <>
      <h3>Who is the working group representative?</h3>
      <hr />
      { wgRepresentative.map(el => <Input name={el.name} labelName={el.label} placeholder={el.placeholder} key={el.name} />) }
    </>
  );
};

export default WorkingGroupRepresentative