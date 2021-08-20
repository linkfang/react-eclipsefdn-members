import { useState, useContext, useEffect } from 'react';
import MembershipContext from '../../../Context/MembershipContext';
import WorkingGroup from './WorkingGroup';
import {
  deleteData,
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
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
} from '@material-ui/core';
import { initialValues } from '../../UIComponents/FormComponents/formFieldModel';

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

const WorkingGroupsWrapper = ({ formik, isStartNewForm }) => {
  const { currentFormId } = useContext(MembershipContext);
  const { setFieldValue } = formik;
  const [isLoading, setIsLoading] = useState(true);
  const [workingGroupsUserJoined, setWorkingGroupsUserJoined] = useState([]);
  const [fullWorkingGroupList, setFullWorkingGroupList] = useState([]);
  const [shouldOpen, setShouldOpen] = useState(false);

  const handleIsJoiningWG = () => {
    const isJoiningWG = formik.values.isJoiningWG;

    if (isJoiningWG) {
      setShouldOpen(true);
    } else {
      formik.setFieldValue('isJoiningWG', !isJoiningWG);
      formik.setFieldValue('workingGroups', initialValues.workingGroups);
    }
  };

  const closeModal = () => {
    setShouldOpen(false);
  };

  const handleClearData = () => {
    // if user uncheck it, then we need to reset WG form
    formik.values.workingGroups.map((item) => {
      deleteData(
        currentFormId,
        END_POINT.working_groups,
        item.id,
        formik.resetForm,
        ''
      );
      return null;
    });
    closeModal();
  };

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

          requestErrorHandler(res.status);
          throw res.status;
        })
        .then((data) => {
          let options = data.map((item) => ({
            label: item.title,
            value: item.title,
            participation_levels: item.levels,
            charter: item.resources.charter
          }));
          setFullWorkingGroupList(options);
        })
        .catch((err) => {
          requestErrorHandler(err);
          console.log(err);
        });
    };

    fetchAvailableFullWorkingGroupList();
  }, []);

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

          requestErrorHandler(res.status);
          throw res.status;
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
            setFieldValue('isJoiningWG', true);
            setFieldValue('workingGroups', theGroupsUserJoined);
            hasWGData = true;
          }
          setIsLoading(false);
        })
        .catch((err) => {
          requestErrorHandler(err);
          console.log(err);
        });
    };

    if (!isStartNewForm && !hasWGData && fullWorkingGroupList.length > 0) {
      // continue with an existing one and there is no working group data
      fetchWorkingGroupsUserJoined();
    } else {
      setIsLoading(false);
    }
  }, [isStartNewForm, currentFormId, fullWorkingGroupList, setFieldValue]);

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
          <Dialog
            open={shouldOpen}
            onClose={closeModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {'Uncheck Joining a Working Group'}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                This will clear all saved data in this step. Proceed to
                uncheck?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeModal}>Cancel</Button>
              <Button onClick={handleClearData} color="primary" autoFocus>
                Yes
              </Button>
            </DialogActions>
          </Dialog>

          <h1 className="fw-600 h2">Working Group</h1>
          <FormControlLabel
            control={
              <Checkbox
                name="isJoiningWG"
                color="primary"
                checked={formik.values.isJoiningWG}
                onChange={() => handleIsJoiningWG()}
              />
            }
            label="Joining a Working Group"
          />
          {formik.values.isJoiningWG && (
            <>
              <p>
                Please complete the following details for joining a Working
                Group
              </p>

              <WorkingGroup
                formik={formik}
                workingGroupsUserJoined={workingGroupsUserJoined}
                fullWorkingGroupList={fullWorkingGroupList}
                isLoading={isLoading}
              />
            </>
          )}
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
