import React from "react";
export const UserContext = React.createContext();
import Cookies from "js-cookie";
import { withRouter } from 'react-router-dom'

class UserProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: props.isLoggedIn,
    };

    if (props.isLoggedIn) {
      props.history.push('/dashboard')
    }
  }

  logout = (type) => {
    Cookies.remove('user_sid');
    this.setState({ isLoggedIn: false });
  };

  setLogin = val => {
    this.setState({ isLoggedIn: true });
    if (val) {
      this.props.history.push('/dashboard')
    }
  };

  goToLogin = () => {
    this.props.history.push('/login')
  };


  render() {
    return (
      <UserContext.Provider
        value={{
          state: this.state,
          logout: this.logout,
          setLogin: this.setLogin,
          goToLogin: this.goToLogin,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default withRouter(UserProvider)
