import { Switch, Route, NavLink } from 'react-router-dom';
import {
  Theme,
  Container,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  ThemeProvider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';
import { makeStyles, createStyles, createMuiTheme } from '@material-ui/core/styles';
import {
  ExpandMore as ExpandMoreIcon,
  Home as HomeIcon,
  Assessment as AssessmentIcon,
  Business as BusinessIcon,
  BusinessCenter as BusinessCenterIcon,
  PeopleAlt as PeopleAltIcon,
  Description as DescriptionIcon,
  Help as HelpIcon,
  RecentActors as RecentActorsIcon,
} from '@material-ui/icons';
import efWhiteLogo from '../../assets/logos/ef-registered-wht.svg';
import demoAvatar from '../../assets/demo-avatar.jpg';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#f7941e',
      contrastText: '#0B0B0B', // for button text color
    },
  },
});

const drawerWidth = 280;
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
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: themeBlack,
    },
    navOptions: {
      height: 60,
      '&:hover': {
        textDecoration: 'none',
      },
    },
    navIcons: {
      color: '#A5A4BF',
    },
    navText: {
      color: '#FFF',
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
      marginLeft: 280,
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
  })
);

const navOptionsData = [
  {
    name: 'Home',
    path: '/home',
    icon: <HomeIcon />,
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: <AssessmentIcon />,
  },
  {
    name: 'Your Organization Profile',
    path: '/org-profile',
    // don't find an icon match the design
    icon: <BusinessIcon />,
  },
  {
    name: 'Projects and Working Groups',
    path: '/projects-wg',
    icon: <BusinessCenterIcon />,
  },
  {
    name: 'Committers and Contributors',
    path: '/committers-contributors',
    icon: <PeopleAltIcon />,
  },
  {
    name: 'Resources',
    path: '/resources',
    icon: <DescriptionIcon />,
  },
  {
    name: 'FAQs',
    path: '/faqs',
    icon: <HelpIcon />,
  },
  {
    name: 'Contact Management',
    path: '/contact-management',
    icon: <RecentActorsIcon />,
  },
];

export default function MainPortal() {
  const classes = useStyles();
  const navOptions = navOptionsData.map((item) => (
    <NavLink className={classes.navOptions} to={item.path} key={item.path}>
      <ListItem button>
        <ListItemIcon className={classes.navIcons}>{item.icon}</ListItemIcon>
        <ListItemText className={classes.navText} primary={item.name} />
      </ListItem>
    </NavLink>
  ));

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

      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <Container className={classes.efLogoCtn}>
          <img src={efWhiteLogo} alt="Eclipse Foundation logo" className={classes.efLogo} />
        </Container>
        <List>{navOptions}</List>
      </Drawer>
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
