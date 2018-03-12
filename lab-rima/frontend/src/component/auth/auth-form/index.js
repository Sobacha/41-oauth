import React from 'react';
import {Redirect} from 'react-router-dom';
import {renderIf} from '../../../lib/utils';

export default class AuthForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      usernameError: null,
      emailError: null,
      passwordError: null,
      error: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    let {name, value} = event.target;
    this.setState({
      [name]: value.trim(),
      usernameError: name === 'username' && !value.trim() ? 'Username required' : null,
      emailError: name === 'email' && !value.trim() ? 'Email required' : null,
      passwordError: name === 'password' && !value.trim() ? 'Password required' : null,
    });
  }

  handleSubmit(event){
    event.preventDefault();
    let {username, email, password} = this.state;
    this.props.onComplete({username, email, password})
      .then(() => this.setState({username: '', email: '', password: ''}))
      .catch(error => this.setState({error}));
  }

  render(){
    if(localStorage.token){
      window.location = '/content';
    }
    return (
      <div className="auth-oauth">
        <a href="" className="oauth-with-google">Login / SignUp with Google</a>
        <form
          className="auth-form"
          onSubmit={this.handleSubmit}
          noValidate>

          <input
            type="text"
            name="username"
            placeholder="username"
            pattern=""
            value={this.state.username}
            onChange={this.handleChange}/>

          {renderIf(this.state.usernameError,
            <span className="tooltip">{
              this.state.usernameError}
            </span>)
          }

          {renderIf(this.props.auth === 'signup',
            <input
              type="email"
              name="email"
              placeholder="email@example.com"
              value={this.state.email}
              onChange={this.handleChange}/>
          )}

          <input
            type="password"
            name="password"
            placeholder="password"
            value={this.state.password}
            onChange={this.handleChange}/>

          <button type="submit">
            {this.props.auth}
          </button>
        </form>
      </div>
    );
  }
}
