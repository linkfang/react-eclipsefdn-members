import { AppBar, Avatar, IconButton, Theme, Toolbar, Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MenuIcon from '@material-ui/icons/Menu';
import { useState } from 'react';
import { useEffect } from 'react';
import demoAvatar from '../../../assets/demo-avatar.jpg';
import efGRYLogo from '../../../assets/logos/ef-gry.svg';
import { api_prefix, END_POINT, FETCH_HEADER } from '../../../Constants/Constants';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
      height: 110,
      backgroundColor: '#fff',
      boxShadow: '0px 0px 16px rgba(0, 0, 0, 0.05)',
      // Has to use !important to overwrite the padding-right 17px added by MUI when humbergur menu is open
      // This can avoid making user dropdown and humbergur menu move left and right
      padding: '0 !important',
      [theme.breakpoints.up('md')]: {
        height: 70,
        position: 'fixed',
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
      marginRight: 4,
    },
    userInfoCtn: {
      display: 'flex',
      position: 'absolute',
      top: 10,
      right: 12,
      height: 38,
      alignItems: 'center',
      [theme.breakpoints.up('md')]: {
        top: 16,
        right: 20,
      },
    },
    verticalDivider: {
      display: 'none',
      backgroundColor: '#EBEBF2',
      height: 28,
      width: 1,
      marginRight: 21,
      [theme.breakpoints.up('md')]: {
        display: 'block',
      },
    },
    username: {
      marginBottom: 0,
      marginRight: 7,
    },
    dropDownIcon: {
      color: '#A4AFB7',
    },
    avatarCtn: {
      display: 'none',
      width: 38,
      height: 38,
      marginLeft: 11,
      [theme.breakpoints.up('md')]: {
        display: 'block',
      },
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

interface AppTopBarProps {
  handleDrawerToggle: () => void;
}

const AppTopBar: React.FC<AppTopBarProps> = ({ handleDrawerToggle }) => {
  const classes = useStyles();
  const [userInfo, setUserInfo] = useState<UserInfo>();

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
            {userInfo?.full_name ? userInfo.full_name : 'John Doe'}
          </Typography>
          <ExpandMoreIcon className={classes.dropDownIcon} />
          <Avatar
            className={classes.avatarCtn}
            alt="user avatar"
            src={userInfo?.picture ? userInfo.picture : demoAvatar}
          />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default AppTopBar;
