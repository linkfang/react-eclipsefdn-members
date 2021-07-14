import {
  AppBar,
  Avatar,
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import EditIcon from '@material-ui/icons/Edit';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import { useState } from 'react';
import { useEffect } from 'react';
import demoAvatar from '../../../assets/demo-avatar.jpg';
import { api_prefix, drawerWidth, END_POINT, FETCH_HEADER } from '../../../Constants/Constants';
import { logout } from '../../../Utils/formFunctionHelpers';

const useStyles = makeStyles(() =>
  createStyles({
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
      width: 38,
      height: 38,
      marginLeft: 11,
    },
    avatar: {
      width: 38,
    },
  })
);

interface UserInfo {
  full_name: string;
  picture: string;
}

export default function AppTopBar() {
  const classes = useStyles();
  const [userInfo, setUserInfo] = useState<UserInfo>();
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

  const renderDropdownMenu = () => (
    <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
      <MenuItem onClick={() => handleOptionClicked('https://www.eclipse.org/user')}>
        <ListItemIcon className={classes.dropDownItemIcon}>
          <PersonIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="View Profile" />
      </MenuItem>
      <MenuItem onClick={() => handleOptionClicked('https://accounts.eclipse.org/user/edit')}>
        <ListItemIcon className={classes.dropDownItemIcon}>
          <EditIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Edit Profile" />
      </MenuItem>
      <MenuItem className="toolbar-manage-cookies" onClick={handleClose}>
        <ListItemIcon className={classes.dropDownItemIcon}>
          <SettingsIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Manage Cookies" />
      </MenuItem>
      <MenuItem onClick={logout}>
        <ListItemIcon className={classes.dropDownItemIcon}>
          <ExitToAppIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Log Out" />
      </MenuItem>
    </Menu>
  );

  useEffect(() => {
    const getUserFullInfo = (username: String) => {
      fetch(`https://api.eclipse.org/account/profile/${username}`)
        .then((res) => res.json())
        .then((data) => {
          setUserInfo({
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
        <div className={classes.verticalDivider}></div>
        <Typography paragraph className={classes.username}>
          {userInfo?.full_name ? userInfo.full_name : 'John Doe'}
        </Typography>

        <Button className={classes.dropDownBtn} onClick={handleDropdownBtnClicked}>
          <ExpandMoreIcon className={classes.dropDownIcon} />
        </Button>

        {renderDropdownMenu()}

        <Avatar
          className={classes.avatarCtn}
          alt="user avatar"
          src={userInfo?.picture ? userInfo.picture : demoAvatar}
        />
      </Toolbar>
    </AppBar>
  );
}
