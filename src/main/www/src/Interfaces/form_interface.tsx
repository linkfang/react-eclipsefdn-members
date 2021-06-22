export interface FormValue {
  organization: {
    id: string;
    legalName: string;
    address: {
      id: string;
      street: string;
      city: string;
      provinceOrState: string;
      country: string;
      'country-label': string;
      postalCode: string;
    };
    twitterHandle: string;
  };
  representative: {
    member: {
      id: string;
      firstName: string;
      lastName: string;
      jobtitle: string;
      email: string;
    };
    marketing: {
      sameAsCompany: boolean;
      id: string;
      firstName: string;
      lastName: string;
      jobtitle: string;
      email: string;
    };
    accounting: {
      sameAsCompany: boolean;
      id: string;
      firstName: string;
      lastName: string;
      jobtitle: string;
      email: string;
    };
  };
  purchasingAndVAT: {
    purchasingProcess: string;
    'purchasingProcess-label': { label: string; value: string };
    vatNumber: number | string;
    countryOfRegistration: string;
  };
  'membershipLevel-label': { label: string; value: string };
  membershipLevel: string;
  workingGroups: [WorkingGroups];
  signingAuthorityRepresentative: {
    firstName: string;
    lastName: string;
    email: string;
    jobtitle: string;
    id: string;
  };
}

export interface WorkingGroups {
  id: string;
  workingGroup: {
    label: string;
    value: string;
    participationLevel: [string];
  };
  participationLevel: string;
  effectiveDate: string;
  workingGroupRepresentative: {
    firstName: string;
    lastName: string;
    jobtitle: string;
    email: string;
    id: string;
  };
}
