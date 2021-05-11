import React from 'react';
import MembershipContext from '../../../Context/MembershipContext';

import {
  FETCH_HEADER,
  api_prefix_form,
  newForm_tempId,
  getCurrentMode,
  MODE_REACT_ONLY,
  MODE_REACT_API,
} from '../../../Constants/Constants';

const styles = {
  marginBottom: '20px',
  textAlign: 'center',
};

const FormChooser = () => {
  const fetchExistingForm = (callback) => {
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
        callback(data[0]?.id);
        console.log(data[0]?.id);
      })
      .catch((err) => console.log(err));
  };

  return (
    <MembershipContext.Consumer>
      {({ setCurrentFormId }) => (
        <div style={styles}>
          <h1 className="h3 padding-bottom-10">
            Welcome back! You can continue the application you previously
            started or start a new application.
          </h1>
          <button
            type="button"
            onClick={fetchExistingForm(setCurrentFormId)}
            className="btn btn-primary">
            {' '}
            Continue Existing Application{' '}
          </button>
          <button
            type="button"
            onClick={setCurrentFormId(newForm_tempId)}
            className="btn btn-primary">
            {' '}
            Start New Application{' '}
          </button>
        </div>
      )}
    </MembershipContext.Consumer>
  );
};

export default FormChooser;
