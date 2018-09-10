// import React, { Component } from "react";
// //import Websocket from "react-websocket";
// import Chatbox from "./components/Chatbox/Chatbox.js";
// import { ChatFeed, Message } from "react-chat-ui";
// const mySocket = new WebSocket("ws://localhost:8080/ws");
// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       userId: "",
//       value: "",
//       res: [],
//       chatHistory: []
//     };
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   render() {
//     mySocket.onopen = function() {

//       console.log("message was sent");
//     };

//     return (
//       <div>
//         <h1>Welocme to Chat Room</h1>

//         <div>
//           <Chatbox
//             username={this.state.res.name}
//             chatHistory={this.state.chatHistory}
//           />
//           <form onSubmit={this.handleSubmit}>
//             <label>
//               Message:
//               <input type="text" ref={el => (this.$messageInput = el)} />
//             </label>
//             <input type="submit" value="Submit" />
//           </form>
//         </div>
//       </div>
//     );
//   }
//   handleSubmit(e) {

//     this.setState({ value: this.$messageInput.value });
//     mySocket.send({
//       message: this.$messageInput.value,
//       userId: this.state.res.id
//     });

//     e.preventDefault();

//   }
//   componentDidMount() {
//     fetch("http://localhost:8080/data")
//       .then(response => response.json())
//       .then(data => this.setState({ res: data.record }));

//     mySocket.onmessage = msgevent => {

//       const newHistory = [].concat(this.state.chatHistory);
//       newHistory.push(msgevent.data);

//       this.setState({ chatHistory: newHistory });

//     };
//     this.setState({ userName: this.state.res.name });
//   }

// }

// export default App;
