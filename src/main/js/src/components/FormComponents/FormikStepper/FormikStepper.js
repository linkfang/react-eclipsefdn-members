import React, { useState, useRef, useContext } from 'react';
import { Form, Formik } from 'formik';
import { validationSchema } from '../formModels/ValidationSchema';
import StepperComponent from '../../Steppers/StepperComponent';
import CustomStepButton from '../CustomStepButton';
import { executeSendDataByStep, assignContactData, handleNewForm } from '../../../Utils/formFunctionHelpers';
import MembershipContext from '../../../Context/MembershipContext';
import SubmitSuccess from '../SubmitSuccess';
import { newForm_tempId } from '../../../Constants/Constants';

/**
 * A wrapper for each step of form.
 * - Check and mark step completed
 * - Perform "next" / "submit" action
 * - match current Child form component
 * - match current ValidationSchema
 * - -------------------------------
 * 
 * - Props:
 *    - step: current step you are in
 *    - setStep: setStep function passed from MultiStepForm
 *    - children: CompanyInformation, MembershipLevel, WorkingGroupsWrapper, SigningAuthority
 *    - props: any other props passed from MultiStepForm component
 * 
 * --------------------------------------
 * - Render Formik component, 
 *    including each step of form component (currentChild), CustomStepButton (render as prev, next, or final submit)
 * - Render StepperComponent component
 * - Render Submit Success confirmation component once submit after preview
 * 
 * - `React.cloneElement(currentChild, { parentState: { formik, ...props } })`, this helps to pass the props to the children component (each current step of form component)
 * **/

const FormikStepper = ({ step, setStep, children, ...props }) => {

  const [completed, setCompleted] = useState(new Set());
  const childrenArray = React.Children.toArray(children);
  const currentChild = childrenArray[step];
  const currentValidationSchema = validationSchema[step];

  // Pass this form ref to StepperComponent, to make StepperComponent has access to formik API, so that can execute submit / validation action when using the top step navigation
  const formRef = useRef();

  const { currentUser, currentFormId, setCurrentFormId } = useContext(MembershipContext);

  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  const handleComplete = () => {
      const newCompleted = new Set(completed);
      newCompleted.add(step);
      setCompleted(newCompleted);
    }

  const defaultBehaviour = () => {
    handleComplete();
    setStep((s) => s + 1);
  }


  /**
   * this function is from Formik
   * 
   * @param values - From Formik, the whole form values
   * 
   * @param formikBag - From Formik, including all Formik properties or functions
   * 
   * **/
  const handleOnSubmit = async (values, formikBag) => {

    switch(step) {
      // The final step, submit on the preview step
      case childrenArray.length - 1:
        defaultBehaviour();
        break;

      // The organization info step, need to check if marketing & accounting are the same as company rep., if true, assign the company rep. data to the other rep. 
      case 0: 
        if(values.representative.marketing.sameAsCompany) {
          assignContactData(values.representative.marketing, values.representative.company);
        }
        if (values.representative.accounting.sameAsCompany) {
          assignContactData(values.representative.accounting, values.representative.company);
        }

        // Need to check if starting a new form or not;
        // If new form, need to use handleNewForm() server call
        if (currentFormId === newForm_tempId) {
          await handleNewForm(setCurrentFormId, values, currentUser.name, defaultBehaviour);
        }
        // If existing form, need to use executeSendDataByStep() server call
        else {
          await executeSendDataByStep(step, values, currentFormId, currentUser.name);
          defaultBehaviour();
        }
        
        break;

      // Other steps default server call
      default:
        await executeSendDataByStep(step, values, currentFormId, currentUser.name);
        defaultBehaviour();
    }
  }

  if (step === childrenArray.length) {
    return <SubmitSuccess />
  }

  return (
    <>
    <StepperComponent step={step} setStep={setStep} childrenArray={childrenArray} completed={completed} formRef={formRef} currentFormId={currentFormId} setCurrentFormId={setCurrentFormId} />

    <Formik
      {...props}
      onSubmit={handleOnSubmit}
      validationSchema={currentValidationSchema}
      innerRef={formRef}
      validateOnChange={false}
    >
      {
        (formik) =>
          <>
            <Form>
              {React.cloneElement(currentChild, { parentState: { formik, ...props } })}
              <CustomStepButton
                values={formik.values}
                step={step}
                isSubmitting={formik.isSubmitting}
                setStep={setStep}
                isLastStep={isLastStep}
                formikSubmit={formik.submitForm}
              />
            </Form>
          </>
      }
    </Formik>
    </>
  )
}

export default FormikStepper