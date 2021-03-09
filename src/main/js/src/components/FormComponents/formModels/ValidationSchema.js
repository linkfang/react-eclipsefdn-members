import * as yup from 'yup';
import { requiredErrorMsg } from './formFieldModel';

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
    companyRepresentative: yup.object().shape({
      representative: yup.object().shape({
          firstName: yup.string().required(`${requiredErrorMsg}`),
          lastName: yup.string().required(`${requiredErrorMsg}`),
          jobtitle: yup.string().required(`${requiredErrorMsg}`),
          email: yup.string().required(`${requiredErrorMsg}`).email('Invalid email address') 
      }),
      marketingRepresentative: yup.object().shape({
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
          is: value => !!value?.value,
          then: yup.mixed().required(`${requiredErrorMsg}`)
        }),
        effectiveDate: yup.mixed().when('workingGroup', {
          is: value => !!value?.value,
          then: yup.mixed().required(`${requiredErrorMsg}`)
        }),
        workingGroupRepresentative:yup.object().when('workingGroup', {
          is: value => !!value?.value,
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