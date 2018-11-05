import React, { Component } from "react";
import Login from "./Login";
import Signup from "./Signup";

const divStyle = {
  textAlign: "center", // <-- the magic
  fontWeight: "bold",
  fontSize: 30,
  color: "blue"
};
const signupDiv = {
  position: "absolute",
  margin: "auto",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  width: "100px",
  height: "100px",

  borderRadius: "3px"
};
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
        <h1 style={divStyle}> Welcome To HQ!</h1>
        <Login />
        <Signup />
      </div>
    );
  }
}

export default Home;
