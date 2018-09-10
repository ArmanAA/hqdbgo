import React, { Component } from "react";

class Chatbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatHistory: [],
      username: "",
      message: ""
    };
  }
  render() {
    return (
      <div>
        {" "}
        <h1>{this.props.username}:</h1>
        {/* <h2> {this.props.chatHistory}</h2> */}
        {this.props.chatHistory.map(historyItem => {
          console.log(historyItem);
          return (
            <div>
              {historyItem.username}
              {historyItem.message}
            </div>
          );
        })}
      </div>
    );
  }
}
function submitChat(params) {
  this.setState({ message: params });
}

function setUser(params) {
  this.setState({ username: params });
}

export default Chatbox;
submitChat;
setUser;
