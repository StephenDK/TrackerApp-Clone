import React, { Component } from "react";
import { Button, Modal } from "semantic-ui-react";
import axios from "axios";
import config from "../../../config";

class AccessoryCheckIn extends Component {
  state = {};

  onHandleSubmit = async () => {
    try {
      let token = await localStorage.getItem("token");
      let info = {
        token,
      };

      const data = await axios.put(
        `${config.apiUrl}/api/v1/accessory/checkin/${this.props.id}`,
        info
      );
      console.log(data);
      this.props.toggleModal();
      window.location.reload(false);
    } catch (err) {
      console.log(err.response);
    }
  };

  onCheckHandler = (event) => {
    console.log(event);
    this.setState({
      setLocation: !this.state.setLocation,
    });
  };

  render() {
    return (
      <Modal
        size={"small"}
        open={true}
        onClose={() => this.props.toggleModal()}
      >
        <Modal.Header>Check Accessory Back Into Inventory</Modal.Header>
        <Modal.Content>
          <p>{`Do you want to check this device with barcode(${this.props.barcode}) back into inventory?`}</p>

          {/* <Checkbox
            onChange={this.onCheckHandler}
            label="Would you like to set the location of the device to ASD Inventory?"
          /> */}
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => this.props.toggleModal()}>
            Cancel
          </Button>
          <Button positive onClick={this.onHandleSubmit}>
            Submit
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default AccessoryCheckIn;
