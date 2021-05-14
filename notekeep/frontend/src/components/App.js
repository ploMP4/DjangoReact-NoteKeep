import React from "react";
import HomePage from "./HomePage";
import Login from "./Login";
import SignUp from "./SignUp";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          component={HomePage}
        />
        <Route
          path="/login"
          component={Login}
        />
        <Route path="/sign-up" component={SignUp} />
      </Switch>
    </Router>
  );
};

export default App;
