import { useState, useContext, useEffect } from 'react';
import MembershipContext from '../../../Context/MembershipContext';
import WorkingGroup from './WorkingGroup';
import {
  matchWorkingGroupFields,
  requestErrorHandler,
  scrollToTop,
} from '../../../Utils/formFunctionHelpers';
import Loading from '../../UIComponents/Loading/Loading';
import {
  END_POINT,
  API_PREFIX_FORM,
  FETCH_HEADER,
  getCurrentMode,
  MODE_REACT_ONLY,
  MODE_REACT_API,
  FULL_WORKING_GROUP_LIST_FOR_REACT_ONLY,
  api_prefix,
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

let hasWGData = false;

const WorkingGroupsWrapper = ({
  formik,
  isStartNewForm,
  redirectTo,
  handleLoginExpired,
}) => {
  const { currentFormId } = useContext(MembershipContext);
  const { setFieldValue } = formik;
  const [isLoading, setIsLoading] = useState(true);
  const [workingGroupsUserJoined, setWorkingGroupsUserJoined] = useState([]);
  const [fullWorkingGroupList, setFullWorkingGroupList] = useState([]);

  useEffect(() => {
    scrollToTop();
  }, []);

  // Fetch data only once and prefill data, as long as
  // fetchWorkingGroupsData Function does not change,
  // will not cause re-render again
  useEffect(() => {
    // Fetch the full availabe working group list that user can join
    const fetchAvailableFullWorkingGroupList = () => {
      let url_prefix_local;
      if (getCurrentMode() === MODE_REACT_ONLY) {
        url_prefix_local = 'membership_data';
        setFullWorkingGroupList(FULL_WORKING_GROUP_LIST_FOR_REACT_ONLY);
        return;
      }

      if (getCurrentMode() === MODE_REACT_API) {
        url_prefix_local = api_prefix() + '/';
      }

      fetch(url_prefix_local + END_POINT.working_groups, {
        headers: FETCH_HEADER,
      })
        .then((res) => {
          if (res.ok) return res.json();

          requestErrorHandler(res.status, redirectTo, handleLoginExpired);
          throw new Error(`${res.status} ${res.statusText}`);
        })
        .then((data) => {
          let options = data.map((item) => ({
            label: item.name,
            value: item.name,
            participation_levels: item.levels,
          }));
          setFullWorkingGroupList(options);
        })
        .catch((err) => {
          requestErrorHandler(0, redirectTo, handleLoginExpired);
          console.log(err);
        });
    };

    fetchAvailableFullWorkingGroupList();
  }, [redirectTo, handleLoginExpired]);

  useEffect(() => {
    // Fetch the working groups user has joined
    const fetchWorkingGroupsUserJoined = () => {
      // All pre-process: if running without server,
      // use fake json data; if running with API, use API

      let url_prefix_local;
      let url_suffix_local = '';
      if (getCurrentMode() === MODE_REACT_ONLY) {
        url_prefix_local = 'membership_data';
        url_suffix_local = '.json';
      }

      if (getCurrentMode() === MODE_REACT_API) {
        url_prefix_local = API_PREFIX_FORM;
      }

      fetch(
        url_prefix_local +
          `/${currentFormId}/` +
          END_POINT.working_groups +
          url_suffix_local,
        {
          headers: FETCH_HEADER,
        }
      )
        .then((res) => {
          if (res.ok) return res.json();

          requestErrorHandler(res.status, redirectTo, handleLoginExpired);
          throw new Error(`${res.status} ${res.statusText}`);
        })
        .then((data) => {
          if (data.length) {
            // matchWorkingGroupFields(): Call the the function to map
            // the retrived working groups backend data to fit frontend, and
            // setFieldValue(): Prefill Data --> Call the setFieldValue
            // of Formik, to set workingGroups field with the mapped data
            const theGroupsUserJoined = matchWorkingGroupFields(
              data,
              fullWorkingGroupList
            );
            setWorkingGroupsUserJoined(theGroupsUserJoined);
            setFieldValue('workingGroups', theGroupsUserJoined);
            hasWGData = true;
          }
          setIsLoading(false);
        })
        .catch((err) => {
          requestErrorHandler(0, redirectTo, handleLoginExpired);
          console.log(err);
        });
    };

    if (!isStartNewForm && !hasWGData && fullWorkingGroupList.length > 0) {
      // continue with an existing one and there is no working group data
      fetchWorkingGroupsUserJoined();
    } else {
      setIsLoading(false);
    }
  }, [
    isStartNewForm,
    currentFormId,
    fullWorkingGroupList,
    setFieldValue,
    redirectTo,
    handleLoginExpired,
  ]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormikProvider value={formik}>
        <div
          id="working-groups-page"
          className="align-center margin-top-50 margin-bottom-30"
        >
          <h2 className="fw-600">Working Group</h2>
          <p>
            Please complete the following details for joining a Working Group
          </p>

          <WorkingGroup
            formik={formik}
            workingGroupsUserJoined={workingGroupsUserJoined}
            fullWorkingGroupList={fullWorkingGroupList}
            isLoading={isLoading}
          />
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
