import React, { Component } from "react";
var passwordHash = require("password-hash");
const divStyle = {
  textAlign: "center", // <-- the magic
  fontWeight: "bold",
  fontSize: 30,
  color: "blue"
};
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      hashPass: ""
    };
  }
  change = e => {
    e.preventDefault();
    //this.props.onChange({ [e.target.name]: e.target.value });
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    // this.setState({ loginFields: fields });

    var hashedPassword = passwordHash.generate(this.state.password);
    this.setState({ hashPass: hashedPassword });

    fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state)
    })
      .then(res => console.log(res.json()))
      .catch(error => console.log(error));
    //alert(this.state.fields.username);
  };

  // console.log(this.state);
  render() {
    return (
      <div>
        <h1>Log In Here!</h1>
        <form>
          <input
            className="form-control"
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={e => this.change(e)}
          />
          <input
            name="password"
            placeholder="Password"
            type="password"
            value={this.state.password}
            onChange={e => this.change(e)}
          />
          <button onClick={e => this.onSubmit(e)}>Log In</button>
        </form>
      </div>
    );
  }
}

export default Login;
