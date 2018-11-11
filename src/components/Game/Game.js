import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { homedir } from "os";
class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.match.params.id,
      redirect: false
    };
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };
  renderHomeRedirect = () => {
    if (this.state.redirect) {
      let url = "/";
      return <Redirect to={url} />;
    }
  };
  componentDidMount() {
    //here set up the socket.
    const url = "http://localhost:8080/api/game/" + this.state.username;
    fetch(url, {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        if (res.status == 401) {
          this.setRedirect();

          alert(this.state.redirect);
        }
      })
      .catch(error => console.log(error));
  }
  render() {
    return (
      <div>
        <h1>This is The Game Page for {this.state.username}.</h1>
        {this.renderHomeRedirect()}
      </div>
    );
  }
}

export default Game;
