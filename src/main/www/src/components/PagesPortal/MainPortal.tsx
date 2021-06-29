import { Switch, Route } from 'react-router-dom';
import { Theme, AppBar, Toolbar, Typography, ThemeProvider } from '@material-ui/core';
import { makeStyles, createStyles, createMuiTheme } from '@material-ui/core/styles';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import demoAvatar from '../../assets/demo-avatar.jpg';
import LeftNavBar from './NavBar/LeftNavBar';
import { drawerWidth, themeBlack } from '../../Constants/Constants';

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
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      height: 70,
      marginLeft: drawerWidth,
      backgroundColor: '#fff',
      boxShadow: '0px 0px 16px rgba(0, 0, 0, 0.05)',
    },
    toolbarCtn: {
      display: 'flex',
      justifyContent: 'flex-end',
      padding: '0 32px',
    },
    verticalDivider: {
      backgroundColor: '#EBEBF2',
      height: 28,
      width: 1,
      marginRight: 21,
    },
    username: {
      marginBottom: 0,
      marginRight: 7,
    },
    dropDownIcon: {
      color: '#A4AFB7',
    },
    avatarCtn: {
      width: 38,
      borderRadius: '50%',
      overflow: 'hidden',
      marginLeft: 11,
    },
    avatar: {
      width: 38,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      marginLeft: 280,
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
  })
);

export default function MainPortal() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbarCtn}>
          <div className={classes.verticalDivider}></div>
          <Typography paragraph className={classes.username}>
            John Doe
          </Typography>
          <ExpandMoreIcon className={classes.dropDownIcon} />
          <div className={classes.avatarCtn}>
            <img src={demoAvatar} alt="user avatar" className={classes.avatar} />
          </div>
        </Toolbar>
      </AppBar>

      <LeftNavBar />

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route exact path="/home">
            <h1>Home</h1>
          </Route>
          <Route exact path="/dashboard">
            <h1>Dashboard</h1>
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
