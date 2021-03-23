// list all constants here

// The purpose of this file is try to avoid using strings directly everywhere, just hope to use consistant variables for strings

export const api_prefix = 'http://localhost:8090';
export const api_prefix_form = 'http://localhost:8090/form';

export const COMPANY_INFORMATION = 'Company Information';
export const MEMBERSHIP_LEVEL = 'Membership Level';
export const WORKING_GROUPS = 'Working Groups';
export const SIGNING_AUTHORITY = 'Signing Authority';
export const REVIEW = 'Review';

export const FETCH_METHOD = {
    POST: 'POST',
    GET: 'GET',
    PUT: 'PUT',
    DELETE: 'DELETE'
}

export const FETCH_HEADER = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}

export const membership_levels = [
    { label: 'Select a level', value: '' },
    { label: 'Strategic Member', value: 'strategic' },
    { label: 'Contributing Member (formerly referred to as Solutions Members)', value: 'contributing' },
    { label: 'Associate Member', value: 'associate' }
]

export const fakeChildrenArray = [
    {props: { label: COMPANY_INFORMATION }}, 
    {props: { label: MEMBERSHIP_LEVEL }},
    {props: { label: WORKING_GROUPS }},
    {props: { label: SIGNING_AUTHORITY }},
    {props: { label: REVIEW }}
]

export const contact_type = {
    COMPANY: 'COMPANY',
    MARKETING: 'MARKETING',
    ACCOUNTING: 'ACCOUNTING',
    WORKING_GROUP: 'WORKING_GROUP'
}

export const end_point = {
    organizations: 'organizations',
    contacts: 'contacts',
    working_groups: 'working_groups',
    userinfo: 'userinfo'
}

// const for workingGroups string
export const workingGroups = 'workingGroups';
// const for companies string
export const companies = 'companies';

export const newForm_tempId = 'new';

export const MODE_REACT_ONLY = 'MODE_REACT_ONLY';
export const MODE_REACT_API = 'MODE_REACT_API';

export function getCurrentMode() {
    if (window.location.href.includes('http://localhost:3000')) {
        return MODE_REACT_ONLY;
    } else return MODE_REACT_API;
}