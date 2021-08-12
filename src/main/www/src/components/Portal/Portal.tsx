import 'eclipsefdn-solstice-assets/js/ga';
import 'eclipsefdn-solstice-assets/js/privacy';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Theme, ThemeProvider } from '@material-ui/core';
import { makeStyles, createStyles, createMuiTheme } from '@material-ui/core/styles';
import LeftNavBar from './NavBar/LeftNavBar';
import { mainContentBGColor, themeBlack } from '../../Constants/Constants';
import Dashboard from './Dashboard/Dashboard';
import AppTopBar from './NavBar/AppTopBar';
// import Home from './Home/Home';
// import ProjectsAndWG from './ProjectsAndWG/ProjectsAndWG';
// import CommitersAndContributors from './CommittersAndContributors/CommitersAndContributors';
// import Resources from './Resources/Resources';
// import FAQs from './FAQs/FAQs';
import OrgProfile from './OrgProfile/OrgProfiles';
import ContactManagement from './ContactManagement/ContactManagement';
import { useState } from 'react';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#f7941e',
      contrastText: themeBlack, // for button text color
    },
  },
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    content: {
      marginTop: 64,
      flexGrow: 1,
      padding: '24px 14px',
      backgroundColor: mainContentBGColor,
      [theme.breakpoints.up('sm')]: {
        padding: 24,
      },
      [theme.breakpoints.up('md')]: {
        marginLeft: 280,
        padding: 64,
      },
    },
  })
);

export default function MainPortal() {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <ThemeProvider theme={theme}>
      <AppTopBar handleDrawerToggle={handleDrawerToggle} />

      <LeftNavBar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />

      <main className={classes.content}>
        <Switch>
          {/* <Route exact path="/home">
            <Home />
          </Route> */}
          <Route path="/portal/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/portal/org-profile">
            <OrgProfile />
          </Route>
          {/* <Route exact path="/projects-wg">
            <ProjectsAndWG />
          </Route> */}
          {/* <Route exact path="/committers-contributors">
            <CommitersAndContributors />
          </Route> */}
          {/* <Route exact path="/resources">
            <Resources />
          </Route> */}
          {/* <Route exact path="/faqs">
            <FAQs />
          </Route> */}
          <Route exact path="/portal/contact-management">
            <ContactManagement />
          </Route>
          <Route path="/portal">
            <Redirect to="/portal/dashboard" />
          </Route>
        </Switch>
      </main>
    </ThemeProvider>
  );
}
