import { Typography, createStyles, makeStyles, Container, CircularProgress } from '@material-ui/core';
import { brightOrange } from '../../../Constants/Constants';
import DescriptionIcon from '@material-ui/icons/Description';
import CustomCard from '../../UIComponents/CustomCard/CustomCard';
import { useEffect } from 'react';
import { useState } from 'react';

const useStyles = makeStyles(() =>
  createStyles({
    main: { padding: '90px 0 0', margin: 0, maxWidth: '100%' },
    resourcesCtn: {
      maxWidth: '100%',
      display: 'flex',
      flexWrap: 'wrap',
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

interface ResourcesData {
  subtitle: string;
  listItems: Array<{
    name: string;
    url: string;
  }>;
}

export default function DashboardResources() {
  const classes = useStyles();
  const [resourcesData, setResourcesData] = useState<Array<ResourcesData>>([]);

  useEffect(() => {
    // To do
    // Add fetch here
    setResourcesData(resourcesDemoData);
  }, []);

  const renderResourcesItems = resourcesData.map((item, index) => (
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

      <Container className={classes.resourcesCtn}>
        {resourcesData.length > 0 ? renderResourcesItems : <CircularProgress />}
      </Container>
    </Container>
  );
}
