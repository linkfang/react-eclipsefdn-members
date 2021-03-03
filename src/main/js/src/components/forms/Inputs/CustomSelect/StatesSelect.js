import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useFormikContext } from 'formik';

const StatesSelect = (props) => {
  const { values } = useFormikContext()
  const [stateData, setStateData] = useState([])

  useEffect(() => {
      if (values.organization.address.country.value) {
        fetch("countries_states/states.json", {
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          })
          .then(res => res.json())
          .then(data => {
            let tempData = data.states?.filter(el => el.country_id === values.organization.address.country.value.toString())
            setStateData(tempData?.map(item => ({ value: item.id, label: item.name })))
          })
      }
  }, [values.organization.address.country.value])

  const handleSelect = (option, action) => {

    if (option && action !== "clear") {
        props.form.setFieldValue("organization.address.provinceOrState", option)
    }

    if (action.action === "clear") {
        props.form.setFieldValue("organization.address.provinceOrState", "")
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

export default StatesSelect