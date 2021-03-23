import React, { useContext, useEffect, useState } from 'react';
import MembershipContext from '../../../Context/MembershipContext';
import { matchCompanyFields, matchContactFields } from '../../../Utils/formFunctionHelpers';
import Company from './Company';
import Contacts from './Contacts';
import Loading from '../../Loading/Loading';
import { end_point, api_prefix_form, FETCH_HEADER, newForm_tempId, getCurrentMode, MODE_REACT_ONLY, MODE_REACT_API } from '../../../Constants/Constants';

/**
 * - Wrapper for Contacts and Company components, with fetch and prefill data operation
 * 
 *  - Props:
 *    - otherProps: any other props passing down from MultiStepForm and FormikStepper components, including formik props of formik library (such as "formik.values", "formik.setFieldValue");
 * 
 *    - formField: the form field in formModels/formFieldModel.js
 * **/

const CompanyInformation = ({ formField, ...otherProps }) => {
  const { currentFormId } = useContext(MembershipContext); // current chosen form id
  const formValues = otherProps.parentState.formik.values; // current form values
  const { setFieldValue } = otherProps.parentState.formik;
  const [ loading, setLoading ] = useState(true);

  // Fetch data only once and prefill data, as long as currentFormId and setFieldValue Function does not change, will not cause re-render again
  useEffect(() => {
    // Once we have API set up ready, we don't need the fake data anymore, and can remove these pre-process. it is mainly for if running the application only react without server.
    let url_prefix_local;
    let url_suffix_local = '';
    // If running on localhost:3000
    if ( getCurrentMode() === MODE_REACT_ONLY ) {
      url_prefix_local = 'membership_data';  // --> public/membership_data/
      url_suffix_local = '.json';  // --> it is the fake json file
    }
    // If running on localhost:8090 or any other not on localhost:3000
    // Once we have the API ready running on production, will use the correct domain name rather than localhost:8090
    if (getCurrentMode() === MODE_REACT_API) {
      url_prefix_local = api_prefix_form;
    }

    // If the current form exsits, and it is not creating a new form
    if (currentFormId && currentFormId !== newForm_tempId) {

      // Using promise pool, because in first step, need to get company data, and contacts data
      let pool = [
        fetch(url_prefix_local + `/${currentFormId}/` + end_point.organizations + url_suffix_local, { headers : FETCH_HEADER }), 
        fetch(url_prefix_local + `/${currentFormId}/` + end_point.contacts + url_suffix_local, { headers : FETCH_HEADER })
      ];
  
      Promise.all(pool)
        .then((res) => 
          Promise.all(res.map(r => r.json()))
        )
        .then(([organizations, contacts]) => {
          // Matching the field data
          if (organizations[0]) {  // the organization data returned is always an array of one object, that is why using [0]
            // Call the the function to map the retrived organization backend data to fit frontend
            let tempOrg = matchCompanyFields(organizations[0]);
            console.log(tempOrg)
            // Call the setFieldValue of Formik, to set organization field with the mapped data, if nested, it will automatically map the properties and values
            setFieldValue('organization', tempOrg);
          }
          if(contacts.length) {
            // Call the the function to map the retrived contacts (company representative, marketing rep, accounting rep) backend data to fit frontend
            let tempContacts = matchContactFields(contacts);
            // Prefill Data --> Call the setFieldValue of Formik, to set representative field with the mapped data, if nested, it will automatically map the properties and values
            setFieldValue('representative', tempContacts);
          }
          setLoading(false);
        })
      }
      else {
      setLoading(false);
      }
  }, [currentFormId, setFieldValue])

  // If it is in loading status, only return a loading spinning
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
