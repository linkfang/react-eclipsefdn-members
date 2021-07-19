import 'eclipsefdn-solstice-assets/js/ga'
import 'eclipsefdn-solstice-assets/js/privacy'
import { Switch, Route, Redirect } from 'react-router-dom';
import { Theme, ThemeProvider } from '@material-ui/core';
import { makeStyles, createStyles, createMuiTheme } from '@material-ui/core/styles';
import LeftNavBar from './NavBar/LeftNavBar';
import { mainContentBGColor, themeBlack } from '../../Constants/Constants';
import Dashboard from './Dashboard/Dashboard';
import AppTopBar from './NavBar/AppTopBar';
// import Home from './Home/Home';
import OrgProfile from './OrgProfile/OrgProfiles';
import ProjectsAndWG from './ProjectsAndWG/ProjectsAndWG';
import CommitersAndContributors from './CommittersAndContributors/CommitersAndContributors';
import Resources from './Resources/Resources';
import FAQs from './FAQs/FAQs';
import ContactManagement from './ContactManagement/ContactManagement';

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
      marginLeft: 280,
      paddingLeft: 64,
      paddingRight: 64,
      minHeight: 'calc(100vh - 64px)',
      flexGrow: 1,
      backgroundColor: mainContentBGColor,
      padding: theme.spacing(3),
    },
  })
);

export default function MainPortal() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <AppTopBar />

      <LeftNavBar />

      <main className={classes.content}>
        <Switch>
          {/* <Route exact path="/home">
            <Home />
          </Route> */}
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/org-profile">
            <OrgProfile />
          </Route>
          <Route exact path="/projects-wg">
            <ProjectsAndWG />
          </Route>
          <Route exact path="/committers-contributors">
            <CommitersAndContributors />
          </Route>
          <Route exact path="/resources">
            <Resources />
          </Route>
          <Route exact path="/faqs">
            <FAQs />
          </Route>
          <Route exact path="/contact-management">
            <ContactManagement />
          </Route>
          <Route exact path="/">
            <Redirect to="/dashboard" />
          </Route>
        </Switch>
      </main>
    </ThemeProvider>
  );
}
