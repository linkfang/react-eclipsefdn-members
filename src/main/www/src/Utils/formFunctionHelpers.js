import {
  FETCH_METHOD,
  CONTACT_TYPE,
  END_POINT,
  API_PREFIX_FORM,
  FETCH_HEADER,
  getCurrentMode,
  MODE_REACT_ONLY,
  MODE_REACT_API,
  OPTIONS_FOR_PURCHASING_PROCES,
} from '../Constants/Constants';

/**
 * checkSameContact
 *
 * @param compnayRep - The company representative contact info object
 * @param otherContact - The representative contact info object that used to compare with company representative, which normally are
 * marketing representative, and accounting representative
 */
function checkSameContact(compnayRep, otherContact) {
  if (!otherContact || !compnayRep) {
    return false;
  }

  const keyArray = Object.keys(compnayRep);

  // Check contacts' name, email and jobtitle to check if they are the same
  for (let i = 0; i < keyArray.length; i++) {
    if (
      keyArray[i] !== 'id' &&
      keyArray[i] !== 'type' &&
      compnayRep[keyArray[i]] !== otherContact[keyArray[i]]
    ) {
      return false;
    }
  }

  return true;
}

/**
 * @param currentContact - The representative contact info object that used to compare with company representative, which normally are
 * marketing representative, and accounting representative
 * @param companyContact - The company representative contact info object
 */
export function assignContactData(currentContact, companyContact) {
  currentContact.firstName = companyContact.firstName;
  currentContact.lastName = companyContact.lastName;
  currentContact.jobtitle = companyContact.jobtitle;
  currentContact.email = companyContact.email;
}

//== Transform data from backend to match my form model

/**
 * Notes:
 * The match data functions look repeated on the properties, because of the naming convention is somehow different in JS and the data object retrieved from backend. JS uses camelCase.
 * Another reason I am making complicated `legalName` and `country` match, is due to the library React-Select. It needs to use the `{label: foo, value: foo}` format to be able shown on the select input fields.
 * Please refer to: https://github.com/formium/formik/discussions/2954
 * and https://github.com/JedWatson/react-select/issues/3761
 * and https://github.com/JedWatson/react-select/issues/4321
 *
 * https://github.com/JedWatson/react-select/issues/3761 shows how you can use without mapping as a label, but I wanted to use the label to be shown in the preview, thus, still used { label: value: } format.
 *
 */

/**
 * @param existingOrganizationData -
 * Existing Organization data, fetched from server
 */
export function matchCompanyFields(existingOrganizationData) {
  return {
    // Step1: company Info
    id: existingOrganizationData?.id || '',
    legalName: existingOrganizationData?.legal_name || '',
    address: {
      id: existingOrganizationData?.address.id || '',
      street: existingOrganizationData?.address.street || '',
      city: existingOrganizationData?.address.city || '',
      provinceOrState: existingOrganizationData?.address.province_state || '',
      country: existingOrganizationData?.address.country || '',
      'country-label': {
        label: existingOrganizationData?.address.country || '',
        value: existingOrganizationData?.address.country || '',
      },
      postalCode: existingOrganizationData?.address.postal_code || '',
    },
    twitterHandle: existingOrganizationData?.twitter_handle || '',
  };
}

/**
 * @param existingPurchasingAndVATData -
 * Existing purchasing process and VAT data, fetched from server
 */
export function mapPurchasingAndVAT(existingPurchasingAndVATData) {
  const currentOption = OPTIONS_FOR_PURCHASING_PROCES.find(
    (item) =>
      item.value === existingPurchasingAndVATData.purchase_order_required
  );
  return {
    // Step1: purchasing process and VAT Info
    id: existingPurchasingAndVATData?.id || '',
    legalName: existingPurchasingAndVATData?.legal_name || '',

    purchasingProcess: existingPurchasingAndVATData.purchase_order_required,
    'purchasingProcess-label': currentOption,
    vatNumber: existingPurchasingAndVATData.vat_number,
    countryOfRegistration: existingPurchasingAndVATData.registration_country,
  };
}

