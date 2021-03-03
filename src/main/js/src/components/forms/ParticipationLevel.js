import React from "react";
// import { Field } from "formik";
import Select from "./Inputs/Select";

const ParticipationLevel = ({formField, label, participationLevels}) => {

  return (
    <>
      <h4>What is your intended participation level?</h4>
      <Select
        label="Participation Level"
        name="participationLevel"
        options={participationLevels}
      />
    </>
  );
};

export default ParticipationLevel