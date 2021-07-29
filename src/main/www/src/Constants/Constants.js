/**
 * list all constants here
 *
 * The purpose of this file is try to avoid using strings directly everywhere,
 * just hope to use consistent variables for strings.
 */
export const api_prefix = () => {
  return '//' + window.location.host + '/api';
};

export const API_PREFIX_FORM = api_prefix() + '/form';
export const API_FORM_PARAM = '?sort=dateCreated&order=desc';

export const COMPANY_INFORMATION = 'Company Information';
export const MEMBERSHIP_LEVEL = 'Membership Level';
export const WORKING_GROUPS = 'Working Groups';
export const SIGNING_AUTHORITY = 'Signing Authority';
export const REVIEW = 'Review';
export const HAS_TOKEN_EXPIRED = 'HAS_TOKEN_EXPIRED';

export const LOGIN_EXPIRED_MSG =
  'Your session has expired, please sign in again.';

export const PATH_NAME_ARRAY = [
  '/company-info',
  '/membership-level',
  '/working-groups',
  '/signing-authority',
  '/review',
  '/submitted',
];

export const FETCH_METHOD = {
  POST: 'POST',
  GET: 'GET',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

export const FETCH_HEADER = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'x-Requested-With': 'JavaScript',
};

export const MEMBERSHIP_LEVELS = [
  { label: 'Strategic Member', value: 'Strategic Member' },
  {
    label: 'Contributing Member (formerly referred to as Solutions Members)',
    value: 'Contributing Member',
  },
  { label: 'Associate Member', value: 'Associate Member' },
];

export const PAGE_STEP = [
  { props: { label: COMPANY_INFORMATION, pathName: '/company-info' } },
  { props: { label: MEMBERSHIP_LEVEL, pathName: '/membership-level' } },
  { props: { label: WORKING_GROUPS, pathName: '/working-groups' } },
  { props: { label: SIGNING_AUTHORITY, pathName: '/signing-authority' } },
  { props: { label: REVIEW, pathName: '/review' } },
];

export const CONTACT_TYPE = {
  COMPANY: 'COMPANY',
  MARKETING: 'MARKETING',
  ACCOUNTING: 'ACCOUNTING',
  WORKING_GROUP: 'WORKING_GROUP',
  SIGNING: 'SIGNING',
};

export const OPTIONS_FOR_PURCHASING_PROCES = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
  { label: 'Not Applicable', value: 'na' },
];

export const END_POINT = {
  organizations: 'organizations',
  contacts: 'contacts',
  working_groups: 'working_groups',
  userinfo: 'userinfo',
  complete: 'complete',
};

// const for workingGroups string
export const workingGroups = 'workingGroups';
// const for companies string
export const companies = 'companies';

export const newForm_tempId = 'new';

export const MODE_REACT_ONLY = 'MODE_REACT_ONLY';
export const MODE_REACT_API = 'MODE_REACT_API';

export function getCurrentMode() {
  const validApiDomain = [
    '//membership-staging.eclipse.org',
    '//membership.eclipse.org/',
    '//www.rem.docker/',
    '//nginx.rem.docker/',
  ].some((value) => {
    return window.location.href.indexOf(value) !== -1;
  });

  if (validApiDomain) {
    return MODE_REACT_API;
  }

  return MODE_REACT_ONLY;
}

export const FULL_WORKING_GROUP_LIST_FOR_REACT_ONLY = [
  {
    label: 'openMobility Working Group',
    value: 'openMobility Working Group',
    participation_levels: [
      { description: 'Participant Member', relation: 'WGAPS' },
      { description: 'Committer Member', relation: 'WGFHA' },
    ],
  },
  {
    label: 'Jakarta EE Working Group',
    value: 'Jakarta EE Working Group',
    participation_levels: [
      { description: 'Strategic Member', relation: 'WGSD' },
      { description: 'Enterprise Member', relation: 'WGDSA' },
      { description: 'Participant Member', relation: 'WGAPS' },
      { description: 'Guest Member', relation: 'WGSAP' },
    ],
  },
];
