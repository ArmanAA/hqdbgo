import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import User from "./components/User";
//import registerServiceWorker from './registerServiceWorker';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/user/:id" component={User} />
        </Switch>
      </BrowserRouter>
    );
  }
}