/**
 * @param membershipLevel -
 * Existing membershipLevel data, fetched from server
 * @param membership_levels
 * Options of membership levels, created in Constants file, passed from membership level step
 */
export function mapMembershipLevel(existingMembershipLevel, membership_levels) {
  let membership = membership_levels.find(
    (el) => el.value === existingMembershipLevel
  );
  return {
    label: membership?.label,
    value: existingMembershipLevel,
  };
}

/**
 * @param existingContactData -
 * Existing Contacts data, fetched from server
 * **/
export function matchContactFields(existingContactData) {
  let existingCompanyContact = existingContactData.find(
    (el) => el.type === CONTACT_TYPE.COMPANY
  );
  let existingMarketingContact = existingContactData.find(
    (el) => el.type === CONTACT_TYPE.MARKETING
  );
  let existingAccoutingContact = existingContactData.find(
    (el) => el.type === CONTACT_TYPE.ACCOUNTING
  );
  let existingSigningContact = existingContactData.find(
    (el) => el.type === CONTACT_TYPE.SIGNING
  );

  return {
    organizationContacts: {
      member: {
        id: existingCompanyContact?.id || '',
        firstName: existingCompanyContact?.first_name || '',
        lastName: existingCompanyContact?.last_name || '',
        jobtitle: existingCompanyContact?.job_title || '',
        email: existingCompanyContact?.email || '',
      },

      marketing: {
        id: existingMarketingContact?.id || '',
        firstName: existingMarketingContact?.first_name || '',
        lastName: existingMarketingContact?.last_name || '',
        jobtitle: existingMarketingContact?.job_title || '',
        email: existingMarketingContact?.email || '',
        sameAsCompany: checkSameContact(
          existingCompanyContact,
          existingMarketingContact
        ),
      },

      accounting: {
        id: existingAccoutingContact?.id || '',
        firstName: existingAccoutingContact?.first_name || '',
        lastName: existingAccoutingContact?.last_name || '',
        jobtitle: existingAccoutingContact?.job_title || '',
        email: existingAccoutingContact?.email || '',
        sameAsCompany: checkSameContact(
          existingCompanyContact,
          existingAccoutingContact
        ),
      },
    },

    signingAuthorityRepresentative: {
      id: existingSigningContact?.id || '',
      firstName: existingSigningContact?.first_name || '',
      lastName: existingSigningContact?.last_name || '',
      jobtitle: existingSigningContact?.job_title || '',
      email: existingSigningContact?.email || '',
    },
  };
}

/**
 * @param existingworkingGroupData -
 * Existing working groups data, fetched from server
 * @param workingGroupsOptions -
 * Options of working groups to select, fetched from server
 */
export function matchWorkingGroupFields(
  existingworkingGroupData,
  workingGroupsOptions
) {
  var res = [];
  // Array
  existingworkingGroupData.forEach((item, index) => {
    let wg = workingGroupsOptions?.find(
      (el) => el.label === item?.working_group_id
    );
    res.push({
      id: item?.id || '',
      workingGroup:
        {
          label: wg?.label,
          value: item?.working_group_id,
          participation_levels: wg?.participation_levels,
        } || '',
      participationLevel: item?.participation_level || '',
      effectiveDate: item?.effective_date?.substring(0, 10) || '',
      workingGroupRepresentative: {
        firstName: item?.contact.first_name || '',
        lastName: item?.contact.last_name || '',
        jobtitle: item?.contact.job_title || '',
        email: item?.contact.email || '',
        id: item?.contact.id || '',
      },
    });
  });

  return res;
}

//== Transform data from my form model to PUT or POST for backend

/**
 * @param organizationData -
 * Filled Organization data, stored in formik context
 * @param formId -
 * Form Id fetched from the server, sotored in membership context, used for calling APIs
 * **/
