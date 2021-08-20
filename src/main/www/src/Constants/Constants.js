/**
 * list all constants here
 *
 * The purpose of this file is try to avoid using strings directly everywhere,
 * just hope to use consistent variables for strings.
 */

import {
  // Home as HomeIcon,
  Assessment as AssessmentIcon,
  Business as BusinessIcon,
  BusinessCenter as BusinessCenterIcon,
  PeopleAlt as PeopleAltIcon,
  Description as DescriptionIcon,
  Help as HelpIcon,
  RecentActors as RecentActorsIcon,
} from '@material-ui/icons';

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

export const LOGIN_EXPIRED_MSG = 'Your session has expired, please sign in again.';

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

export const OPTIONS_FOR_PURCHASING_PROCESS = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
  { label: 'Not Applicable', value: 'na' },
];

export const OPTIONS_FOR_REVENUE_CURRENCY = [
  { label: 'USD', value: 'usd' },
  { label: 'EUR', value: 'eur' },
];

export const OPTIONS_FOR_ORG_TYPE = [
  { label: 'For Profit Organization', value: 'FOR_PROFIT_ORGANIZATION' },
  {
    label: 'Non-Profit Open Source Organization/User Group',
    value: 'NON_PROFIT_OPEN_SOURCE',
  },
  { label: 'Academic Organization', value: 'ACADEMIC' },
  { label: 'Standards Organization', value: 'STANDARDS' },
  {
    label: 'Government Organization, Government Agency, or NGO',
    value: 'GOVERNMENT_ORGANIZATION_AGENCY_NGO',
  },
  { label: 'Publishing/Media Organization', value: 'MEDIA_ORGANIZATION' },
  { label: 'Research Institute', value: 'RESEARCH' },
  { label: 'All others', value: 'OTHER' },
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
    charter: 'https://www.eclipse.org/org/workinggroups/openmobility_charter.php',
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
    charter: 'https://www.eclipse.org/org/workinggroups/jakarta_ee_charter.php',
  },
];

export const NAV_OPTIONS_DATA = [
  // {
  //   name: 'Home',
  //   path: '/home',
  //   icon: <HomeIcon />,
  // },
  {
    name: 'Dashboard',
    path: '/portal/dashboard',
    icon: <AssessmentIcon />,
  },
  {
    name: 'Your Organization Profile',
    path: '/portal/org-profile',
    // don't find an icon match the design
    icon: <BusinessIcon />,
  },
  {
    name: 'Projects and Working Groups',
    path: '/portal/dashboard#projects-wg',
    icon: <BusinessCenterIcon />,
  },
  {
    name: 'Committers and Contributors',
    path: '/portal/dashboard#committers-contributors',
    icon: <PeopleAltIcon />,
  },
  {
    name: 'Resources',
    path: '/portal/dashboard#resources',
    icon: <DescriptionIcon />,
  },
  {
    name: 'FAQs',
    path: '/portal/dashboard#faqs',
    icon: <HelpIcon />,
  },
  {
    name: 'Contact Management',
    path: '/portal/contact-management',
    icon: <RecentActorsIcon />,
  },
];

// Constants for styles
export const drawerWidth = 280;
export const themeBlack = '#0B0B0B';
export const darkOrange = '#DD730A';
export const brightOrange = '#FC9D05';
export const iconGray = '#9B9BAE';
export const darkGray = '#807C7C';
export const borderRadiusSize = 5;
export const mainContentBGColor = '#fff';
export const brightBlue = '#08BDF4';
