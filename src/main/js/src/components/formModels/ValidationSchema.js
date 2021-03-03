import * as yup from "yup";
import { requiredErrorMsg } from './formFieldModel';

// const {
//   organization,
//   companyRepresentative,
//   membershipLevel,
//   workingGroup,
//   participationLevel,
//   effectiveDate,
//   wgRepresentative,
//   signingAuthority,
//   signingAuthorityRepresentative
// } = initialValues;

export const validationSchema = [
  // First step - company Info
  yup.object().shape({
    organization: yup.object().shape({
        legalName: yup.string().required(`${requiredErrorMsg}`),
        address: yup.object().shape({
            street: yup.string().required(`${requiredErrorMsg}`),
            city: yup.string().required(`${requiredErrorMsg}`),
            provinceOrState: yup.string().required(`${requiredErrorMsg}`),
            country: yup.string().required(`${requiredErrorMsg}`),
            postalCode: yup.string().required(`${requiredErrorMsg}`),
        })
      }),

    companyRepresentative: yup.object().shape({
        representative: yup.object().shape({
            firstName: yup.string().required(`${requiredErrorMsg}`),
            lastName: yup.string().required(`${requiredErrorMsg}`),
            jobtitle: yup.string().required(`${requiredErrorMsg}`),
            email: yup.string().required(`${requiredErrorMsg}`).email('Invalid email address') 
        })
    }),
  }),

  // Second step - membership level
  yup.object().shape({
    membershipLevel: yup.string().required(`${requiredErrorMsg}`)
  }),

  // Third step - working groups
  yup.object().shape({
    workingGroup: yup.object().required(`${requiredErrorMsg}`),
    participationLevel: yup.string().when("workingGroup", {
      is: value => !!value?.value,
      then: yup.string().required(`${requiredErrorMsg}`)
    }),
    effectiveDate: yup.date().nullable().when("workingGroup", {
      is: value => !!value?.value,
      then: yup.date().required(`${requiredErrorMsg}`)
    }),
    wgRepresentative:yup.object().shape({
      firstName: yup.string().required(`${requiredErrorMsg}`),
      lastName: yup.string().required(`${requiredErrorMsg}`),
      jobtitle: yup.string().required(`${requiredErrorMsg}`),
      email: yup.string().required(`${requiredErrorMsg}`).email('Invalid email address') 
    })
  }),

  // Forth, signing Authority
  yup.object().shape({
    signingAuthority: yup.string().required(`${requiredErrorMsg}`),
    signingAuthorityRepresentative:yup.object().shape({
      firstName: yup.string().when("signingAuthority", {
        is: value => value === "noSigningAuthority",
        then: yup.string().required(`${requiredErrorMsg}`)
      }),
      lastName: yup.string().when("signingAuthority", {
        is: value => value === "noSigningAuthority",
        then: yup.string().required(`${requiredErrorMsg}`)
      }),
      jobtitle: yup.string().when("signingAuthority", {
        is: value => value === "noSigningAuthority",
        then: yup.string().required(`${requiredErrorMsg}`)
      }),
      email: yup.string().when("signingAuthority", {
        is: value => value === "noSigningAuthority",
        then: yup.string().required(`${requiredErrorMsg}`).email('Invalid email address') 
      })
    })
  })
] 