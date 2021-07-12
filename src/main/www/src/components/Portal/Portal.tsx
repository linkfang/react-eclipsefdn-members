import { Switch, Route } from 'react-router-dom';
import { Theme, ThemeProvider } from '@material-ui/core';
import { makeStyles, createStyles, createMuiTheme } from '@material-ui/core/styles';
import LeftNavBar from './NavBar/LeftNavBar';
import { mainContentBGColor, themeBlack } from '../../Constants/Constants';
import Dashboard from './Dashboard/Dashboard';
import AppTopBar from './NavBar/AppTopBar';

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
      paddingLeft: 60,
      paddingRight: 60,
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
          <Route exact path="/home">
            <h1>Home</h1>
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/org-profile">
            <h1>Your Organization Profile</h1>
          </Route>
          <Route exact path="/projects-wg">
            <h1>Projects and Working Groups</h1>
          </Route>
          <Route exact path="/committers-contributors">
            <h1>Committers and Contributors</h1>
          </Route>
          <Route exact path="/resources">
            <h1>Resources</h1>
          </Route>
          <Route exact path="/faqs">
            <h1>FAQs</h1>
          </Route>
          <Route exact path="/contact-management">
            <h1>Contact Management</h1>
          </Route>
        </Switch>
      </main>
    </ThemeProvider>
  );
}
