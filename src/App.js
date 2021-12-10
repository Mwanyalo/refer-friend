import { Switch, Redirect, Route } from 'react-router-dom';
import './App.scss';
import * as AuthContext from './providers/AuthProvider';

// import * as UserContext from './providers/UserProvider';
import WaitingRoom from './pages/WaitingRoom/WaitingRoom';
import ShareCode from './pages/ShareCode/ShareCode';
import Login from './pages/Login/Login';
import Header from './components/Header';

function App() {
  return (
    <>
      <AuthContext.Provider>
        <AuthContext.Consumer>
          {(authcontext) => (
            <>
              <Header {...authcontext} />
              <Switch>
                <Route
                  exact
                  path='/'
                  render={(props) => (
                    <WaitingRoom {...props} {...authcontext} />
                  )}
                />
                <Route
                  exact
                  path='/sharecode'
                  render={(props) => <ShareCode {...props} {...authcontext} />}
                />
                <Route
                  exact
                  path='/login'
                  render={(props) => <Login {...props} {...authcontext} />}
                />
                <Redirect to='/' />
              </Switch>
            </>
          )}
        </AuthContext.Consumer>
      </AuthContext.Provider>
    </>
  );
}

export default App;
