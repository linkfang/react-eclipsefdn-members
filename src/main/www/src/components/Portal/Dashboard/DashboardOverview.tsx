import { createStyles, makeStyles, Card, Typography, Link } from '@material-ui/core';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import DescriptionIcon from '@material-ui/icons/Description';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import { brightBlue, brightOrange, darkGray, darkOrange, iconGray } from '../../../Constants/Constants';
import SectionCtn from '../../UIComponents/CustomContainer/SectionCtn';

const useStyles = makeStyles(() =>
  createStyles({
    overviewCard: {
      width: '22%',
      minWidth: 230,
      margin: '25px 10px 20px 10px',
      height: 90,
      backgroundColor: '#fff',
      boxShadow: '1px 1px 15px rgba(0,0,0,0.1)',
      transition: 'all 0.2s ease-out',

      '&:hover': {
        boxShadow: '2px 2px 15px rgba(0,0,0,0.15)',
        transform: 'scale(1.03)',
        transition: 'all 0.2s ease-out',
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
      padding: 18,
      marginRight: 12,
      color: iconGray,
      borderRadius: 4,
    },
    overviewTitle: {
      color: darkGray,
      paddingRight: 10,
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
