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

export const initialValues = {

  // Step1: company Info
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

  // Step1: Company Representative
  companyRepresentative: {
    representative: {
      id: '',
      firstName: '',
      lastName: '',
      jobtitle: '',
      email: ''
    },

    marketingRepresentative: {
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
  companyRepresentative: [
    {
      name: 'companyRepresentative.representative.firstName',
      label: firstName,
      placeholder: firstName,
      requiredErrorMsg: requiredErrorMsg
    },
    {
      name: 'companyRepresentative.representative.lastName',
      label: lastName,
      placeholder: lastName,
      requiredErrorMsg: requiredErrorMsg
    },
    {
      name: 'companyRepresentative.representative.jobtitle',
      label: jobtitle,
      placeholder: jobtitle,
      requiredErrorMsg: requiredErrorMsg
    },
    {
      name: 'companyRepresentative.representative.email',
      label: email,
      placeholder: email,
      requiredErrorMsg: requiredErrorMsg,
      invalidErrorMsg: 'email format is incorrect'
    }
  ],
  marketingRepresentative: [
    {
      name: 'companyRepresentative.marketingRepresentative.firstName',
      label: firstName,
      placeholder: firstName,
      requiredErrorMsg: requiredErrorMsg
    },
    {
      name: 'companyRepresentative.marketingRepresentative.lastName',
      label: lastName,
      placeholder: lastName,
      requiredErrorMsg: requiredErrorMsg
    },
    {
      name: 'companyRepresentative.marketingRepresentative.jobtitle',
      label: jobtitle,
      placeholder: jobtitle,
      requiredErrorMsg: requiredErrorMsg
    },
    {
      name: 'companyRepresentative.marketingRepresentative.email',
      label: email,
      placeholder: email,
      requiredErrorMsg: requiredErrorMsg,
      invalidErrorMsg: 'email format is incorrect'
    }
  ],
  accounting: [
    {
      name: 'companyRepresentative.accounting.firstName',
      label: firstName,
      placeholder: firstName,
      requiredErrorMsg: requiredErrorMsg
    },
    {
      name: 'companyRepresentative.accounting.lastName',
      label: lastName,
      placeholder: lastName,
      requiredErrorMsg: requiredErrorMsg
    },
    {
      name: 'companyRepresentative.accounting.jobtitle',
      label: jobtitle,
      placeholder: jobtitle,
      requiredErrorMsg: requiredErrorMsg
    },
    {
      name: 'companyRepresentative.accounting.email',
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