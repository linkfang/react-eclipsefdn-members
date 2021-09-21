import 'eclipsefdn-solstice-assets/js/ga';
import 'eclipsefdn-solstice-assets/js/privacy';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Theme } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import LeftNavBar from './NavBar/LeftNavBar';
import { mainContentBGColor } from '../../Constants/Constants';
import Dashboard from './Dashboard/Dashboard';
import AppTopBar from './NavBar/AppTopBar';
// import Home from './Home/Home';
// import ProjectsAndWG from './ProjectsAndWG/ProjectsAndWG';
// import CommitersAndContributors from './CommittersAndContributors/CommitersAndContributors';
// import Resources from './Resources/Resources';
// import FAQs from './FAQs/FAQs';
import OrgProfile from './OrgProfile/OrgProfiles';
import ContactManagement from './ContactManagement/ContactManagement';
import { useState } from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(2.5, 1.5),
      backgroundColor: mainContentBGColor,
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(2.5),
      },
      [theme.breakpoints.up('md')]: {
        marginLeft: theme.spacing(28),
        padding: theme.spacing(6.5),
        marginTop: theme.spacing(6.5),
      },
    },
  })
);

export default function MainPortal() {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <>
      <AppTopBar handleDrawerToggle={handleDrawerToggle} />

      <LeftNavBar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />

      <main className={classes.content}>
        <Switch>
          {/* <Route exact path="/home">
            <Home />
          </Route> */}
          <Route path="/portal/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/portal/org-profile">
            <OrgProfile />
          </Route>
          {/* <Route exact path="/projects-wg">
            <ProjectsAndWG />
          </Route> */}
          {/* <Route exact path="/committers-contributors">
            <CommitersAndContributors />
          </Route> */}
          {/* <Route exact path="/resources">
            <Resources />
          </Route> */}
          {/* <Route exact path="/faqs">
            <FAQs />
          </Route> */}
          <Route exact path="/portal/contact-management">
            <ContactManagement />
          </Route>
          <Route path="/portal">
            <Redirect to="/portal/dashboard" />
          </Route>
        </Switch>
      </main>
    </>
  );
}
