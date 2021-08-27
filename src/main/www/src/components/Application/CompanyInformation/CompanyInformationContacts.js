import Input from '../../UIComponents/Inputs/Input';
import { formField } from '../../UIComponents/FormComponents/formFieldModel';
import { Checkbox, FormControlLabel } from '@material-ui/core';

/**
 * - 

 * **/

/**
 * Render three representatives inputs, include checkbox
 *
 * Props:
 *  - formValues: current form values; passed from
 *      CompanyInformation component;
 *  - formField: the form field in formModels/formFieldModel.js
 *
 * @returns
 */
const Contacts = ({ formik, formikWG }) => {
  // the boolean form value of "is marketing Rep. the same as company Rep.?"
  const isMarketingSameAsCompany =
    formik.values.representative.marketing.sameAsCompany;

  // the boolean form value of "is accounting Rep. the same as company Rep.?"
  const isAccountingSameAsCompany =
    formik.values.representative.accounting.sameAsCompany;
  const { companyRep } = formField;

  /**
   * Generate Representatives Inputs components
   *
   * @param returns
   * @param representativeFields - company, marketing or accounting
   * @param prefix - simply to add it in the key prop, so that each component has a unique key
   * @param disableInput - if marketing / accounting is the same as company Rep., mark the input disabled and just used the same values from company Rep.
   */

  const handleCheckboxChange = (isChecked, fieldName) => {
    const repInfo = isChecked
      ? formik.values.representative.member
      : formik.values.representative[fieldName];

    const newValues = {
      ...repInfo,
      sameAsCompany: isChecked,
      id: formik.values.representative[fieldName].id
    };
    formik.setFieldValue(`representative.${fieldName}`, newValues);
  };

  const handleMemberInputChange = (value, name) => {
    const representativeValue = formik.values.representative;
    const memberRepInfo = {
      ...representativeValue.member,
      [name]: value,
    };

    let newRepresentativeValue = {
      ...representativeValue,
      member: memberRepInfo,
    };

    // update representative.marketing values based on related checkbox
    if (isMarketingSameAsCompany) {
      const newMarketingRepValues = {
        ...memberRepInfo,
        id: representativeValue.marketing.id || '',
        sameAsCompany: isMarketingSameAsCompany,
      };
      newRepresentativeValue = {
        ...newRepresentativeValue,
        marketing: newMarketingRepValues,
      };
    }

    // update representative.accounting values based on related checkbox
    if (isAccountingSameAsCompany) {
      const newAccountingRepValues = {
        ...memberRepInfo,
        id: representativeValue.accounting.id || '',
        sameAsCompany: isAccountingSameAsCompany,
      };
      newRepresentativeValue = {
        ...newRepresentativeValue,
        accounting: newAccountingRepValues,
      };
    }

    formik.setFieldValue('representative', newRepresentativeValue);

    let isWGRepSameAsCompany = false;
    const newWG = formikWG.values.workingGroups.map((wg) => {
      isWGRepSameAsCompany = wg.workingGroupRepresentative?.sameAsCompany || isWGRepSameAsCompany;
      return wg.workingGroupRepresentative?.sameAsCompany
        ? {
            ...wg,
            workingGroupRepresentative: {
              ...memberRepInfo,
              id: wg.workingGroupRepresentative.id || '',
              sameAsCompany: wg.workingGroupRepresentative.sameAsCompany,
            },
          }
        : wg;
    });
    // only call setFieldValue when there is at least 1 wg rep has sameAsCompany: true
    isWGRepSameAsCompany && formikWG.setFieldValue('workingGroups', newWG);
    const isSigningAuthoritySameAsCompany = formik.values.signingAuthorityRepresentative.sameAsCompany;
    
    if (isSigningAuthoritySameAsCompany) {
      const newSigningAuthorityRepValues = {
        ...memberRepInfo,
        id: formik.values.signingAuthorityRepresentative.id || '',
        sameAsCompany: isSigningAuthoritySameAsCompany,
      };
      formik.setFieldValue('signingAuthorityRepresentative', newSigningAuthorityRepValues);
    }
  };

  const generateSingleContact = (el, index, prefix, type, disableInput) => (
    <div key={prefix + index} className="col-md-12">
      <Input
        name={`representative.${type}.${el.name}`}
        labelName={el.label}
        ariaLabel={prefix + el.name}
        placeholder={el.placeholder}
        requiredMark={true}
        disableInput={disableInput}
        onChange={type === 'member' ? (ev) => handleMemberInputChange(ev.target.value, el.name) : formik.handleChange}
        value={formik.values.representative?.[type]?.[el.name]}
        error={
          formik.touched.representative?.[type]?.[el.name] && Boolean(formik.errors.representative?.[type]?.[el.name])
        }
        helperText={formik.errors.representative?.[type]?.[el.name]}
      />
    </div>
  );

  const generateContacts = (representativeFields, prefix, type, disableInput) => (
    <>
      {
        // Create 2 rows to prevent a strange layout issue when validation for firstname fails.
      }
      <div className="row">
        {representativeFields.map(
          (el, index) => index < 2 && generateSingleContact(el, index, prefix, type, disableInput)
        )}
      </div>
      <div className="row">
        {representativeFields.map(
          (el, index) => index > 1 && generateSingleContact(el, index, prefix, type, disableInput)
        )}
      </div>
    </>
  );

  return (
    <>
      <h2 className="fw-600 h4" id="company-rep">
        Company Member Representative
        <span className="orange-star margin-left-5">*</span>
      </h2>
      <p>
        Please indicate the primary point of contact between your organization
        and the Eclipse Foundation. As per the Eclipse Bylaws, the Member
        Representative shall represent your organization in the General
        Assembly, have the right to cast any votes on behalf of your
        organization, and shall have the authority to update information
        provided to Eclipse Foundation.
      </p>
      <p>All formal communications from the Eclipse Foundation will be sent to the Member Representative.</p>
      {generateContacts(companyRep, 'company-rep', 'member', false)}

      <h2 className="fw-600 h4" id="marketing-rep">
        Company Marketing Representative
        <span className="orange-star margin-left-5">*</span>
      </h2>
      <FormControlLabel
        control={
          <Checkbox
            name="representative.marketing.sameAsCompany"
            color="primary"
            checked={formik.values.representative.marketing.sameAsCompany}
            onChange={(ev) =>
              handleCheckboxChange(ev.target.checked, 'marketing')
            }
          />
        }
        label="Same as Member Representative"
      />

      {generateContacts(companyRep, 'marketing-rep', 'marketing', isMarketingSameAsCompany)}

      <h2 className="fw-600 h4" id="accounting-rep">
        Company Accounting Representative
        <span className="orange-star margin-left-5">*</span>
      </h2>
      <FormControlLabel
        control={
          <Checkbox
            name="representative.accounting.sameAsCompany"
            color="primary"
            checked={isAccountingSameAsCompany}
            onChange={(ev) =>
              handleCheckboxChange(ev.target.checked, 'accounting')
            }
          />
        }
        label="Same as Member Representative"
      />

      <div className="margin-bottom-40">
        {generateContacts(companyRep, 'accounting-rep', 'accounting', isAccountingSameAsCompany)}
      </div>
    </>
  );
};

export default Contacts;
