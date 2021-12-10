import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
    };
  }

  componentDidMount() {
    this.props.isAuthenticated();
  }

  handleUsername = (event) => {
    event.preventDefault();
    this.setState({ username: event.target.value, error: '' });
  };
  handlePassword = (event) => {
    event.preventDefault();
    this.setState({ password: event.target.value, error: '' });
  };

  login = (event) => {
    event.preventDefault();
    const model = {
      password: this.state.password,
      username: this.state.username,
    };
    this.props.history.push('/sharecode');

    this.props.login(model).then((data) => {
      console.log(data);
      console.log(this.props);
      this.props.navigation.navigate('/sharecode');
    });
    if (this.props.error) {
      this.setState({ error: 'Your password or email is Incorect' });
    }
  };

  render() {
    let authRedirect = null;
    if (this.props.uid) {
      authRedirect = <Redirect to='/' />;
    }
    return (
      <div className='container'>
        {authRedirect}
        <h1>Login</h1>
        <div className='card'>
          <form onSubmit={this.login} className='form-container'>
            <small className='error'>{this.state.error}</small>
            <div className='field-container'>
              <label htmlFor='username'>Username</label>
              <input
                id='username'
                className='input-field'
                type='text'
                value={this.state.username}
                onChange={this.handleUsername}
                required
              />
            </div>
            <div className='field-container'>
              <label htmlFor='password'>Password</label>
              <input
                id='password'
                className='input-field'
                type='password'
                value={this.state.password}
                onChange={this.handlePassword}
                required
              />
            </div>
            <button type='submit' className='btn-submit'>
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
