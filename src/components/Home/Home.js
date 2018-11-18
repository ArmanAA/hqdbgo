import React, { Component } from "react";
import Login from "./Login";
import Signup from "./Signup";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},
      hashPass: "",
      data: {}
    };
  }

  render() {
    return (
      <div>
        <h1> Welcome To Live Trivia!</h1>
        <Login />
        <Signup />
      </div>
    );
  }
}

export default Home;
