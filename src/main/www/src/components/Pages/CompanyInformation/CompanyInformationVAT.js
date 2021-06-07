import Input from '../../UIComponents/Inputs/Input';
import { formField } from '../../UIComponents/FormComponents/formFieldModel';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

const { purchasingProcess, vatRegistration } = formField;
const optionsForpurchasingProcess = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
  { label: 'Not Applicabele', value: 'na' },
];

export default function CompanyInformationVAT({ formik, useStyles }) {
  const classes = useStyles();

  return (
    <>
      {console.log(formik.values.purchasingAndVAT)}
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
            options={optionsForpurchasingProcess}
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
      <p>
        If your organization is registered for VAT in the European Union, please
        provide the following:
      </p>
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
    </>
  );
}
