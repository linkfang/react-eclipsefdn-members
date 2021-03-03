import React from "react";
import Select from './Inputs/Select';
import MembershipFeeTable from './MembershipFeeTable';

const MembershipLevel = ({ formField }) => {

  const dropdownOptions = [
    { name: 'Select a level', value: '' },
    { name: 'Strategic Members', value: 'strategic' },
    { name: 'Contributing Members (formerly referred to as Solutions Members)', value: 'contributing' },
    { name: 'Associate Members', value: 'associate' },
    { name: 'Committer Members', value: 'committer' }
  ]

  return (
    <>
      <h4>What is your intended Membership Level? </h4>
      <Select
        label="Membership Level"
        name="membershipLevel"
        options={dropdownOptions}
      />
      <p>The table is from here https://www.eclipse.org/membership/documents/membership-prospectus.pdf</p>
      <MembershipFeeTable />
    </>
  );
};

export default MembershipLevel
