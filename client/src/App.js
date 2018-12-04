import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { Provider } from 'react-redux';
import store from './store';

import Navbar from './components/layout/navbar';
import Footer from './components/layout/footer';
import Landing from './components/layout/landing';
import Register from './components/auth/register';
import Login from './components/auth/login';
import Services from './components/company/services';
import Customers from './components/company/customers';
import About from './components/company/about';
import Partner from './components/company/partner';
import CmsOverview from './components/cms/cmsOverview';

import Reset from './components/auth/reset';

import './App.css';

//Check for token
if (localStorage.jwtToken) {
  //Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user infor and expiration
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            {/* className="page-container" */}
            <div>
              <Navbar />
              <Route exact path="/" component={Landing} />
              <div className="page-container">
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/services" component={Services} />
                <Route exact path="/customers" component={Customers} />
                <Route exact path="/about" component={About} />
                <Route exact path="/partner" component={Partner} />
                <Route exact path="/reset/:token" component={Reset} />
                <Route exact path="/cms" component={CmsOverview} />
              </div>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
