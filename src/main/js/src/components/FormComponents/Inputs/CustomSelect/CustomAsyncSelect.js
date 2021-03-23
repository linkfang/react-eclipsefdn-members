import React from 'react';
import AsyncCreatable from 'react-select/async-creatable';
import { selectTheme, generateCustomStyles } from './customSelectStyle';
import { useField } from 'formik';
import { FETCH_HEADER, companies } from '../../../../Constants/Constants';
import { formField } from '../../formModels/formFieldModel';

/**
 * !Note: 
 *  You do not need to use this component if we don't use API call for organization options, you can just use Creatable.  Please refer to https://react-select.com/creatable;  Or pure Input.
 *  You do not need to Prefill other fields or reset the other fields when select / unselect organizations, if it's not an requirement to do so. I am just offering an example how to do it.
 * **/

/**
 * Use AsyncCreatable from React Select, in order to be able to call APIs when open the dropdown, and do search APIs, please refer to https://react-select.com/creatable; And allows user to create a new option if cannot find one the user wants.
 * 
 * - Props: the same from CustomSelectWrapper.js
 * 
 *  useField(), will allow you to get [field, meta], the current Field Props
 * **/

const CustomAsyncSelect = (props) => {
  const { organizationName, organizationAddress, organizationTwitter } = formField;
  const [field, meta] = useField(props.field.name);  // or props.field, must contain name key

  /**
   * @param option - 
   *        the option you are selecting
   * @param action - 
   *        type ActionTypes = | 'clear' | 'create-option' | 'deselect-option' | 'pop-value' | 'remove-value' | 'select-option' | 'set-value'
   * Please refer to: https://react-select.com/props#prop-types 
   * 
   * option.__isNew__ defines wether the option is from the option list or input by the user
   * **/

  const handleSelect = (option, action) => {

    if (option && !option.__isNew__ && action !== 'clear') {
      if (props.srcData === companies) {

        let country = { label: option.address.country, value:option.address.country }

        // Prefill existing data to selected companies
        props.form.setFieldValue(organizationName.name, option)
        props.form.setFieldValue(organizationAddress.address.name, option.address)
        props.form.setFieldValue(organizationAddress.country.name, country)
        props.form.setFieldValue(organizationTwitter.name, option.twitterHandle)
      }
    }

    if (action.action === 'clear') {
      // Clear prefilled data when clear the selection
      if (props.srcData === companies) {

        // Need to reset the fields one by one, because the organization is a nested field, which cannot be reset to a string
        // If you do: `setFieldValue('organization', '')`, will get warning claiming that `Warning: A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen`;
        // !!! And We do not want to reset the Id Field !!!

        // Another way to reset is: (these require you get the exsiting org Id)
        /**
         * setFieldValue('organization', {
         *    id: existing id,
         *    legalName: '',
         *    address: {
         *      id: '',
         *      street: '',
         *      city: '',
         *      provinceOrState: '',
         *      country: '',
         *      postalCode: ''
         *    }
         *    twitterHandle: ''
         * })
         * 
         * 
         * Or
         * import { initialValues } from '../../formModels/formFieldModel'
         * setFieldValue('organization', initialValues.organization)
         * setFieldValue('organization.id', existing id)
         * **/

        props.form.setFieldValue(organizationName.name, '')
        props.form.setFieldValue(organizationAddress.street.name, '')
        props.form.setFieldValue(organizationAddress.city.name, '')
        props.form.setFieldValue(organizationAddress.provinceOrState.name, '')
        props.form.setFieldValue(organizationAddress.country.name, '')
        props.form.setFieldValue(organizationAddress.postalCode.name, '')
        props.form.setFieldValue(organizationTwitter.name, '')

      }
    }

    if (option && option.__isNew__) {
      // When create new organization that are not in our data
      props.form.setFieldValue(organizationName.name, option)

    }
  }

  const promiseOptions = async (inputValue) => {

      // Will use this if the api supports search
      // if(inputValue) {
      //   src_data = src_data + `?search=${inputValue}`
      // }

      let src_data;

      switch(props.srcData) {
        // This is currently using a fake data in public/companies.json
        case companies:
          src_data = 'companies.json'
          if (inputValue) {
            return fetch(src_data, { headers: FETCH_HEADER })
              .then(resp => resp.json())
              .then((data) => {
                if (data.companies) {
                  return data.companies.map(item => ({ value: item.legalName, label: item.legalName, address: item.address, twitterHandle: item.twitterHandle }));
                }
            })
          }
          else return []

        default:
          return []
      }
  }

    return (
      <AsyncCreatable
        {...field}  // Inherit field props
        aria-labelledby={props.ariaLabel}
        isClearable
        isSearchable
        cacheOptions
        defaultOptions
        loadOptions={promiseOptions}
        defaultValue={props.field.value || ''}
        onChange={(option, action) => {
          handleSelect(option, action)
        }}
        onBlur={props.form.handleBlur(props.field.name)}  // Inherit the handleBlur from formik
        styles={generateCustomStyles(true, meta.error)}
        theme={selectTheme}
        noOptionsMessage={() => 'Type to Search...'}
        className="margin-bottom-10 form-group"
      />
    )

}

export default CustomAsyncSelect