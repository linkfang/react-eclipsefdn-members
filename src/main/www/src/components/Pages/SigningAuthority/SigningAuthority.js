import React from 'react';
import CustomStepButton from '../../UIComponents/Button/CustomStepButton';
import Input from '../../UIComponents/Inputs/Input';
import { formField } from '../../UIComponents/FormComponents/formFieldModel';
/**
 * Have not added any API calls here,
 * simply use the form fields to render
 * input components for signing Authority Representative
 */

const sectionName = 'signing-authority';
const SigningAuthority = ({ formik }) => {
  const { signingAuthorityRepresentative } = formField;
  console.log(formik.values);
  return (
    <form onSubmit={formik.handleSubmit}>
      <h1 className="fw-600 h2" id={sectionName}>
        Signing Authority
      </h1>
      <p>
        Please Indicate the individual who has the signing authority for the
        agreement
      </p>

      <div className="row">
        {signingAuthorityRepresentative.map((el, index) => (
          <div key={index} className="col-md-12">
            <Input
              name={`signingAuthorityRepresentative.${el.name}`}
              labelName={el.label}
              placeholder={el.placeholder}
              requiredMark={true}
              onChange={formik.handleChange}
              value={formik.values.signingAuthorityRepresentative[`${el.name}`]}
              error={
                formik.touched.signingAuthorityRepresentative?.[`${el.name}`] &&
                Boolean(
                  formik.errors.signingAuthorityRepresentative?.[`${el.name}`]
                )
              }
              helperText={
                formik.touched.signingAuthorityRepresentative?.[`${el.name}`] &&
                formik.errors.signingAuthorityRepresentative?.[`${el.name}`]
              }
            />
          </div>
        ))}
      </div>

      <CustomStepButton
        previousPage="/working-groups"
        nextPage="/review"
        pageIndex={4}
      />
    </form>
  );
};

export default SigningAuthority;
