export function getStyles(props) {
  const {
    activeColor,
    completeColor,
    defaultColor,
    circleFontColor,
    activeTitleColor,
    completeTitleColor,
    defaultTitleColor,
    size,
    circleFontSize,
    titleFontSize,
    circleTop,
    titleTop,
    width,
    completeOpacity,
    activeOpacity,
    defaultOpacity,
    completeTitleOpacity,
    activeTitleOpacity,
    defaultTitleOpacity,
    barStyle,
    defaultBarColor,
    completeBarColor,
    defaultBorderColor,
    completeBorderColor,
    activeBorderColor,
    defaultBorderStyle,
    completeBorderStyle,
    activeBorderStyle,
    activeCircleFontColor,
    fontFamily,
    circleCursor,
    barHeight,
    onClick,
    completed,
    stepReached
  } = props

  return {
    step: {
      width: `${width}%`,
      display: 'table-cell',
      position: 'relative',
      paddingTop: circleTop,
    },
    circle: {
      width: size,
      height: size,
      margin: '0 auto',
      backgroundColor: defaultColor,
      borderRadius: '50%',
      textAlign: 'center',
      fontSize: circleFontSize,
      color: circleFontColor,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: defaultOpacity,
      borderWidth: defaultBorderColor ? 3 : 0,
      borderColor: defaultBorderColor,
      borderStyle: defaultBorderStyle,
      cursor: circleCursor,
    },
    activeCircle: {
      backgroundColor: activeColor,
      opacity: activeOpacity,
      borderWidth: activeBorderColor ? 3 : 0,
      borderColor: activeBorderColor,
      borderStyle: activeBorderStyle,
      cursor: circleCursor,
    },
    completedCircle: {
      backgroundColor: completeColor,
      opacity: completeOpacity,
      borderWidth: completeBorderColor ? 3 : 0,
      borderColor: completeBorderColor,
      borderStyle: completeBorderStyle,
      cursor: circleCursor,
    },
    index: {
      lineHeight: `${size + circleFontSize / 4}px`,
      color: circleFontColor,
      fontFamily: fontFamily,
      cursor: (completed || stepReached) && onClick ? 'pointer' : 'default',
    },
    activeIndex: {
      lineHeight: `${size + circleFontSize / 4}px`,
      color: activeCircleFontColor,
      fontFamily: fontFamily,
    },
    title: {
      marginTop: titleTop,
      fontSize: titleFontSize,
      fontWeight: '300',
      textAlign: 'center',
      display: 'block',
      color: defaultTitleColor,
      opacity: defaultTitleOpacity,
      fontFamily: fontFamily,
      cursor: 'default',
    },
    activeTitle: {
      color: activeTitleColor,
      opacity: activeTitleOpacity,
      fontFamily: fontFamily,
    },
    completedTitle: {
      color: completeTitleColor,
      opacity: completeTitleOpacity,
      fontFamily: fontFamily,
      cursor: onClick ? 'pointer' : 'default',
    },
    leftBar: {
      position: 'absolute',
      top: circleTop + size / 2,
      height: 1,
      borderTopStyle: barStyle,
      borderTopWidth: barHeight || 1,
      borderTopColor: defaultBarColor,
      left: 0,
      right: '50%',
      marginRight: size / 2,
      opacity: defaultOpacity,
    },
    rightBar: {
      position: 'absolute',
      top: circleTop + size / 2,
      height: 1,
      borderTopStyle: barStyle,
      borderTopWidth: barHeight || 1,
      borderTopColor: defaultBarColor,
      right: 0,
      left: '50%',
      marginLeft: size / 2,
      opacity: defaultOpacity,
    },
    completedBar: {
      borderTopStyle: barStyle,
      borderTopWidth: barHeight || 1,
      borderTopColor: completeBarColor,
      opacity: completeOpacity,
    },
  }
}

export function getErrorStep(formikErrors) {
  var errorStep = -1;
  for (const errorField in formikErrors) {
    console.log(errorField)
    // code to be executed
    if (errorField === "organization" || errorField === "companyRepresentative") {
      errorStep = 0;
    }
    else if (errorField === "membershipLevel") {
      errorStep = 1;
    }
    else if (errorField === "workingGroup" || errorField === "participationLevel" || errorField === "effectiveDate" || errorField === "wgRepresentative") {
      errorStep = 2;
    }
    else if (errorField === "signingAuthority" || errorField === "signingAuthorityRepresentative") {
      errorStep = 3;
    }
  }

  return errorStep;

}