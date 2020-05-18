import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar/Navbar";
import Blog from "./components/layout/Blog/blog";
import Article from "./components/layout/Article/article";
import Landing from "./components/layout/Landing/Landing";
import AuthHome from "./components/layout/authHome"
import MailConfirm from "./components/mailConfirm/mailConfirm"
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import AdminRoute from "./components/private-route/adminRoute";
import Dashboard from "./components/dashboard/Dashboard";
import Admin from "./components/admin/dashboard/index";
import NotFound from "./components/notFound/notFound"

import "./App.css";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  console.log("decoded",decoded)
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}


class App extends Component {
  
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="app">
            <div className="content">
              <Navbar />
              <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/auth" component={AuthHome} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/user/confirm/:id" component={MailConfirm} />
                <Route exact path="/article/:id" component={Article} />
                <Route exact path="/blog" component={Blog} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <AdminRoute exact path="/admin" component={Admin} />
                <Route path="*" component={NotFound} />


                
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
