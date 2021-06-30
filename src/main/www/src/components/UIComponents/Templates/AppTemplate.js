import AppFooter from './AppFooter';
import AppHeader from './AppHeader';

const AppTemplate = (props) => {
  return (
    <>
      <AppHeader />
      <div className="container eclipsefdn-membership-webform">
        {props.children}
      </div>
      <AppFooter />
    </>
  );
};
export default AppTemplate;
