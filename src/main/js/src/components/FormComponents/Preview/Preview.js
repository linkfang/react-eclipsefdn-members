import React from 'react';
import { useFormikContext } from 'formik'

const Preview = () => {

  const { values } = useFormikContext();

  return (
    <>
      <h1 className="fw-600 h2">Review and Submit your Completed Application</h1>
      <p>Please review your completed membership application form. If you would like to make changes to the information, please click the back button.</p>
      <p>Please click <strong>submit</strong> when ready.</p>
      <div className="margin-top-30">
        <h2 className="fw-600 h3">Company Information</h2>
        <div className="row">
          <div className="col-md-16"><div className="margin-top-25 preview-field">{values.organization.legalName.label}</div></div>
          <div className="col-md-8"><label>twitter</label><div className="preview-field">{values.organization.twitterHandle}</div></div>
        </div>

        <h3 className="fw-600 h4">Address</h3>
        <div className="row margin-bottom-30">
          <div className="col-md-8"><label>Street</label><div className="preview-field">{values.organization.address.street}</div></div>
          <div className="col-md-4"><label>City</label><div className="preview-field">{values.organization.address.city}</div></div>
          <div className="col-md-4"><label>province/State</label><div className="preview-field">{values.organization.address.provinceOrState}</div></div>
          <div className="col-md-4"><label>Country</label><div className="preview-field">{values.organization.address.country.label}</div></div>
          <div className="col-md-4"><label>PostalCode</label><div className="preview-field">{values.organization.address.postalCode}</div></div>
        </div>

        <h2 className="fw-600 h3">Company Representative Contact</h2>
        <div className="row margin-bottom-30">
          <div className="col-md-6"><label>First Name</label><div className="preview-field">{values.representative.company.firstName}</div></div>
          <div className="col-md-6"><label>Last Name</label><div className="preview-field">{values.representative.company.lastName}</div></div>
          <div className="col-md-6"><label>Job Title</label><div className="preview-field">{values.representative.company.jobtitle}</div></div>
          <div className="col-md-6"><label>Email</label><div className="preview-field">{values.representative.company.email}</div></div>
        </div>

        <h2 className="fw-600 h3">Company Marketing Contact</h2>
        <div className="row margin-bottom-30">
          <div className="col-md-6"><label>First Name</label><div className="preview-field">{values.representative.marketing.firstName}</div></div>
          <div className="col-md-6"><label>Last Name</label><div className="preview-field">{values.representative.marketing.lastName}</div></div>
          <div className="col-md-6"><label>Job Title</label><div className="preview-field">{values.representative.marketing.jobtitle}</div></div>
          <div className="col-md-6"><label>Email</label><div className="preview-field">{values.representative.marketing.email}</div></div>
        </div>

        <h2 className="fw-600 h3">Company Accounting Contact</h2>
        <div className="row margin-bottom-30">
          <div className="col-md-6"><label>First Name</label><div className="preview-field">{values.representative.accounting.firstName}</div></div>
          <div className="col-md-6"><label>Last Name</label><div className="preview-field">{values.representative.accounting.lastName}</div></div>
          <div className="col-md-6"><label>Job Title</label><div className="preview-field">{values.representative.accounting.jobtitle}</div></div>
          <div className="col-md-6"><label>Email</label><div className="preview-field">{values.representative.accounting.email}</div></div>
        </div>

        <h2 className="fw-600 h3">Intended Membership Level</h2>
        <div className="row margin-bottom-30">
          <div className="col-md-10"><div className="preview-field">{values.membershipLevel.label}</div></div>
        </div>

        <h2 className="fw-600 h3">Working Group(s) to Join</h2>
        {
          values.workingGroups.map((el, index) => (
            <React.Fragment key={index}>
            <div className="row margin-bottom-30">
              <div className="col-md-8"><label>Working group</label><div className="preview-field">{el.workingGroup.label}</div></div>
              <div className="col-md-8"><label>Intended Participation Level</label><div className="preview-field">{el.participationLevel.label}</div></div>
              <div className="col-md-8"><label>Effective Date</label><div className="preview-field">{new Date(el.effectiveDate).toLocaleDateString()}</div></div>

              <div className="col-md-24"><p className="h4 fw-600 margin-top-25">The working Group Representative</p></div>
              <div className="col-md-6"><label>First Name</label><div className="preview-field">{el.workingGroupRepresentative.firstName}</div></div>
              <div className="col-md-6"><label>Last Name</label><div className="preview-field">{el.workingGroupRepresentative.lastName}</div></div>
              <div className="col-md-6"><label>Job Title</label><div className="preview-field">{el.workingGroupRepresentative.jobtitle}</div></div>
              <div className="col-md-6"><label>Job Title</label><div className="preview-field">{el.workingGroupRepresentative.email}</div></div>
            </div>
            <hr />
            </React.Fragment>
          ))
        }

        <h2 className="fw-600 h3">Signing Authority</h2>
        <div className="row margin-bottom-30">
          <div className="col-md-6"><label>First Name</label><div className="preview-field">{values.signingAuthorityRepresentative.firstName}</div></div>
          <div className="col-md-6"><label>Last Name</label><div className="preview-field">{values.signingAuthorityRepresentative.lastName}</div></div>
          <div className="col-md-12"><label>Email</label><div className="preview-field">{values.signingAuthorityRepresentative.email}</div></div>
        </div>

      </div>
    </>
  );
};

export default Preview