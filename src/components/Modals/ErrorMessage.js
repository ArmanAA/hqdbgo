import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-responsive-modal";

class ErrorMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.show
    };
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
    //this.componentWillUpdate();
  };
  componentWillUpdate() {
    // this.setState({ open: false });
  }
  render() {
    //const { open } = this.state;
    return (
      <div>
        {/* <button onClick={this.props.handleShow}>Open modal</button> */}
        <Modal
          open={this.props.show}
          onClose={this.props.onClose}
          message={this.props.message}
          center
        >
          <h2>{this.props.message}</h2>
        </Modal>
      </div>
    );
  }
}

export default ErrorMessage;
