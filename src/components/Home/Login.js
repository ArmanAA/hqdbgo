import React, { Component } from "react";

import { Redirect } from "react-router-dom";
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
      redirect: false,
      show: false
    };
  }
  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };
  renderRedirect = () => {
    if (this.state.redirect) {
      let url = "/game/" + this.state.username;
      return <Redirect to={url} />;
    }
  };
  change = e => {
    e.preventDefault();
    //this.props.onChange({ [e.target.name]: e.target.value });
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        //console.log(res.status);
        this.setRedirect();
        document.cookie = "token=" + res.token;
      })
      .catch(error => console.log(error));
  };

  render() {
    // let url = new URL(window.location.href);
    //alert(url);
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
        {this.renderRedirect()}
      </div>
    );
  }
}

export default Login;
