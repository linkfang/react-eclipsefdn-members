/*
The MIT License (MIT) (https://github.com/mu29/react-stepper/blob/HEAD/LICENSE)

Copyright (c) 2016 InJung Chung (https://github.com/mu29/react-stepper)
Copyright (c) 2020 Yi Liu

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import React from 'react';
import PropTypes from 'prop-types';
import { getStyles } from "./stepHelpers";

const Step = (props) => {

  const { active, completed, checkIcon, index, onClick, stepReached, title, first, isLast, currentStep, formRef } = props
  const styles = getStyles(props)

  const circleStyle = Object.assign(
    styles.circle,
    completed ? styles.completedCircle : {},
    active ? styles.activeCircle : {},
  )
  const titleStyle = Object.assign(
    styles.title,
    completed ? styles.completedTitle : {},
    active ? styles.activeTitle : {},
  )
  const leftStyle = Object.assign(
    styles.leftBar,
    active || completed ? styles.completedBar : {},
  )
  const rightStyle = Object.assign(
    styles.rightBar,
    completed ? styles.completedBar : {},
  )
  function getInnerContent() {

    const handleClick = e => {
      // console.log(props.formikErrors)
      if (index > currentStep) {
        if (formRef.current) {
          formRef.current.handleSubmit()
          // if (formRef.current.isValid) {
          //   onClick(index)
          // }
        }
      }
      else if(index < currentStep) {
        onClick(index)
      }
      // if (Object.keys(props.formikErrors).length === 0) {
      //   onClick(index)
      // }
    }

    if (active) {
      return (
        <span onClick={handleClick} style={styles.activeIndex}>
          {index + 1}
        </span>
      )
    }

    if (completed || stepReached) {
      if (completed && checkIcon) {
        return (
          <span onClick={handleClick} style={styles.index}>
            {checkIcon}
          </span>
        )
      }
      return (
        <span
          style={Object.assign({}, styles.index, {
            color: props.defaultCircleFontColor || styles.index.color,
          })}
          onClick={handleClick}
        >
          {index + 1}
        </span>
      )
    }

    return <span style={styles.index}>{index + 1}</span>
  }

  return (
    <div style={styles.step}>
      <div style={circleStyle}>{getInnerContent()}</div>
      {completed ? (
        <div style={titleStyle}>
          {title}
        </div>
      ) : (
          <div style={titleStyle}>{title}</div>
        )}
      {!first && <div style={leftStyle} />}
      {!isLast && <div style={rightStyle} />}
    </div>
  )
}

export default Step

Step.defaultProps = {
  activeColor: '#5096FF',
  completeColor: '#5096FF',
  defaultColor: '#E0E0E0',
  activeTitleColor: '#000',
  completeTitleColor: '#000',
  defaultTitleColor: '#757575',
  circleFontColor: '#FFF',
  size: 32,
  circleFontSize: 16,
  titleFontSize: 16,
  circleTop: 24,
  titleTop: 8,
  defaultBarColor: '#E0E0E0',
  barStyle: 'solid',
  borderStyle: 'solid',
}

Step.propTypes = {
  width: PropTypes.number.isRequired,
  activeColor: PropTypes.string,
  completeColor: PropTypes.string,
  defaultColor: PropTypes.string,
  activeTitleColor: PropTypes.string,
  completeTitleColor: PropTypes.string,
  defaultTitleColor: PropTypes.string,
  circleFontColor: PropTypes.string,
  size: PropTypes.number,
  circleFontSize: PropTypes.number,
  titleFontSize: PropTypes.number,
  circleTop: PropTypes.number,
  titleTop: PropTypes.number,
  title: PropTypes.string,
  index: PropTypes.number,
  active: PropTypes.bool,
  completed: PropTypes.bool,
  first: PropTypes.bool,
  isLast: PropTypes.bool,
  completeOpacity: PropTypes.string,
  activeOpacity: PropTypes.string,
  defaultOpacity: PropTypes.string,
  completeTitleOpacity: PropTypes.string,
  activeTitleOpacity: PropTypes.string,
  defaultTitleOpacity: PropTypes.string,
  barStyle: PropTypes.string,
  defaultBarColor: PropTypes.string,
  completeBarColor: PropTypes.string,
  defaultBorderColor: PropTypes.string,
  completeBorderColor: PropTypes.string,
  activeBorderColor: PropTypes.string,
  defaultBorderStyle: PropTypes.string,
  completeBorderStyle: PropTypes.string,
  activeBorderStyle: PropTypes.string,
}
