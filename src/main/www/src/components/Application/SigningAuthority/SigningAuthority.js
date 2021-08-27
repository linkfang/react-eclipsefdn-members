import CustomStepButton from '../../UIComponents/Button/CustomStepButton';
import Input from '../../UIComponents/Inputs/Input';
import { formField } from '../../UIComponents/FormComponents/formFieldModel';
import { useEffect } from 'react';
import { scrollToTop } from '../../../Utils/formFunctionHelpers';
import { Checkbox, FormControlLabel } from '@material-ui/core';

/**
 * Have not added any API calls here,
 * simply use the form fields to render
 * input components for signing Authority Representative
 */

const sectionName = 'signing-authority';
const SigningAuthority = ({ formik, formikOrgValue }) => {
  const { signingAuthorityRepresentative } = formField;
  const name = 'signingAuthorityRepresentative';
  const generateSingleContact = (el) => (
    <div key={el.name} className="col-md-12">
      <Input
        name={`${name}.${el.name}`}
        labelName={el.label}
        placeholder={el.placeholder}
        requiredMark={true}
        disableInput={formik.values.signingAuthorityRepresentative.sameAsCompany}
        ariaLabel={`${name}.${el.name}`}
        onChange={formik.handleChange}
        value={formik.values.signingAuthorityRepresentative[`${el.name}`]}
        error={
          formik.touched.signingAuthorityRepresentative?.[`${el.name}`] &&
          Boolean(formik.errors.signingAuthorityRepresentative?.[`${el.name}`])
        }
        helperText={
          formik.touched.signingAuthorityRepresentative?.[`${el.name}`] &&
          formik.errors.signingAuthorityRepresentative?.[`${el.name}`]
        }
      />
    </div>
  );

  const handleCheckboxChange = (isChecked) => {
    const repInfo = isChecked
      ? formikOrgValue.representative.member
      : formik.values.signingAuthorityRepresentative;

    const newValues = {
      ...repInfo,
      sameAsCompany: isChecked,
      id: formik.values.signingAuthorityRepresentative.id,
    };
    formik.setFieldValue('signingAuthorityRepresentative', newValues);
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="align-center">
        <h1 className="fw-600 h2" id={sectionName}>
          Signing Authority
        </h1>
        <p>Please indicate the individual who has the signing authority for the agreement.</p>

        <FormControlLabel
          control={
            <Checkbox
              name="signingAuthorityRepresentative.sameAsCompany"
              color="primary"
              checked={formik.values.signingAuthorityRepresentative.sameAsCompany}
              onChange={(ev) => handleCheckboxChange(ev.target.checked)}
            />
          }
          label="Same as Member Representative"
        />

        <div className="row">
          {signingAuthorityRepresentative.map((el, index) => index < 2 && generateSingleContact(el))}
        </div>
        <div className="row">
          {signingAuthorityRepresentative.map((el, index) => index > 1 && generateSingleContact(el))}
        </div>
      </div>
      <CustomStepButton previousPage="/working-groups" nextPage="/review" />
    </form>
  );
};

export default SigningAuthority;
