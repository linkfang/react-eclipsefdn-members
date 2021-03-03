import React, { useEffect, useState } from 'react';
import Select from 'react-select';

const CountrySelect = (props) => {

  const [stateData, setStateData] = useState([])

  useEffect(() => {
    let isSubscribed = true;

    fetch("countries_states/countries.json", {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => {
        if (isSubscribed) {
          setStateData(data.countries?.map(item => ({ value: item.id, label: item.name })))
        }
      })

    // cancel subscription to useEffect
    return () => (isSubscribed = false)
  }, [])

  const handleSelect = (option, action) => {

    if (option && action !== "clear") {
        props.form.setFieldValue("organization.address.country", option)
    }

    if (action.action === "clear") {
        props.form.setFieldValue("organization.address.country", "")
    }
  }

  return (
    <Select
      isSearchable
      options={stateData}
      defaultValue={props.field?.value || ""}
      onChange={(option, action) => {
        handleSelect(option, action)
      }}
      onBlur={props.form.handleBlur(props.field.name)}
    />
  )

}

export default CountrySelect