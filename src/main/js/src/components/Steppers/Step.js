import React from 'react';
import { getStyles } from './stepHelpers';

const Step = (props) => {

  const { active, completed, index, onClick, stepReached, title, currentStep, formRef } = props;
  const styles = getStyles(props);

    const handleClick = async (e) => {

      if (index === 0) {
        onClick();
      }

      // If go to the steps after the current step
      if (index-1 > currentStep) {
        if (formRef.current) {
          await formRef.current.submitForm();
          if (Object.keys(formRef.current.errors).length === 0) {
            onClick(index-1);
          }
        }
      }

      // If go to the steps before the current step
      else if(index-1 <= currentStep) {
        onClick(index-1);
      }

    }

    return (
    <div style={styles.index} className="step" onClick={ (completed || stepReached) ? handleClick : null} >
      <span className="step-span-index">{index + 1}</span>
      <div className="step-span">
        <div className={ active ? `step-title-container-active` : `step-title-container`}>
          <span className="step-title">{title}</span>
        </div>
      </div>
    </div>
    )
}

export default Step