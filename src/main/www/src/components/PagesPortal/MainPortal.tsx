import { Switch, Route } from 'react-router-dom';
import {
  Theme,
  Container,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import efWhiteLogo from '../../assets/logos/ef-registered-wht.svg';
import demoAvatar from '../../assets/demo-avatar.jpg';

const drawerWidth = 260;
const themeBlack = '#0B0B0B';

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
    username: {
      color: themeBlack,
      marginBottom: 0,
      marginRight: 7,
    },
    avatarCtn: {
      width: 38,
      borderRadius: '50%',
      overflow: 'hidden',
    },
    avatar: {
      width: 38,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: themeBlack,
    },
    efLogoCtn: {
      height: 70,
      display: 'flex',
      justifyContent: 'center',
    },
    efLogo: {
      width: 174,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
  })
);

export default function MainPortal() {
  const classes = useStyles();

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbarCtn}>
          <Typography paragraph className={classes.username}>
            John Doe
          </Typography>
          {/* <ExpandMoreIcon /> */}
          <div className={classes.avatarCtn}>
            <img src={demoAvatar} className={classes.avatar} />
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <Container className={classes.efLogoCtn}>
          <img src={efWhiteLogo} className={classes.efLogo} />
        </Container>
      </Drawer>

      <Switch>
        <Route exact path="/home">
          <h1>Home</h1>
        </Route>
        <Route exact path="/dashboard">
          <h1>Dashboard</h1>
        </Route>
        <Route exact path="/org-profile">
          <h1>Organization Profile</h1>
        </Route>
        <Route exact path="/projects-wg">
          <h1>Projects and WG</h1>
        </Route>
        <Route exact path="/committers-contributors">
          <h1>Committers-Contributors</h1>
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
    </>
  );
}
