import { Typography, createStyles, makeStyles, Container } from '@material-ui/core';
import { brightOrange } from '../../../Constants/Constants';
import DescriptionIcon from '@material-ui/icons/Description';
import CustomCard from '../../UIComponents/CustomCard/CustomCard';

const useStyles = makeStyles(() =>
  createStyles({
    main: { padding: '90px 0 0' },
    resourcesCtn: {
      display: 'flex',
      marginTop: 40,
      padding: 0,
      justifyContent: 'space-between',
    },
  })
);

const resourcesDemoData = [
  {
    subtitle: 'Social Kits',
    listItems: [
      {
        name: '- Eclipse Ditto Whitepaper',
        url: '#',
      },
      {
        name: '- Eclipse Hono Case Study',
        url: '#',
      },
      {
        name: '- Eclipse Hawkbit',
        url: '#',
      },
    ],
  },
  {
    subtitle: 'Web Images',
    listItems: [
      {
        name: '- Eclipse IoT',
        url: '#',
      },
      {
        name: '- Edge Native Working Group',
        url: '#',
      },
      {
        name: '- Sparkplug',
        url: '#',
      },
    ],
  },
  {
    subtitle: 'Lorem Ipsum',
    listItems: [
      {
        name: '- Lorem Ipsum',
        url: '#',
      },
      {
        name: '- Lorem Ipsum',
        url: '#',
      },
      {
        name: '- Lorem Ipsum',
        url: '#',
      },
    ],
  },
  {
    subtitle: 'Lorem Ipsum',
    listItems: [
      {
        name: '- Lorem Ipsum',
        url: '#',
      },
      {
        name: '- Lorem Ipsum',
        url: '#',
      },
      {
        name: '- Lorem Ipsum',
        url: '#',
      },
    ],
  },
];

export default function DashboardResources() {
  const classes = useStyles();

  const renderResourcesItems = resourcesDemoData.map((item, index) => (
    <CustomCard
      key={item.subtitle + index}
      subtitle={item.subtitle}
      color={brightOrange}
      icon={<DescriptionIcon />}
      listItems={item.listItems}
    />
  ));

  return (
    <Container className={classes.main} id="resources">
      <Typography variant="h4">Resources</Typography>
      <Container className={classes.resourcesCtn}>{renderResourcesItems}</Container>
    </Container>
  );
}
