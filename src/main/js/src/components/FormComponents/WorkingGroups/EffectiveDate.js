import React from 'react';
import DateInput from '../Inputs/DateInput';

const EffectiveDate = ({ name }) => {

  return (
    <>
    <h3 className="fw-600 margin-top-30 h4" id={name}>What is the effective date for your Membership Agreement/ Working Group Participation Agreement?<span className="orange-star margin-left-5">*</span></h3>
    <div className="row">
      <div className="col-md-10">
        <DateInput label="EffectiveDate" name={name} />
      </div>
    </div>
    </>
  )
}

export default EffectiveDate