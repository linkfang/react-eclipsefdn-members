import { CircularProgress } from '@material-ui/core';
import { darkOrange } from '../../../Constants/Constants';
import CustomCard from '../../UIComponents/CustomCard/CustomCard';
import { useEffect } from 'react';
import { useState } from 'react';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import SectionCtn from '../../UIComponents/CustomContainer/SectionCtn';

const projectsAndWGDemoData = [
  {
    subtitle: 'Your Projects',
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
    subtitle: 'Your Working Groups',
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
    subtitle: 'Projects You May be Interested in',
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
    subtitle: 'Working Groups You Might be Interested in',
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

interface ProjectsAndWG {
  subtitle: string;
  listItems: Array<{
    name: string;
    url: string;
  }>;
}

export default function DashboardProjectsAndWG() {
  const [projectsAndWGData, setProjectsAndWG] = useState<Array<ProjectsAndWG>>([]);

  useEffect(() => {
    // To do
    // Add fetch here
    setProjectsAndWG(projectsAndWGDemoData);
  }, []);

  const renderResourcesItems = projectsAndWGData.map((item, index) => (
    <CustomCard
      key={item.subtitle + index}
      subtitle={item.subtitle}
      color={darkOrange}
      icon={<BusinessCenterIcon />}
      listItems={item.listItems}
    />
  ));

  return (
    <SectionCtn title="Projects and Working Groups" id="projects-wg">
      {projectsAndWGData.length > 0 ? renderResourcesItems : <CircularProgress />}
    </SectionCtn>
  );
}
