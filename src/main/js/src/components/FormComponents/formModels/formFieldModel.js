// The following constants are placeholders and label strings
const firstName = 'First Name'
const lastName = 'Last Name'
const email = 'Email Address'
const orgName = 'Organization Name'
const twitterLabel = 'Twitter Handle'
const twitter = '@username'
const street = 'Street'
const city = 'City'
const provinceOrState = 'Province Or State'
const postalCode = 'Postal Code'
const country = 'Country'
const jobtitle = 'Job Title'

export const requiredErrorMsg = 'is required'

// Initial values passed to Formik, this defines the form fields, names, and nesting relations of the whole form
export const initialValues = {

  // Step1: Orgnaization Info
  organization: {
    id: '',
    legalName: '',
    address: {
      id: '',
      street: '',
      city: '',
      provinceOrState: '',
      country: '',
      postalCode: ''
    },
    twitterHandle: '',
  },

  // Step1: Representatives
  representative: {
    company: {
      id: '',
      firstName: '',
      lastName: '',
      jobtitle: '',
      email: ''
    },

    marketing: {
      sameAsCompany: false,
      id: '',
      firstName: '',
      lastName: '',
      jobtitle: '',
      email: ''
    },

    accounting: {
      sameAsCompany: false,
      id: '',
      firstName: '',
      lastName: '',
      jobtitle: '',
      email: ''
    }
  },

  // Step 2
  membershipLevel: '',

  // Step 3: working groups
  workingGroups: [
    {
      id: '',
      workingGroup: '',
      participationLevel: '',
      effectiveDate: '',
      workingGroupRepresentative: {
        firstName: '',
        lastName: '',
        jobtitle: '',
        email: '',
        id: ''
      }
    }
  ],

  signingAuthorityRepresentative: {
    firstName: '',
    lastName: '',
    email: '',
    jobtitle: '',
    id: ''
  }

}

// Form fields for me to map / render the Input components, so that I do not need to write each component one by one

// all the `name` is used to be passed to Formik Field Name, so that Formik recognize and match the updating for inputs
// Using `.` for nested input fields 
// How the fields are nested, is defined in `initialValues` passed to Formik
// Please note the nesting or array format of this formField is not the same as  `initialValues` , this formField is only for me to better render the Input and pass the properties
export const formField = {
  organizationId: {
    name: 'organization.id'
  },
  organizationName: {
    name: 'organization.legalName',
    label: orgName,
    placeholder: orgName,
    requiredErrorMsg: requiredErrorMsg
  },
  organizationAddress: {
    address: {
      name: 'organization.address'
    },
    street: {
      name: 'organization.address.street',
      label: street,
      placeholder: street,
      requiredErrorMsg: requiredErrorMsg
    },
    city: {
      name: 'organization.address.city',
      label: city,
      placeholder: city,
      requiredErrorMsg: requiredErrorMsg
    },
    provinceOrState: {
      name: 'organization.address.provinceOrState',
      label: provinceOrState,
      placeholder: provinceOrState,
      requiredErrorMsg: requiredErrorMsg
    },
    country: {
      name: 'organization.address.country',
      label: country,
      placeholder: country,
      requiredErrorMsg: requiredErrorMsg
    },
    postalCode: {
      name: 'organization.address.postalCode',
      label: postalCode,
      placeholder: postalCode,
      requiredErrorMsg: requiredErrorMsg
    }
  },
  organizationTwitter: {
    name: 'organization.twitterHandle',
    label: twitterLabel,
    placeholder: twitter,
  },
  company: [
    {
      name: 'representative.company.firstName',
      label: firstName,
      placeholder: firstName,
      requiredErrorMsg: requiredErrorMsg
    },
    {
      name: 'representative.company.lastName',
      label: lastName,
      placeholder: lastName,
      requiredErrorMsg: requiredErrorMsg
    },
    {
      name: 'representative.company.jobtitle',
      label: jobtitle,
      placeholder: jobtitle,
      requiredErrorMsg: requiredErrorMsg
    },
    {
      name: 'representative.company.email',
      label: email,
      placeholder: email,
      requiredErrorMsg: requiredErrorMsg,
      invalidErrorMsg: 'email format is incorrect'
    }
  ],
  marketing: [
    {
      name: 'representative.marketing.firstName',
      label: firstName,
      placeholder: firstName,
      requiredErrorMsg: requiredErrorMsg
    },
    {
      name: 'representative.marketing.lastName',
      label: lastName,
      placeholder: lastName,
      requiredErrorMsg: requiredErrorMsg
    },
    {
      name: 'representative.marketing.jobtitle',
      label: jobtitle,
      placeholder: jobtitle,
      requiredErrorMsg: requiredErrorMsg
    },
    {
      name: 'representative.marketing.email',
      label: email,
      placeholder: email,
      requiredErrorMsg: requiredErrorMsg,
      invalidErrorMsg: 'email format is incorrect'
    }
  ],
  accounting: [
    {
      name: 'representative.accounting.firstName',
      label: firstName,
      placeholder: firstName,
      requiredErrorMsg: requiredErrorMsg
    },
    {
      name: 'representative.accounting.lastName',
      label: lastName,
      placeholder: lastName,
      requiredErrorMsg: requiredErrorMsg
    },
    {
      name: 'representative.accounting.jobtitle',
      label: jobtitle,
      placeholder: jobtitle,
      requiredErrorMsg: requiredErrorMsg
    },
    {
      name: 'representative.accounting.email',
      label: email,
      placeholder: email,
      requiredErrorMsg: requiredErrorMsg,
      invalidErrorMsg: 'email format is incorrect'
    }
  ],
  membershipLevel: {
    name: 'membershipLevel',
    label: 'Membership Level',
    requiredErrorMsg: requiredErrorMsg
  },
  workingGroup: {
    name: 'workingGroup',
    label: 'Working Group',
    requiredErrorMsg: requiredErrorMsg,
  },
  participationLevel: {
    name: 'participationLevel',
    label: 'Participation Level',
  },
  effectiveDate: {
    name: 'effectiveDate',
    label: 'Effective Date',
    requiredErrorMsg: requiredErrorMsg,
  },

  workingGroupRepresentative: [
    {
      name: 'firstName',
      label: firstName,
      placeholder: firstName,
    },
    {
      name: 'lastName',
      label: lastName,
      placeholder: lastName,
    },
    {
      name: 'jobtitle',
      label: jobtitle,
      placeholder: jobtitle,
    },
    {
      name: 'email',
      label: email,
      placeholder: email,
    }
  ],

  signingAuthorityRepresentative: [
    {
      name: 'signingAuthorityRepresentative.firstName',
      label: firstName,
      placeholder: firstName,
    },
    {
      name: 'signingAuthorityRepresentative.lastName',
      label: lastName,
      placeholder: lastName,
    },
    {
      name: 'signingAuthorityRepresentative.jobtitle',
      label: jobtitle,
      placeholder: jobtitle,
    },
    {
      name: 'signingAuthorityRepresentative.email',
      label: email,
      placeholder: email,
    }
  ]
}