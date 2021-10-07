import { useCallback, useContext, useEffect, useState } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import SignIn from './SignIn/SignIn';
import {
  HAS_TOKEN_EXPIRED,
  LOGIN_EXPIRED_MSG,
  PAGE_STEP,
  ROUTE_COMPANY,
  ROUTE_MEMBERSHIP,
  ROUTE_REVIEW,
  ROUTE_SIGNING,
  ROUTE_SUBMITTED,
  ROUTE_WGS,
} from '../../Constants/Constants';
import { initialValues } from '../UIComponents/FormComponents/formFieldModel';
import CompanyInformation from './CompanyInformation/CompanyInformation';
import MembershipLevel from './MembershipLevel/MembershipLevel';
import WorkingGroupsWrapper from './WorkingGroups/WorkingGroupsWrapper';
import SigningAuthority from './SigningAuthority/SigningAuthority';
import Review from './Review/Review';
import Step from '../UIComponents/Steppers/Step';
import SignInIntroduction from './SignIn/SignInIntroduction';
import SubmitSuccess from './SubmitSuccess/SubmitSuccess';
import { VALIDATION_SCHEMA_FOR_ENROLMENT_FORM } from '../UIComponents/FormComponents/ValidationSchema';
import { checkValidityWithoutSubmitting, executeSendDataByStep, isProd } from '../../Utils/formFunctionHelpers';
import MembershipContext from '../../Context/MembershipContext';
import TopSlideMsg from '../UIComponents/Notifications/TopSlideMsg';

