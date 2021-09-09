import Input from '../../UIComponents/Inputs/Input';
import { formField } from '../../UIComponents/FormComponents/formFieldModel';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import DropdownMenu from '../../UIComponents/Inputs/DropdownMenu';
import {
  OPTIONS_FOR_ORG_TYPE,
  OPTIONS_FOR_REVENUE,
  OPTIONS_FOR_EMPLOYEE_COUNT,
  HELPERTEXT_FOR_REVENUE,
} from '../../../Constants/Constants';

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
  const [orgAddressObj, setOrgAddressObj] = useState({
    street: 'Address 1',
    streetTwo: 'Address 2',
    city: 'City',
    provinceOrState: 'Province',
    postalCode: 'Postal Code',
  });

  const countryList = countryAddressDetails.map((item) => ({ label: item.name, value: item.name }));

  const handleFieldChange = (value, fieldName) => {
    formik.setFieldValue(fieldName, value);
  };

  const handleCountryOnChange = (ev, value) => {
    // this is only for display
    formik.setFieldValue(`${organizationAddress.country.name}-label`, value || null);
    // this is the data will be actually used
    formik.setFieldValue(organizationAddress.country.name, value?.value || null);
    if (value) {
      const currentAddressObj = countryAddressDetails.find((item) => item.name === value.value).fields;
      console.log(currentAddressObj);
      setOrgAddressObj({
        street: currentAddressObj.addressLine1 || 'Address 1',
        streetTwo: currentAddressObj.addressLine2 || 'Address 2',
        city: currentAddressObj.locality || 'City',
        provinceOrState: currentAddressObj.administrativeArea || 'Province',
        postalCode: currentAddressObj.postalCode || 'Postal Code',
      });
    }
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
            error={formik.touched.organization?.legalName && Boolean(formik.errors.organization?.legalName)}
            helperText={formik.errors.organization?.legalName}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-16">
          <DropdownMenu
            inputLabel={organizationType.label}
            inputName={organizationType.name}
            inputValue={formik.values.organization.type}
            optionsArray={OPTIONS_FOR_ORG_TYPE}
            handleChange={formik.handleChange}
            error={formik.touched.organization?.type && Boolean(formik.errors.organization?.type)}
            helperText={formik.errors.organization?.type}
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
        <div className="col-md-16">
          <DropdownMenu
            inputLabel={organizationRevenue.revenue.label}
            inputName={organizationRevenue.revenue.name}
            inputValue={formik.values.organization.revenue}
            optionsArray={OPTIONS_FOR_REVENUE}
            explanationHelperText={HELPERTEXT_FOR_REVENUE}
            handleChange={(ev) => handleFieldChange(ev.target.value, 'organization.revenue')}
            error={formik.touched.organization?.revenue && Boolean(formik.errors.organization?.revenue)}
            helperText={formik.errors.organization?.revenue}
          />
        </div>
        <div className="col-md-8">
          <DropdownMenu
            inputLabel={organizationRevenue.employeeCount.label}
            inputName={organizationRevenue.employeeCount.name}
            inputValue={formik.values.organization.employeeCount}
            optionsArray={OPTIONS_FOR_EMPLOYEE_COUNT}
            handleChange={(ev) => handleFieldChange(ev.target.value, 'organization.employeeCount')}
            error={formik.touched.organization?.employeeCount && Boolean(formik.errors.organization?.employeeCount)}
            helperText={formik.errors.organization?.employeeCount}
          />
        </div>
      </div>

      <h2 className="fw-600 h4" id={`${organizationName.name}-address`}>
        Address
      </h2>
      <div className="row">
        <div className="col-md-12">
          <Input
            name={organizationAddress.street.name}
            labelName={orgAddressObj.street}
            placeholder={organizationAddress.street.placeholder}
            requiredMark={true}
            value={formik.values.organization.address.street}
            onChange={formik.handleChange}
            ariaLabel={`${organizationName.name}-address`}
            error={formik.touched.organization?.address?.street && Boolean(formik.errors.organization?.address?.street)}
            helperText={formik.errors.organization?.address?.street}
          />
        </div>
        <div className="col-md-12">
          <Input
            name={organizationAddress.streetTwo.name}
            labelName={orgAddressObj.streetTwo}
            placeholder={organizationAddress.streetTwo.placeholder}
            value={formik.values.organization.address.streetTwo}
            onChange={formik.handleChange}
            ariaLabel={`${organizationName.name}-address2`}
            error={
              formik.touched.organization?.address?.streetTwo && Boolean(formik.errors.organization?.address?.streetTwo)
            }
            helperText={formik.errors.organization?.address?.streetTwo}
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
            onChange={(ev, value) => handleCountryOnChange(ev, value)}
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
                  error={formik.touched.organization?.address?.city && Boolean(formik.errors.organization?.address?.country)}
                  helperText={formik.touched.organization?.address?.city && formik.errors.organization?.address?.country}
                />
              );
            }}
          />
        </div>

        <div className="col-md-4">
          <Input
            name={organizationAddress.city.name}
            labelName={orgAddressObj.city}
            placeholder={orgAddressObj.city}
            requiredMark={true}
            value={formik.values.organization.address.city}
            onChange={formik.handleChange}
            ariaLabel={`${organizationName.name}-address`}
            error={formik.touched.organization?.address?.city && Boolean(formik.errors.organization?.address?.city)}
            helperText={formik.errors.organization?.address?.city}
          />
        </div>

        <div className="col-md-8">
          <Input
            name={organizationAddress.provinceOrState.name}
            labelName={orgAddressObj.provinceOrState}
            placeholder={orgAddressObj.provinceOrState}
            requiredMark={false}
            value={formik.values.organization.address.provinceOrState}
            onChange={formik.handleChange}
            ariaLabel={`${organizationName.name}-address`}
            error={Boolean(formik.errors.organization?.address?.provinceOrState)}
            helperText={formik.errors.organization?.address?.provinceOrState}
          />
        </div>

        <div className="col-md-4">
          <Input
            name={organizationAddress.postalCode.name}
            labelName={orgAddressObj.postalCode}
            placeholder={orgAddressObj.postalCode}
            requiredMark={false}
            value={formik.values.organization.address.postalCode}
            onChange={formik.handleChange}
            ariaLabel={`${organizationName.name}-address`}
            error={Boolean(formik.errors.organization?.address?.postalCode)}
            helperText={formik.errors.organization?.address?.postalCode}
          />
        </div>
      </div>
    </>
  );
};

export default CompanyInformationCompany;
