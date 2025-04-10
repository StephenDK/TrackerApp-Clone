import React, { Component, Fragment } from "react";
import { Container, Form, Segment, Button, Message } from "semantic-ui-react";
import axios from "axios";
import config from "../../../config";

class UpdateLocation extends Component {
  state = {
    computerSerial: "",
    monitor1: "",
    monitor2: "",
    location: "",
    success: false,
    submitError: false,
    computerSubmitSuccess: false,
    monitor1SubmitSuccess: false,
    monitor2SubmitSuccess: false,
  };

  onChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  successHander = (key) => {
    setTimeout(() => {
      this.setState({
        [key]: false,
      });
    }, 3 * 1000);
  };

  onSubmitHandler = async () => {
    try {
      console.log(this.state);
      let data = await axios.put(
        `${config.apiUrl}/api/v1/admin/update/location`,
        this.state
      );
      console.log(data.data);
      this.setState({
        success: true,
        computerSerial: "",
        monitor1: "",
        monitor2: "",
        location: "",
        computerSubmitSuccess: data.data.computerSuccess,
        monitor1SubmitSuccess: data.data.monitor1Success,
        monitor2SubmitSuccess: data.data.monitor2Success,
      });
      this.successHander("computerSubmitSuccess");
      this.successHander("monitor1SubmitSuccess");
      this.successHander("monitor2SubmitSuccess");
      this.successHander("success");
    } catch (error) {
      // console.log(error.response.data.error);
      this.setState({
        submitError: error.response.data.error,
        computerSerial: "",
        monitor1: "",
        monitor2: "",
        location: "",
      });
      this.successHander("submitError");
    }
  };

  render() {
    return (
      <Fragment>
        <Segment>
          <h2>Update Device Location</h2>
          {this.state.submitError ? (
            <Message
              header={"Opps there was an error"}
              content={"The system wont accept the entered values"}
              error={true}
            />
          ) : null}
          {this.state.success ? (
            <Message
              header={"Success!"}
              content={"The device locations were all updated"}
              success={true}
            />
          ) : null}
          {this.state.computerSubmitSuccess ? (
            <Message
              header={"Success!"}
              content={"Computer Location Updated"}
              success={true}
            />
          ) : null}
          {this.state.monitor1SubmitSuccess ? (
            <Message
              header={"Success!"}
              content={"Monitor 1 Location Updated"}
              success={true}
            />
          ) : null}
          {this.state.monitor2SubmitSuccess ? (
            <Message
              header={"Success!"}
              content={"Monitor 2 Location Updated"}
              success={true}
            />
          ) : null}
          <Segment.Group>
            <Form style={{ height: "50vh" }}>
              <Form.Field
                label="Computer Serial"
                control="input"
                placeholder="Computer Serial"
                name="computerSerial"
                onChange={this.onChangeHandler}
                value={this.state.computerSerial}
              />
              <Form.Field
                label="1.Monitor Serial"
                control="input"
                placeholder="Monitor1 Serial"
                name="monitor1"
                onChange={this.onChangeHandler}
                value={this.state.monitor1}
              />
              <Form.Field
                label="2.Monitor Serial"
                control="input"
                placeholder="Monitor2 Serial"
                name="monitor2"
                onChange={this.onChangeHandler}
                value={this.state.monitor2}
              />
              <Form.Input
                width={2}
                label="Location"
                placeholder="location"
                name="location"
                onChange={this.onChangeHandler}
                value={this.state.location}
              />
            </Form>
            <Container style={{ marginBottom: "40px" }} textAlign="center">
              <Button onClick={this.onSubmitHandler}>Submit</Button>
            </Container>
          </Segment.Group>
        </Segment>
      </Fragment>
    );
  }
}

export default UpdateLocation;
