import React, { Component } from "react";
import { Button, Modal, Checkbox } from "semantic-ui-react";
import axios from "axios";
import config from "../../config";

class ComputerCheckIn extends Component {
  state = {
    setLocation: false,
  };

  onHandleSubmit = async () => {
    try {
      let token = await localStorage.getItem("token");
      let { setLocation } = this.state;
      let info = {
        token,
        setLocation,
      };

      const data = await axios.put(
        `${config.apiUrl}/api/v1/${this.props.val}/checkin/${this.props.id}`,
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
        <Modal.Header>Check Device Back Into Inventory</Modal.Header>
        <Modal.Content>
          <p>{`Do you want to check this device(${this.props.serial}) belonging to ${this.props.user} back into inventory?`}</p>

          <Checkbox
            onChange={this.onCheckHandler}
            label="Would you like to set the location of the device to ASD Inventory?"
          />
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

// const ComputerCheckIn = (props) => {
//   const onHandleSubmit = async () => {
//     const data = await axios.put(
//       `https://zme7d.sse.codesandbox.io/api/v1/${props.val}/checkin/${props.id}`
//     );
//     console.log(data);
//     props.toggleModal();
//     window.location.reload(false);
//   };
//   return (
//     <Modal size={"small"} open={true} onClose={() => props.toggleModal()}>
//       <Modal.Header>Check Device Back Into Inventory</Modal.Header>
//       <Modal.Content>
//         <p>{`Do you want to check this device(${props.serial}) belonging to ${props.user} back into inventory?`}</p>
//           <label>Check box to check device back into ASD Inventory?</label>
//           <Checkbox />
//       </Modal.Content>
//       <Modal.Actions>
//         <Button negative onClick={() => props.toggleModal()}>
//           Cancel
//         </Button>
//         <Button positive onClick={() => onHandleSubmit()}>
//           Submit
//         </Button>
//       </Modal.Actions>
//     </Modal>
//   );
// };

export default ComputerCheckIn;
