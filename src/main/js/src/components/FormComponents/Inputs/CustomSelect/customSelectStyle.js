// selectorStyles object
export const generateCustomStyles = (isCompany, metaErr) => {
  return {
    option: (styles, state) => ({
      ...styles,
      cursor: 'pointer'
    }),
    control: (styles, state) => ({
      ...styles,
      '&:hover': { borderColor: metaErr ? 'red' : 'orange' },
      borderColor: metaErr ? 'red' : 'hsl(0, 0%, 80%)',
      cursor: isCompany ? 'text' : 'pointer'
    }),
    clearIndicator: (styles) => ({
      ...styles,
      cursor: 'pointer'
    })
  }
}

export const generateCustomWGSelectStyles = (metaErr) => {
  return {
    option: (styles, state) => ({
      ...styles,
      cursor: 'pointer'
    }),
    control: (styles, state) => ({
      ...styles,
      '&:hover': { borderColor: metaErr ? 'red' : 'orange' },
      borderColor: metaErr ? 'red' : 'hsl(0, 0%, 80%)',
    }),
    clearIndicator: (styles) => ({
      ...styles,
      cursor: 'pointer'
    })
  }
}

export const companyCustomStyles = {
    option: (styles, state) => ({
      ...styles,
      cursor: 'pointer'
    }),
    control: (styles, state) => ({
      ...styles,
      cursor: 'text'
      
    }),
    clearIndicator: (styles) => ({
      ...styles,
      cursor: 'pointer'
    })
  };


export const wgCustomStyles = {
    option: (styles, state) => ({
      ...styles,
      cursor: 'pointer'
    }),
    clearIndicator: (styles) => ({
      ...styles,
      cursor: 'pointer'
    })
  };

export const selectTheme = (theme) => ({
    ...theme,
    borderRadius: 5,
    color: 'orange',
    colors: {
      ...theme.colors,
      primary: 'orange',  // focus border color
      primary25: '#f1e5bc',  // option selected bg color
      primary50: '#f1e5bc'  // option onclick bg color
    }
  })