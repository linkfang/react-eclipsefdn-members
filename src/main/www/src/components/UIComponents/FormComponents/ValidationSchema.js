import * as yup from 'yup';
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

export const validationSchema = [
  // First step - company Info
  yup.object().shape({
    // First step - representative contacts
    organization: yup.object().shape({
      address: yup.object().shape({
        country: yup
          .mixed()
          .oneOf(countryList, 'Please enter/select a valid country name'),
      }),

      twitterHandle: yup
        .string()
        .min(2, 'Twitter handle is too short')
        .max(16, 'Twitter handle is too long')
        .matches(/^@([A-Za-z0-9_])*$/, 'Please enter a valid Twitter handle'),
    }),
    representative: yup.object().shape({
      member: yup.object().shape({
        email: yup.string().email('Please enter a valid email'),
      }),
      marketing: yup.object().shape({
        email: yup.string().email('Please enter a valid email'),
      }),
      accounting: yup.object().shape({
        email: yup.string().email('Please enter a valid email'),
      }),
    }),
  }),

  // Second step - membership level
  yup.object().shape({
    'membershipLevel-label': yup.mixed(),
  }),

  // Third step - working groups
  yup.object().shape({
    workingGroups: yup.array().of(
      yup.object().shape({
        workingGroup: yup
          .object()
          .nullable()
          .test(
            'workingGroup',
            'Please enter/select a valid working group',
            function (selectedWG) {
              const allWorkingGroups = this.options.parent?.allWorkingGroups;
              const typedWG = this.options.parent?.['workingGroup-label'];
              const isValid =
                allWorkingGroups?.includes(typedWG) && selectedWG?.label
                  ? true
                  : false;

              return typedWG ? isValid : true;
            }
          ),
        workingGroupRepresentative: yup.object().shape({
          email: yup.string().email('Please enter a valid email'),
        }),
      })
    ),
  }),

  // Forth, signing Authority
  yup.object().shape({
    signingAuthorityRepresentative: yup.object().shape({
      firstName: yup.string().required(`${requiredErrorMsg}`),
      lastName: yup.string().required(`${requiredErrorMsg}`),
      jobtitle: yup.string().required(`${requiredErrorMsg}`),
      email: yup.string().email('Please enter a valid email'),
    }),
  }),
];
