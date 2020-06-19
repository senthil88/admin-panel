import React, { useContext } from "react";
import UserProvider, { UserContext } from "./user_provider";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

class Navbar extends React.Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
  }

  render() {
    const userState = this.context.state;
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to="/sign-in">Admin Panel</Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                {
                  userState.isLoggedIn ? (<li className="nav-item">
                    <Link className="nav-link" to={'/sign-in'} onClick={this.context.logout}>Logout</Link>
                  </li>) : (
                      <>
                        <li className="nav-item">
                          <Link className="nav-link" to={'/sign-in'}>Login</Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                        </li>
                      </>
                    )
                }
              </ul>
            </div>
          </div>
        </nav>
      </>
    );
  }
}

export default Navbar;
