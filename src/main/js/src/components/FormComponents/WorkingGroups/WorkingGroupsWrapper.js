import React, { useState, useContext, useEffect } from 'react';
import MembershipContext from '../../../Context/MembershipContext';
import { FieldArray } from 'formik';
import WorkingGroup from './WorkingGroup';
import { matchWorkingGroupFields } from '../../../Utils/formFunctionHelpers';
import Loading from '../../Loading/Loading';
import { end_point, api_prefix_form, FETCH_HEADER, workingGroups, newForm_tempId, getCurrentMode, MODE_REACT_ONLY, MODE_REACT_API } from '../../../Constants/Constants';

const WorkingGroupsWrapper = ({ formField, workingGroupsData, ...otherProps }) => {
  const { currentFormId } = useContext(MembershipContext);
  const [loading, setLoading] = useState(false);

  // Fetch existing form data
  function fetchWorkingGroupsData() {

    let url_prefix_local;
    let url_suffix_local = '';
    if ( getCurrentMode() === MODE_REACT_ONLY ) {
      url_prefix_local = 'membership_data';
      url_suffix_local = '.json';
    }

    if (getCurrentMode() === MODE_REACT_API) {
      url_prefix_local = api_prefix_form;
    }

    if(currentFormId && currentFormId !== newForm_tempId) {
      fetch(url_prefix_local + `/${currentFormId}/` + end_point.working_groups + url_suffix_local, { headers: FETCH_HEADER })
      .then(resp => resp.json())
      .then(data => {
        if(data.length) {
          otherProps.parentState.formik.setFieldValue(workingGroups, matchWorkingGroupFields(data, workingGroupsData))
        }
        setLoading(false);
      })
    } else {
      setLoading(false);
    }    
  }
 
  // Fetch data only once and prefill data, behaves as componentDidMount
  useEffect(() => {
    // Fetch existing form data
    fetchWorkingGroupsData();
    // eslint-disable-next-line
  }, [])

  if(loading) {
    return <Loading />
  }

  return (
    <>
    <h1 className="fw-600 h2">Working Group</h1>
    <p>Please complete the following details for joining a Working Group</p>
    <div id="working-groups-page" className="align-center margin-top-50 margin-bottom-30">
    <FieldArray
      name={workingGroups}
      render={arrayHelpers => {
        return(
            <WorkingGroup formField={formField} arrayHelpers={arrayHelpers} workingGroupsData={workingGroupsData} formikProps={otherProps.parentState.formik} />
        )
      }}
    >
    </FieldArray>
    </div>
    </>
  );
};

export default WorkingGroupsWrapper

