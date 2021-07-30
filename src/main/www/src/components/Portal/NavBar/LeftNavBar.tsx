import { NavLink } from 'react-router-dom';
import { ListItem, ListItemText, ListItemIcon, Container, Drawer, List } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import efWhiteLogo from '../../../assets/logos/ef-registered-wht.svg';
import { NAV_OPTIONS_DATA, drawerWidth, themeBlack, darkOrange } from '../../../Constants/Constants';
import { useRouteMatch } from 'react-router-dom';
import { scrollToTop } from '../../../Utils/formFunctionHelpers';

const useStyles = makeStyles(() =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: themeBlack,
    },
    navOptions: {
      '&:hover': {
        textDecoration: 'none',
      },
    },
    navItems: {
      height: 53,
      borderLeft: `rgba(0,0,0,0) 5px solid`,
    },
    navItemsActive: {
      height: 53,
      borderLeft: `${darkOrange} 5px solid`,
    },
    navIcons: {
      color: '#A5A4BF',
    },
    navIconsActive: {
      color: darkOrange,
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
  })
);

interface NavOptionProps {
  path: string;
  icon: JSX.Element;
  name: string;
}

const NavOption: React.FC<NavOptionProps> = ({ path, icon, name }) => {
  const classes = useStyles();
  const isActive = useRouteMatch(path);

  if (path.includes('#')) {
    // This means it is a sub nav of /dashboard
    return (
      <a className={classes.navOptions} href={path} key={path}>
        <ListItem className={classes.navItems} button>
          <ListItemIcon className={classes.navIcons}>{icon}</ListItemIcon>
          <ListItemText className={classes.navText} primary={name} />
        </ListItem>
      </a>
    );
  } else {
    return (
      <NavLink className={classes.navOptions} to={path} key={path} onClick={scrollToTop}>
        <ListItem className={isActive ? classes.navItemsActive : classes.navItems} button>
          <ListItemIcon className={isActive ? classes.navIconsActive : classes.navIcons}>{icon}</ListItemIcon>
          <ListItemText className={classes.navText} primary={name} />
        </ListItem>
      </NavLink>
    );
  }
};

export default function LeftNavBar() {
  const classes = useStyles();

  const navOptions = NAV_OPTIONS_DATA.map((item) => (
    <NavOption path={item.path} name={item.name} icon={item.icon} key={item.path} />
  ));

  return (
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
  );
}
