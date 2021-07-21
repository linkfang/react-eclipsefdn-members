import { Container } from '@material-ui/core';
import DashboardCommittersAndContributors from './DashboardCommittersAndContributors';
import DashboardFAQs from './DashboardFAQs';
import DashboardIntro from './DashboardIntro';
import DashboardOverview from './DashboardOverview';
import DashboardProjectsAndWG from './DashboardProjectsAndWG';
import DashboardResources from './DashboardResources';

export default function Dashboard() {
  return (
    <Container
      style={{
        margin: '40px 0',
        padding: 0,
      }}
    >
      <DashboardIntro />
      <DashboardOverview />
      <DashboardProjectsAndWG />
      <DashboardCommittersAndContributors />
      <DashboardResources />
      <DashboardFAQs />
    </Container>
  );
}
