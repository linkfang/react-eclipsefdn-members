import { useState } from 'react';
import './App.css';
import AppFooter from './components/UIComponents/layout/AppFooter';
import AppHeader from './components/UIComponents/layout/AppHeader';
import MembershipContext from './Context/MembershipContext';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import {
  HashRouter,
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Main from './components/Pages/Main';
import MainPortal from './components/PagesPortal/MainPortal';

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
    pathName: '/sign-in',
  });
  const [needLoadingSignIn, setNeedLoadingSignIn] = useState(true);

  const membershipContextValue = {
    currentUser,
    setCurrentUser,
    currentFormId,
    setCurrentFormId,
    furthestPage,
    setFurthestPage,
    needLoadingSignIn,
    setNeedLoadingSignIn,
  };

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/portal">
              <MainPortal />
            </Route>

            <Route exact path="/application">
              <MembershipContext.Provider value={membershipContextValue}>
                <AppHeader />
                <HashRouter hashType="noslash">
                  <Main />
                </HashRouter>
              </MembershipContext.Provider>
              <AppFooter />
            </Route>

            <Route exact path="/">
              <Redirect to="/application" />
            </Route>
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};

export default App;
