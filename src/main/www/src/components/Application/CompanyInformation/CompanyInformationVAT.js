import Input from '../../UIComponents/Inputs/Input';
import { formField } from '../../UIComponents/FormComponents/formFieldModel';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import DropdownMenu from '../../UIComponents/Inputs/DropdownMenu';
import { OPTIONS_FOR_PURCHASING_PROCESS } from '../../../Constants/Constants';

const { purchasingProcess, vatRegistration } = formField;

export default function CompanyInformationVAT({ formik }) {
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
      <h2 className="fw-600 h4 section-header" id={`${purchasingProcess.name}-ctn`}>
        Purchasing Process
        <span className="orange-star margin-left-5">*</span>
      </h2>
      <p>Does your organization require a Purchase Order to facilitate payment of your membership dues?</p>
      <div className="row">
        <div className="col-md-12 margin-bottom-40">
          <DropdownMenu
            inputLabel={purchasingProcess.label}
            inputName={purchasingProcess.name}
            inputValue={formik.values.purchasingAndVAT.purchasingProcess}
            optionsArray={OPTIONS_FOR_PURCHASING_PROCESS}
            handleChange={formik.handleChange}
            error={
              formik.touched.purchasingAndVAT?.purchasingProcess &&
              Boolean(formik.errors.purchasingAndVAT?.purchasingProcess)
            }
            helperText={formik.errors.purchasingAndVAT?.purchasingProcess}
          />
        </div>
      </div>

      <h2 className="fw-600 h4" id="vatRegistration">
        VAT Registration
      </h2>
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
              error={
                formik.touched.purchasingAndVAT?.vatNumber &&
                Boolean(formik.errors.purchasingAndVAT?.vatNumber)
              }
              helperText={formik.errors.purchasingAndVAT?.vatNumber}
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
              error={
                formik.touched.purchasingAndVAT?.countryOfRegistration &&
                Boolean(formik.errors.purchasingAndVAT?.countryOfRegistration)
              }
              helperText={formik.errors.purchasingAndVAT?.countryOfRegistration}
            />
          </div>
        </div>
      )}
    </>
  );
}
