import React, { Component, Fragment } from "react";
import config from "../../../config";
import { Container, Form, Label, Icon } from "semantic-ui-react";
import axios from "axios";

class Delete extends Component {
  state = {
    barcode: "",
    submitError: false,
    success: false,
  };

  onChangeHandler = (event) => {
    this.setState({
      barcode: event.target.value,
    });
  };

  successHander = (key) => {
    setTimeout(() => {
      this.setState({
        [key]: false,
      });
    }, 3 * 1000);
  };

  onHandleSUbmit = async () => {
    try {
      console.log("Hello WOrld");
      if (this.state.barcode === "") {
        this.setState({
          submitError: true,
        });
        return null;
      }
      let request = await axios.delete(
        `${config.apiUrl}/api/v1/admin/${this.state.barcode}`
      );
      console.log(request);
      if (request.data.success) {
        this.setState({
          success: true,
        });
      }
      this.setState({
        barcode: "",
      });
      this.successHander("success");
    } catch (error) {
      // Dude this is key for error handeling
      console.log(Object.keys(error));
      console.log(error.response.data.success);
      this.setState({
        barcode: "",
        submitError: true,
      });
      this.successHander("submitError");
    }
  };
  render() {
    return (
      <Fragment>
        <Container textAlign="center" text={true}>
          <h3 style={{ padding: "15px" }}>
            Scanning into this box Removes the item from the inventory.
          </h3>
          <Icon name="barcode" size="huge" />
          <Form onSubmit={this.onHandleSUbmit} style={{ paddingTop: "15px" }}>
            <Form.Field
              label="Scan Serial Number Barcode to Delete"
              control="input"
              name="barcode"
              value={this.state.barcode}
              placeholder="Barcode"
              onChange={this.onChangeHandler}
            />
            {this.state.submitError ? (
              <Fragment>
                <Label>This barcode was not found</Label>
                <Icon name="delete" />
              </Fragment>
            ) : null}
            {this.state.success ? (
              <Label color="#7CFFB2" size="large">
                Item Deleted
              </Label>
            ) : null}
          </Form>
        </Container>
      </Fragment>
    );
  }
}

export default Delete;
