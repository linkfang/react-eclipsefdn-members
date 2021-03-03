// Probably to be deleted
export const initialValues = {

  // Step1: company Info
  organization: {
    legalName: "",
    address: {
      street: "",
      city: "",
      provinceOrState: "",
      country: "",
      postalCode: ""
    },
    twitterHandle: "",  
  },

  // Step1: Company Representative
  companyRepresentative: {
    representative: {
      firstName: "",
      lastName: "",
      jobtitle: "",
      email: ""
    },

    marketingRepresentative: {
      firstName: "",
      lastName: "",
      jobtitle: "",
      email: ""
    },

    accounting: {
      firstName: "",
      lastName: "",
      jobtitle: "",
      email: ""
    }
  },

  // Step 2
  membershipLevel: "",

  // Step 3: working groups
  workingGroup: "",
  participationLevel: "",
  effectiveDate: "",
  wgRepresentative: {
    firstName: "",
    lastName: "",
    jobtitle: "",
    email: ""
  },

  signingAuthority: "",

  signingAuthorityRepresentative: {
    firstName: "",
    lastName: "",
    jobtitle: "",
    email: ""
  }

}

// Probably to be deleted
export function mapField(object) {
  let arr = []
  for(const property in object) {
    arr.push(property)
  }

  return arr
}

const firstName = "First Name"
const lastName = "Last Name"
const email = "Email Address"
const orgName = "Organization Name"
const jobtitle = "Job Title"
export const requiredErrorMsg = "is required"

export const formField = {
  organizationName: {
    name: 'organization.name',
    label: orgName,
    placeholder: orgName,
    requiredErrorMsg: requiredErrorMsg
  },
  organizationAddress: [
    {
      name: 'organization.address.street',
      label: 'Street',
      placeholder: "Street",
      requiredErrorMsg: requiredErrorMsg
    },
    {
      name: 'organization.address.city',
      label: 'City',
      placeholder: "City",
      requiredErrorMsg: requiredErrorMsg
    },
    {
      name: 'organization.address.provinceOrState',
      label: 'Province or State',
      placeholder: "Province or State",
      requiredErrorMsg: requiredErrorMsg
    },
    {
      name: 'organization.address.country',
      label: 'Country',
      placeholder: "Country",
      requiredErrorMsg: requiredErrorMsg
    },
    {
      name: 'organization.address.postalCode',
      label: 'PostalCode',
      placeholder: "PostalCode",
      requiredErrorMsg: requiredErrorMsg,
      invalidErrorMsg: 'PostalCode is not valid (e.g. K1N 6N5)'
    }
  ],
  companyTwitter: {
    name: 'organization.twitterHandle',
    label: 'Twitter',
    placeholder: "Twitter",
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
    name: "effectiveDate",
    label: 'Effective Date',
    requiredErrorMsg: requiredErrorMsg,
  },

  wgRepresentative: [
    {
      name: "wgRepresentative.firstName",
      label: firstName,
      placeholder: firstName,
    },
    {
      name: "wgRepresentative.lastName",
      label: lastName,
      placeholder: lastName,
    },
    {
      name: "wgRepresentative.jobtitle",
      label: jobtitle,
      placeholder: jobtitle,
    },
    {
      name: "wgRepresentative.email",
      label: email,
      placeholder: email,
    }
  ],
  signingAuthority: {
    name: "signingAuthority",
    label: "signing Authority",
  },
  signingAuthorityRepresentative: [
    {
      name: "signingAuthorityRepresentative.firstName",
      label: firstName,
      placeholder: firstName,
    },
    {
      name: "signingAuthorityRepresentative.lastName",
      label: lastName,
      placeholder: lastName,
    },
    {
      name: "signingAuthorityRepresentative.jobtitle",
      label: jobtitle,
      placeholder: jobtitle,
    },
    {
      name: "signingAuthorityRepresentative.email",
      label: email,
      placeholder: email,
    }
  ]
}

