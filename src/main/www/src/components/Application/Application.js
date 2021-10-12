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
  const { currentFormId, furthestPage, currentUser } = useContext(MembershipContext);
  const [updatedFormValues, setUpdatedFormValues] = useState(initialValues);
  const [isStartNewForm, setIsStartNewForm] = useState(true);
  const [isLoginExpired, setIsLoginExpired] = useState(false);
  const [isTermChecked, setIsTermChecked] = useState(false);
  const [fullWorkingGroupList, setFullWorkingGroupList] = useState([]);
  const [workingGroupsUserJoined, setWorkingGroupsUserJoined] = useState([]);

  const submitCompanyInfo = () => {
    const values = formik.values;
    setUpdatedFormValues(values);
    !isProd && console.log('updated company info: ', values);

    const setFieldValueObj = {
      fieldName: {
        organization: 'organization',
        member: 'representative.member',
        accounting: 'representative.accounting',
        marketing: 'representative.marketing',
      },
      method: formik.setFieldValue,
    };

    const updateFormValuesObj = {
      theNewValue: values,
      setUpdatedFormValues,
    };

    executeSendDataByStep(1, values, currentFormId, currentUser.name, setFieldValueObj, updateFormValuesObj);
    // Only make the API call when signingAuthorityRepresentative has an id
    // If not, it means there is nothing in the db, so no need to update.
    values.signingAuthorityRepresentative.id &&
      executeSendDataByStep(4, values, currentFormId, currentUser.name, setFieldValueObj, updateFormValuesObj);
  };

  const submitMembershipLevel = () => {
    const values = formik.values;
    setUpdatedFormValues(values);
    !isProd && console.log('updated membership level: ', values);

    executeSendDataByStep(2, values, currentFormId, currentUser.name);
  };

  const submitWorkingGroups = () => {
    const values = formik.values;
    setUpdatedFormValues(values);
    !isProd && console.log('updated working groups: ', values);

    if (!values.skipJoiningWG) {
      // If the user is joining at least 1 wg, then make related API call
      const setFieldValueObj = {
        fieldName: 'workingGroups',
        method: formik.setFieldValue,
      };

      executeSendDataByStep(3, values, currentFormId, currentUser.name, setFieldValueObj, {
        theNewValue: values,
        setUpdatedFormValues,
      });
    }
  };

  const submitSigningAuthority = () => {
    const values = formik.values;
    setUpdatedFormValues(values);
    !isProd && console.log('updated SigningAuthority: ', values);

    const setFieldValueObj = {
      fieldName: 'signingAuthorityRepresentative',
      method: {
        signingAuthority: formik.setFieldValue,
        companyInfo: formik.setFieldValue,
      },
    };

    executeSendDataByStep(4, values, currentFormId, currentUser.name, setFieldValueObj, {
      theNewValue: values,
      setUpdatedFormValues,
    });
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: VALIDATION_SCHEMA_FOR_ENROLMENT_FORM,
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
            formik={{
              ...formik,
              submitCompanyInfo: submitCompanyInfo,
              submitMembershipLevel: submitMembershipLevel,
              submitWorkingGroups: submitWorkingGroups,
              submitSigningAuthority: submitSigningAuthority,
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
            history={history}
            setIsStartNewForm={setIsStartNewForm}
            resetForm={formik.resetForm}
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
                  formik={formik}
                  isStartNewForm={isStartNewForm}
                  fullWorkingGroupList={fullWorkingGroupList}
                  setFullWorkingGroupList={setFullWorkingGroupList}
                  setWorkingGroupsUserJoined={setWorkingGroupsUserJoined}
                  updatedFormValues={updatedFormValues}
                  setUpdatedFormValues={setUpdatedFormValues}
                  submitForm={submitCompanyInfo}
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
                formik={{ ...formik, submitForm: submitMembershipLevel }}
                updatedFormValues={updatedFormValues}
                submitForm={submitMembershipLevel}
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
                formik={{ ...formik, submitForm: submitWorkingGroups }}
                isStartNewForm={isStartNewForm}
                fullWorkingGroupList={fullWorkingGroupList}
                workingGroupsUserJoined={workingGroupsUserJoined}
                updatedFormValues={updatedFormValues}
                setUpdatedFormValues={setUpdatedFormValues}
                submitForm={submitWorkingGroups}
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
                formik={{ ...formik, submitForm: submitSigningAuthority }}
                updatedFormValues={updatedFormValues}
                submitForm={submitSigningAuthority}
              />
            ) : (
              <Redirect to={furthestPage.pathName} />
            )}
          </form>
        </Route>

        <Route path={ROUTE_REVIEW}>
          {renderStepper()}
          {furthestPage.index >= 5 ? (
            <Review values={updatedFormValues} isTermChecked={isTermChecked} setIsTermChecked={setIsTermChecked} />
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
