import Input from '../../UIComponents/Inputs/Input';
import { formField } from '../../UIComponents/FormComponents/formFieldModel';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';

/**
 * Render Oraganization selector (used React-Select)
 *
 * Render Organization twitter, and address inputs,
 * including Country selector (used React-Select
 * and country-list library of updated
 * correct country list names)
 */

const CompanyInformationCompany = ({ formik, useStyles }) => {
  const classes = useStyles();
  const { organizationName, organizationTwitter, organizationAddress } =
    formField;

  // get country list library and map as option pass to the React-Select
  const countryList = require('country-list')
    .getNames()
    .map((item) => ({ label: item, value: item }));

  return (
    <>
      <h2 className="fw-600 h4" id={organizationName.name}>
        Organization <span className="orange-star">*</span>
      </h2>

      <Input
        name={organizationName.name}
        labelName={organizationName.label}
        placeholder={organizationName.placeholder}
        ariaLabel={organizationName.name}
        requiredMark={true}
        value={formik.values.organization.legalName}
        onChange={formik.handleChange}
      />
      <div className="row">
        <div className="col-md-8">
          <Input
            name={organizationTwitter.name}
            labelName={organizationTwitter.label}
            placeholder={organizationTwitter.placeholder}
            ariaLabel={organizationName.name}
            requiredMark={true}
            value={formik.values.organization.twitterHandle}
            onChange={formik.handleChange}
          />
        </div>
      </div>

      <h4 className="fw-600" id={`${organizationName.name}-address`}>
        Address
      </h4>
      <div className="row">
        <div className="col-md-16">
          <Input
            name={organizationAddress.street.name}
            labelName={organizationAddress.street.label}
            placeholder={organizationAddress.street.placeholder}
            requiredMark={true}
            value={formik.values.organization.address.street}
            onChange={formik.handleChange}
            ariaLabel={`${organizationName.name}-address`}
          />
        </div>
        <div className="col-md-8">
          <Input
            name={organizationAddress.city.name}
            labelName={organizationAddress.city.label}
            placeholder={organizationAddress.city.placeholder}
            requiredMark={true}
            value={formik.values.organization.address.city}
            onChange={formik.handleChange}
            ariaLabel={`${organizationName.name}-address`}
          />
        </div>
      </div>

      <div className="row margin-bottom-40">
        <div className="col-md-8">
          <Autocomplete
            id={organizationAddress.country.name}
            options={countryList}
            getOptionLabel={(option) => (option?.label ? option.label : '')}
            getOptionSelected={(option, value) => option.value === value.value}
            fullWidth={true}
            onChange={(ev, value) => {
              // this is only for display
              formik.setFieldValue(
                `${organizationAddress.country.name}-label`,
                value ? value : null
              );

              // this is the data will be actually used
              formik.setFieldValue(
                organizationAddress.country.name,
                value ? value.value : null
              );
            }}
            value={
              formik.values.organization.address['country-label']
                ? formik.values.organization.address['country-label']
                : null
            }
            renderInput={(params) => {
              params.inputProps = {
                ...params.inputProps,
                'aria-labelledby': `${organizationName.name}-address`,
              };
              return (
                <TextField
                  {...params}
                  label="Country"
                  placeholder="Country"
                  variant="outlined"
                  size="small"
                  required={true}
                  className={classes.textField}
                />
              );
            }}
          />
        </div>

        <div className="col-md-8">
          <Input
            name={organizationAddress.provinceOrState.name}
            labelName={organizationAddress.provinceOrState.label}
            placeholder={organizationAddress.provinceOrState.placeholder}
            requiredMark={true}
            value={formik.values.organization.address.provinceOrState}
            onChange={formik.handleChange}
            ariaLabel={`${organizationName.name}-address`}
          />
        </div>

        <div className="col-md-8">
          <Input
            name={organizationAddress.postalCode.name}
            labelName={organizationAddress.postalCode.label}
            placeholder={organizationAddress.postalCode.placeholder}
            requiredMark={true}
            value={formik.values.organization.address.postalCode}
            onChange={formik.handleChange}
            ariaLabel={`${organizationName.name}-address`}
          />
        </div>
      </div>
    </>
  );
};

export default CompanyInformationCompany;