// Probably to be deleted
export function defineExistingInitialValues(initialValues, existingOrganizationData, existingContactData, existingMembershipData) {
  if(existingOrganizationData && existingOrganizationData.address) {
    initialValues.organization.address.street = existingOrganizationData.address.street || ""
    initialValues.organization.address.city = existingOrganizationData.address.city || ""
    initialValues.organization.address.country = existingOrganizationData.address.country || ""
    initialValues.organization.address.postalCode = existingOrganizationData.address.postal_code || ""
    initialValues.organization.address.provinceOrState = existingOrganizationData.address.province_state || ""
  }

  if(existingOrganizationData && existingOrganizationData.legal_name) {
    initialValues.organization.legalName =  {
      value: existingOrganizationData.legal_name,
      label: existingOrganizationData.legal_name,
      address: initialValues.organization.address,
      twitterHandle: initialValues.organization.twitterHandle
    } || ""
  }

  if(existingContactData) {
    initialValues.companyRepresentative.representative.firstName = existingContactData.first_name || ""
    initialValues.companyRepresentative.representative.lastName = existingContactData.last_name || ""
    initialValues.companyRepresentative.representative.jobtitle = existingContactData.title || ""
    initialValues.companyRepresentative.representative.email = existingContactData.email || ""
  }

  if (existingMembershipData) {
    initialValues.membershipLevel = existingMembershipData.membership_level || ""
  }

  return initialValues

}

// Probably keep this one
export function defineExistingInitialValues_II(existingOrganizationData, existingContactData, existingMembershipData) {

  let existingCompanyContact = existingContactData.find(el => el.type === "company")
  let existingMarketingContact = existingContactData.find(el => el.type === "marketing")
  let existingAccoutingContact = existingContactData.find(el => el.type === "accounting")
  let existingWGContact = existingContactData.find(el => el.type === "working_group")

  return {
  // Step1: company Info
  organization: {
    legalName: {
      value: existingOrganizationData?.legal_name || "",
      label: existingOrganizationData?.legal_name || "",
      address: existingOrganizationData?.address || "",
      twitterHandle: existingOrganizationData?.twitterHandle || ""
    } || "",
    address: {
      street: existingOrganizationData?.address.street || "",
      city: existingOrganizationData?.address.city || "",
      provinceOrState: existingOrganizationData?.address.province_state || "",
      country: existingOrganizationData?.address.country || "",
      postalCode: existingOrganizationData?.address.postal_code || "",
    },
    twitterHandle: existingOrganizationData?.twitterHandle || "",  
  },

  // Step1: Company Representative
  companyRepresentative: {
    representative: {
      firstName: existingCompanyContact?.first_name || "",
      lastName: existingCompanyContact?.last_name || "",
      jobtitle: existingCompanyContact?.title || "",
      email: existingCompanyContact?.email || ""
    },

    marketingRepresentative: {
      firstName: existingMarketingContact?.first_name || "",
      lastName: existingMarketingContact?.last_name || "",
      jobtitle: existingMarketingContact?.title || "",
      email: existingMarketingContact?.email || ""
    },

    accounting: {
      firstName: existingAccoutingContact?.first_name || "",
      lastName: existingAccoutingContact?.last_name || "",
      jobtitle: existingAccoutingContact?.title || "",
      email: existingAccoutingContact?.email || ""
    }
  },

  // Step 2
  membershipLevel: existingMembershipData?.membership_level || "",

  // Step 3: working groups
  workingGroup: "",
  participationLevel: "",
  effectiveDate: "",

  wgRepresentative: {
    firstName: existingWGContact?.first_name || "",
    lastName: existingWGContact?.last_name || "",
    jobtitle: existingWGContact?.title || "",
    email: existingWGContact?.email || ""
  },

  signingAuthority: "",

  signingAuthorityRepresentative: {
    firstName: "",
    lastName: "",
    jobtitle: "",
    email: ""
  }
  }
}