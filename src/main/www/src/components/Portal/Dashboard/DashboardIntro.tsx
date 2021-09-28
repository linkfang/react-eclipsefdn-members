import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  createStyles,
  Divider,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Theme,
} from '@material-ui/core';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { getCurrentMode, MODE_REACT_ONLY } from '../../../Constants/Constants';
import NoteIcon from '@material-ui/icons/Note';
import GroupIcon from '@material-ui/icons/Group';
import EmailIcon from '@material-ui/icons/Email';

const orgRepDataTest = [
  {
    name: 'John Demo',
    type: 'Company Rep',
  },
  {
    name: 'Tom Demo',
    type: 'Marketing Rep',
  },
  {
    name: 'Bob Demo',
    type: 'Accouting Rep',
  },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    introCtn: {
      padding: 0,
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    card: {
      height: 260,
      boxShadow: '1px 1px 15px rgba(0,0,0,0.1)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minWidth: 255,
      width: '100%',
      margin: theme.spacing(2, 0),
      [theme.breakpoints.up(650)]: {
        width: '45%',
        margin: theme.spacing(2.5, 0.5, 0, 0.5),
      },
      [theme.breakpoints.up(1280)]: {
        width: '30%',
        margin: theme.spacing(2.5, 1, 0, 1),
      },
    },
    companyLogoCard: {
      backgroundColor: '#8A94A8',
    },
    companyLogo: {
      width: '90%',
      maxWidth: 250,
    },
    companyRepCard: {
      backgroundColor: '#D0D0D0',
    },
    repPrimary: {
      fontSize: 18,
    },
    repSecondary: {
      fontSize: 14,
    },
    companyContentCard: {
      flexDirection: 'column',
      justifyContent: 'start',
      alignItems: 'start',
      padding: theme.spacing(2, 3),
      backgroundColor: '#fff',
    },
    contentTitle: {
      marginBottom: theme.spacing(0.5),
    },
    divider: {
      width: '100%',
      // margin: theme.spacing(0.5, 0),
      margin: 0,
    },
    contentList: {
      width: '100%',
    },
    contentItemCtn: {
      padding: theme.spacing(2, 0),
    },
    contentAvatar: {
      width: 35,
      height: 35,
    },
    contentItemText: {
      fontSize: 18,
      display: 'flex',
      padding: 0,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    contentItemTextSub: {
      color: 'hsl(0, 0%, 75%)',
    },
  })
);

interface OrgRep {
  name: string;
  type: string;
}

export default function DashboardIntro() {
  const classes = useStyles();
  const [logoURL, setLogo] = useState('');
  const [orgRepData, setOrgRepData] = useState<Array<OrgRep> | null>(null);

  const renderOrgRep = orgRepData?.map((rep, index) => (
    <ListItem key={index}>
      <ListItemText
        classes={{
          primary: classes.repPrimary,
          secondary: classes.repSecondary,
        }}
        primary={rep.name}
        secondary={rep.type}
      />
    </ListItem>
  ));

  useEffect(() => {
    if (getCurrentMode() === MODE_REACT_ONLY) {
      setLogo(require('../../../assets/logos/ef-registered-wht.svg').default);
      setOrgRepData(orgRepDataTest);
    } else {
      setLogo(require('../../../assets/logos/ef-registered-wht.svg').default);
      setOrgRepData(orgRepDataTest);
      // TO DO:
      // fetch the logo and set state
      // fetch the organization rep and set state
    }
  }, []);

  return (
    <Container className={classes.introCtn}>
      <Card className={classNames(classes.card, classes.companyLogoCard)}>
        {logoURL ? (
          <CardMedia component="img" className={classes.companyLogo} image={logoURL} alt="Company Logo" />
        ) : (
          <CircularProgress />
        )}
      </Card>

      <Card className={classNames(classes.card, classes.companyRepCard)}>
        <CardContent>
          <List>{renderOrgRep || <CircularProgress />}</List>
        </CardContent>
      </Card>

      <Card className={classNames(classes.card, classes.companyContentCard)}>
        <List className={classes.contentList}>
          <Link href="https://www.eclipse.org/community/newsletter/" rel="noreferrer" target="_blank">
            <ListItem className={classes.contentItemCtn}>
              <ListItemAvatar>
                <Avatar className={classes.contentAvatar}>
                  <NoteIcon />
                </Avatar>
              </ListItemAvatar>
              <Container className={classes.contentItemText}>Member Newsletter</Container>
            </ListItem>
          </Link>

          <Divider className={classes.divider} />

          <Link href="https://www.eclipse.org/membership/exploreMembership.php" rel="noreferrer" target="_blank">
            <ListItem className={classes.contentItemCtn}>
              <ListItemAvatar>
                <Avatar className={classes.contentAvatar}>
                  <GroupIcon />
                </Avatar>
              </ListItemAvatar>
              <Container className={classes.contentItemText}>Explore our Members</Container>
            </ListItem>
          </Link>

          <Divider className={classes.divider} />

          <Link href="https://www.eclipse.org/org/foundation/contact.php" rel="noreferrer" target="_blank">
            <ListItem className={classes.contentItemCtn}>
              <ListItemAvatar>
                <Avatar className={classes.contentAvatar}>
                  <EmailIcon />
                </Avatar>
              </ListItemAvatar>
              <Container className={classes.contentItemText}>Contact Us</Container>
            </ListItem>
          </Link>
        </List>
      </Card>
    </Container>
  );
}
