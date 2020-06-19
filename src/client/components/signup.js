import React, { Component } from 'react';
import { UserContext } from "./user_provider";

export default class SignUp extends Component {

  static contextType = UserContext;

  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      firstName: '',
      lastName: '',
      country: '',
      gender: '',
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
    const { userName,firstName,lastName,country,gender,email,password, } = this.state;

    return (
      userName.length > 0 &&
      firstName.length > 0 &&
      lastName.length > 0 &&
      country.length > 0 &&
      gender.length > 0 &&
      email.length > 0 &&
      this.emailVerification(email) &&
      password.length > 0
    );
  }

  handleSubmit(event) {
    const { userName,firstName,lastName,country,gender,email,password, } = this.state;
    event.preventDefault();
    const allowEnter = this.canBeSubmitted();

    if (allowEnter) {
      const data = {
        userName: userName,
        firstName: firstName,
        lastName: lastName,
        country: country,
        gender: gender,
        email: email,
        password: password,
      };

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      };

      fetch('/api/signup', requestOptions)
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
      <form onSubmit={this.handleSubmit} ref={form => (this.form = form)}>
        <h3>Sign Up</h3>

        <div className="form-group">
          <label>User Name</label>
          <input 
            type="text" 
            className="form-control flat" 
            placeholder="Enter User Name"
            value={this.state.userName}
            name='userName'
            onChange={this.handleInputChange}
            autoComplete="off"
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            className="form-control flat" 
            placeholder="Enter Email"
            value={this.state.email}
            name='email'
            onChange={this.handleInputChange}
            autoComplete="off"
          />
        </div>

        <div className="form-group">
          <label>First Name</label>
          <input 
            type="text" 
            className="form-control flat" 
            placeholder="Enter First Name"
            value={this.state.firstName}
            name='firstName'
            onChange={this.handleInputChange}
            autoComplete="off"
          />
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input 
            type="text" 
            className="form-control flat" 
            placeholder="Enter Last Name"
            value={this.state.lastName}
            name='lastName'
            onChange={this.handleInputChange}
            autoComplete="off"
          />
        </div>

        <div className="form-group" onChange={this.handleInputChange}>
          <label>Gender</label>
          <div className='form-inline'>
            <input type="radio" className="form-control flat radio" value="Male" name="gender" /> Male
            <input type="radio" className="form-control flat radio" value="Female" name="gender" /> Female
          </div>
        </div>

        <div className="form-group">
          <label>country</label>
          <select
            value={this.state.country}
            className="form-control flat"
            onChange={this.handleInputChange}
            name='country'
            >
              <option calue=''> Select Country</option>
            {this.props.countryList.map((label, index) => (
              <option value={label} >{label}</option>
            ))}
          </select>
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
            autoComplete="off"
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

SignUp.defaultProps = {
  countryList: ['India', 'Singapore', 'Slovenia', 'South Africa', 'Thailand'],
};