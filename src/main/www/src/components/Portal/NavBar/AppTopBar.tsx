import { AppBar, Avatar, IconButton, Toolbar, Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MenuIcon from '@material-ui/icons/Menu';
import { useState } from 'react';
import { useEffect } from 'react';
import demoAvatar from '../../../assets/demo-avatar.jpg';
import { api_prefix, END_POINT, FETCH_HEADER } from '../../../Constants/Constants';

const useStyles = makeStyles(() =>
  createStyles({
    appBar: {
      height: 70,
      backgroundColor: '#fff',
      boxShadow: '0px 0px 16px rgba(0, 0, 0, 0.05)',
      justifyContent: 'center',
    },
    toolbarCtn: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    userInfoCtn: {
      display: 'flex',
      alignItems: 'center',
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
        <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle}>
          <MenuIcon />
        </IconButton>
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
