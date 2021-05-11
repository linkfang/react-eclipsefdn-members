import React, { useState } from 'react';
import './App.css';
import AppFooter from './components/UIComponents/layout/AppFooter';
import AppHeader from './components/UIComponents/layout/AppHeader';
import FormWrapper from './components/UIComponents/FormPreprocess/FormWrapper';
import MembershipContext from './Context/MembershipContext';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#f7941e',
    },
  },
});

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentFormId, setCurrentFormId] = useState('');
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <AppHeader />
        <MembershipContext.Provider
          value={{
            currentUser,
            setCurrentUser: (val) => setCurrentUser(val),
            currentFormId,
            setCurrentFormId: (val) => setCurrentFormId(val),
          }}
        >
          <FormWrapper />
        </MembershipContext.Provider>
        <AppFooter />
      </ThemeProvider>
    </div>
  );
};

export default App;
