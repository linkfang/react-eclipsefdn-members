import React from 'react';
import MembershipContext from '../../../Context/MembershipContext';
import FormChooser from '../../UIComponents/FormPreprocess/FormChooser';
import {
  FETCH_HEADER,
  api_prefix,
  END_POINT,
  getCurrentMode,
  MODE_REACT_ONLY,
  MODE_REACT_API,
  ROUTE_COMPANY,
} from '../../../Constants/Constants';
import Loading from '../../UIComponents/Loading/Loading';
import { isProd } from '../../../Utils/formFunctionHelpers';
import { Button, createMuiTheme, ThemeProvider } from '@material-ui/core';

/**
 * - When it is only running React App without server, uses fake user in public/fake_user.json
 * - When run with server, call the userInfo END_POINT
 * - When logged in, `if(currentUser)`, render form chooser
 *
 * //// eslint-disable-next-line ---> not a best practice to use
 *
 * /// But if passing object or function into the dependency array, it is always considered as changed, and keeps re-run the useEffect which causes neverending re-render
 *
 * For functions, the best way to use is useCallback()
 *
 * For Object, need to use the sepecific object value or deconstruct it
 *
 * Please refer to some good explanation about useEffect and dependecies:
 * https://betterprogramming.pub/why-eslint-hates-your-useeffect-dependencies-react-js-560fcac0b1f
 *
 * https://stackoverflow.com/questions/55840294/how-to-fix-missing-dependency-warning-when-using-useeffect-react-hook
 *
 * https://stackoverflow.com/questions/64106594/is-the-useeffect-has-a-missing-dependency-warning-sometimes-wrong
 *
 * https://stackoverflow.com/questions/63201445/react-hook-useeffect-missing-dependencies-warning
 *
 */

const IS_SIGN_IN_CLICKED_KEY = 'isSignInClicked';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#f7941e',
      contrastText: '#fff',
    },
    secondary: {
      main: '#404040',
      contrastText: '#fff',
    },
  },
});

class SignIn extends React.Component {
  static contextType = MembershipContext;

  getFakeUser = (setFurthestPage) => {
    this.props.history.push(ROUTE_COMPANY);
    setFurthestPage({ index: 1, pathName: ROUTE_COMPANY });
    this.context.setCurrentFormId('reactOnly');
    fetch('membership_data/fake_user.json', { headers: FETCH_HEADER })
      .then((resp) => resp.json())
      .then((data) => {
        this.context.setCurrentUser(data);
      });
  };

  handleSignIn = () => {
    window.location.assign('/api/login');
    localStorage.setItem(IS_SIGN_IN_CLICKED_KEY, 'true');
    this.context.setNeedLoadingSignIn(true);
  };

  renderButtons = (setFurthestPage) =>
    this.context.needLoadingSignIn ? (
      <Loading />
    ) : (
      <div className="text-center margin-bottom-30">
        <p className="h4 text-center margin-bottom-10">
          Get started by logging in with your Eclipse Foundation account:
        </p>
        {getCurrentMode() === MODE_REACT_ONLY && (
          <Button variant="contained" color="secondary" size="large" onClick={() => this.getFakeUser(setFurthestPage)}>
            React Only Login
          </Button>
        )}

        {getCurrentMode() === MODE_REACT_API && (
          <Button variant="contained" color="secondary" size="large" onClick={this.handleSignIn}>
            Log in
          </Button>
        )}
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={() => window.location.assign('https://accounts.eclipse.org/')}
        >
          Create an account
        </Button>
      </div>
    );

  getUserInfo = () => {
    fetch(api_prefix() + `/${END_POINT.userinfo}`, { headers: FETCH_HEADER })
      .then((res) => res.json())
      .then((data) => {
        !isProd && console.log('user info: ', data); // {family_name: "User1", given_name: "User1", name: "user1"}
        this.context.setCurrentUser(data);
        this.context.setNeedLoadingSignIn(false);
      })
      .catch((err) => {
        !isProd && console.log(err);
        this.context.setNeedLoadingSignIn(false);
      });
  };

  getCSRFToken = () => {
    fetch(`${api_prefix()}/csrf`, { headers: FETCH_HEADER }).then((res) => {
      FETCH_HEADER['x-csrf-token'] = res.headers.get('x-csrf-token');
      this.getUserInfo();
    });
  };

  componentDidMount() {
    const isSignInClicked = localStorage.getItem(IS_SIGN_IN_CLICKED_KEY);

    // Check if the sign in button is clicked, if so, reload the page to get the q_session cookie ready.
    if (isSignInClicked) {
      localStorage.setItem(IS_SIGN_IN_CLICKED_KEY, '');
      window.location.reload();
    }

    if (getCurrentMode() === MODE_REACT_API) {
      this.getCSRFToken();
    } else {
      this.context.setNeedLoadingSignIn(false);
    }
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className="sign-in-btn-ctn">
          {this.context.currentUser ? (
            <FormChooser
              setFurthestPage={this.props.setFurthestPage}
              history={this.props.history}
              setIsStartNewForm={this.props.setIsStartNewForm}
              resetCompanyInfoForm={this.props.resetCompanyInfoForm}
              resetMembershipLevelForm={this.props.resetMembershipLevelForm}
              resetWorkingGroupForm={this.props.resetWorkingGroupForm}
              resetSigningAuthorityForm={this.props.resetSigningAuthorityForm}
              setUpdatedFormValues={this.props.setUpdatedFormValues}
            />
          ) : (
            this.renderButtons(this.props.setFurthestPage)
          )}
        </div>
      </ThemeProvider>
    );
  }
}
export default SignIn;
