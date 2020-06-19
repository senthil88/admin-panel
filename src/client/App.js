import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Login from './components/login';
import SignUp from "./components/signup";
import Dashboard from "./components/dashboard";
import Navbar from "./components/navbar";
import UserProvider, { UserContext } from "./components/user_provider";
import Cookies from "js-cookie";

export default class App extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {

  }

  isLoggedIn = () => {
    return Cookies.get('user_sid') ? true : false;
  }

  render() {
    return (
      <Router>
        <UserProvider isLoggedIn={this.isLoggedIn()}>
          <div className="App">
            <Navbar />
            
            <div className="auth-wrapper">
              <div className="auth-inner">
                
                <Switch>
                  <Route exact path='/' component={Login} />
                  <Route path="/sign-in" component={Login} />
                  <Route path="/sign-up" component={SignUp} />
                  <Route path="/dashboard" component={Dashboard} />
                </Switch>
              </div>
            </div>
          </div>
        </UserProvider>
      </Router>
    );
  }
}
