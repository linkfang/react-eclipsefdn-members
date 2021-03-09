import React from 'react';
import AsyncCreatable from 'react-select/async-creatable';
import { selectTheme, generateCustomStyles } from './customSelectStyle';
import { useField } from 'formik';
import { FETCH_HEADER, companies } from '../../../../Constants/Constants';
import { formField } from '../../formModels/formFieldModel';

const CustomAsyncSelect = (props) => {
  const { organizationName, organizationAddress, organizationTwitter } = formField;
  const [field, meta] = useField(props.field.name);  // or props.field, must contain name key

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
        {...field}
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
        onBlur={props.form.handleBlur(props.field.name)}
        styles={generateCustomStyles(true, meta.error)}
        theme={selectTheme}
        noOptionsMessage={() => 'Type to Search...'}
        className="margin-bottom-10 form-group"
      />
    )

}

export default CustomAsyncSelect