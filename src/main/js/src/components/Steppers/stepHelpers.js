export function getStyles(props) {
    const {
      onClick,
      completed,
      stepReached
    } = props
  
    return {
      index: {
        cursor: (completed || stepReached) && onClick ? 'pointer' : 'default',
      },
    }
  }