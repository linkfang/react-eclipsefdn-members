import { useContext, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useFormik } from 'formik';
import SignIn from './SignIn/SignIn';
import {
  COMPANY_INFORMATION,
  SIGNING_AUTHORITY,
  PAGE_STEP,
} from '../../Constants/Constants';
import {
  formField,
  initialValues,
} from '../UIComponents/FormComponents/formFieldModel';
import CompanyInformation from './CompanyInformation/CompanyInformation';
import MembershipLevel from './MembershipLevel/MembershipLevel';
import WorkingGroupsWrapper from './WorkingGroups/WorkingGroupsWrapper';
import SigningAuthority from './SigningAuthority/SigningAuthority';
import Review from './Review/Review';
import Step from '../UIComponents/Steppers/Step';
import SignInIntroduction from './SignIn/SignInIntroduction';
import SubmitSuccess from './SubmitSuccess/SubmitSuccess';
import { validationSchema } from '../UIComponents/FormComponents/ValidationSchema';
import { useHistory } from 'react-router-dom';
import { executeSendDataByStep } from '../../Utils/formFunctionHelpers';
import MembershipContext from '../../Context/MembershipContext';

export default function Main() {
  const history = useHistory();
  const { currentFormId, furthestPage, setFurthestPage, currentUser } =
    useContext(MembershipContext);
  const [updatedFormValues, setUpdatedFormValues] = useState(initialValues);
  const [isStartNewForm, setIsStartNewForm] = useState(true);

  const goToNextStep = (pageIndex, nextPage) => {
    if (furthestPage.index <= pageIndex)
      setFurthestPage({ index: pageIndex + 1, pathName: nextPage });
    history.push(nextPage);
  };

  const submitForm = (pageIndex, nextPage) => {
    // do something for submiting
    // ...

    goToNextStep(pageIndex, nextPage);
  };

  const formikCompanyInfo = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema[0],
    onSubmit: (values) => {
      // update the organization values
      const organization = values.organization;
      const representative = values.representative;
      setUpdatedFormValues({
        ...updatedFormValues,
        organization,
        representative,
      });
      console.log('updated company info: ', values);

      executeSendDataByStep(1, values, currentFormId, currentUser.name);

      goToNextStep(1, '/membership-level');
    },
  });

  const formikMembershipLevel = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema[1],
    onSubmit: (values) => {
      // update the membershipLevel values
      const membershipLevel = values.membershipLevel;
      setUpdatedFormValues({ ...updatedFormValues, membershipLevel });
      console.log('updated membership level: ', values);

      executeSendDataByStep(2, values, currentFormId, currentUser.name);

      goToNextStep(2, '/working-groups');
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

      executeSendDataByStep(3, values, currentFormId, currentUser.name);

      goToNextStep(3, '/signing-authority');
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
      goToNextStep(4, '/review');
    },
  });

  // generate the step options above the form
  const renderStepper = () => (
    <div className="stepper">
      <Step title="Sign In" index={-1} currentStep={-1} pathName="/signIn" />

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
    <div className="container eclipseFdn-membership-webform">
      <>
        {window.location.pathname === '/' ||
        window.location.pathname === '/signIn' ? (
          <SignInIntroduction />
        ) : null}

        {window.location.pathname !== '/submitted' && renderStepper()}

        <Switch>
          <Route exact path="/">
            <Redirect to="/signIn" />
          </Route>

          <Route exact path="/signIn">
            <SignIn
              formField={formField}
              label={COMPANY_INFORMATION}
              setFurthestPage={setFurthestPage}
              history={history}
              setIsStartNewForm={setIsStartNewForm}
            />
          </Route>

          <Route path="/company-info">
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
            {furthestPage.index >= 2 ? (
              <MembershipLevel
                formik={formikMembershipLevel}
                isStartNewForm={isStartNewForm}
              />
            ) : (
              <Redirect to={furthestPage.pathName} />
            )}
          </Route>

          <Route path="/working-groups">
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
            {furthestPage.index >= 4 ? (
              <SigningAuthority
                formField={formField}
                label={SIGNING_AUTHORITY}
                formik={formikSigningAuthority}
              />
            ) : (
              <Redirect to={furthestPage.pathName} />
            )}
          </Route>

          <Route path="/review">
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
        </Switch>
      </>
    </div>
  );
}