export function matchCompanyFieldsToBackend(organizationData, formId) {
  var org = {
    address: {
      city: organizationData.address.city,
      country: organizationData.address.country,
      postal_code: organizationData.address.postalCode,
      province_state: organizationData.address.provinceOrState,
      street: organizationData.address.street,
    },
    form_id: formId,
    id: organizationData.id,
    legal_name: organizationData.legalName,
    twitter_handle: organizationData.twitterHandle || '',
  };

  if (organizationData.address.id) {
    org.address.id = organizationData.address.id;
  }

  return org;
}

/**
 * @param membershipLevel - Filled membership level data, stored in formik context
 * @param formId - Form Id fetched from the server, sotored in membership context, used for calling APIs
 * @param userId - User Id fetched from the server when sign in, sotored in membership context, used for calling APIs
 */
export function matchMembershipLevelFieldsToBackend(
  membershipLevelFormData,
  formId,
  userId
) {
  return {
    id: formId,
    user_id: userId,
    membership_level: membershipLevelFormData.membershipLevel,
    signing_authority: true, //what does this do?
    purchase_order_required:
      membershipLevelFormData.purchasingAndVAT.purchasingProcess,
    vat_number: membershipLevelFormData.purchasingAndVAT.vatNumber,
    registration_country:
      membershipLevelFormData.purchasingAndVAT.countryOfRegistration,
  };
}

/**
 * @param contactData -Filled contacts data, stored in formik context
 * @param contactType - WORKING_GROUP, MARKETING, ACCOUNTING, COMPNAY, one of the types
 * @param formId - Form Id fetched from the server, sotored in membership context, used for calling APIs
 */
export function matchContactFieldsToBackend(contactData, contactType, formId) {
  if (contactType === CONTACT_TYPE.WORKING_GROUP && !contactData.id) {
    return {
      form_id: formId,
      first_name: contactData.firstName,
      last_name: contactData.lastName,
      job_title: contactData.jobtitle,
      email: contactData.email,
      type: contactType,
    };
  }

  return {
    id: contactData.id,
    form_id: formId,
    first_name: contactData.firstName,
    last_name: contactData.lastName,
    job_title: contactData.jobtitle,
    email: contactData.email,
    type: contactType,
  };
}

/**
 * @param eachWorkingGroupData - Filled working group data, stored in formik context
 * @param formId - Form Id fetched from the server, sotored in membership context, used for calling APIs
 */
export function matchWGFieldsToBackend(eachWorkingGroupData, formId) {
  var wg_contact = matchContactFieldsToBackend(
    eachWorkingGroupData.workingGroupRepresentative,
    CONTACT_TYPE.WORKING_GROUP,
    formId
  );

  const theDate = eachWorkingGroupData?.effectiveDate
    ? new Date(eachWorkingGroupData?.effectiveDate)
    : new Date();

  return {
    id: eachWorkingGroupData?.id,
    working_group_id: eachWorkingGroupData?.workingGroup.value,
    participation_level: eachWorkingGroupData?.participationLevel,
    effective_date: theDate.toISOString().replace(/.\d+Z$/g, 'Z'),
    contact: {
      ...wg_contact,
    },
  };
}

//== EXECUTE Send Data function

/**
 * @param step - The current step that is sending data
 * @param formData - Filled whole form data stored in formik context
 * @param formId - Form Id fetched from the server, sotored in membership context, used for calling APIs
 * @param userId - User Id fetched from the server when sign in, sotored in membership context, used for calling APIs
 */
