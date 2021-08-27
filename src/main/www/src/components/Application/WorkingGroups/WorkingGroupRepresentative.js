import Input from '../../UIComponents/Inputs/Input';
import { formField } from '../../UIComponents/FormComponents/formFieldModel';
import { Checkbox, FormControlLabel } from '@material-ui/core';

/**
 * Render Working Group Representative input component
 *
 * - Props:
 *   - name: fieldName (for Effective Date, an example would be: `workingGroups[i].workingGroupRepresentative`); this is handled by and passed from WorkingGroup component
 *
 *   - formField: the form field in formModels/formFieldModel.js
 */
const WorkingGroupRepresentative = ({ name, index, formik, formikOrgValue }) => {
  const { workingGroupRepresentative } = formField;
  const theIndex = index;

  const handleCheckboxChange = (isChecked) => {
    const repInfo = isChecked
      ? formikOrgValue.representative.member
      : formik.values.workingGroups[theIndex].workingGroupRepresentative;

    const newValues = {
      ...repInfo,
      sameAsCompany: isChecked,
      id: formik.values.workingGroups[theIndex].workingGroupRepresentative.id,
    };
    formik.setFieldValue(`workingGroups[${theIndex}].workingGroupRepresentative`, newValues);
  };

  const generateSingleContact = (el) => (
    <div key={el.name} className="col-md-12" id={`${name}.${el.name}`}>
      <Input
        name={`${name}.${el.name}`}
        labelName={el.label}
        placeholder={el.placeholder}
        ariaLabel={`${name} ${name}.${el.name}`}
        onChange={formik.handleChange}
        requiredMark={true}
        disableInput={formik.values.workingGroups[theIndex].workingGroupRepresentative.sameAsCompany}
        value={formik.values.workingGroups[theIndex].workingGroupRepresentative[`${el.name}`]}
        error={
          formik.touched.workingGroups?.[theIndex]?.workingGroupRepresentative?.[`${el.name}`] &&
          Boolean(formik.errors.workingGroups?.[theIndex]?.workingGroupRepresentative?.[`${el.name}`])
        }
        helperText={
          formik.touched.workingGroups?.[theIndex]?.workingGroupRepresentative?.[`${el.name}`] &&
          formik.errors.workingGroups?.[theIndex]?.workingGroupRepresentative?.[`${el.name}`]
        }
      />
    </div>
  );

  return (
    <>
      <h3 className="fw-600 margin-top-30 h4" id={name}>
        Who is to serve as your organization’s Member Representative with the Working Group?
        <span className="orange-star margin-left-5">*</span>
      </h3>
      <FormControlLabel
        control={
          <Checkbox
            name="representative.marketing.sameAsCompany"
            color="primary"
            checked={formik.values.workingGroups[theIndex].workingGroupRepresentative.sameAsCompany}
            onChange={(ev) => handleCheckboxChange(ev.target.checked, 'marketing')}
          />
        }
        label="Same as Member Representative"
      />
      <div className="row">{workingGroupRepresentative.map((el, index) => index < 2 && generateSingleContact(el))}</div>
      <div className="row">{workingGroupRepresentative.map((el, index) => index > 1 && generateSingleContact(el))}</div>
    </>
  );
};

export default WorkingGroupRepresentative;
