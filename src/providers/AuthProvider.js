import React, { Component, createContext } from 'react';
import api from '../adapters/config';
export const AuthContext = createContext({ user: null });

class AuthProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: '',
      user: {},
      error: '',
    };
  }

  isAuthenticated = () => {
    const uid = localStorage.uid;
    if (uid) {
      this.setState({ uid: uid });
      return true;
    }
    this.setState({ uid: '' });
    return false;
  };

  login = (props) => {
    api
      .post('login', props)
      .then((res) => {
        if (res.status === 200) {
          const uid = 'id' + new Date().getTime();
          this.setState({ uid: uid });
          localStorage.setItem('uid', uid);
        } else {
          this.setState({ error: 'Login failed' });
        }
      })
      .catch((error) => {
        this.setState({ error: 'Password or Username is Incorect!' });
      });
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          ...this.state,
          login: this.login,
          isAuthenticated: this.isAuthenticated,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export const Consumer = AuthContext.Consumer;
export const Provider = AuthProvider;
