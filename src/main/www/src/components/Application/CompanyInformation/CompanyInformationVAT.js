import Input from '../../UIComponents/Inputs/Input';
import { formField } from '../../UIComponents/FormComponents/formFieldModel';
import { TextField, Checkbox, FormControlLabel } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { OPTIONS_FOR_PURCHASING_PROCES } from '../../../Constants/Constants';

const { purchasingProcess, vatRegistration } = formField;

export default function CompanyInformationVAT({ formik, useStyles }) {
  const classes = useStyles();

  const handleIsRegistered = () => {
    const isRegistered = formik.values.purchasingAndVAT.isRegistered;
    
    // use spread operator to avoid editing formik.values directly
    let purchasingAndVATValue = { ...formik.values.purchasingAndVAT };
    if (isRegistered) {
      // if user uncheck it, then we need to delete the value for vatNumber and countryOfRegistration
      purchasingAndVATValue.vatNumber = '';
      purchasingAndVATValue.countryOfRegistration = '';
    }
    purchasingAndVATValue.isRegistered = !isRegistered;
    formik.setFieldValue('purchasingAndVAT', purchasingAndVATValue);
  };

  return (
    <>
      <h4
        className="fw-600 section-header"
        id={`${purchasingProcess.name}-ctn`}
      >
        Purchasing Process
        <span className="orange-star margin-left-5">*</span>
      </h4>
      <p>
        Does your organization require a Purchase Order to facilitate payment of
        your membership dues?
      </p>
      <div className="row">
        <div className="col-md-12 margin-bottom-40">
          <Autocomplete
            id={purchasingProcess.name}
            options={OPTIONS_FOR_PURCHASING_PROCES}
            getOptionLabel={(option) => (option?.label ? option.label : '')}
            getOptionSelected={(option, value) => option.value === value.value}
            fullWidth={true}
            onChange={(ev, value) => {
              // this is only for display
              formik.setFieldValue(
                `${purchasingProcess.name}-label`,
                value ? value : null
              );

              // this is the data will be actually used
              formik.setFieldValue(
                purchasingProcess.name,
                value ? value.value : null
              );
            }}
            value={
              formik.values.purchasingAndVAT['purchasingProcess-label']
                ? formik.values.purchasingAndVAT['purchasingProcess-label']
                : null
            }
            renderInput={(params) => {
              params.inputProps = {
                ...params.inputProps,
                'aria-labelledby': `${purchasingProcess.name}-ctn`,
              };
              return (
                <TextField
                  {...params}
                  label={purchasingProcess.label}
                  placeholder={purchasingProcess.placeholder}
                  variant="outlined"
                  size="small"
                  required={true}
                  className={classes.textField}
                />
              );
            }}
          />
        </div>
      </div>

      <h4 className="fw-600" id="vatRegistration">
        VAT Registration
      </h4>
      <FormControlLabel
        control={
          <Checkbox
            name={vatRegistration.isRegistered.name}
            color="primary"
            checked={formik.values.purchasingAndVAT.isRegistered}
            onChange={handleIsRegistered}
          />
        }
        label={vatRegistration.isRegistered.label}
      />

      {formik.values.purchasingAndVAT.isRegistered && (
        <div className="row">
          <div className="col-md-12">
            <Input
              name={vatRegistration.vatNumber.name}
              labelName={vatRegistration.vatNumber.label}
              placeholder={vatRegistration.vatNumber.placeholder}
              requiredMark={false}
              value={formik.values.purchasingAndVAT.vatNumber}
              onChange={formik.handleChange}
              ariaLabel={`vatRegistration`}
            />
          </div>

          <div className="col-md-12">
            <Input
              name={vatRegistration.countryOfRegistration.name}
              labelName={vatRegistration.countryOfRegistration.label}
              placeholder={vatRegistration.countryOfRegistration.placeholder}
              requiredMark={false}
              value={formik.values.purchasingAndVAT.countryOfRegistration}
              onChange={formik.handleChange}
              ariaLabel={`vatRegistration`}
            />
          </div>
        </div>
      )}
    </>
  );
}
