import * as yup from 'yup';
import {
  COMPANY_INFO_STEP,
  CURRENT_STEP,
  MAX_LENGTH_HELPER_TEXT,
  MAX_LENGTH_HELPER_TEXT_SEVEN_HUNDRED,
  MEMBERSHIP_LEVEL_STEP,
  SIGNING_AUTHORITY_STEP,
  WORKING_GROUP_STEP,
} from '../../../Constants/Constants';
import { requiredErrorMsg } from './formFieldModel';
import countryAddressDetails from 'postal-address-field-names';

/**
 * Validation schema passed to Formik
 * Formik will recognize the name, and assign to the fields
 * that who should use which validation
 *
 * Library Yup: please refer to: https://github.com/jquense/yup
 * The field name, and nesting relationships must be exact the same as the
 * `initialValues` in formFieldModel.js
 * Formik + Yup, please refer to: https://formik.org/docs/guides/validation#validationschema
 *
 * Using Array, matches the Form Step Child react component array, so:
 * When render the first step component, validation schema passed
 * to is validationSchema[0], which is { organization, representative };
 * Please refer to:
 *
 * ```
 * const childrenArray = React.Children.toArray(children);
 * const currentChild = childrenArray[step];
 * const currentValidationSchema = validationSchema[step];
 * ```
 * In FormikStepper/FormikStepper.js
 *
 * .required(), .email() are builtin API of Yup to check
 * if a required field is entered, and the email is valid format
 *
 * the string params passed to required() and email() is the error message
 * the formik.errors is an object of {fieldName: "error message"},
 * please refer to: https://formik.org/docs/api/formik#errors--field-string-string-
 */

const countryList = countryAddressDetails.map((item) => item.name);

const REQUIRED_MAX_YUP = yup.string().required(requiredErrorMsg).max(255, MAX_LENGTH_HELPER_TEXT);
const MAX_YUP = yup.string().max(255, MAX_LENGTH_HELPER_TEXT);
const MAX_YUP_SEVEN_HUNDRED = yup.string().max(700, MAX_LENGTH_HELPER_TEXT_SEVEN_HUNDRED);
const CONTACT_YUP = yup.object().shape({
  email: yup.string().required(requiredErrorMsg).email('Please enter a valid email'),
  firstName: REQUIRED_MAX_YUP,
  lastName: REQUIRED_MAX_YUP,
  jobtitle: REQUIRED_MAX_YUP,
});

export const VALIDATION_SCHEMA_FOR_ENROLMENT_FORM = yup.object().shape({
  // First step - company Info and representative contacts
  organization: yup.object().when(CURRENT_STEP, {
    is: COMPANY_INFO_STEP,
    then: yup.object().shape({
      address: yup.object().shape({
        country: yup
          .mixed()
          .required('Please enter/select a valid country name')
          .oneOf(countryList, 'Please enter/select a valid country name'),
        street: REQUIRED_MAX_YUP,
        provinceOrState: MAX_YUP,
        postalCode: MAX_YUP,
        city: REQUIRED_MAX_YUP,
      }),
      legalName: REQUIRED_MAX_YUP,
      revenue: REQUIRED_MAX_YUP,
      employeeCount: REQUIRED_MAX_YUP,
      type: REQUIRED_MAX_YUP,
      twitterHandle: yup
        .string()
        .min(2, 'Twitter handle is too short')
        .max(16, 'Twitter handle is too long')
        .matches(/^@([A-Za-z0-9_])*$/, 'Please enter a valid Twitter handle'),
    }),
  }),
  representative: yup.object().when(CURRENT_STEP, {
    is: COMPANY_INFO_STEP,
    then: yup.object().shape({
      member: CONTACT_YUP,
      marketing: CONTACT_YUP,
      accounting: CONTACT_YUP,
    }),
  }),
  purchasingAndVAT: yup.object().when(CURRENT_STEP, {
    is: COMPANY_INFO_STEP,
    then: yup.object().shape({
      purchasingProcess: REQUIRED_MAX_YUP,
      vatNumber: MAX_YUP,
      countryOfRegistration: MAX_YUP,
    }),
  }),

  // Second step - membership level
  membershipLevel: yup.string().when(CURRENT_STEP, {
    is: MEMBERSHIP_LEVEL_STEP,
    then: REQUIRED_MAX_YUP,
  }),

  // Third step - working groups
  workingGroups: yup.array().when(['skipJoiningWG', CURRENT_STEP], {
    is: (skipJoiningWG, currentStep) => !skipJoiningWG && currentStep === WORKING_GROUP_STEP,
    then: yup.array().of(
      yup.object().shape({
        workingGroup: yup
          .object()
          .nullable()
          .required('Please enter/select a valid working group')
          .test('workingGroup', 'Please enter/select a valid working group', function (selectedWG) {
            const allWorkingGroups = this.options.parent?.allWorkingGroups;
            const typedWG = this.options.parent?.['workingGroup-label'];
            const isValid = allWorkingGroups?.includes(typedWG) && selectedWG?.label ? true : false;
            return typedWG ? isValid : true;
          }),
        participationLevel: REQUIRED_MAX_YUP,
        workingGroupRepresentative: CONTACT_YUP,
      })
    ),
  }),

  // Forth, signing Authority
  signingAuthorityRepresentative: yup.object().when(CURRENT_STEP, {
    is: SIGNING_AUTHORITY_STEP,
    then: CONTACT_YUP,
  }),
});

export const VALIDATION_SCHEMA_FOR_ORG_PROFILE = yup.object().shape({
  orgProfile: yup.object().shape({
    description: MAX_YUP_SEVEN_HUNDRED,
    companyURL: MAX_YUP,
  }),
});

export const VALIDATION_SCHEMA_FOR_NEW_LINK = yup.object().shape({
  title: REQUIRED_MAX_YUP,
  description: MAX_YUP_SEVEN_HUNDRED,
  url: REQUIRED_MAX_YUP,
});
