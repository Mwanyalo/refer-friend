import React, { Component } from 'react';

class WaitingRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      referralCode: '',
      error: '',
      timeLeft: 10,
      userTicket: 0,
      claimCode: 'getin123',
    };
  }

  componentDidMount() {
    this.props.isAuthenticated();
    this.waitingPeriod();
  }

  waitingPeriod = () => {
    this.setState({ userTicket: Math.floor(Math.random() * (10 - 1) + 1) });
    let timeLeft = 10;
    let downloadTimer = setInterval(() => {
      timeLeft--;

      if (timeLeft <= 0) {
        clearInterval(downloadTimer);
      } else {
        this.setState({ timeLeft: timeLeft });
      }
    }, 1000);
  };

  handleChange = (event) => {
    event.preventDefault();
    this.setState({ referralCode: event.target.value, error: '' });
  };

  verifyCode = (event) => {
    event.preventDefault();

    if (this.state.referralCode === 'getin123') {
      this.props.history.push('/sharecode');
    } else {
      this.setState({ error: 'The referral code is Incorrect!' });
    }
  };

  render() {
    return (
      <div className='container'>
        <h1>Waiting Room</h1>
        <div className='card'>
          {this.state.timeLeft !== 1 ? (
            <div className='wait-container'>
              <h3>
                Your are in line, with ticket number: {this.state.userTicket}
              </h3>
              <small className='get-code'>
                {' '}
                Time left to get Referral Code: {this.state.timeLeft}{' '}
              </small>
            </div>
          ) : (
            <>
              <h4>Your referral Code is: getin123</h4>
              <form onSubmit={this.verifyCode} className='form-container'>
                <div>
                  <label htmlFor='rf-code'>Referral Code</label>
                  <input
                    id='rf-code'
                    className='input-field'
                    type='text'
                    value={this.state.referralCode}
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div>
                  <small className='error'>{this.state.error}</small>
                </div>
                <button type='submit' className='btn-submit'>
                  Submit
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default WaitingRoom;
