import DashboardCommittersAndContributors from './DashboardCommittersAndContributors';
import DashboardFAQs from './DashboardFAQs';
import DashboardIntro from './DashboardIntro';
import DashboardOverview from './DashboardOverview';
import DashboardProjectsAndWG from './DashboardProjectsAndWG';
import DashboardResources from './DashboardResources';

export default function Dashboard() {
  return (
    <>
      <DashboardIntro />
      <DashboardOverview />
      <DashboardProjectsAndWG />
      <DashboardCommittersAndContributors />
      <DashboardResources />
      <DashboardFAQs />
    </>
  );
}
