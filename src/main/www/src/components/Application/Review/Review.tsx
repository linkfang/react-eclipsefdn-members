import React, { useEffect } from 'react';
import CustomStepButton from '../../UIComponents/Button/CustomStepButton';
import { FormValue } from '../../../Interfaces/form_interface';
import { scrollToTop } from '../../../Utils/formFunctionHelpers';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import { OPTIONS_FOR_ORG_TYPE, OPTIONS_FOR_PURCHASING_PROCESS } from '../../../Constants/Constants';
import ReadOnlyInput from '../../UIComponents/Inputs/ReadOnlyInput';
import { formField } from '../../UIComponents/FormComponents/formFieldModel';

interface ReviewProps {
  values: FormValue;
  submitForm: () => void;
  isTermChecked: boolean;
  setIsTermChecked: (param: boolean) => void;
}

const Review: React.FC<ReviewProps> = ({ values, submitForm, isTermChecked, setIsTermChecked }) => {
  const handleIsTermChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsTermChecked(event.target.checked);
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        submitForm();
      }}
    >
      <h1 className="fw-600 h2">Review and Submit Your Completed Application</h1>
      <p>
        Please review your completed Membership Application Form. If you would like to make changes to the information,
        please click the back button.
      </p>
      <p>
        Please click <strong>submit</strong> when ready.
      </p>
      <div className="margin-top-30">
        <h2 className="fw-600 h3">Company Information</h2>
        <div className="row">
          <div className="col-md-12">
            <ReadOnlyInput
              value={values.organization.legalName}
              label={formField.organizationName.label}
              required={true}
            />
          </div>
          <div className="col-md-12">
            <ReadOnlyInput
              value={OPTIONS_FOR_ORG_TYPE.find((item) => item.value === values.organization.type)?.label}
              label={formField.organizationType.label}
              required={true}
            />
          </div>
        </div>

        <div className="row margin-top-15">
          <div className="col-md-6">
            <ReadOnlyInput
              value={values.organization.twitterHandle}
              label={formField.organizationTwitter.label}
              required={false}
            />
          </div>
          <div className="col-md-6">
            <ReadOnlyInput
              value={values.organization.revenue}
              label={formField.organizationRevenue.revenue.label}
              required={true}
            />
          </div>
          <div className="col-md-4">
            <ReadOnlyInput
              value={values.organization.employeeCount}
              label={formField.organizationRevenue.employeeCount.label}
              required={true}
            />
          </div>
        </div>

        <h3 className="fw-600 h4 margin-top-20">Address</h3>
        <div className="row margin-bottom-30">
          <div className="col-md-8">
            <ReadOnlyInput
              value={values.organization.address.street}
              label={formField.organizationAddress.street.label}
              required={true}
            />
          </div>
          <div className="col-md-4">
            <ReadOnlyInput
              value={values.organization.address.city}
              label={formField.organizationAddress.city.label}
              required={true}
            />
          </div>
          <div className="col-md-4">
            <ReadOnlyInput
              value={values.organization.address.provinceOrState}
              label={formField.organizationAddress.provinceOrState.label}
              required={false}
            />
          </div>
          <div className="col-md-4">
            <ReadOnlyInput
              value={values.organization.address.country}
              label={formField.organizationAddress.country.label}
              required={true}
            />
          </div>
          <div className="col-md-4">
            <ReadOnlyInput
              value={values.organization.address.postalCode}
              label={formField.organizationAddress.postalCode.label}
              required={false}
            />
          </div>
        </div>

        <h2 className="fw-600 h3">Company Representative Contact</h2>
        <div className="row margin-bottom-30">
          <div className="col-md-6">
            <ReadOnlyInput
              value={values.representative.member.firstName}
              label={formField.companyRep[0].label}
              required={true}
            />
          </div>
          <div className="col-md-6">
            <ReadOnlyInput
              value={values.representative.member.lastName}
              label={formField.companyRep[1].label}
              required={true}
            />
          </div>
          <div className="col-md-6">
            <ReadOnlyInput
              value={values.representative.member.jobtitle}
              label={formField.companyRep[2].label}
              required={true}
            />
          </div>
          <div className="col-md-6">
            <ReadOnlyInput
              value={values.representative.member.email}
              label={formField.companyRep[3].label}
              required={true}
            />
          </div>
        </div>

        <h2 className="fw-600 h3">Company Marketing Contact</h2>
        <div className="row margin-bottom-30">
          <div className="col-md-6">
            <ReadOnlyInput
              value={values.representative.marketing.firstName}
              label={formField.companyRep[0].label}
              required={true}
            />
          </div>
          <div className="col-md-6">
            <ReadOnlyInput
              value={values.representative.marketing.lastName}
              label={formField.companyRep[1].label}
              required={true}
            />
          </div>
          <div className="col-md-6">
            <ReadOnlyInput
              value={values.representative.marketing.jobtitle}
              label={formField.companyRep[2].label}
              required={true}
            />
          </div>
          <div className="col-md-6">
            <ReadOnlyInput
              value={values.representative.marketing.email}
              label={formField.companyRep[3].label}
              required={true}
            />
          </div>
        </div>

        <h2 className="fw-600 h3">Company Accounting Contact</h2>
        <div className="row margin-bottom-30">
          <div className="col-md-6">
            <ReadOnlyInput
              value={values.representative.accounting.firstName}
              label={formField.companyRep[0].label}
              required={true}
            />
          </div>
          <div className="col-md-6">
            <ReadOnlyInput
              value={values.representative.accounting.lastName}
              label={formField.companyRep[1].label}
              required={true}
            />
          </div>
          <div className="col-md-6">
            <ReadOnlyInput
              value={values.representative.accounting.jobtitle}
              label={formField.companyRep[2].label}
              required={true}
            />
          </div>
          <div className="col-md-6">
            <ReadOnlyInput
              value={values.representative.accounting.email}
              label={formField.companyRep[3].label}
              required={true}
            />
          </div>
        </div>

        <h2 className="fw-600 h3">Purchasing Process and VAT</h2>
        <div className="row margin-bottom-30">
          <div className="col-md-8">
            <ReadOnlyInput
              value={
                OPTIONS_FOR_PURCHASING_PROCESS.find((item) => item.value === values.purchasingAndVAT.purchasingProcess)
                  ?.label
              }
              label={formField.purchasingProcess.label}
              required={true}
            />
          </div>

          <div className="col-md-8">
            <ReadOnlyInput
              value={values.purchasingAndVAT.vatNumber}
              label={formField.vatRegistration.vatNumber.label}
              required={false}
            />
          </div>

          <div className="col-md-8">
            <ReadOnlyInput
              value={values.purchasingAndVAT.countryOfRegistration}
              label={formField.vatRegistration.countryOfRegistration.label}
              required={false}
            />
          </div>
        </div>

        <h2 className="fw-600 h3">Intended Membership Level</h2>
        <div className="row margin-bottom-30">
          <div className="col-md-10">
            <ReadOnlyInput value={values.membershipLevel} label={formField.membershipLevel.label} required={true} />
          </div>
        </div>

        <h2 className="fw-600 h3">Working Group{values.workingGroups.length > 1 && 's'} to Join</h2>
        <div className="margin-bottom-40">
          {
            // Check if the user joins at least 1 WG, if so, display all. If not, display 'Not joining'
            values.workingGroups[0].workingGroup.label ? (
              values.workingGroups.map((el, index) => (
                <React.Fragment key={index}>
                  <div className="row">
                    <div className="col-md-8">
                      <ReadOnlyInput
                        value={el['workingGroup']['label']}
                        label={formField.workingGroup.label}
                        required={true}
                      />
                    </div>
                    <div className="col-md-8">
                      <ReadOnlyInput
                        value={el['workingGroup']['label']}
                        label={formField.participationLevel.label}
                        required={true}
                      />
                    </div>
                    <div className="col-md-8">
                      <ReadOnlyInput
                        value={new Date().toLocaleDateString()}
                        label={formField.effectiveDate.label}
                        required={true}
                      />
                    </div>

                    <div className="col-md-24">
                      <p className="h4 fw-600 margin-top-15">The Working Group Representative</p>
                    </div>
                    <div className="col-md-6">
                      <ReadOnlyInput
                        value={el.workingGroupRepresentative.firstName}
                        label={formField.workingGroupRepresentative[0].label}
                        required={true}
                      />
                    </div>
                    <div className="col-md-6">
                      <ReadOnlyInput
                        value={el.workingGroupRepresentative.lastName}
                        label={formField.workingGroupRepresentative[1].label}
                        required={true}
                      />
                    </div>
                    <div className="col-md-6">
                      <ReadOnlyInput
                        value={el.workingGroupRepresentative.jobtitle}
                        label={formField.workingGroupRepresentative[2].label}
                        required={true}
                      />
                    </div>
                    <div className="col-md-6">
                      <ReadOnlyInput
                        value={el.workingGroupRepresentative.email}
                        label={formField.workingGroupRepresentative[3].label}
                        required={true}
                      />
                    </div>
                  </div>
                  <hr className="margin-top-10" />
                </React.Fragment>
              ))
            ) : (
              <p>Not joining</p>
            )
          }
        </div>

        <h2 className="fw-600 h3">Signing Authority</h2>
        <div className="row margin-bottom-30">
          <div className="col-md-6">
            <ReadOnlyInput
              value={values.signingAuthorityRepresentative.firstName}
              label={formField.signingAuthorityRepresentative[0].label}
              required={true}
            />
          </div>
          <div className="col-md-6">
            <ReadOnlyInput
              value={values.signingAuthorityRepresentative.lastName}
              label={formField.signingAuthorityRepresentative[1].label}
              required={true}
            />
          </div>
          <div className="col-md-6">
            <ReadOnlyInput
              value={values.signingAuthorityRepresentative.jobtitle}
              label={formField.signingAuthorityRepresentative[2].label}
              required={true}
            />
          </div>
          <div className="col-md-6">
            <ReadOnlyInput
              value={values.signingAuthorityRepresentative.email}
              label={formField.signingAuthorityRepresentative[3].label}
              required={true}
            />
          </div>
        </div>
      </div>
      <br />
      <p>
        Thank you for completing the Membership Application Form. Before you submit your application, as a new Member,
        you must agree to the following:
      </p>

      <p>1. We will publicly support Eclipse Foundation and its purpose.</p>
      <p>
        2. We will acknowledge our commitment in principle to comply with the Bylawss, the Internal Rules, the Eclipse
        Foundation Antitrust Policy, IP Policy, and any and all additional policies, procedures and other governing
        rules of the Eclipse Foundation.
      </p>
      <p>
        3. We will provide Eclipse Foundation with our logo (or instructions to obtain our logo) in accordance with
        Section 2.3 of the Eclipse Foundation Membership Agreement. When providing our logo, we will be sure to include
        a reference or link to any logo and trademark usage guidelines we have.
        <br />
        Eclipse Membership Coordination team will work with us to complete this after our Membership Application is
        processed.
      </p>

      <FormControlLabel
        control={
          <Checkbox name="term" color="primary" required checked={isTermChecked} onChange={handleIsTermChecked} />
        }
        label={
          <p className="margin-0">
            I have read and agree to the terms above.<span className="orange-star margin-left-5">*</span>
          </p>
        }
      />

      <CustomStepButton previousPage="/signing-authority" nextPage="/submitted" disableSubmit={!isTermChecked} />
    </form>
  );
};

export default Review;
