import {
  FETCH_METHOD,
  CONTACT_TYPE,
  END_POINT,
  API_PREFIX_FORM,
  FETCH_HEADER,
  getCurrentMode,
  MODE_REACT_ONLY,
  MODE_REACT_API,
  api_prefix,
  HAS_TOKEN_EXPIRED,
} from '../Constants/Constants';

export const isProd = window.location.href.includes('//membership.eclipse.org/');

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
    if (keyArray[i] !== 'id' && keyArray[i] !== 'type' && compnayRep[keyArray[i]] !== otherContact[keyArray[i]]) {
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
    revenue: existingOrganizationData?.aggregate_revenue || '',
    employeeCount: existingOrganizationData?.employee_count || '',
    type: existingOrganizationData?.organization_type || '',
    address: {
      id: existingOrganizationData?.address?.id || '',
      street: existingOrganizationData?.address?.address_line_1 || '',
      streetTwo: existingOrganizationData?.address?.address_line_2 || '',
      city: existingOrganizationData?.address?.locality || '',
      provinceOrState: existingOrganizationData?.address?.administrative_area || '',
      country: existingOrganizationData?.address?.country || '',
      'country-label': {
        label: existingOrganizationData?.address?.country || '',
        value: existingOrganizationData?.address?.country || '',
      },
      postalCode: existingOrganizationData?.address?.postal_code || '',
    },
    twitterHandle: existingOrganizationData?.twitter || '',
  };
}

/**
 * @param existingPurchasingAndVATData -
 * Existing purchasing process and VAT data, fetched from server
 */
export function mapPurchasingAndVAT(existingPurchasingAndVATData) {
  return {
    // Step1: purchasing process and VAT Info
    id: existingPurchasingAndVATData?.id || '',
    isRegistered: !!existingPurchasingAndVATData?.registration_country,
    purchasingProcess: existingPurchasingAndVATData?.purchase_order_required || '',
    vatNumber: existingPurchasingAndVATData?.vat_number || '',
    countryOfRegistration: existingPurchasingAndVATData?.registration_country || '',
  };
}

/**
 * @param existingContactData -
 * Existing Contacts data, fetched from server
 * **/
export function matchContactFields(existingContactData) {
  let existingCompanyContact = existingContactData.find((el) => el?.type === CONTACT_TYPE.COMPANY);
  let existingMarketingContact = existingContactData.find((el) => el?.type === CONTACT_TYPE.MARKETING);
  let existingAccoutingContact = existingContactData.find((el) => el?.type === CONTACT_TYPE.ACCOUNTING);
  let existingSigningContact = existingContactData.find((el) => el?.type === CONTACT_TYPE.SIGNING);

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
        sameAsCompany: checkSameContact(existingCompanyContact, existingMarketingContact),
      },

      accounting: {
        id: existingAccoutingContact?.id || '',
        firstName: existingAccoutingContact?.first_name || '',
        lastName: existingAccoutingContact?.last_name || '',
        jobtitle: existingAccoutingContact?.job_title || '',
        email: existingAccoutingContact?.email || '',
        sameAsCompany: checkSameContact(existingCompanyContact, existingAccoutingContact),
      },
    },

    signingAuthorityRepresentative: {
      id: existingSigningContact?.id || '',
      firstName: existingSigningContact?.first_name || '',
      lastName: existingSigningContact?.last_name || '',
      jobtitle: existingSigningContact?.job_title || '',
      email: existingSigningContact?.email || '',
      sameAsCompany: checkSameContact(existingCompanyContact, existingSigningContact),
    },
  };
}

/**
 * @param existingworkingGroupData -
 * Existing working groups data, fetched from server
 * @param workingGroupsOptions -
 * Options of working groups to select, fetched from server
 */