export default function Application() {
  const history = useHistory();
  const { currentFormId, furthestPage, setFurthestPage, currentUser } = useContext(MembershipContext);
  const [updatedFormValues, setUpdatedFormValues] = useState(initialValues);
  const [isStartNewForm, setIsStartNewForm] = useState(true);
  const [isLoginExpired, setIsLoginExpired] = useState(false);
  const [isTermChecked, setIsTermChecked] = useState(false);
  const [fullWorkingGroupList, setFullWorkingGroupList] = useState([]);
  const [workingGroupsUserJoined, setWorkingGroupsUserJoined] = useState([]);

  const goToNextStep = (pageIndex, nextPage) => {
    if (furthestPage.index <= pageIndex) setFurthestPage({ index: pageIndex + 1, pathName: nextPage });
    history.push(nextPage);
  };

  const updateMembershipLevelForm = (values) => {
    values.forEach((item) => {
      formikMembershipLevel.setFieldValue(item.field, item.value);
    });
  };

  const updateCompanyInfoForm = (values) => {
    values.forEach((item) => {
      formikCompanyInfo.setFieldValue(item.field, item.value);
    });
  };

  const updateSigningAuthorityForm = (values) => {
    values.forEach((item) => {
      formikSigningAuthority.setFieldValue(item.field, item.value);
    });
  };

  const submitForm = () => {
    goToNextStep(5, ROUTE_SUBMITTED);
  };

  const submitCompanyInfo = () => {
    const values = formikCompanyInfo.values;
    // update the organization values
    const organization = values.organization;
    const representative = values.representative;
    const purchasingAndVAT = values.purchasingAndVAT;
    const membershipLevel = values.membershipLevel;
    const membershipLevelLabel = values['membershipLevel-label'];
    const signingAuthorityRepresentative = values.signingAuthorityRepresentative;

    const theNewValue = {
      ...updatedFormValues,
      organization,
      representative,
      purchasingAndVAT,
      membershipLevel,
      'membershipLevel-label': membershipLevelLabel,
      workingGroups: formikWorkingGroups.values.workingGroups,
      signingAuthorityRepresentative: signingAuthorityRepresentative,
    };
    setUpdatedFormValues(theNewValue);
    !isProd && console.log('updated company info: ', values);

    const valueForMembershipLevelFormik = [
      { field: 'purchasingAndVAT', value: purchasingAndVAT },
      { field: 'membershipLevel', value: membershipLevel },
      {
        field: 'membershipLevel-label',
        value: membershipLevelLabel?.label ? membershipLevelLabel : null,
      },
    ];
    // set valueToUpdateFormik to membershipLevel formik to make sure the value is up to date
    updateMembershipLevelForm(valueForMembershipLevelFormik);

    const valueForSigningAuthorityFormik = [
      {
        field: 'signingAuthorityRepresentative',
        value: signingAuthorityRepresentative,
      },
    ];
    updateSigningAuthorityForm(valueForSigningAuthorityFormik);

    const setFieldValueObj = {
      fieldName: {
        organization: 'organization',
        member: 'representative.member',
        accounting: 'representative.accounting',
        marketing: 'representative.marketing',
      },
      method: formikCompanyInfo.setFieldValue,
    };

    const updateFormValuesObj = {
      theNewValue,
      setUpdatedFormValues,
    };

    executeSendDataByStep(1, theNewValue, currentFormId, currentUser.name, setFieldValueObj, updateFormValuesObj);
    // Only make the API call when signingAuthorityRepresentative has an id
    // If not, it means there is nothing in the db, so no need to update.
    values.signingAuthorityRepresentative.id &&
      executeSendDataByStep(4, values, currentFormId, currentUser.name, setFieldValueObj, updateFormValuesObj);
    // Only need to call goToNextStep when is not using stepper
  };
  const formikCompanyInfo = useFormik({
    initialValues: initialValues,
    validationSchema: VALIDATION_SCHEMA_FOR_ENROLMENT_FORM,
    onSubmit: () => {
      submitCompanyInfo();
      goToNextStep(1, ROUTE_MEMBERSHIP);
    },
  });

  const submitMembershipLevel = () => {
    const values = formikMembershipLevel.values;
    // update the membershipLevel values
    const membershipLevel = values.membershipLevel;
    const membershipLevelLabel = values['membershipLevel-label'];
    setUpdatedFormValues({
      ...updatedFormValues,
      membershipLevel,
      'membershipLevel-label': membershipLevelLabel,
    });
    !isProd && console.log('updated membership level: ', values);

    const valueToUpdateFormik = [
      { field: 'membershipLevel', value: membershipLevel },
      { field: 'membershipLevel-label', value: membershipLevelLabel },
    ];
    // set valueToUpdateFormik to CompanyInfo formik to make sure the value is up to date
    updateCompanyInfoForm(valueToUpdateFormik);
    executeSendDataByStep(2, values, currentFormId, currentUser.name);
  };
  const formikMembershipLevel = useFormik({
    initialValues: initialValues,
    validationSchema: VALIDATION_SCHEMA_FOR_ENROLMENT_FORM,
    onSubmit: () => {
      submitMembershipLevel();
      goToNextStep(2, ROUTE_WGS);
    },
  });

  const submitWorkingGroups = () => {
    const values = formikWorkingGroups.values;
    // update the workingGroups values
    const theNewValue = {
      ...updatedFormValues,
      workingGroups: values.workingGroups,
      skipJoiningWG: values.skipJoiningWG,
    };
    setUpdatedFormValues(theNewValue);
    !isProd && console.log('updated working groups: ', values);

    if (!values.skipJoiningWG) {
      // If the user is joining at least 1 wg, then make related API call
      const setFieldValueObj = {
        fieldName: 'workingGroups',
        method: formikWorkingGroups.setFieldValue,
      };

      executeSendDataByStep(3, values, currentFormId, currentUser.name, setFieldValueObj, {
        theNewValue,
        setUpdatedFormValues,
      });
    }
  };
  const formikWorkingGroups = useFormik({
    initialValues: initialValues,
    validationSchema: VALIDATION_SCHEMA_FOR_ENROLMENT_FORM,
    onSubmit: () => {
      submitWorkingGroups();
      goToNextStep(3, ROUTE_SIGNING);
    },
  });

  const submitSigningAuthority = () => {
    const values = formikSigningAuthority.values;
    // update the signingAuthorityRepresentative values
    const signingAuthorityRepresentative = values.signingAuthorityRepresentative;
    const theNewValue = {
      ...updatedFormValues,
      signingAuthorityRepresentative,
    };
    setUpdatedFormValues(theNewValue);
    !isProd && console.log('updated SigningAuthority: ', values);

    const valueToUpdateFormik = [
      {
        field: 'signingAuthorityRepresentative',
        value: signingAuthorityRepresentative,
      },
    ];
    // set valueToUpdateFormik to CompanyInfo formik to make sure the value is up to date
    updateCompanyInfoForm(valueToUpdateFormik);
    const setFieldValueObj = {
      fieldName: 'signingAuthorityRepresentative',
      method: {
        signingAuthority: formikSigningAuthority.setFieldValue,
        companyInfo: formikCompanyInfo.setFieldValue,
      },
    };

    executeSendDataByStep(4, values, currentFormId, currentUser.name, setFieldValueObj, {
      theNewValue,
      setUpdatedFormValues,
    });
  };
  const formikSigningAuthority = useFormik({
    initialValues: initialValues,
    validationSchema: VALIDATION_SCHEMA_FOR_ENROLMENT_FORM,
    onSubmit: () => {
      submitSigningAuthority();
      goToNextStep(4, ROUTE_REVIEW);
    },
  });

  const handleLoginExpired = useCallback(() => {
    if (sessionStorage.getItem(HAS_TOKEN_EXPIRED)) {
      sessionStorage.setItem(HAS_TOKEN_EXPIRED, '');
      // using setTimeout here is to make the pop up message more noticeable
      setTimeout(() => {
        setIsLoginExpired(true);
      }, 200);
      setTimeout(() => {
        setIsLoginExpired(false);
      }, 4000);
    }
  }, []);

  useEffect(() => {
    handleLoginExpired();
  }, [handleLoginExpired]);

  // generate the step options above the form
  const renderStepper = () => (
    <div className="stepper">
      {PAGE_STEP.map((pageStep, index) => {
        return (
          <Step
            key={index}
            title={pageStep.label}
            index={index}
            pathName={pageStep.pathName}
            updatedFormValues={updatedFormValues}
            formikCompanyInfo={{
              ...formikCompanyInfo,
              submitForm: submitCompanyInfo,
            }}
            formikMembershipLevel={{
              ...formikMembershipLevel,
              submitForm: submitMembershipLevel,
            }}
            formikWorkingGroups={{
              ...formikWorkingGroups,
              submitForm: submitWorkingGroups,
            }}
            formikSigningAuthority={{
              ...formikSigningAuthority,
              submitForm: submitSigningAuthority,
            }}
          />
        );
      })}
    </div>
  );

  return (
    <>
      <Switch>
        <Route exact path="/">
          <Redirect to="/sign-in" />
        </Route>

        <Route exact path="/sign-in">
          <SignInIntroduction />
          {renderStepper()}
          <SignIn
            setFurthestPage={setFurthestPage}
            history={history}
            setIsStartNewForm={setIsStartNewForm}
            resetCompanyInfoForm={formikCompanyInfo.resetForm}
            resetMembershipLevelForm={formikMembershipLevel.resetForm}
            resetWorkingGroupForm={formikWorkingGroups.resetForm}
            resetSigningAuthorityForm={formikSigningAuthority.resetForm}
            setUpdatedFormValues={setUpdatedFormValues}
          />
        </Route>

        <Route path={ROUTE_COMPANY}>
          <form onSubmit={checkValidityWithoutSubmitting}>
            {renderStepper()}
            {
              // stop users visiting steps/pages that are not able to edit yet
              furthestPage.index >= 1 ? (
                <CompanyInformation
                  formik={formikCompanyInfo}
                  isStartNewForm={isStartNewForm}
                  formikWG={formikWorkingGroups}
                  fullWorkingGroupList={fullWorkingGroupList}
                  setFullWorkingGroupList={setFullWorkingGroupList}
                  setWorkingGroupsUserJoined={setWorkingGroupsUserJoined}
                  updatedFormValues={updatedFormValues}
                  setUpdatedFormValues={setUpdatedFormValues}
                />
              ) : (
                // if uses are not allowed to visit this page,
                // then will be brought back to the furthest they can visit
                <Redirect to={furthestPage.pathName} />
              )
            }
          </form>
        </Route>

        <Route path={ROUTE_MEMBERSHIP}>
          <form onSubmit={checkValidityWithoutSubmitting}>
            {renderStepper()}
            {furthestPage.index >= 2 ? (
              <MembershipLevel
                formik={{ ...formikMembershipLevel, submitForm: submitMembershipLevel }}
                updatedFormValues={updatedFormValues}
              />
            ) : (
              <Redirect to={furthestPage.pathName} />
            )}
          </form>
        </Route>

        <Route path={ROUTE_WGS}>
          <form onSubmit={checkValidityWithoutSubmitting}>
            {renderStepper()}
            {furthestPage.index >= 3 ? (
              <WorkingGroupsWrapper
                formik={{ ...formikWorkingGroups, submitForm: submitWorkingGroups }}
                formikOrgValue={formikCompanyInfo.values}
                isStartNewForm={isStartNewForm}
                fullWorkingGroupList={fullWorkingGroupList}
                workingGroupsUserJoined={workingGroupsUserJoined}
                updatedFormValues={updatedFormValues}
                setUpdatedFormValues={setUpdatedFormValues}
              />
            ) : (
              <Redirect to={furthestPage.pathName} />
            )}
          </form>
        </Route>

        <Route path={ROUTE_SIGNING}>
          <form onSubmit={checkValidityWithoutSubmitting}>
            {renderStepper()}
            {furthestPage.index >= 4 ? (
              <SigningAuthority
                formik={{ ...formikSigningAuthority, submitForm: submitSigningAuthority }}
                formikOrgValue={formikCompanyInfo.values}
                updatedFormValues={updatedFormValues}
              />
            ) : (
              <Redirect to={furthestPage.pathName} />
            )}
          </form>
        </Route>

        <Route path={ROUTE_REVIEW}>
          {renderStepper()}
          {furthestPage.index >= 5 ? (
            <Review
              values={updatedFormValues}
              submitForm={submitForm}
              isTermChecked={isTermChecked}
              setIsTermChecked={setIsTermChecked}
            />
          ) : (
            <Redirect to={furthestPage.pathName} />
          )}
        </Route>

        <Route path={ROUTE_SUBMITTED}>
          {furthestPage.index >= 6 ? <SubmitSuccess /> : <Redirect to={furthestPage.pathName} />}
        </Route>

        <Redirect to="/" />
      </Switch>

      <TopSlideMsg shouldShowUp={isLoginExpired} msgContent={LOGIN_EXPIRED_MSG} />
    </>
  );
}
