import MembershipContext from '../../../Context/MembershipContext';
import {
  FETCH_HEADER,
  API_PREFIX_FORM,
  getCurrentMode,
  MODE_REACT_ONLY,
  MODE_REACT_API,
  API_FORM_PARAM,
} from '../../../Constants/Constants';
import {
  handleNewForm,
  requestErrorHandler,
} from '../../../Utils/formFunctionHelpers';
import { useCallback, useContext, useEffect, useState } from 'react';
import Loading from '../Loading/Loading';
const styles = {
  marginBottom: '20px',
  textAlign: 'center',
};

const FormChooser = ({
  setFurthestPage,
  history,
  setIsStartNewForm,
  resetSigningAuthorityForm,
  resetWorkingGroupForm,
  resetMembershipLevelForm,
  resetCompanyInfoForm,
}) => {
  const { setCurrentFormId, furthestPage } = useContext(MembershipContext);
  const [hasExistingForm, setHasExistingForm] = useState('');

  const goToCompanyInfoStep = useCallback(() => {
    setFurthestPage({ index: 1, pathName: '/company-info' });
    history.push('/company-info');
  }, [history, setFurthestPage]);

  const handleContinueExistingForm = () => {
    setIsStartNewForm(false);
    goToCompanyInfoStep();
  };

  const handleStartNewForm = () => {
    setCurrentFormId('');
    // reset the form if user has gone to a further page/step
    if (furthestPage.index > 0) {
      resetCompanyInfoForm();
      resetMembershipLevelForm();
      resetWorkingGroupForm();
      resetSigningAuthorityForm();
    }
    handleNewForm(setCurrentFormId, goToCompanyInfoStep);
  };

  useEffect(() => {
    const fetchExistingForms = () => {
      let url_prefix_local;
      if (getCurrentMode() === MODE_REACT_ONLY) {
        url_prefix_local = 'membership_data/form_1/form.json';
      }

      if (getCurrentMode() === MODE_REACT_API) {
        url_prefix_local = API_PREFIX_FORM + API_FORM_PARAM;
      }

      fetch(url_prefix_local, { headers: FETCH_HEADER })
        .then((res) => {
          if (res.ok) return res.json();

          requestErrorHandler(res.status);
          throw res.status;
        })
        .then((data) => {
          console.log('existing forms:  ', data);
          if (data.length > 0) {
            setHasExistingForm(data[0]?.id);
            setCurrentFormId(data[0]?.id);
          } else {
            setCurrentFormId('');
            handleNewForm(setCurrentFormId, goToCompanyInfoStep);
          }
        })
        .catch((err) => {
          requestErrorHandler(err);
          console.log(err);
        });
    };

    if (hasExistingForm === '') {
      fetchExistingForms();
    }
  }, [goToCompanyInfoStep, setCurrentFormId, hasExistingForm]);

  return (
    <>
      {
        // if hasExistingForm equals to '' means the fetch call is not completed yet, so show loading animation
        hasExistingForm === '' ? (
          <Loading />
        ) : (
          <div style={styles}>
            <h1 className="h3 padding-bottom-10">
              Welcome back! You can continue the application you previously
              started or start a new application.
            </h1>
            {!!hasExistingForm && (
              <button
                type="button"
                onClick={handleContinueExistingForm}
                className="btn btn-primary"
              >
                Continue Existing Application
              </button>
            )}

            <button
              type="button"
              onClick={handleStartNewForm}
              className="btn btn-primary"
            >
              Start New Application
            </button>
          </div>
        )
      }
    </>
  );
};

export default FormChooser;
