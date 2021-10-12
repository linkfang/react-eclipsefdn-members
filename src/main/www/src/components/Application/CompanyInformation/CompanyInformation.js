import { useContext, useEffect, useState } from 'react';
import MembershipContext from '../../../Context/MembershipContext';
import {
  mapPurchasingAndVAT,
  matchCompanyFields,
  matchContactFields,
  requestErrorHandler,
  scrollToTop,
} from '../../../Utils/formFunctionHelpers';
import CompanyInformationCompany from './CompanyInformationCompany';
import CompanyInformationContacts from './CompanyInformationContacts';
import Loading from '../../UIComponents/Loading/Loading';
import {
  END_POINT,
  API_PREFIX_FORM,
  FETCH_HEADER,
  getCurrentMode,
  MODE_REACT_ONLY,
  MODE_REACT_API,
  ROUTE_MEMBERSHIP,
  COMPANY_INFO_STEP,
  CURRENT_STEP,
} from '../../../Constants/Constants';
import CustomStepButton from '../../UIComponents/Button/CustomStepButton';
import CompanyInformationVAT from './CompanyInformationVAT';
import { makeStyles } from '@material-ui/core';
import {
  fetchAvailableFullWorkingGroupList,
  fetchWorkingGroupsUserJoined,
} from '../WorkingGroups/WorkingGroupsWrapper';

/**
 * Wrapper for Contacts and Company components
 *
 * Wrapper for Contacts and Company components,
 * with fetch and prefill data operation.
 *
 * Props:
 *  - otherProps: any other props passing down from
 *      FormikStepper components, including formik props of formik
 *      library (such as "formik.values", "formik.setFieldValue");
 *  - formField: the form field in formModels/formFieldModel.js
 */

let hasWGData = false;

const useStyles = makeStyles(() => ({
  textField: {
    marginBottom: 14,
    marginTop: 6,
    '& > div': {
      backgroundColor: 'white',
    },
  },
}));

let hasOrgData = false;

