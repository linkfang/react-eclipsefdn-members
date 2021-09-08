import { useState, useContext, useEffect } from 'react';
import MembershipContext from '../../../Context/MembershipContext';
import WorkingGroup from './WorkingGroup';
import {
  deleteData,
  isProd,
  isObjectEmpty,
  matchWorkingGroupFields,
  requestErrorHandler,
  scrollToTop,
} from '../../../Utils/formFunctionHelpers';
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
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { initialValues } from '../../UIComponents/FormComponents/formFieldModel';
import ModalWindow from '../../UIComponents/Notifications/ModalWindow';

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

const WorkingGroupsWrapper = ({
  formik,
  formikOrgValue,
  fullWorkingGroupList,
  workingGroupsUserJoined,
  updatedFormValues,
  setUpdatedFormValues,
}) => {
  const { currentFormId, setCurrentStepIndex } = useContext(MembershipContext);
  const [shouldOpen, setShouldOpen] = useState(false);

  const handleSkipJoiningWG = () => {
    const skipJoiningWG = formik.values.skipJoiningWG;
    if (skipJoiningWG) {
      formik.setFieldValue('skipJoiningWG', !skipJoiningWG);
      setUpdatedFormValues({ ...updatedFormValues, skipJoiningWG: false });
    } else {
      setShouldOpen(true);
    }
  };

  const handleClearData = () => {
    // if user check it, we need to delete all wgs in formik and db
    formik.values.workingGroups.map((item) => {
      deleteData(currentFormId, END_POINT.working_groups, item.id, '', `Deleted ${item?.workingGroup?.label}`);
      return null;
    });
    formik.setFieldValue('skipJoiningWG', true);
    formik.setFieldValue('workingGroups', initialValues.workingGroups);
    setUpdatedFormValues({ ...updatedFormValues, workingGroups: initialValues.workingGroups, skipJoiningWG: true });
    setShouldOpen(false);
  };

  const checkIsEmpty = () => {
    const workingGroups = formik.values.workingGroups;
    for (let i = 0; i < workingGroups.length; i++) {
      if (!isObjectEmpty(workingGroups[i])) {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    setCurrentStepIndex(3);
  }, [setCurrentStepIndex]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormikProvider value={formik}>
        <div id="working-groups-page" className="align-center margin-top-50 margin-bottom-30">
          <ModalWindow
            title={'Skip Joining a Working Group'}
            content={'This will clear all saved data in this step. Proceed to uncheck?'}
            handleProceed={handleClearData}
            shouldOpen={shouldOpen}
            setShouldOpen={setShouldOpen}
          />

          <h1 className="fw-600 h2">Working Group</h1>
          <p>
            Eclipse Foundation hosts a number of industry collaboration initiatives called Working Groups. While not
            required, most Member organizations participate in one or more working groups. See a full list of Eclipse
            Foundation working groups.
          </p>
          <p>
            Please complete the following details for joining a Working Group or you can skip joining a Working Group.
          </p>
          <FormControlLabel
            control={
              <Checkbox
                name="skipJoiningWG"
                color="primary"
                checked={formik.values.skipJoiningWG}
                onChange={() => handleSkipJoiningWG()}
              />
            }
            label="Skip joining a Working Group"
          />
          {!formik.values.skipJoiningWG && (
            <>
              <p className="margin-top-5">Please complete the following details for joining a Working Group</p>

              <WorkingGroup
                formik={formik}
                formikOrgValue={formikOrgValue}
                workingGroupsUserJoined={workingGroupsUserJoined}
                fullWorkingGroupList={fullWorkingGroupList}
                updatedFormValues={updatedFormValues}
                setUpdatedFormValues={setUpdatedFormValues}
              />
            </>
          )}
        </div>
        <CustomStepButton
          previousPage="/membership-level"
          nextPage="/signing-authority"
          formik={formik}
          checkIsEmpty={checkIsEmpty}
          updatedFormValues={updatedFormValues}
        />
      </FormikProvider>
    </form>
  );
};

export default WorkingGroupsWrapper;

// Fetch the working groups user has joined
export const fetchWorkingGroupsUserJoined = (
  currentFormId,
  fullWorkingGroupList,
  setWorkingGroupsUserJoined,
  setWGFieldValue,
  companyRep,
  setLoading
) => {
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

  fetch(url_prefix_local + `/${currentFormId}/` + END_POINT.working_groups + url_suffix_local, {
    headers: FETCH_HEADER,
  })
    .then((res) => {
      if (res.ok) return res.json();

      requestErrorHandler(res.status);
      throw res.status;
    })
    .then((data) => {
      if (data.length) {
        // matchWorkingGroupFields(): Call the the function to map
        // the retrived working groups backend data to fit frontend, and
        // setFieldValue(): Prefill Data --> Call the setFieldValue
        // of Formik, to set workingGroups field with the mapped data
        const theGroupsUserJoined = matchWorkingGroupFields(data, fullWorkingGroupList, companyRep);
        setWorkingGroupsUserJoined(theGroupsUserJoined);
        setWGFieldValue('workingGroups', theGroupsUserJoined);
      }
      setLoading(false);
    })
    .catch((err) => {
      requestErrorHandler(err);
      !isProd && console.log(err);
    });
};

// Fetch the full availabe working group list that user can join
export const fetchAvailableFullWorkingGroupList = (setFullWorkingGroupList) => {
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

      requestErrorHandler(res.status);
      throw res.status;
    })
    .then((data) => {
      let options = data.map((item) => ({
        label: item.title,
        value: item.title,
        participation_levels: item.levels,
        charter: item.resources.charter,
      }));
      setFullWorkingGroupList(options);
    })
    .catch((err) => {
      requestErrorHandler(err);
      !isProd && console.log(err);
    });
};
