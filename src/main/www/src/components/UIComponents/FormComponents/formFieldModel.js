// The following constants are placeholders and label strings
const firstName = 'First Name';
const lastName = 'Last Name';
const email = 'Email Address';
const orgName = 'Organization Name';
const twitterLabel = 'Twitter Handle';
const twitter = '@username';
const street = 'Street';
const city = 'City';
const provinceOrState = 'Province or State';
const postalCode = 'Postal Code';
const country = 'Country';
const jobtitle = 'Job Title';
const purchasingProcess = 'Purchasing Process';
const vatNumber = 'VAT Number';
const countryOfRegistration = 'Country of Registration';
const REVENUE = 'Revenue';
const EMPLOYEE_COUNT = 'Employee Count';
const ORG_TYPE = 'Organization Type';
const MEMBERSHIP_LEVEL = 'Membership Level';
const WORKING_GROUP = 'Working Group';
const PARTICIPATION_LEVEL = 'Participation Level';
const EFFECTTIVE_DATE = 'Effective Date';
const VAT_REGISTRATION = 'Your organization is registered for VAT in the European Union';

export const requiredErrorMsg = 'Required field';

// Initial values passed to Formik, this defines
// the form fields, names, and nesting relations of the whole form
export const initialValues = {
  // Step1: Orgnaization Info
  organization: {
    id: '',
    legalName: '',
    revenue: '',
    employeeCount: '',
    type: '',
    twitterHandle: '',
    address: {
      id: '',
      street: '',
      city: '',
      provinceOrState: '',
      country: '',
      'country-label': '',
      postalCode: '',
    },
  },

  // Step1: Representatives
  representative: {
    member: {
      id: '',
      firstName: '',
      lastName: '',
      jobtitle: '',
      email: '',
    },

    marketing: {
      sameAsCompany: false,
      id: '',
      firstName: '',
      lastName: '',
      jobtitle: '',
      email: '',
    },

    accounting: {
      sameAsCompany: false,
      id: '',
      firstName: '',
      lastName: '',
      jobtitle: '',
      email: '',
    },
  },

  // Step1: purchasing and VAT
  purchasingAndVAT: {
    purchasingProcess: '',
    isRegistered: false,
    vatNumber: '',
    countryOfRegistration: '',
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
        id: '',
        sameAsCompany: false,
      },
    },
  ],

  skipJoiningWG: false,

  signingAuthorityRepresentative: {
    firstName: '',
    lastName: '',
    email: '',
    jobtitle: '',
    id: '',
  },
};

/**
 * Form fields for me to map / render the Input components,
 * so that I do not need to write each component one by one
 *
 * all the `name` is used to be passed to Formik Field Name,
 * so that Formik recognize and match the updating for inputs
 *
 * Using `.` for nested input fields
 *
 * How the fields are nested, is defined in `initialValues` passed to Formik
 * Please note the nesting or array format of this formField is not the
 * same as  `initialValues` , this formField is only for me to
 * better render the Input and pass the properties
 */
export const formField = {
  organizationId: {
    name: 'organization.id',
  },
  organizationName: {
    name: 'organization.legalName',
    label: orgName,
    placeholder: orgName,
    requiredErrorMsg: requiredErrorMsg,
  },
  organizationRevenue: {
    revenue: {
      name: 'revenue',
      label: REVENUE,
      placeholder: REVENUE,
    },
    employeeCount: {
      name: 'employeeCount',
      label: EMPLOYEE_COUNT,
      placeholder: EMPLOYEE_COUNT,
    },
  },
  organizationType: {
    name: 'organization.type',
    label: ORG_TYPE,
    placeholder: ORG_TYPE,
  },
  organizationAddress: {
    address: {
      name: 'organization.address',
    },
    street: {
      name: 'organization.address.street',
      label: street,
      placeholder: street,
      requiredErrorMsg: requiredErrorMsg,
    },
    city: {
      name: 'organization.address.city',
      label: city,
      placeholder: city,
      requiredErrorMsg: requiredErrorMsg,
    },
    provinceOrState: {
      name: 'organization.address.provinceOrState',
      label: provinceOrState,
      placeholder: provinceOrState,
      requiredErrorMsg: requiredErrorMsg,
    },
    country: {
      name: 'organization.address.country',
      label: country,
      placeholder: country,
      requiredErrorMsg: requiredErrorMsg,
    },
    postalCode: {
      name: 'organization.address.postalCode',
      label: postalCode,
      placeholder: postalCode,
      requiredErrorMsg: requiredErrorMsg,
    },
  },
  organizationTwitter: {
    name: 'organization.twitterHandle',
    label: twitterLabel,
    placeholder: twitter,
  },
  companyRep: [
    {
      name: 'firstName',
      label: firstName,
      placeholder: firstName,
      requiredErrorMsg: requiredErrorMsg,
    },
    {
      name: 'lastName',
      label: lastName,
      placeholder: lastName,
      requiredErrorMsg: requiredErrorMsg,
    },
    {
      name: 'jobtitle',
      label: jobtitle,
      placeholder: jobtitle,
      requiredErrorMsg: requiredErrorMsg,
    },
    {
      name: 'email',
      label: email,
      placeholder: email,
      requiredErrorMsg: requiredErrorMsg,
      invalidErrorMsg: 'email format is incorrect',
    },
  ],
  purchasingProcess: {
    name: 'purchasingAndVAT.purchasingProcess',
    label: purchasingProcess,
    placeholder: purchasingProcess,
  },
  vatRegistration: {
    isRegistered: {
      name: 'purchasingAndVAT.isRegistered',
      label: VAT_REGISTRATION,
    },
    vatNumber: {
      name: 'purchasingAndVAT.vatNumber',
      label: vatNumber,
      placeholder: vatNumber,
    },
    countryOfRegistration: {
      name: 'purchasingAndVAT.countryOfRegistration',
      label: countryOfRegistration,
      placeholder: countryOfRegistration,
    },
  },
  membershipLevel: {
    name: 'membershipLevel',
    label: MEMBERSHIP_LEVEL,
    requiredErrorMsg: requiredErrorMsg,
  },
  workingGroup: {
    name: 'workingGroup',
    label: WORKING_GROUP,
    requiredErrorMsg: requiredErrorMsg,
  },
  participationLevel: {
    name: 'participationLevel',
    label: PARTICIPATION_LEVEL,
  },
  effectiveDate: {
    name: 'effectiveDate',
    label: EFFECTTIVE_DATE,
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
    },
  ],

  signingAuthorityRepresentative: [
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
    },
  ],
};
