import React from "react";
import { Form } from "formik";
import CustomStepButton from "./CustomStepButton";

const FormComponent = ({ formik, currentChild, step, setStep, isLastStep }) => {


  return (
    <Form>
      {currentChild}
      <CustomStepButton
        values={formik.values}
        step={step}
        isSubmitting={formik.isSubmitting}
        setStep={setStep}
        isLastStep={isLastStep}
      />
    </Form>
  )
}

export default FormComponent