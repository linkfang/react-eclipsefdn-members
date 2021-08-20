import React, { useEffect } from 'react';
import CustomStepButton from '../../UIComponents/Button/CustomStepButton';
import { FormValue } from '../../../Interfaces/form_interface';
import { scrollToTop } from '../../../Utils/formFunctionHelpers';
import { FormControlLabel, Checkbox } from '@material-ui/core';

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
      <h1 className="fw-600 h2">Review and Submit your Completed Application</h1>
      <p>
        Please review your completed membership application form. If you would like to make changes to the information,
        please click the back button.
      </p>
      <p>
        Please click <strong>submit</strong> when ready.
      </p>
      <div className="margin-top-30">
        <h2 className="fw-600 h3">Company Information</h2>
        <div className="row">
          <div className="col-md-16">
            <div className="margin-top-25 preview-field">{values.organization.legalName}</div>
          </div>
          <div className="col-md-8">
            <label>twitter</label>
            <div className="preview-field">{values.organization.twitterHandle}</div>
          </div>
        </div>

        <h3 className="fw-600 h4">Address</h3>
        <div className="row margin-bottom-30">
          <div className="col-md-8">
            <label>Street</label>
            <div className="preview-field">{values.organization.address.street}</div>
          </div>
          <div className="col-md-4">
            <label>City</label>
            <div className="preview-field">{values.organization.address.city}</div>
          </div>
          <div className="col-md-4">
            <label>province/State</label>
            <div className="preview-field">{values.organization.address.provinceOrState}</div>
          </div>
          <div className="col-md-4">
            <label>Country</label>
            <div className="preview-field">{values.organization.address.country}</div>
          </div>
          <div className="col-md-4">
            <label>PostalCode</label>
            <div className="preview-field">{values.organization.address.postalCode}</div>
          </div>
        </div>

        <h2 className="fw-600 h3">Company Representative Contact</h2>
        <div className="row margin-bottom-30">
          <div className="col-md-6">
            <label>First Name</label>
            <div className="preview-field">{values.representative.member.firstName}</div>
          </div>
          <div className="col-md-6">
            <label>Last Name</label>
            <div className="preview-field">{values.representative.member.lastName}</div>
          </div>
          <div className="col-md-6">
            <label>Job Title</label>
            <div className="preview-field">{values.representative.member.jobtitle}</div>
          </div>
          <div className="col-md-6">
            <label>Email</label>
            <div className="preview-field">{values.representative.member.email}</div>
          </div>
        </div>

        <h2 className="fw-600 h3">Company Marketing Contact</h2>
        <div className="row margin-bottom-30">
          <div className="col-md-6">
            <label>First Name</label>
            <div className="preview-field">{values.representative.marketing.firstName}</div>
          </div>
          <div className="col-md-6">
            <label>Last Name</label>
            <div className="preview-field">{values.representative.marketing.lastName}</div>
          </div>
          <div className="col-md-6">
            <label>Job Title</label>
            <div className="preview-field">{values.representative.marketing.jobtitle}</div>
          </div>
          <div className="col-md-6">
            <label>Email</label>
            <div className="preview-field">{values.representative.marketing.email}</div>
          </div>
        </div>

        <h2 className="fw-600 h3">Company Accounting Contact</h2>
        <div className="row margin-bottom-30">
          <div className="col-md-6">
            <label>First Name</label>
            <div className="preview-field">{values.representative.accounting.firstName}</div>
          </div>
          <div className="col-md-6">
            <label>Last Name</label>
            <div className="preview-field">{values.representative.accounting.lastName}</div>
          </div>
          <div className="col-md-6">
            <label>Job Title</label>
            <div className="preview-field">{values.representative.accounting.jobtitle}</div>
          </div>
          <div className="col-md-6">
            <label>Email</label>
            <div className="preview-field">{values.representative.accounting.email}</div>
          </div>
        </div>

        <h2 className="fw-600 h3">Purchasing Process and VAT</h2>
        <div className="row margin-bottom-30">
          <div className="col-md-8">
            <label>Require Purchasing Process</label>
            <div className="preview-field">{values.purchasingAndVAT.purchasingProcess}</div>
          </div>

          <div className="col-md-8">
            <label>VAT Number</label>
            <div className="preview-field">{values.purchasingAndVAT.vatNumber}</div>
          </div>

          <div className="col-md-8">
            <label>Country of Registration</label>
            <div className="preview-field">{values.purchasingAndVAT.countryOfRegistration}</div>
          </div>
        </div>

        <h2 className="fw-600 h3">Intended Membership Level</h2>
        <div className="row margin-bottom-30">
          <div className="col-md-10">
            <div className="preview-field">{values.membershipLevel}</div>
          </div>
        </div>

        <h2 className="fw-600 h3">Working Group(s) to Join</h2>
        {
          // Check if the user joins at least 1 WG, if so, display all. If not, display 'Not joining'
          values.workingGroups[0].workingGroup.label ? (
            values.workingGroups.map((el, index) => (
              <React.Fragment key={index}>
                <div className="row margin-bottom-30">
                  <div className="col-md-8">
                    <label>Working group</label>
                    <div className="preview-field">{el['workingGroup']['label']}</div>
                  </div>
                  <div className="col-md-8">
                    <label>Intended Participation Level</label>
                    <div className="preview-field">{el.participationLevel}</div>
                  </div>
                  <div className="col-md-8">
                    <label>Effective Date</label>
                    <div className="preview-field">{new Date().toLocaleDateString()}</div>
                  </div>

                  <div className="col-md-24">
                    <p className="h4 fw-600 margin-top-25">The working Group Representative</p>
                  </div>
                  <div className="col-md-6">
                    <label>First Name</label>
                    <div className="preview-field">{el.workingGroupRepresentative.firstName}</div>
                  </div>
                  <div className="col-md-6">
                    <label>Last Name</label>
                    <div className="preview-field">{el.workingGroupRepresentative.lastName}</div>
                  </div>
                  <div className="col-md-6">
                    <label>Job Title</label>
                    <div className="preview-field">{el.workingGroupRepresentative.jobtitle}</div>
                  </div>
                  <div className="col-md-6">
                    <label>Email</label>
                    <div className="preview-field">{el.workingGroupRepresentative.email}</div>
                  </div>
                </div>
                <hr />
              </React.Fragment>
            ))
          ) : (
            <p>Not joining</p>
          )
        }

        <h2 className="fw-600 h3">Signing Authority</h2>
        <div className="row margin-bottom-30">
          <div className="col-md-6">
            <label>First Name</label>
            <div className="preview-field">{values.signingAuthorityRepresentative.firstName}</div>
          </div>
          <div className="col-md-6">
            <label>Last Name</label>
            <div className="preview-field">{values.signingAuthorityRepresentative.lastName}</div>
          </div>
          <div className="col-md-6">
            <label>Job Title</label>
            <div className="preview-field">{values.signingAuthorityRepresentative.jobtitle}</div>
          </div>
          <div className="col-md-6">
            <label>Email</label>
            <div className="preview-field">{values.signingAuthorityRepresentative.email}</div>
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
