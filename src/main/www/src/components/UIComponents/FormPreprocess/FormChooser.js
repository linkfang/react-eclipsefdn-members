import MembershipContext from '../../../Context/MembershipContext';
import {
  FETCH_HEADER,
  api_prefix_form,
  getCurrentMode,
  MODE_REACT_ONLY,
  MODE_REACT_API,
} from '../../../Constants/Constants';
import { handleNewForm } from '../../../Utils/formFunctionHelpers';
import { useContext, useEffect, useState } from 'react';
import Loading from '../Loading/Loading';

const styles = {
  marginBottom: '20px',
  textAlign: 'center',
};

const FormChooser = ({ setFurthestPage, history, setIsStartNewForm }) => {
  const { setCurrentFormId } = useContext(MembershipContext);
  const [hasExistingForm, setHasExistingForm] = useState('');

  const goToCompanyInfoStep = () => {
    setFurthestPage({ index: 1, pathName: '/company-info' });
    history.push('/company-info');
  };

  const handleContinueExistingForm = () => {
    setIsStartNewForm(false);
    goToCompanyInfoStep();
  };

  useEffect(() => {
    const fetchExistingForms = () => {
      let url_prefix_local;
      if (getCurrentMode() === MODE_REACT_ONLY) {
        url_prefix_local = 'membership_data/form_1/form.json';
      }

      if (getCurrentMode() === MODE_REACT_API) {
        url_prefix_local = api_prefix_form;
      }

      fetch(url_prefix_local, { headers: FETCH_HEADER })
        .then((res) => res.json())
        .then((data) => {
          console.log('existing forms:  ', data);

          if (data.length > 0) {
            setHasExistingForm(data[0]?.id);
            setCurrentFormId(data[0]?.id);
          } else {
            setHasExistingForm(false);
            handleNewForm(setCurrentFormId, goToCompanyInfoStep);
          }
        })
        .catch((err) => console.log(err));
    };

    fetchExistingForms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              onClick={() => {
                handleNewForm(setCurrentFormId, goToCompanyInfoStep);
              }}
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
