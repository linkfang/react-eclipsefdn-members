import { createStyles, makeStyles, Card, Typography, Link, Theme } from '@material-ui/core';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import DescriptionIcon from '@material-ui/icons/Description';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import {
  borderRadiusSize,
  brightBlue,
  brightOrange,
  darkGray,
  darkOrange,
  iconGray,
} from '../../../Constants/Constants';
import SectionCtn from '../../UIComponents/CustomContainer/SectionCtn';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    overviewCard: {
      minWidth: 230,
      height: 90,
      backgroundColor: '#fff',
      boxShadow: '1px 1px 15px rgba(0,0,0,0.1)',
      transition: 'all 0.2s ease-out',
      '&:hover': {
        boxShadow: '2px 2px 15px rgba(0,0,0,0.15)',
        transform: 'scale(1.03)',
        transition: 'all 0.2s ease-out',
      },
      margin: theme.spacing(2, 0),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        margin: theme.spacing(2.5, 1, 2, 1),
        width: '46%',
      },
      [theme.breakpoints.up(1200)]: {
        margin: theme.spacing(2.5, 1, 2, 1),
        width: '22%',
      },
    },

    overviewAnchor: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      '&:hover': { textDecoration: 'none' },
    },

    overviewIcon: {
      height: '100%',
      width: 85,
      padding: theme.spacing(2),
      marginRight: theme.spacing(1),
      color: iconGray,
      borderRadius: borderRadiusSize,
    },
    overviewTitle: {
      color: darkGray,
      paddingRight: theme.spacing(1),
    },
  })
);

export default function DashboardOverview() {
  const classes = useStyles();

  const overviewItemData = [
    {
      title: 'Projects and Working Groups',
      icon: (
        <BusinessCenterIcon
          className={classes.overviewIcon}
          style={{
            borderBottom: `6px ${darkOrange} solid`,
          }}
        />
      ),
      href: '#projects-wg',
    },
    {
      title: 'Committer and Contributors',
      icon: (
        <PeopleAltIcon
          className={classes.overviewIcon}
          style={{
            borderBottom: `6px ${brightBlue} solid`,
          }}
        />
      ),
      href: '#committers-contributors',
    },
    {
      title: 'Resources',
      icon: (
        <DescriptionIcon
          className={classes.overviewIcon}
          style={{
            borderBottom: `6px ${brightOrange} solid`,
          }}
        />
      ),
      href: '#resources',
    },
    {
      title: 'FAQs',
      icon: (
        <ContactSupportIcon
          className={classes.overviewIcon}
          style={{
            borderBottom: `6px ${darkGray} solid`,
          }}
        />
      ),
      href: '#faqs',
    },
  ];

  const renderOverviewItems = overviewItemData.map((item) => (
    <Card key={item.title} className={classes.overviewCard}>
      <Link className={classes.overviewAnchor} href={item.href}>
        {item.icon}
        <Typography className={classes.overviewTitle} component="h6" variant="h6">
          {item.title}
        </Typography>
      </Link>
    </Card>
  ));

  return (
    <SectionCtn title="Overview" id="overview">
      {renderOverviewItems}
    </SectionCtn>
  );
}
