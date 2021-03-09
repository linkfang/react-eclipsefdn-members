import React, { useContext, useEffect, useState } from 'react';
import MembershipContext from '../../../Context/MembershipContext';
import { matchCompanyFields, matchContactFields } from '../../../Utils/formFunctionHelpers';
import Company from './Company';
import Contacts from './Contacts';
import Loading from '../../Loading/Loading';
import { end_point, api_prefix_form, FETCH_HEADER, newForm_tempId, getCurrentMode, MODE_REACT_ONLY, MODE_REACT_API } from '../../../Constants/Constants';

const CompanyInformation = ({ formField, ...otherProps }) => {
  const {currentFormId} = useContext(MembershipContext);
  const formValues = otherProps.parentState.formik.values;
  const [ loading, setLoading ] = useState(true);

  // Fetch data only once and prefill data, behaves as componentDidMount
  useEffect(() => {
    let url_prefix_local;
    let url_suffix_local = '';
    if ( getCurrentMode() === MODE_REACT_ONLY ) {
      url_prefix_local = 'membership_data';
      url_suffix_local = '.json';
    }

    if (getCurrentMode() === MODE_REACT_API) {
      url_prefix_local = api_prefix_form;
    }

    if (currentFormId && currentFormId !== newForm_tempId) {
      let pool = [
        fetch(url_prefix_local + `/${currentFormId}/` + end_point.organizations + url_suffix_local, { headers : FETCH_HEADER }), 
        fetch(url_prefix_local + `/${currentFormId}/` + end_point.contacts + url_suffix_local, { headers : FETCH_HEADER })
      ]
  
      Promise.all(pool)
        .then((res) => 
          Promise.all(res.map(r => r.json()))
        )
        .then(([organizations, contacts]) => {
          // Matching the field data
          if (organizations[0]) {
            let tempOrg = matchCompanyFields(organizations[0])
            otherProps.parentState.formik.setFieldValue('organization', tempOrg.organization)
          }
          if(contacts.length) {
            let tempContacts = matchContactFields(contacts)
            // Prefill Data
            otherProps.parentState.formik.setFieldValue('companyRepresentative', tempContacts.companyRepresentative)
          }
          setLoading(false);
        })
    }
    else {
      setLoading(false);
    }
    // eslint-disable-next-line
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <h1 className="fw-600 h2">Company Information</h1>
      <p>Please complete your company information below. This should be the legal name and address of your organization.</p>
      <div className="align-center">
        <Company />
        <Contacts formValues={formValues} formField={formField} />
      </div>
    </>
  );
};

export default CompanyInformation
