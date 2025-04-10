import React, { Component, Fragment } from "react";
import axios from "axios";
import config from "../../../../config";
import { Button, Form, Message } from "semantic-ui-react";

import DeskPhoneLineView from "./deskpPhoneLineView";

const Styles = {
  lineForm: {
    height: "200px",
    marginBottom: "15px",
    paddingBottom: "15px",
    paddingTop: "50px",
    width: "75%",
    margin: "auto",
  },
};

class deskPhoneUpdateLines extends Component {
  state = {
    name: "",
    number: "",
    msg: "",
    errorFlag: false,
  };

  // async componentDidMount() {
  //   try {
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  onChangeFlagHandler = (flag, val) => {
    setTimeout(() => {
      this.setState({
        [flag]: val,
      });
    }, 4000);
  };

  onSubmitLineHandler = async () => {
    try {
      console.log("Sending");
      let { name, number } = this.state;
      let token = await localStorage.getItem("token");

      let data = {
        token,
        name,
        number,
      };

      let request = await axios.post(
        `${config.apiUrl}/api/v1/desk/phone/line/${this.props._id}`,
        data
      );
      console.log(request.status);
      if (request.status === 200) {
        this.setState({
          name: "",
          number: "",
        });
        window.location.reload(false);
      }
    } catch (err) {
      console.log("Error", Object.keys(err));
      console.log(err.response.data.error);
      let message = err.response.data.error || "Sorry, an error has occured";
      this.setState({
        msg: message,
        errorFlag: true,
      });
      this.onChangeFlagHandler("errorFlag", false);
      // console.log(msg);
    }
  };

  onDeleteLineHandler = async (id) => {
    try {
      console.log("deleting Line: ", id);
      let request = await axios.delete(
        `${config.apiUrl}/api/v1/desk/phone/line/${this.props._id}/delete/${id}`
      );
      console.log(request);
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  };

  onChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <Fragment>
        <h2>Edit Phone Lines</h2>
        <DeskPhoneLineView
          deletePhoneLine={this.onDeleteLineHandler}
          phoneLines={this.props.lines}
        />
        {this.state.errorFlag ? (
          <Message warning>{this.state.msg}</Message>
        ) : null}
        <Form style={Styles.lineForm}>
          <h4>Add A Line</h4>
          <Form.Group>
            <Form.Field width={5}>
              <label>Line Name</label>
              <input
                name="name"
                value={this.state.name}
                onChange={this.onChangeHandler}
                type="text"
                placeholder="Name"
              />
            </Form.Field>
            <Form.Field width={4}>
              <label>Number</label>
              <input
                name="number"
                value={this.state.number}
                onChange={this.onChangeHandler}
                type="text"
                placeholder="#"
              />
            </Form.Field>
            <Button
              content="Submit"
              onClick={this.onSubmitLineHandler}
              style={{
                height: "39px",
                position: "relative",
                top: "24px",
              }}
            />
          </Form.Group>
        </Form>
      </Fragment>
    );
  }
}

export default deskPhoneUpdateLines;
