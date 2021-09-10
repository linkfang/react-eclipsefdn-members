import { CircularProgress } from '@material-ui/core';
import { brightOrange } from '../../../Constants/Constants';
import DescriptionIcon from '@material-ui/icons/Description';
import CustomCard from '../../UIComponents/CustomCard/CustomCard';
import { useEffect } from 'react';
import { useState } from 'react';
import SectionCtn from '../../UIComponents/CustomContainer/SectionCtn';

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
    <SectionCtn title="Resources" id="resources">
      {resourcesData.length > 0 ? renderResourcesItems : <CircularProgress />}
    </SectionCtn>
  );
}