export async function executeSendDataByStep(
  step,
  formData,
  formId,
  userId,
  redirectTo,
  setFieldValueObj
) {
  switch (step) {
    case 1:
      callSendData(
        formId,
        END_POINT.organizations,
        matchCompanyFieldsToBackend(formData.organization, formId),
        redirectTo,
        {
          fieldName: setFieldValueObj.fieldName.organization,
          method: setFieldValueObj.method,
        }
      );
      callSendData(
        formId,
        END_POINT.contacts,
        matchContactFieldsToBackend(
          formData.representative.member,
          CONTACT_TYPE.COMPANY,
          formId
        ),
        redirectTo,
        {
          fieldName: setFieldValueObj.fieldName.member,
          method: setFieldValueObj.method,
        }
      );
      callSendData(
        formId,
        END_POINT.contacts,
        matchContactFieldsToBackend(
          formData.representative.marketing,
          CONTACT_TYPE.MARKETING,
          formId
        ),
        redirectTo,
        {
          fieldName: setFieldValueObj.fieldName.marketing,
          method: setFieldValueObj.method,
        }
      );
      callSendData(
        formId,
        END_POINT.contacts,
        matchContactFieldsToBackend(
          formData.representative.accounting,
          CONTACT_TYPE.ACCOUNTING,
          formId
        ),
        redirectTo,
        {
          fieldName: setFieldValueObj.fieldName.accounting,
          method: setFieldValueObj.method,
        }
      );
      callSendData(
        formId,
        '',
        matchMembershipLevelFieldsToBackend(formData, formId, userId),
        redirectTo
      );
      break;

    case 2:
      callSendData(
        formId,
        '',
        matchMembershipLevelFieldsToBackend(formData, formId, userId),
        redirectTo
      );
      break;

    case 3:
      formData.workingGroups.forEach((item, index) => {
        callSendData(
          formId,
          END_POINT.working_groups,
          matchWGFieldsToBackend(item, formId),
          redirectTo,
          setFieldValueObj,
          index
        );
      });
      break;

    case 4:
      callSendData(
        formId,
        END_POINT.contacts,
        matchContactFieldsToBackend(
          formData.signingAuthorityRepresentative,
          CONTACT_TYPE.SIGNING,
          formId
        ),
        redirectTo,
        setFieldValueObj
      );
      return;

    default:
      return;
  }
}

/**
 * @param formId - Form Id fetched from the server, sotored in membership context, used for calling APIs
 * @param endpoint - To which endpoint the fetch is calling to backend:
 * /form/{id}, /form/{id}/organizations/{id}, /form/{id}/contacts/{id}, /form/{id}/working_groups/{id}
 * @param dataBody - The data body passed to server, normally is the filled form data to be saved
 * If empty, is creating a new entity, use POST method;
 * If has value, is fetched from server, use PUT or DELETE;
 */
function callSendData(
  formId,
  endpoint = '',
  dataBody,
  redirectTo,
  setFieldValueObj,
  index
) {
  const entityId = dataBody.id ? dataBody.id : '';
  const method = dataBody.id ? FETCH_METHOD.PUT : FETCH_METHOD.POST;

  let url = API_PREFIX_FORM + `/${formId}`;

  if (endpoint) {
    url = API_PREFIX_FORM + `/${formId}/${endpoint}`;
  }

  if (entityId && entityId !== formId) {
    url = API_PREFIX_FORM + `/${formId}/${endpoint}/${entityId}`;
  }

  delete dataBody.id;

  if (getCurrentMode() === MODE_REACT_ONLY) {
    console.log(`You called ${url} with Method ${method} and data body is:`);
    console.log(JSON.stringify(dataBody));
  }

  if (getCurrentMode() === MODE_REACT_API) {
    fetch(url, {
      method: method,
      headers: FETCH_HEADER,
      body: JSON.stringify(dataBody),
    })
      .then((res) => {
        if (res.ok) return res.json();

        requestErrorHandler(res.status, redirectTo);
        throw new Error(`${res.status} ${res.statusText}`);
      })
      .then((data) => {
        if (setFieldValueObj && method === 'POST') {
          // update the field id after a successful post
          switch (setFieldValueObj.fieldName) {
            case 'organization':
              setFieldValueObj.method(
                `${setFieldValueObj.fieldName}.id`,
                data[0].id
              );
              setFieldValueObj.method(
                'organization.address.id',
                data[0]?.address.id
              );
              break;

            case 'representative.member':
              setFieldValueObj.method(
                `${setFieldValueObj.fieldName}.id`,
                data.id
              );
              break;

            case 'representative.marketing':
              setFieldValueObj.method(
                `${setFieldValueObj.fieldName}.id`,
                data.id
              );
              break;

            case 'representative.accounting':
              setFieldValueObj.method(
                `${setFieldValueObj.fieldName}.id`,
                data.id
              );
              break;

            case 'workingGroups':
              setFieldValueObj.method(`workingGroups[${index}].id`, data[0].id);
              setFieldValueObj.method(
                `workingGroups[${index}].workingGroupRepresentative.id`,
                data[0].contact.id
              );
              break;

            case 'signingAuthorityRepresentative':
              setFieldValueObj.method.signingAuthority(
                `${setFieldValueObj.fieldName}.id`,
                data.id
              );
              setFieldValueObj.method.companyInfo(
                `${setFieldValueObj.fieldName}.id`,
                data.id
              );
              break;

            default:
              break;
          }
        }
      })
      .catch((err) => console.log(err));
  }
}

