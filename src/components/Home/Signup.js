import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import styles from "../Styles/signup.css";
import UsernameError from "../Modals/UsernameError";
var validator = require("validator");
var passwordHash = require("password-hash");

const divStyle = {
  textAlign: "center"
};
const customStyles = {
  position: "absolue",
  top: "50%",
  left: "50%",
  right: "auto",
  bottom: "auto",
  textAlign: "center",
  margin: "100px 400px",
  transform: "translate(-50%, -50%)"
};

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      phoneNum: "",
      username: "",
      password: "",
      repassword: "",
      status: "",
      show: false,
      message: ""
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  checkInputFields = () => {
    if (
      this.state.firstName !== "" &&
      this.state.lastName !== "" &&
      this.state.password !== "" &&
      this.state.username !== "" &&
      this.state.phoneNum !== "" &&
      this.state.email !== "" &&
      this.state.repassword !== ""
    ) {
      //check if email is ok!
      if (!validator.isEmail(this.state.email)) {
        this.setState({ message: "Please enter a valid email address." });
        this.handleShow();
        return false;
      } else if (!validator.isNumeric(this.state.phoneNum)) {
        this.setState({ message: "Please enter a valid phone number." });
        this.handleShow();
        return false;
      } else if (this.state.password !== this.state.repassword) {
        this.setState({
          message: "Your password and confirmation password do not match."
        });
        this.handleShow();
        return false;
      }
    } else {
      this.setState({
        message: "Please complete all fields shown on the sign up form."
      });
      this.handleShow();
      return false;
    }
    return true;
  };

  onSubmit = e => {
    e.preventDefault();
    console.log(this.state);

    if (this.checkInputFields()) {
      fetch("http://localhost:8080/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.state)
      })
        .then(res => {
          if (!res.ok) {
            if (res.status === 406) {
              this.setState({
                message: "The user name you have entered is already in use."
              });
              this.setState({ show: true });
            }
            console.log("Failure: ", JSON.stringify(res.status));
          } else {
            console.log("Success: ", JSON.stringify(res.status));
          }
        })

        .catch(error => console.log(error));
    }
  };
  handleClose() {
    this.setState({ show: false });
  }
  handleShow() {
    this.setState({ show: true });
  }
  render() {
    return (
      <div>
        <div>
          <UsernameError
            show={this.state.show}
            onClose={this.handleClose}
            message={this.state.message}
          />
        </div>
        <div className={styles.simple}>
          <h1>Sign Up Here!</h1>

          <form id={styles["form-style"]}>
            <label htmlFor="Username:">First Name</label>
            <input
              className={styles["signup-input"]}
              name="firstName"
              placeholder="First Name"
              value={this.state.firstName}
              onChange={e => this.change(e)}
            />
            <br />
            <label htmlFor="Username:">Last Name</label>
            <input
              className={styles["signup-input"]}
              name="lastName"
              placeholder="Last Name"
              value={this.state.lastName}
              onChange={e => this.change(e)}
            />
            <br />
            <label htmlFor="Username:">Email Address</label>
            <input
              className={styles["signup-input"]}
              name="email"
              placeholder="Your Email"
              value={this.state.email}
              onChange={e => this.change(e)}
            />
            <br />
            <label htmlFor="Username:">Phone Number</label>
            <input
              className={styles["signup-input"]}
              name="phoneNum"
              placeholder="Your Phone Number"
              value={this.state.phoneNum}
              onChange={e => this.change(e)}
            />
            <br />
            <div style={divStyle}>
              <label htmlFor="Username:">Username</label>
              <input
                className={styles["signup-input"]}
                name="username"
                placeholder="Username"
                value={this.state.username}
                onChange={e => this.change(e)}
              />
            </div>

            <br />
            <label htmlFor="Username:">Password</label>
            <input
              className={styles["signup-input"]}
              name="password"
              placeholder="Password"
              type="password"
              value={this.state.password}
              onChange={e => this.change(e)}
            />
            <br />
            <label htmlFor="Username:">Re-password</label>
            <input
              className={styles["signup-input"]}
              name="repassword"
              placeholder="Repeat Your Password"
              type="password"
              value={this.state.repassword}
              onChange={e => this.change(e)}
            />
            <br />
            <button id={styles["button-style"]} onClick={e => this.onSubmit(e)}>
              Register
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
