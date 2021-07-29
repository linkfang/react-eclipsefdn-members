import { useCallback, useContext, useEffect, useState } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import SignIn from './SignIn/SignIn';
import { HAS_TOKEN_EXPIRED, LOGIN_EXPIRED_MSG, PAGE_STEP } from '../../Constants/Constants';
import { initialValues } from '../UIComponents/FormComponents/formFieldModel';
import CompanyInformation from './CompanyInformation/CompanyInformation';
import MembershipLevel from './MembershipLevel/MembershipLevel';
import WorkingGroupsWrapper from './WorkingGroups/WorkingGroupsWrapper';
import SigningAuthority from './SigningAuthority/SigningAuthority';
import Review from './Review/Review';
import Step from '../UIComponents/Steppers/Step';
import SignInIntroduction from './SignIn/SignInIntroduction';
import SubmitSuccess from './SubmitSuccess/SubmitSuccess';
import { validationSchema } from '../UIComponents/FormComponents/ValidationSchema';
import { executeSendDataByStep } from '../../Utils/formFunctionHelpers';
import MembershipContext from '../../Context/MembershipContext';
import TopSlideMsg from '../UIComponents/Notifications/TopSlideMsg';

export default function Application() {
  const history = useHistory();
  const { currentFormId, furthestPage, setFurthestPage, currentUser } =
    useContext(MembershipContext);
  const [updatedFormValues, setUpdatedFormValues] = useState(initialValues);
  const [isStartNewForm, setIsStartNewForm] = useState(true);
  const [isLoginExpired, setIsLoginExpired] = useState(false);

  const goToNextStep = (pageIndex, nextPage) => {
    if (furthestPage.index <= pageIndex)
      setFurthestPage({ index: pageIndex + 1, pathName: nextPage });
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
    executeSendDataByStep(
      5,
      '',
      currentFormId,
      currentUser.name,
      goToNextStep,
      ''
    );
  };

  const formikCompanyInfo = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema[0],
    onSubmit: (values) => {
      // update the organization values
      const organization = values.organization;
      const representative = values.representative;
      const purchasingAndVAT = values.purchasingAndVAT;
      const membershipLevel = values.membershipLevel;
      const membershipLevelLabel = values['membershipLevel-label'];
      const signingAuthorityRepresentative =
        values.signingAuthorityRepresentative;

      const theNewValue = {
        ...updatedFormValues,
        organization,
        representative,
        purchasingAndVAT,
        membershipLevel,
        'membershipLevel-label': membershipLevelLabel,
        signingAuthorityRepresentative: signingAuthorityRepresentative,
      };
      setUpdatedFormValues(theNewValue);
      console.log('updated company info: ', values);

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
      executeSendDataByStep(
        1,
        theNewValue,
        currentFormId,
        currentUser.name,
        goToNextStep,
        setFieldValueObj
      );
    },
  });

  const formikMembershipLevel = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema[1],
    onSubmit: (values) => {
      // update the membershipLevel values
      const membershipLevel = values.membershipLevel;
      const membershipLevelLabel = values['membershipLevel-label'];
      setUpdatedFormValues({
        ...updatedFormValues,
        membershipLevel,
        'membershipLevel-label': membershipLevelLabel,
      });
      console.log('updated membership level: ', values);

      const valueToUpdateFormik = [
        { field: 'membershipLevel', value: membershipLevel },
        { field: 'membershipLevel-label', value: membershipLevelLabel },
      ];
      // set valueToUpdateFormik to CompanyInfo formik to make sure the value is up to date
      updateCompanyInfoForm(valueToUpdateFormik);

      executeSendDataByStep(
        2,
        values,
        currentFormId,
        currentUser.name,
        goToNextStep
      );
    },
  });

  const formikWorkingGroups = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema[2],
    onSubmit: (values) => {
      // update the workingGroups values
      const workingGroups = values.workingGroups;
      setUpdatedFormValues({ ...updatedFormValues, workingGroups });
      console.log('updated working groups: ', values);

      const setFieldValueObj = {
        fieldName: 'workingGroups',
        method: formikWorkingGroups.setFieldValue,
      };
      executeSendDataByStep(
        3,
        values,
        currentFormId,
        currentUser.name,
        goToNextStep,
        setFieldValueObj
      );
    },
  });

  const formikSigningAuthority = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema[3],
    onSubmit: (values) => {
      // update the signingAuthorityRepresentative values
      const signingAuthorityRepresentative =
        values.signingAuthorityRepresentative;
      setUpdatedFormValues({
        ...updatedFormValues,
        signingAuthorityRepresentative,
      });
      console.log('updated SigningAuthority: ', values);

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
      executeSendDataByStep(
        4,
        values,
        currentFormId,
        currentUser.name,
        goToNextStep,
        setFieldValueObj
      );
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
      <Step title="Sign In" index={-1} currentStep={-1} pathName="/sign-in" />

      {PAGE_STEP.map((pageStep, index) => {
        return (
          <Step
            key={index}
            title={pageStep.props.label}
            index={index}
            currentStep={-1}
            pathName={pageStep.props.pathName}
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
          />
        </Route>

        <Route path="/company-info">
          {renderStepper()}
          {
            // stop users visiting steps/pages that are not able to edit yet
            furthestPage.index >= 1 ? (
              <CompanyInformation
                formik={formikCompanyInfo}
                isStartNewForm={isStartNewForm}
              />
            ) : (
              // if uses are not allowed to visit this page,
              // then will be brought back to the furthest they can visit
              <Redirect to={furthestPage.pathName} />
            )
          }
        </Route>

        <Route path="/membership-level">
          {renderStepper()}
          {furthestPage.index >= 2 ? (
            <MembershipLevel formik={formikMembershipLevel} />
          ) : (
            <Redirect to={furthestPage.pathName} />
          )}
        </Route>

        <Route path="/working-groups">
          {renderStepper()}
          {furthestPage.index >= 3 ? (
            <WorkingGroupsWrapper
              formik={formikWorkingGroups}
              isStartNewForm={isStartNewForm}
            />
          ) : (
            <Redirect to={furthestPage.pathName} />
          )}
        </Route>

        <Route path="/signing-authority">
          {renderStepper()}
          {furthestPage.index >= 4 ? (
            <SigningAuthority
              formik={formikSigningAuthority}
              updatedFormValues={updatedFormValues}
            />
          ) : (
            <Redirect to={furthestPage.pathName} />
          )}
        </Route>

        <Route path="/review">
          {renderStepper()}
          {furthestPage.index >= 5 ? (
            <Review values={updatedFormValues} submitForm={submitForm} />
          ) : (
            <Redirect to={furthestPage.pathName} />
          )}
        </Route>

        <Route path="/submitted">
          {furthestPage.index >= 6 ? (
            <SubmitSuccess />
          ) : (
            <Redirect to={furthestPage.pathName} />
          )}
        </Route>

        <Redirect to="/" />
      </Switch>

      <TopSlideMsg
        shouldShowUp={isLoginExpired}
        msgContent={LOGIN_EXPIRED_MSG}
      />
    </>
  );
}
