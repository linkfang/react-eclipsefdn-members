import { AppBar, Avatar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import { useState } from 'react';
import { useEffect } from 'react';
import demoAvatar from '../../../assets/demo-avatar.jpg';
import { api_prefix, drawerWidth, END_POINT, FETCH_HEADER } from '../../../Constants/Constants';
import { isProd } from '../../../Utils/formFunctionHelpers';

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

export default function AppTopBar() {
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
          !isProd && console.log(err);
        });
    };

    const getUserBasicInfo = () => {
      fetch(api_prefix() + `/${END_POINT.userinfo}`, { headers: FETCH_HEADER })
        .then((res) => res.json())
        .then((data) => {
          !isProd && console.log('user info: ', data);
          getUserFullInfo(data.name);
        })
        .catch((err) => {
          !isProd && console.log(err);
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
        <ExpandMoreIcon className={classes.dropDownIcon} />
        <Avatar
          className={classes.avatarCtn}
          alt="user avatar"
          src={userInfo?.picture ? userInfo.picture : demoAvatar}
        />
      </Toolbar>
    </AppBar>
  );
}