export function matchWorkingGroupFields(existingworkingGroupData, workingGroupsOptions, existingCompanyContact) {
  var res = [];
  // Array
  existingworkingGroupData.forEach((item) => {
    let wg = workingGroupsOptions?.find((el) => el.label === item?.working_group_id);
    const basicRepInfo = {
      firstName: item?.contact?.first_name || '',
      lastName: item?.contact?.last_name || '',
      jobtitle: item?.contact?.job_title || '',
      email: item?.contact?.email || '',
    };
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
        ...basicRepInfo,
        id: item?.contact?.id || '',
        sameAsCompany: checkSameContact(existingCompanyContact, basicRepInfo),
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
      locality: organizationData.address.city,
      country: organizationData.address.country,
      postal_code: organizationData.address.postalCode || '',
      administrative_area: organizationData.address.provinceOrState || '',
      address_line_1: organizationData.address.street,
      address_line_2: organizationData.address.streetTwo,
    },
    form_id: formId,
    id: organizationData.id,
    legal_name: organizationData.legalName,
    twitter: organizationData.twitterHandle || '',
    aggregate_revenue: organizationData.revenue,
    employee_count: organizationData.employeeCount,
    organization_type: organizationData.type,
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
export function matchMembershipLevelFieldsToBackend(membershipLevelFormData, formId, userId) {
  return {
    id: formId,
    user_id: userId,
    membership_level: membershipLevelFormData.membershipLevel,
    signing_authority: true, //what does this do?
    purchase_order_required: membershipLevelFormData.purchasingAndVAT.purchasingProcess,
    vat_number: membershipLevelFormData.purchasingAndVAT.vatNumber,
    registration_country: membershipLevelFormData.purchasingAndVAT.countryOfRegistration,
    state: 'INPROGRESS',
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

  const theDate = new Date();

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
  setFieldValueObj,
  updateFormValuesObj,
  callbackFunc
) {
  switch (step) {
    case 1:
      callSendData(
        formId,
        END_POINT.organizations,
        matchCompanyFieldsToBackend(formData.organization, formId),
        step,
        {
          fieldName: setFieldValueObj.fieldName.organization,
          method: setFieldValueObj.method,
        },
        updateFormValuesObj
      );
      callSendData(
        formId,
        END_POINT.contacts,
        matchContactFieldsToBackend(formData.representative.member, CONTACT_TYPE.COMPANY, formId),
        step,
        {
          fieldName: setFieldValueObj.fieldName.member,
          method: setFieldValueObj.method,
        },
        updateFormValuesObj
      );
      callSendData(
        formId,
        END_POINT.contacts,
        matchContactFieldsToBackend(formData.representative.marketing, CONTACT_TYPE.MARKETING, formId),
        step,
        {
          fieldName: setFieldValueObj.fieldName.marketing,
          method: setFieldValueObj.method,
        },
        updateFormValuesObj
      );
      callSendData(
        formId,
        END_POINT.contacts,
        matchContactFieldsToBackend(formData.representative.accounting, CONTACT_TYPE.ACCOUNTING, formId),
        step,
        {
          fieldName: setFieldValueObj.fieldName.accounting,
          method: setFieldValueObj.method,
        },
        updateFormValuesObj
      );
      callSendData(formId, '', matchMembershipLevelFieldsToBackend(formData, formId, userId), '');
      let isWGRepSameAsCompany = false;
      formData.workingGroups.map(
        (wg) => (isWGRepSameAsCompany = wg.workingGroupRepresentative?.sameAsCompany || isWGRepSameAsCompany)
      );
      // only do this API call when there is at least 1 WG rep is same as company rep
      if (isWGRepSameAsCompany) {
        formData.workingGroups.forEach((item, index) => {
          callSendData(
            formId,
            END_POINT.working_groups,
            matchWGFieldsToBackend(item, formId),
            '',
            setFieldValueObj,
            updateFormValuesObj,
            index
          );
        });
      }
      break;

    case 2:
      callSendData(formId, '', matchMembershipLevelFieldsToBackend(formData, formId, userId), step);
      break;

    case 3:
      formData.workingGroups.forEach((item, index) => {
        callSendData(
          formId,
          END_POINT.working_groups,
          matchWGFieldsToBackend(item, formId),
          step,
          setFieldValueObj,
          updateFormValuesObj,
          index
        );
      });
      break;

    case 4:
      callSendData(
        formId,
        END_POINT.contacts,
        matchContactFieldsToBackend(formData.signingAuthorityRepresentative, CONTACT_TYPE.SIGNING, formId),
        step,
        setFieldValueObj,
        updateFormValuesObj
      );
      break;

    case 5:
      callSendData(formId, END_POINT.complete, false, step, setFieldValueObj, '', '', callbackFunc);
      break;

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
  stepNum,
  setFieldValueObj,
  updateFormValuesObj,
  index,
  callbackFunc
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
    !isProd && console.log(`You called ${url} with Method ${method} and data body is:`);
    !isProd && console.log(JSON.stringify(dataBody));
  }

  if (getCurrentMode() === MODE_REACT_API) {
    fetch(url, {
      method: method,
      headers: FETCH_HEADER,
      body: JSON.stringify(dataBody),
    })
      .then((res) => {
        if (res.ok) {
          if (stepNum === 5) {
            callbackFunc && callbackFunc();
            return res;
          }
          return res.json();
        }

        requestErrorHandler(res.status);
        throw res.status;
      })
      .then((data) => {
        if (setFieldValueObj && method === 'POST') {
          // update the field id after a successful post
          switch (setFieldValueObj.fieldName) {
            case 'organization':
              setFieldValueObj.method(`${setFieldValueObj.fieldName}.id`, data[0]?.id);
              setFieldValueObj.method('organization.address.id', data[0]?.address?.id);
              updateFormValuesObj.theNewValue.organization.id = data[0]?.id;
              updateFormValuesObj.theNewValue.organization.address.id = data[0]?.address?.id;
              updateFormValuesObj.setUpdatedFormValues(updateFormValuesObj.theNewValue);
              break;

            case 'representative.member':
              setFieldValueObj.method(`${setFieldValueObj.fieldName}.id`, data[0]?.id);
              updateFormValuesObj.theNewValue.representative.member.id = data[0]?.id;
              updateFormValuesObj.setUpdatedFormValues(updateFormValuesObj.theNewValue);
              break;

            case 'representative.marketing':
              setFieldValueObj.method(`${setFieldValueObj.fieldName}.id`, data[0]?.id);
              updateFormValuesObj.theNewValue.representative.marketing.id = data[0]?.id;
              updateFormValuesObj.setUpdatedFormValues(updateFormValuesObj.theNewValue);
              break;

            case 'representative.accounting':
              setFieldValueObj.method(`${setFieldValueObj.fieldName}.id`, data[0]?.id);
              updateFormValuesObj.theNewValue.representative.accounting.id = data[0]?.id;
              updateFormValuesObj.setUpdatedFormValues(updateFormValuesObj.theNewValue);
              break;

            case 'workingGroups':
              setFieldValueObj.method(`workingGroups[${index}].id`, data[0]?.id);
              setFieldValueObj.method(`workingGroups[${index}].workingGroupRepresentative.id`, data[0]?.contact?.id);
              if (updateFormValuesObj?.theNewValue) {
                updateFormValuesObj.theNewValue.workingGroups[index].id = data[0]?.id;
                updateFormValuesObj.theNewValue.workingGroups[index].workingGroupRepresentative.id =
                  data[0]?.contact?.id;
                updateFormValuesObj.setUpdatedFormValues(updateFormValuesObj.theNewValue);
              }
              break;

            case 'signingAuthorityRepresentative':
              setFieldValueObj.method.signingAuthority(`${setFieldValueObj.fieldName}.id`, data[0]?.id);
              setFieldValueObj.method.companyInfo(`${setFieldValueObj.fieldName}.id`, data[0]?.id);
              updateFormValuesObj.theNewValue.signingAuthorityRepresentative.id = data[0]?.id;
              updateFormValuesObj.setUpdatedFormValues(updateFormValuesObj.theNewValue);
              break;

            default:
              break;
          }
        }
      })
      .catch((err) => {
        console.log(err);
        // This will make sure when "then" is skipped, we could still handle the error
        // And because this "err" is just an error message without error/status code, so we use 0 here.
        requestErrorHandler(err);
      });
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
    callback && callback(index);
  }

  // If the not using java server, just remove it from frontend
  if (getCurrentMode() === MODE_REACT_ONLY && index) {
    callback && callback(index);
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
      headers: FETCH_HEADER,
    })
      .then((res) => {
        if (res.ok) {
          // Remove from frontend
          callback && callback(index);
          return Promise.resolve(res);
        }

        requestErrorHandler(res.status);
        throw res.status;
      })
      .catch((err) => {
        console.log(err);
        requestErrorHandler(err);
      });
  }
}
/**
 * Handle New Form
 *
 * @param setCurrentFormId - setCurrentFormId function from membership context
 * @param formData - Filled whole form data stored in formik context
 * @param userId - User Id fetched from the server when sign in, sotored in membership context, used for calling APIs
 * @param goToCompanyInfoStep - Go to the next step and add this step to complete set, passed from FormikStepper Component
 *
 * The logic:
 * - POST a new form and returned the new form Id
 * - Store the returned new form Id in my FormId Context
 * - Send the API calls to organizations and contacts
 * **/
export function handleNewForm(setCurrentFormId, goToCompanyInfoStep) {
  goToCompanyInfoStep();

  if (getCurrentMode() === MODE_REACT_API) {
    var dataBody = {
      membership_level: '',
      signing_authority: false,
      purchase_order_required: '',
      state: 'INPROGRESS',
    };

    fetch(API_PREFIX_FORM, {
      method: FETCH_METHOD.POST,
      headers: FETCH_HEADER,
      body: JSON.stringify(dataBody),
    })
      .then((res) => {
        if (res.ok) return res.json();

        requestErrorHandler(res.status);
        throw res.status;
      })
      .then((data) => {
        !isProd && console.log('Start with a new form:', data);
        setCurrentFormId(data[0]?.id);
      })
      .catch((err) => {
        console.log(err);
        requestErrorHandler(err);
      });
  }

  // Probably Also need to delete the old form Id, or keep in the db for 30 days
}

export function requestErrorHandler(statusCode) {
  const origin = window.location.origin;

  switch (statusCode) {
    case 404:
      window.location.assign(origin + '/404');
      break;
    case 500:
      window.location.assign(origin + '/50x');
      break;
    case 401:
      sessionStorage.setItem(HAS_TOKEN_EXPIRED, 'true');
      window.location.assign(origin + '/');
      break;
    case 499:
      sessionStorage.setItem(HAS_TOKEN_EXPIRED, 'true');
      window.location.assign(origin + '/');
      break;
    default:
      window.location.assign(origin + '/50x');
      break;
  }
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function isObjectEmpty(obj) {
  for (const key in obj) {
    // Do not need to check the value of id or allWorkingGroups, as they are not provided by users
    if (key === 'id' || key === 'allWorkingGroups') {
      continue;
    }

    const element = obj[key];
    if (typeof element === 'object') {
      if (!isObjectEmpty(element)) {
        return false;
      }
    } else if (element !== '' && element !== false) {
      return false;
    }
  }
  return true;
}

export function validateGoBack(isEmpty, result, formik, setShouldOpen, navigate, isNotFurthestPage) {
  // Save values on current step if it's NOT empty and passes validation
  if (!isEmpty && Object.keys(result).length <= 0) {
    formik.submitForm();
  }

  // Open modal window if it's NOT empty and fails to pass validation
  // OR open it if it's emtpy and NOT the furthest page
  if ((!isEmpty && Object.keys(result).length > 0) || (isEmpty && isNotFurthestPage)) {
    formik.setTouched(result);
    setShouldOpen(true);
    return;
  }

  navigate();
}

export function checkIsNotFurthestPage(currentIndex, furthestIndex) {
  if (currentIndex === 3) {
    // For wg/3rd step, it can be empty, and clear and remove operation will update the database when user does so
    // So, no need to roll back the data
    return false;
  }
  return currentIndex < furthestIndex;
}

export const logout = () => {
  fetch(`${api_prefix()}/logout`)
    .then(() => {
      window.location.assign('/');
    })
    .catch((err) => {
      console.log(err);
      window.location.assign('/');
    });
};

export const checkValidityWithoutSubmitting = (ev) => {
  // Do checkValidity without submitting will make Select component in Material-UI get focused if it's invalid without refreshing the page
  ev.preventDefault();
  ev.currentTarget.checkValidity();
};

export const focusOnInvalidField = () => {
  const firstInvalidField = document.querySelector('input[aria-invalid="true"]');
  firstInvalidField && firstInvalidField.focus();
};
