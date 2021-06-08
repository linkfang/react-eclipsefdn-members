/**
 * list all constants here
 *
 * The purpose of this file is try to avoid using strings directly everywhere,
 * just hope to use consistent variables for strings.
 */
export const api_prefix = () => {
  return '//' + window.location.host;
};

export const api_prefix_form = api_prefix() + '/form';
export const api_prefix_wg = api_prefix() + '/';

export const COMPANY_INFORMATION = 'Company Information';
export const MEMBERSHIP_LEVEL = 'Membership Level';
export const WORKING_GROUPS = 'Working Groups';
export const SIGNING_AUTHORITY = 'Signing Authority';
export const REVIEW = 'Review';

export const FETCH_METHOD = {
  POST: 'POST',
  GET: 'GET',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

export const FETCH_HEADER = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export const membership_levels = [
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

export const contact_type = {
  COMPANY: 'COMPANY',
  MARKETING: 'MARKETING',
  ACCOUNTING: 'ACCOUNTING',
  WORKING_GROUP: 'WORKING_GROUP',
};

export const end_point = {
  organizations: 'organizations',
  contacts: 'contacts',
  working_groups: 'working_groups',
  userinfo: 'userinfo',
};

// const for workingGroups string
export const workingGroups = 'workingGroups';
// const for companies string
export const companies = 'companies';

export const newForm_tempId = 'new';

export const MODE_REACT_ONLY = 'MODE_REACT_ONLY';
export const MODE_REACT_API = 'MODE_REACT_API';

export function getCurrentMode() {
  if (window.location.href.includes('//www.rem.docker/')) {
    return MODE_REACT_API;
  }
  return MODE_REACT_ONLY;
}

export const fullWorkingGroupListForReactOnly = [
  {
    label: 'AsciiDoc',
    value: 'AsciiDoc',
    participation_levels: [
      {
        company_size: 10,
        document_id: '2',
        level: 'Partner members',
      },
      {
        document_id: '2',
        level: 'Committer members',
      },
      {
        document_id: '2',
        level: 'Guest members',
      },
    ],
  },
  {
    label: 'Internet of Things - IoT',
    value: 'Internet of Things - IoT',
    participation_levels: [
      {
        document_id: '1',
        level: 'Strategic Member',
      },
      {
        document_id: '1',
        level: 'Participant Member',
      },
      {
        document_id: '1',
        level: 'Guest Member',
      },
    ],
  },
];