/**
 * DELETE
 *
 * @param formId - Form Id fetched from the server, sotored in membership context, used for calling APIs
 * @param endpoint - To which endpoint the fetch is calling to backend:
 * /form/{id}, /form/{id}/organizations/{id}, /form/{id}/contacts/{id}, /form/{id}/working_groups/{id}
 * @param entityId - The Id of organizations, or contacts, or working groups entry;
 * If empty, is creating a new entity, use POST method;
 * If has value, is fetched from server, use PUT or DELETE;
 * @param callback - Callback function, called when fetch resolved
 * @param index - Typically for working groups, which one is deleted
 * Typically is used by the callback function from WorkingGroup Component (arrayhelpers.remove())
 */
export function deleteData(formId, endpoint, entityId, callback, index) {
  // If the added field array is not in the server, just remove it from frontend
  if (!entityId) {
    callback(index);
  }

  // If the not using java server, just remove it from frontend
  if (getCurrentMode() === MODE_REACT_ONLY) {
    callback(index);
  }

  // If removing existing working_group
  if (entityId) {
    let url = API_PREFIX_FORM + `/${formId}`;
    if (endpoint) {
      url = API_PREFIX_FORM + `/${formId}/${endpoint}`;
    }
    if (entityId && entityId !== formId) {
      url = API_PREFIX_FORM + `/${formId}/${endpoint}/${entityId}`;
    }
    fetch(url, {
      method: FETCH_METHOD.DELETE,
    }).then((res) => {
      console.log(res.status);
      // Remove from frontend
      if (res.status === 200) {
        callback(index);
        return Promise.resolve(res);
      }
    });
  }
}
/**
 * Handle New Form
 *
 * @param setCurrentFormId - setCurrentFormId function from membership context
 * @param formData - Filled whole form data stored in formik context
 * @param userId - User Id fetched from the server when sign in, sotored in membership context, used for calling APIs
 * @param defaultBehaviour - Go to the next step and add this step to complete set, passed from FormikStepper Component
 *
 * The logic:
 * - POST a new form and returned the new form Id
 * - Store the returned new form Id in my FormId Context
 * - Send the API calls to organizations and contacts
 * **/
export async function handleNewForm(setCurrentFormId, defaultBehaviour) {
  defaultBehaviour();

  if (getCurrentMode() === MODE_REACT_API) {
    var dataBody = {
      membership_level: '',
      signing_authority: false,
    };

    fetch(API_PREFIX_FORM, {
      method: FETCH_METHOD.POST,
      headers: FETCH_HEADER,
      body: JSON.stringify(dataBody),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Start with a new form:', data);
        setCurrentFormId(data[0]?.id);
      })
      .catch((err) => console.log(err));
  }

  // Probably Also need to delete the old form Id, or keep in the db for 30 days
}

export function requestErrorHandler(statusCode, redirectTo) {
  switch (statusCode) {
    case 404:
      redirectTo('/404');
      break;
    case 500:
      redirectTo('/50x');
      break;
    default:
      break;
  }
}
