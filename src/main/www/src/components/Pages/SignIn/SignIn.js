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
} from '../../../Constants/Constants';
import { NavLink } from 'react-router-dom';
import Loading from '../../UIComponents/Loading/Loading';

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
class SignIn extends React.Component {
  static contextType = MembershipContext;
  state = {
    needLoading: true,
  };
  getFakeUser = (setFurthestPage) => {
    setFurthestPage({ index: 1, pathName: '/company-info' });
    fetch('membership_data/fake_user.json', { headers: FETCH_HEADER })
      .then((resp) => resp.json())
      .then((data) => {
        this.context.setCurrentUser(data);
      });
  };

  renderButtons = (setFurthestPage) =>
    this.state.needLoading ? (
      <Loading />
    ) : (
      <div className="text-center margin-bottom-20">
        {getCurrentMode() === MODE_REACT_ONLY && (
          <NavLink to="/company-info">
            <button
              type="button"
              onClick={() => this.getFakeUser(setFurthestPage)}
              className="btn btn-secondary"
            >
              React Only Login
            </button>
          </NavLink>
        )}

        {getCurrentMode() === MODE_REACT_API && (
          <a
            href="/login"
            className="btn btn-secondary"
            onClick={() => this.setState({ needLoading: true })}
          >
            Sign In
          </a>
        )}
        <a href="https://accounts.eclipse.org/" className="btn btn-secondary">
          Create an account
        </a>
      </div>
    );

  componentDidMount() {
    if (getCurrentMode() === MODE_REACT_API) {
      fetch(api_prefix() + `/${END_POINT.userinfo}`, { headers: FETCH_HEADER })
        .then((res) => res.json())
        .then((data) => {
          console.log('user info: ', data); // {family_name: "User1", given_name: "User1", name: "user1"}
          this.context.setCurrentUser(data);
          this.setState({ needLoading: false });
        })
        .catch((err) => {
          console.log(err);
          this.setState({ needLoading: false });
        });
    } else {
      this.setState({ needLoading: false });
    }
  }

  render() {
    return (
      <>
        {this.context.currentUser ? (
          <FormChooser
            setFurthestPage={this.props.setFurthestPage}
            history={this.props.history}
            setIsStartNewForm={this.props.setIsStartNewForm}
          />
        ) : (
          this.renderButtons(this.props.setFurthestPage)
        )}
      </>
    );
  }
}
export default SignIn;
