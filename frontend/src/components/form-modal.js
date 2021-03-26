import React, {Component} from 'react';
import {Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

class FormModal extends Component {

  state = {
    isModalOpen: false
  }

  toggleModal = () => {
    this.setState({isModalOpen: !this.state.isModalOpen});
  }

  open = () => {
    this.setState({isModalOpen: true});
  }

  close = () => {
    this.setState({isModalOpen: false});
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>{this.props.title}</ModalHeader>
          <ModalBody>
            {this.props.children}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.props.onSubmit}>提交</Button>
            <Button color="secondary" onClick={this.close}>取消</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default FormModal;
