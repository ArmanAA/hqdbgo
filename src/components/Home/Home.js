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
  componentDidMount = () => {
    //this.setState({ loginFields: fields });
    //  this.setState({ fields });
    //var hashedPassword = passwordHash.generate(this.state.password);x``
    // this.setState({hashPass:fie})
    // console.log(fields);
    // fetch("http://localhost:8080/api/data", {
    //   method: "GET",
    //   headers: { "Content-Type": "application/json" }
    //   // body: JSON.stringify(fields)
    // })
    //   .then(res => res.json())
    //   .then(data => {
    //     console.log(data);
    //     this.setState({ data: data.data });
    //   })
    //   .catch(error => console.log(error));
  };

  render() {
    return (
      <div>
        <h1 style={divStyle}> Welcome To HQ!</h1>
        {/* <h1 style={divStyle}>{this.state.data.name}</h1>
        <h1 style={divStyle}>{this.state.data.id}</h1>
        <h1 style={divStyle}>{this.state.data.time}</h1> */}
        <Login />

        <Signup />
      </div>
    );
  }
}

export default Home;
