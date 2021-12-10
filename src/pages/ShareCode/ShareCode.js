import React, { Component } from 'react';
import './ShareCode.scss';

class ShareCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      referralLink: 'https://fingo.africa?',
    };
  }

  componentDidMount() {
    this.props.isAuthenticated();
  }

  handleFocus = (event) => event.target.select();

  render() {
    return (
      <div className='wrapper'>
        <div className='content'>
          <div className='shareUrl'>
            <header className='shareUrl-header'>
              <h1 className='shareUrl-headerText'>
                Click to Copy The Referral Link
              </h1>
            </header>
            <div className='shareUrl-body'>
              <div className='container'>
                <input
                  className='shareUrl-input'
                  type='text'
                  readonly='readonly'
                  value={this.state.referralLink}
                  onFocus={this.handleFocus}
                />
                <p>Click above to select the link.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ShareCode;
