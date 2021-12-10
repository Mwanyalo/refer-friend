import React, { Component, createContext } from 'react';
import api from '../adapters/config';
import history from '../adapters/history';
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
      this.setState({ uid: uid }, () => {
        return true;
      });
    }
    return false;
  };

  login = (props) => {
    return api
      .post('login', props)
      .then((res) => {
        if (res.status === 200) {
          const uid = 'id' + new Date().getTime();
          localStorage.setItem('uid', uid);
          // this.props.history.push('/sharecode');
          return res;
        } else {
          this.setState({ error: 'Login failed' });
        }
      })
      .catch((error) => {
        this.setState({ error: 'Password or Username is Incorect!' });
      });
  };

  logout = () => {
    localStorage.clear('uid');
    history.push('/login');
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          ...this.state,
          login: this.login,
          logout: this.logout,
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
