import React, { Component } from 'react';
import { UserContext } from "./user_provider";

export default class Login extends Component {

  static contextType = UserContext;

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  emailVerification(userEmail) {
    const reqExp = /\S+@\S+\.\S+/;
    return reqExp.test(userEmail);
  }

  canBeSubmitted() {
    const { email, password } = this.state;

    return (
      email.length > 0 &&
      this.emailVerification(email) &&
      password.length > 0
    );
  }

  handleSubmit(event) {
    const { email, password } = this.state;
    event.preventDefault();
    const allowEnter = this.canBeSubmitted();

    if (allowEnter) {
      let startTime = new Date().getTime();
      const data = {
        email: email,
        password: password,
      };

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      };

      fetch('/api/login', requestOptions)
        .then(response => response.json())
        .then(data => {
          if (data.status == 'success') {
            this.context.setLogin(true);
          }
        });
    }
  }

  render() {
    const isEnabled = this.canBeSubmitted();
    return (
      <form className='small' onSubmit={this.handleSubmit} ref={form => (this.form = form)}>
        <h3>Sign In</h3>

        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control flat"
            placeholder="Enter email"
            value={this.state.email}
            name='email'
            onChange={this.handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control flat"
            placeholder="Enter Password"
            name='password'
            value={this.state.password}
            onChange={this.handleInputChange}
          />
        </div>

        <button type="submit" className={
                !isEnabled
                  ? "btn btn-primary btn-block inactive"
                  : "btn btn-primary btn-block formactive"
              }>Submit</button>
      </form>
    );
  }
}