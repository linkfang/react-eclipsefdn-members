import React, { useState, useContext, useEffect } from 'react';
import MembershipContext from '../../../Context/MembershipContext';
import WorkingGroup from './WorkingGroup';
import { matchWorkingGroupFields } from '../../../Utils/formFunctionHelpers';
import Loading from '../../UIComponents/Loading/Loading';
import {
  end_point,
  api_prefix_form,
  FETCH_HEADER,
  newForm_tempId,
  getCurrentMode,
  MODE_REACT_ONLY,
  MODE_REACT_API,
} from '../../../Constants/Constants';
import CustomStepButton from '../../UIComponents/Button/CustomStepButton';
import { FormikProvider } from 'formik';

/**
 * Wrapper for FieldArray of WorkingGroup component,
 * with fetch and prefill data operation
 *
 * Note: FieldArray is from Formik library that add/remove
 * easily in an array of same field inputs,
 * please refer to https://formik.org/docs/api/fieldarray
 *
 *  - Props:
 *    - workingGroupsData: working group options to choose from;
 *
 *    - otherProps: any other props passing down from FormikStepper components, including formik props of formik library (such as "formik.values", "formik.setFieldValue");
 *
 *    - formField: the form field in formModels/formFieldModel.js
 */

const WorkingGroupsWrapper = ({ formik }) => {
  const { currentFormId } = useContext(MembershipContext);
  const [loading, setLoading] = useState(false);
  const [workingGroupsData, setWorkingGroupsData] = useState([]);

  // Fetch existing form data
  const fetchWorkingGroupsData = () => {
    // All pre-process: if running without server,
    // use fake json data; if running with API, use API

    let url_prefix_local;
    let url_suffix_local = '';
    if (getCurrentMode() === MODE_REACT_ONLY) {
      url_prefix_local = 'membership_data';
      url_suffix_local = '.json';
    }

    if (getCurrentMode() === MODE_REACT_API) {
      url_prefix_local = api_prefix_form;
    }

    // If the current form exsits, and it is not creating a new form
    if (currentFormId && currentFormId !== newForm_tempId) {
      fetch(
        url_prefix_local +
          `/${currentFormId}/` +
          end_point.working_groups +
          url_suffix_local,
        { headers: FETCH_HEADER }
      )
        .then((resp) => resp.json())
        .then((data) => {
          if (data.length) {
            // matchWorkingGroupFields(): Call the the function to map
            // the retrived working groups backend data to fit frontend, and
            // setFieldValue(): Prefill Data --> Call the setFieldValue
            // of Formik, to set workingGroups field with the mapped data
            const theData = matchWorkingGroupFields(data, workingGroupsData);
            setWorkingGroupsData(theData);
            formik.setFieldValue('workingGroups', theData);
          }
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  // Fetch data only once and prefill data, as long as
  // fetchWorkingGroupsData Function does not change,
  // will not cause re-render again
  useEffect(() => {
    // Fetch existing form data
    fetchWorkingGroupsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormikProvider value={formik}>
        <h1 className="fw-600 h2">Working Group</h1>
        <p>Please complete the following details for joining a Working Group</p>
        <div
          id="working-groups-page"
          className="align-center margin-top-50 margin-bottom-30"
        >
          <WorkingGroup formik={formik} />
        </div>

        <CustomStepButton
          previousPage="/membership-level"
          nextPage="/signing-authority"
          pageIndex={3}
        />
      </FormikProvider>
    </form>
  );
};

export default WorkingGroupsWrapper;
