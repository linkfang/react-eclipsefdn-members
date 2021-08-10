import Input from '../../UIComponents/Inputs/Input';
import { formField } from '../../UIComponents/FormComponents/formFieldModel';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import DropdownMenu from '../../UIComponents/Inputs/DropdownMenu';
import { OPTIONS_FOR_REVENUE_CURRENCY } from '../../../Constants/Constants';

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
  const { organizationName, organizationTwitter, organizationAddress, organizationRevenue } = formField;

  // get country list library and map as option pass to the React-Select
  const countryList = require('country-list')
    .getNames()
    .map((item) => ({ label: item, value: item }));

  const handleFieldChange = (value, fieldName) => {
    formik.setFieldValue(fieldName, value);
  };

  return (
    <>
      <h2 className="fw-600 h4" id={organizationName.name}>
        Organization
      </h2>
      <div className="row">
        <div className="col-md-16">
          <Input
            name={organizationName.name}
            labelName={organizationName.label}
            placeholder={organizationName.placeholder}
            ariaLabel={organizationName.name}
            requiredMark={true}
            value={formik.values.organization.legalName}
            onChange={formik.handleChange}
          />
        </div>
        <div className="col-md-8">
          <Input
            name={organizationTwitter.name}
            labelName={organizationTwitter.label}
            placeholder={organizationTwitter.placeholder}
            ariaLabel={organizationName.name}
            requiredMark={false}
            value={formik.values.organization.twitterHandle}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.organization?.twitterHandle)}
            helperText={formik.errors.organization?.twitterHandle}
          />
        </div>
      </div>
      <p>
        Let us know your aggregated corporate revenue from all corporate affiliates. For more information, please see
        our{' '}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.eclipse.org/org/documents/eclipse_affiliates_membership_guidelines.pdf"
        >
          Affiliates Membership Guidelines
        </a>
        .
      </p>
      <div className="row">
        <div className="col-md-10">
          <Input
            name={organizationRevenue.revenue.name}
            labelName={organizationRevenue.revenue.label}
            placeholder={organizationRevenue.revenue.placeholder}
            requiredMark={true}
            type={'number'}
            value={formik.values.organization.revenue}
            onChange={(ev) => handleFieldChange(ev.target.value, 'organization.revenue')}
            ariaLabel={`${organizationRevenue.revenue.name}`}
          />
        </div>
        <div className="col-md-6">
          <DropdownMenu
            inputLabel={organizationRevenue.currency.label}
            inputName={organizationRevenue.currency.name}
            inputValue={formik.values.organization.currency}
            optionsArray={OPTIONS_FOR_REVENUE_CURRENCY}
            handleChange={(ev) => handleFieldChange(ev.target.value, 'organization.currency')}
          />
        </div>
        <div className="col-md-8">
          <Input
            name={organizationRevenue.employeeCount.name}
            labelName={organizationRevenue.employeeCount.label}
            placeholder={organizationRevenue.employeeCount.placeholder}
            requiredMark={true}
            type={'number'}
            value={formik.values.organization.employeeCount}
            onChange={(ev) => handleFieldChange(ev.target.value, 'organization.employeeCount')}
            ariaLabel={`${organizationRevenue.employeeCount.name}`}
          />
        </div>
      </div>

      <h2 className="fw-600 h4" id={`${organizationName.name}-address`}>
        Address
      </h2>
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
            getOptionLabel={(option) => option?.label || ''}
            getOptionSelected={(option, value) => option.value === value.value}
            fullWidth={true}
            freeSolo={true}
            openOnFocus={true}
            onChange={(ev, value) => {
              // this is only for display
              formik.setFieldValue(`${organizationAddress.country.name}-label`, value || null);

              // this is the data will be actually used
              formik.setFieldValue(organizationAddress.country.name, value?.value || null);
            }}
            value={formik.values.organization.address['country-label'] || null}
            renderInput={(params) => {
              params.inputProps = {
                ...params.inputProps,
                'aria-labelledby': `${organizationName.name}-address`,
              };
              return (
                <TextField
                  {...params}
                  onChange={(ev) => {
                    formik.setFieldValue(organizationAddress.country.name, ev.target.value || null);
                  }}
                  label="Country"
                  placeholder="Country"
                  variant="outlined"
                  size="small"
                  required={true}
                  className={classes.textField}
                  error={Boolean(formik.errors.organization?.address?.country)}
                  helperText={formik.errors.organization?.address?.country}
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
            requiredMark={false}
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
            requiredMark={false}
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
