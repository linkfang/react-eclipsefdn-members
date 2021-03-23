import * as yup from 'yup';
import { requiredErrorMsg } from './formFieldModel';

/**
 * Validation schema passed to Formik
 * Formik will recognize the name, and assign to the fields that who should use which validation
 * Library Yup: please refer to: https://github.com/jquense/yup
 * The field name, and nesting relationships must be exact the same as the `initialValues` in formFieldModel.js
 * Formik + Yup, please refer to: https://formik.org/docs/guides/validation#validationschema
 * 
 * Using Array, matches the Form Step Child react component array, so:
 * When render the first step component, validation schema passed to is validationSchema[0], which is { organization, representative }; Please refer to:
 * ```
 * const childrenArray = React.Children.toArray(children);
 * const currentChild = childrenArray[step];
 * const currentValidationSchema = validationSchema[step];
 * ```
 * In FormikStepper/FormikStepper.js
 * 
 * .required(), .email() are builtin API of Yup to check if a required field is entered, and the email is valid format
 * the string params passed to required() and email() is the error message
 * the formik.errors is an object of {fieldName: "error message"}, please refer to: https://formik.org/docs/api/formik#errors--field-string-string- 
 * 
 * **/

export const validationSchema = [

  // First step - company Info
  yup.object().shape({
    organization: yup.object().shape({
      legalName: yup.mixed().required(`${requiredErrorMsg}`),
      address: yup.object().shape({
        street: yup.string().required(`${requiredErrorMsg}`),
        city: yup.string().required(`${requiredErrorMsg}`),
        provinceOrState: yup.mixed().required(`${requiredErrorMsg}`),
        country: yup.mixed().required(`${requiredErrorMsg}`),
        postalCode: yup.string().required(`${requiredErrorMsg}`),
      })
    }),

    // First step - representative contacts
    representative: yup.object().shape({
      company: yup.object().shape({
          firstName: yup.string().required(`${requiredErrorMsg}`),
          lastName: yup.string().required(`${requiredErrorMsg}`),
          jobtitle: yup.string().required(`${requiredErrorMsg}`),
          email: yup.string().required(`${requiredErrorMsg}`).email('Invalid email address') 
      }),
      marketing: yup.object().shape({
        sameAsCompany: yup.boolean(),
        firstName: yup.string().when('sameAsCompany', {
          is: false,
          then: yup.string().required(`${requiredErrorMsg}`)
        }),
        lastName: yup.string().when('sameAsCompany', {
          is: false,
          then: yup.string().required(`${requiredErrorMsg}`)
        }),
        jobtitle: yup.string().when('sameAsCompany', {
          is: false,
          then: yup.string().required(`${requiredErrorMsg}`)
        }),
        email: yup.string().when('sameAsCompany', {
          is: false,
          then: yup.string().required(`${requiredErrorMsg}`).email('Invalid email address')
        })
      }),
      accounting: yup.object().shape({
        sameAsCompany: yup.boolean(),
        firstName: yup.string().when('sameAsCompany', {
          is: false,
          then: yup.string().required(`${requiredErrorMsg}`)
        }),
        lastName: yup.string().when('sameAsCompany', {
          is: false,
          then: yup.string().required(`${requiredErrorMsg}`)
        }),
        jobtitle: yup.string().when('sameAsCompany', {
          is: false,
          then: yup.string().required(`${requiredErrorMsg}`)
        }),
        email: yup.string().when('sameAsCompany', {
          is: false,
          then: yup.string().required(`${requiredErrorMsg}`).email('Invalid email address')
        })
      })
    }),
  }),

  // Second step - membership level
  yup.object().shape({
    membershipLevel: yup.mixed().required(`${requiredErrorMsg}`)
  }),

  // Third step - working groups
  yup.object().shape({
    workingGroups: yup.array().of(
      yup.object().shape({
        workingGroup: yup.mixed().required(`${requiredErrorMsg}`),
        participationLevel: yup.mixed().when('workingGroup', {
          is: value => !!value?.value,  // If workingGroup field has selected values, participation level is required;
          then: yup.mixed().required(`${requiredErrorMsg}`)
        }),
        effectiveDate: yup.mixed().when('workingGroup', {
          is: value => !!value?.value, // If workingGroup field has selected values, effective Date is required;
          then: yup.mixed().required(`${requiredErrorMsg}`)
        }),
        workingGroupRepresentative:yup.object().when('workingGroup', {
          is: value => !!value?.value, // If workingGroup field has selected values, workingGroup Representative is required;
          then: yup.object().shape({
            firstName: yup.string().required(`${requiredErrorMsg}`),
            lastName: yup.string().required(`${requiredErrorMsg}`),
            jobtitle: yup.string().required(`${requiredErrorMsg}`),
            email: yup.string().required(`${requiredErrorMsg}`).email('Invalid email address')
          })
        })
      })
    )
  }),

  // Forth, signing Authority
  yup.object().shape({
    signingAuthorityRepresentative:yup.object().shape({
      firstName: yup.string().required(`${requiredErrorMsg}`),
      lastName: yup.string().required(`${requiredErrorMsg}`),
      jobtitle: yup.string().required(`${requiredErrorMsg}`),
      email: yup.string().required(`${requiredErrorMsg}`).email('Invalid email address')
    })
  })
]