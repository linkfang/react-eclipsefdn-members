import { useState } from 'react';
import './App.css';
import AppTemplate from './components/UIComponents/layout/AppTemplate';
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
import NotFound404 from './components/Pages/ErrorPages/NotFound404';
import InternalError50x from './components/Pages/ErrorPages/InternalError50x';

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
                <AppTemplate>
                  <HashRouter hashType="noslash">
                    <Main />
                  </HashRouter>
                </AppTemplate>
              </MembershipContext.Provider>
            </Route>

            <Route exact path="/">
              <Redirect to="/application" />
            </Route>

            <Route exact path="/404">
              <AppTemplate>
                <NotFound404 />
              </AppTemplate>
            </Route>

            <Route exact path="/50x">
              <AppTemplate>
                <InternalError50x />
              </AppTemplate>
            </Route>

            {/* Redirect user to 404 page for all the unknown pathnames/urls */}
            <Redirect to="404" />

          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};

export default App;
