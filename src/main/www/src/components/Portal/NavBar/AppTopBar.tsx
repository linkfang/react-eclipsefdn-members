import {
  AppBar,
  Avatar,
  Button,
  Link,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  IconButton,
  Theme,
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import EditIcon from '@material-ui/icons/Edit';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MenuIcon from '@material-ui/icons/Menu';
import { useState } from 'react';
import { useEffect } from 'react';
import efGRYLogo from '../../../assets/logos/ef-gry.svg';
import { api_prefix, darkOrange, END_POINT, FETCH_HEADER } from '../../../Constants/Constants';
import { logout } from '../../../Utils/formFunctionHelpers';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
      height: 110,
      backgroundColor: '#fff',
      boxShadow: '0px 0px 16px rgba(0, 0, 0, 0.05)',
      [theme.breakpoints.up('md')]: {
        height: 70,
        position: 'fixed',
      },
      [theme.breakpoints.down('sm')]: {
        // Has to use !important to overwrite the padding-right 17px added by MUI when hamburger menu is open
        // This can avoid making user dropdown menu move left and right
        padding: '0 !important',
      },
      transition: theme.transitions.create('height', {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    toolbarCtn: {
      height: '100%',
    },
    iconCtn: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    efLogo: {
      width: 120,
    },
    hamburgerIcon: {
      marginRight: theme.spacing(0.4),
    },
    userInfoCtn: {
      display: 'flex',
      position: 'absolute',
      top: theme.spacing(1),
      right: theme.spacing(1.2),
      height: 38,
      alignItems: 'center',
      [theme.breakpoints.up('md')]: {
        top: theme.spacing(1.6),
        right: theme.spacing(2),
      },
    },
    verticalDivider: {
      display: 'none',
      backgroundColor: '#EBEBF2',
      height: 28,
      width: 1,
      marginRight: theme.spacing(2.1),
      [theme.breakpoints.up('md')]: {
        display: 'block',
      },
    },
    username: {
      marginBottom: 0,
      marginRight: theme.spacing(0.7),
    },
    dropDownBtn: {
      minWidth: 38,
      height: 30,
      padding: 0,
    },
    dropDownIcon: {
      color: '#A4AFB7',
    },
    dropDownItemIcon: {
      minWidth: 30,
    },
    avatarCtn: {
      display: 'none',
      width: 38,
      height: 38,
      marginLeft: theme.spacing(1.1),
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
      backgroundColor: darkOrange,
    },
    anchorTag: {
      textDecoration: 'none',
      color: 'inherit',
      '&:hover ': {
        textDecoration: 'none',
        color: 'inherit',
      },
    },
  })
);

interface UserInfo {
  first_name: string;
  last_name: string;
  full_name: string;
  picture: string;
}

interface AppTopBarProps {
  handleDrawerToggle: () => void;
}

const AppTopBar: React.FC<AppTopBarProps> = ({ handleDrawerToggle }) => {
  const classes = useStyles();
  const [userInfo, setUserInfo] = useState<UserInfo>({
    first_name: '',
    last_name: '',
    full_name: '',
    picture: '',
  });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleDropdownBtnClicked = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOptionClicked = (destination: string) => {
    window.location.assign(destination);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getInitials = (firstname: string, lastname: string) => {
    const firstnameInitial = firstname.substring(0, 1).toUpperCase();
    const lastnameInitial = lastname.substring(0, 1).toUpperCase();

    return firstnameInitial + lastnameInitial;
  };

  const renderDropdownMenu = () => (
    <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
      {userInfo?.full_name && (
        <MenuItem onClick={() => handleOptionClicked('https://www.eclipse.org/user')}>
          <ListItemIcon className={classes.dropDownItemIcon}>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="View Profile" />
        </MenuItem>
      )}

      {userInfo?.full_name && (
        <MenuItem onClick={() => handleOptionClicked('https://accounts.eclipse.org/user/edit')}>
          <ListItemIcon className={classes.dropDownItemIcon}>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Edit Profile" />
        </MenuItem>
      )}

      <MenuItem className="toolbar-manage-cookies" onClick={handleClose}>
        <ListItemIcon className={classes.dropDownItemIcon}>
          <SettingsIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Manage Cookies" />
      </MenuItem>

      {userInfo?.full_name ? (
        <MenuItem onClick={logout}>
          <ListItemIcon className={classes.dropDownItemIcon}>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Log Out" />
        </MenuItem>
      ) : (
        <Link href="/api/login" className={classes.anchorTag}>
          <MenuItem>
            <ListItemIcon className={classes.dropDownItemIcon}>
              <AccountCircleIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Log In" />
          </MenuItem>
        </Link>
      )}
    </Menu>
  );

  useEffect(() => {
    const getUserFullInfo = (username: String) => {
      fetch(`https://api.eclipse.org/account/profile/${username}`)
        .then((res) => res.json())
        .then((data) => {
          setUserInfo({
            first_name: data.first_name,
            last_name: data.last_name,
            full_name: data.full_name,
            picture: data.picture,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const getUserBasicInfo = () => {
      fetch(api_prefix() + `/${END_POINT.userinfo}`, { headers: FETCH_HEADER })
        .then((res) => res.json())
        .then((data) => {
          console.log('user info: ', data);
          getUserFullInfo(data.name);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getUserBasicInfo();
  }, []);

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbarCtn}>
        <div className={classes.iconCtn}>
          <img src={efGRYLogo} alt="Eclipse Foundation logo" className={classes.efLogo}></img>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            className={classes.hamburgerIcon}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </div>

        <div className={classes.userInfoCtn}>
          <div className={classes.verticalDivider}></div>
          <Typography paragraph className={classes.username}>
            {userInfo?.full_name || 'Anonymous'}
          </Typography>

          <Button className={classes.dropDownBtn} onClick={handleDropdownBtnClicked}>
            <ExpandMoreIcon className={classes.dropDownIcon} />
          </Button>

          {renderDropdownMenu()}
          {userInfo?.picture ? (
            <Avatar className={classes.avatarCtn} alt="user avatar" src={userInfo.picture} />
          ) : (
            <Avatar className={classes.avatarCtn}>{getInitials(userInfo.first_name, userInfo.last_name) || 'A'}</Avatar>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default AppTopBar;
