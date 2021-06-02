import { useState } from 'react';
import './App.css';
import AppFooter from './components/UIComponents/layout/AppFooter';
import AppHeader from './components/UIComponents/layout/AppHeader';
import MembershipContext from './Context/MembershipContext';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router } from 'react-router-dom';
import Main from './components/Pages/Main';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#f7941e',
      contrastText: '#fff', // for button text color
    },
  },
});

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentFormId, setCurrentFormId] = useState('');
  const [furthestPage, setFurthestPage] = useState({
    index: 0,
    pathName: '/signIn',
  });

  const membershipContextValue = {
    currentUser,
    setCurrentUser: (val) => setCurrentUser(val),
    currentFormId,
    setCurrentFormId: (val) => setCurrentFormId(val),
    furthestPage,
    setFurthestPage,
  };

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <AppHeader />
        <MembershipContext.Provider value={membershipContextValue}>
          <Router>
            <Main />
          </Router>
        </MembershipContext.Provider>
        <AppFooter />
      </ThemeProvider>
    </div>
  );
};

export default App;
