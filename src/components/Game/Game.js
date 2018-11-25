import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
class Game extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     username: this.props.match.params.id,
  //     redirect: false,
  //     message: "",
  //     chatHistroy: [],
  //     ws: ""
  //   };
  // }
  change = e => {
    // e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };
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
    const self = this;
    const url = "http://localhost:8080/api/game/" + this.state.username;
    fetch(url, {
      method: "GET",
      credentials: "include",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status == 401) {
          this.setRedirect();

          //alert(this.state.redirect);
        } else {
          const socketURL =
            "ws://localhost:8080/api/websocket/" + this.state.username;
          var ws = new WebSocket(socketURL);
          self.setState(state => (state.ws = ws));
          const user = this.state.username;
          console.log("username is:" + user);
          ws.onopen = function() {
            ws.send(
              JSON.stringify({
                username: user,
                message: "ping"
              })
            );
          };

          ws.onmessage = function(evt) {
            // alert(evt.data);

            self.setState(state =>
              state.chatHistroy.push(JSON.parse(evt.data))
            );
          };
        }
      })
      .catch(error => console.log(error));
  }
  onSubmit = e => {
    e.preventDefault();
    // alert(this.state.message);
    if (this.state.ws) {
      console.log(this.state);
      this.state.ws.send(
        JSON.stringify({
          username: this.state.username,
          message: this.state.message
        }),
        this.props.addMessage()
      );
      // alert("sent!");
    }

    //   this.setState({ message: "" });
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <h1>This is The Game Page for {this.state.username}.</h1>
        {this.renderHomeRedirect()}
        <div>
          <input
            name="message"
            value={this.state.message}
            onChange={e => this.change(e)}
          />
          <button onClick={e => this.onSubmit(e)}>Submit</button>
          <ul>
            {this.state.chatHistroy.map(function(data, index) {
              //console.log(data);
              return (
                <li key={index}>
                  {data.username}: {data.message}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    username: state.chats.username,
    redirect: state.chats.redirect,
    message: state.chats.message,
    chatHistroy: state.chats.chatHistroy,
    ws: state.chats.ws
  };
};
export default connect(
  mapStateToProps,
  { addMessage }
)(Game);
