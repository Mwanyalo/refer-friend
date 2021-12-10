import React, { Component } from 'react';
import './Header.scss';
import history from '../adapters/history';

export class Header extends Component {
  logout = () => {
    localStorage.clear('uid');
    history.push('/login');
  };

  render() {
    return (
      <header className='header'>
        <div className='header-title'>
          <h5>Refer A Friend</h5>
        </div>
        {!this.props.uid === false && (
          <div className='logout' onClick={() => this.logout()}>
            <h5>Logout</h5>
          </div>
        )}
      </header>
    );
  }
}

export default Header;
