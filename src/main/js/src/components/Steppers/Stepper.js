import React from 'react';
import PropTypes from 'prop-types';

const Stepper = ({ children }) => {
  const childrenArray = React.Children.toArray(children)

  return (
    <div className="stepper">
      { childrenArray }
    </div>
  )
}

Stepper.propTypes = {
  children: PropTypes.node
}

export default Stepper