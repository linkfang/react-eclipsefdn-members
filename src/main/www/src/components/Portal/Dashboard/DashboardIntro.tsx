import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  createStyles,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import { Container } from '@material-ui/core';
import classNames from 'classnames';
import ImageIcon from '@material-ui/icons/Image';
import { useEffect, useState } from 'react';
import { getCurrentMode, MODE_REACT_ONLY } from '../../../Constants/Constants';

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
      margin: '20px 0',
      [theme.breakpoints.up(650)]: {
        width: '45%',
        margin: '25px 5px 0px 5px',
      },
      [theme.breakpoints.up(1280)]: {
        width: '30%',
        margin: '25px 10px 0px 10px',
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
      padding: '20px 30px',
      backgroundColor: '#fff',
    },
    contentTitle: {
      marginBottom: 5,
    },
    divider: {
      width: '100%',
      margin: '5px 0',
    },
    contentList: {
      width: '100%',
    },
    contentItemCtn: {
      padding: '8px 0',
    },
    contentAvatar: {
      width: 35,
      height: 35,
    },
    contentItemText: {
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

  const renderOrgRep = orgRepData?.map((rep) => (
    <ListItem>
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
        <Typography component="h5" variant="h5" className={classes.contentTitle}>
          Lorem Ipsum
        </Typography>
        <List className={classes.contentList}>
          <ListItem className={classes.contentItemCtn}>
            <ListItemAvatar>
              <Avatar className={classes.contentAvatar}>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <Container className={classes.contentItemText}>
              <Typography component="p" variant="body1">
                Lorem Ipsum
              </Typography>
              <Typography component="span" variant="body2" className={classes.contentItemTextSub}>
                Last 24 hours
              </Typography>
            </Container>
          </ListItem>
          <Divider className={classes.divider} />

          <ListItem className={classes.contentItemCtn}>
            <ListItemAvatar>
              <Avatar className={classes.contentAvatar}>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <Container className={classes.contentItemText}>
              <Typography component="p" variant="body1">
                Lorem Ipsum
              </Typography>
              <Typography component="span" variant="body2" className={classes.contentItemTextSub}>
                Processing
              </Typography>
            </Container>
          </ListItem>
          <Divider className={classes.divider} />

          <ListItem className={classes.contentItemCtn}>
            <ListItemAvatar>
              <Avatar className={classes.contentAvatar}>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <Container className={classes.contentItemText}>
              <Typography component="p" variant="body1">
                Lorem Ipsum
              </Typography>
              <Typography component="span" variant="body2" className={classes.contentItemTextSub}>
                On hold
              </Typography>
            </Container>
          </ListItem>
        </List>
      </Card>
    </Container>
  );
}