const CompanyInformation = ({
  formik,
  isStartNewForm,
  fullWorkingGroupList,
  setFullWorkingGroupList,
  setWorkingGroupsUserJoined,
  updatedFormValues,
  setUpdatedFormValues,
  submitForm,
}) => {
  const { currentFormId, setCurrentStepIndex } = useContext(MembershipContext); // current chosen form id
  const [loading, setLoading] = useState(true);
  const { setFieldValue } = formik;
  const companyRep = formik.values.representative.member;

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    setCurrentStepIndex(1);
  }, [setCurrentStepIndex]);

  useEffect(() => {
    setFieldValue(CURRENT_STEP, COMPANY_INFO_STEP);
  }, [setFieldValue]);

  useEffect(() => {
    const detectModeAndFetch = () => {
      // Once we have API set up ready, we don't need the
      // fake data anymore, and can remove these pre-process.
      // it is mainly for if running the application
      // only react without server.

      // just for React only testing.
      // let currentFormId = 'form_1';

      let url_prefix_local;
      let url_suffix_local = '';
      // If running on localhost:3000
      if (getCurrentMode() === MODE_REACT_ONLY) {
        url_prefix_local = 'membership_data'; // --> public/membership_data/
        url_suffix_local = '.json'; // --> it is the fake json file
      }
      // If running on localhost:8090 or any other not on localhost:3000
      // Once we have the API ready running on production,
      // will use the correct domain name rather than localhost:8090
      if (getCurrentMode() === MODE_REACT_API) {
        url_prefix_local = API_PREFIX_FORM;
      }

      // Using promise pool, because in first step,
      // need to get company data, and contacts data
      let pool = [
        fetch(url_prefix_local + `/${currentFormId}/` + END_POINT.organizations + url_suffix_local, {
          headers: FETCH_HEADER,
        }),
        fetch(url_prefix_local + `/${currentFormId}/` + END_POINT.contacts + url_suffix_local, {
          headers: FETCH_HEADER,
        }),
        fetch(url_prefix_local + `/${currentFormId}` + url_suffix_local, {
          headers: FETCH_HEADER,
        }),
      ];
      Promise.all(pool)
        .then((res) =>
          Promise.all(
            res.map((r) => {
              if (r.ok) return r.json();

              requestErrorHandler(r.status);
              throw r.status;
            })
          )
        )
        .then(([organizations, contacts, membershipLevel]) => {
          let newFormData = { ...updatedFormValues };
          // Matching the field data
          if (organizations[0]) {
            // the organization data returned is always an
            // array of one object, that is why using [0]
            // Call the the function to map the retrived
            // organization backend data to fit frontend
            let tempOrg = matchCompanyFields(organizations[0]);
            // Call the setFieldValue of Formik, to set
            // organization field with the mapped data,
            // if nested, it will automatically map the
            // properties and values
            setFieldValue('organization', tempOrg);
            newFormData = { ...newFormData, organization: tempOrg };
          }

          if (contacts.length) {
            // Call the the function to map the retrived contacts
            // (company representative, marketing rep, accounting rep)
            // backend data to fit frontend
            let tempContacts = matchContactFields(contacts);
            // Prefill Data --> Call the setFieldValue of Formik,
            // to set representative field with the mapped data,
            // if nested, it will automatically map the properties and values
            setFieldValue('representative', tempContacts.organizationContacts);
            setFieldValue('signingAuthorityRepresentative', tempContacts.signingAuthorityRepresentative);
            newFormData = { ...newFormData, representative: tempContacts.organizationContacts };
          }

          if (membershipLevel) {
            // setFieldValue(): Prefill Data --> Call the setFieldValue of
            // Formik, to set membershipLevel field with the mapped data
            setFieldValue('membershipLevel', membershipLevel.membership_level);

            const tempPurchasingAndVAT = mapPurchasingAndVAT(membershipLevel);
            setFieldValue('purchasingAndVAT', tempPurchasingAndVAT);

            newFormData = { ...newFormData, purchasingAndVAT: tempPurchasingAndVAT };
            setUpdatedFormValues(newFormData);
          }
          hasOrgData = true;
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          requestErrorHandler(err);
        });
    };

    if (isStartNewForm) {
      setLoading(false);
    } else {
      // continue with an existing one, if there is no data saved locally
      // then it means this is the 1st time the user see this page
      // need to GET the data
      if (!hasOrgData) {
        detectModeAndFetch();
      }
      if (hasOrgData) {
        setLoading(false);
      }
    }
  }, [isStartNewForm, setFieldValue, currentFormId, setUpdatedFormValues, updatedFormValues]);

  useEffect(() => {
    fetchAvailableFullWorkingGroupList(setFullWorkingGroupList);
  }, [setFullWorkingGroupList]);

  useEffect(() => {
    if (!isStartNewForm && !hasWGData && fullWorkingGroupList.length > 0 && companyRep.firstName) {
      // continue with an existing one and there is no working group data
      fetchWorkingGroupsUserJoined(
        currentFormId,
        fullWorkingGroupList,
        setWorkingGroupsUserJoined,
        setFieldValue,
        companyRep,
        setLoading
      );
      hasWGData = true;
    } else {
      setLoading(false);
    }
  }, [isStartNewForm, currentFormId, fullWorkingGroupList, setFieldValue, companyRep, setWorkingGroupsUserJoined]);

  // If it is in loading status or hasn't gotten the form id,
  // only return a loading spinning
  if (loading || !currentFormId) {
    return <Loading />;
  }

  return (
    <>
      <div className="align-center">
        <h1 className="fw-600 h2">Company Information</h1>
        <p>
          Please complete your company information below. This should be the legal name and address of your
          organization.
        </p>
        <p>
          **** NOTE: Committers wishing to complete the Eclipse Foundation membership process should not use this form,
          but instead should visit{' '}
          <a href="https://www.eclipse.org/membership/#tab-membership" target="_blank" rel="noreferrer">
            here
          </a>
          .
        </p>
        <CompanyInformationCompany formik={formik} useStyles={useStyles} />
        <CompanyInformationContacts formik={formik} />
        <CompanyInformationVAT formik={formik} />
      </div>

      <CustomStepButton previousPage="" nextPage={ROUTE_MEMBERSHIP} formik={formik} submitForm={submitForm} />
    </>
  );
};

export default CompanyInformation;
