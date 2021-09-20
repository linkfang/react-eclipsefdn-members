import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  createStyles,
  Divider,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import { Container } from '@material-ui/core';
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

const useStyles = makeStyles(() =>
  createStyles({
    introCtn: {
      padding: 0,
      display: 'flex',
      justifyContent: 'space-between',
    },
    card: {
      width: '30%',
      height: 260,
      boxShadow: '1px 1px 15px rgba(0,0,0,0.1)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
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
      padding: '20px 30px',
      backgroundColor: '#fff',
    },
    divider: {
      width: '100%',
      margin: 0,
    },
    contentList: {
      width: '100%',
    },
    contentItemCtn: {
      padding: '20px 0',
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
          <ListItem className={classes.contentItemCtn}>
            <ListItemAvatar>
              <Avatar className={classes.contentAvatar}>
                <NoteIcon />
              </Avatar>
            </ListItemAvatar>
            <Container className={classes.contentItemText}>
              <Link href="https://www.eclipse.org/community/newsletter/" rel="noreferrer" target="_blank">
                Member Newsletter
              </Link>
            </Container>
          </ListItem>
          <Divider className={classes.divider} />

          <ListItem className={classes.contentItemCtn}>
            <ListItemAvatar>
              <Avatar className={classes.contentAvatar}>
                <GroupIcon />
              </Avatar>
            </ListItemAvatar>
            <Container className={classes.contentItemText}>
              <Link href="https://www.eclipse.org/membership/exploreMembership.php" rel="noreferrer" target="_blank">
                Explore our Members
              </Link>
            </Container>
          </ListItem>
          <Divider className={classes.divider} />

          <ListItem className={classes.contentItemCtn}>
            <ListItemAvatar>
              <Avatar className={classes.contentAvatar}>
                <EmailIcon />
              </Avatar>
            </ListItemAvatar>
            <Container className={classes.contentItemText}>
              <Link href="https://www.eclipse.org/org/foundation/contact.php" rel="noreferrer" target="_blank">
                Contact Us
              </Link>
            </Container>
          </ListItem>
        </List>
      </Card>
    </Container>
  );
}
