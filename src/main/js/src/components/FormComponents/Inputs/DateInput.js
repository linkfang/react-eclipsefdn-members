import React, { forwardRef } from 'react';
import { FastField } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './dateInputstyles.css';

const DateInput = (props) => {
  const { label, name, ...rest } = props
  const ref = React.createRef()

  const CustomDateInput = forwardRef((props, ref) => {

    return (
        <div className="input-group">
           <input
            // {...props}
            id={props.id}
            name={props.name}
            onClick={props.onClick}
            onChange={props.onChange}
            ref={ref}
            value={props.value}
            placeholder="Date"
            type="text"
            className={`form-control margin-bottom-10 ${props.meta.touched && props.meta.error ? "form-border-error" : ""}`} 
            aria-labelledby={props.name}
          />
          <span className="input-group-addon"><span className="glyphicon glyphicon-calendar" /></span>
        </div>
    )
  })

  return (
    <>
      <FastField name={name}>
        {({ form, field, meta }) => {
          const { setFieldValue } = form
          const { value } = field
          return (
            <>
            <DatePicker
              id={name}
              {...field}
              {...rest}
              selected={(value && new Date(value)) || null}
              onChange={val => {
                setFieldValue(name, val);
              }}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              customInput={<CustomDateInput meta={meta} id={name} name={name} ref={ref} />}
              // className={`form-control margin-bottom-10 ${meta.touched && meta.error ? "form-border-error" : ""}`}
            />
            {/* <span className="input-group-addon" id="date"><span className="glyphicon glyphicon-calendar" /></span> */}
            </>
          )
        }}
      </FastField>
    </>
  )
}

export default DateInput