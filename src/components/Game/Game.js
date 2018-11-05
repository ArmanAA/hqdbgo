import React, { Component } from "react";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    //here set up the socket.
  }
  render() {
    return (
      <div>
        <h1>This is The Game Page.</h1>
      </div>
    );
  }
}

export default Game;
