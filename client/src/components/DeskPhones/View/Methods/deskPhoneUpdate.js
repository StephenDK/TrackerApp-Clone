import React, { Component, Fragment } from "react";
import { Form, Grid, Message, Select } from "semantic-ui-react";
import axios from "axios";
import config from "../../../../config";

import Divisions from "../../../Data/divisions";

// Start of form validation
const normalizeInput = (value, previousValue) => {
  if (!value) return value;
  const currentValue = value.replace(/[^\d]/g, "");
  const cvLength = currentValue.length;

  if (!previousValue || value.length > previousValue.length) {
    if (cvLength < 4) return currentValue;
    if (cvLength < 7)
      return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;
    return `(${currentValue.slice(0, 3)}) ${currentValue.slice(
      3,
      6
    )}-${currentValue.slice(6, 10)}`;
  }
};

class deskPhoneUpdate extends Component {
  state = {
    name: "",
    number: "",
    extension: "",
    make: "",
    model: "",
    division: "",
    user: "",
    location: "",
    description: "",
    successFlag: false,
    errorFlag: false,
    msg: "",
  };

  onChangeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChange = ({ target: { value } }) => {
    this.setState((prevState) => ({
      number: normalizeInput(value, prevState.number),
    }));
  };

  onSubmitHandler = async () => {
    try {
      let token = await localStorage.getItem("token");
      let {
        name,
        number,
        extension,
        make,
        model,
        division,
        user,
        location,
        description,
      } = this.state;
      let data = {
        token,
        name,
        number,
        extension,
        make,
        model,
        division,
        user,
        location,
        description,
      };

      if (Number(name) < 0) {
        console.log(typeof name);
        this.setState({
          errorFlag: true,
          msg: "DP must be a number and greater than zero.",
        });
        this.onChangeFlagHandler("errorFlag", false);
        return;
      }

      let request = await axios.put(
        `${config.apiUrl}/api/v1/desk/phone/${this.props._id}`,
        data
      );
      console.log(request);
      this.props.toggleUpdateHandler();
      window.location.reload(false);
    } catch (err) {
      console.log(Object.keys(err));
      console.log(err.response);
      this.setState({
        errorFlag: true,
        msg: err.response.data.error,
      });
      this.onChangeFlagHandler("errorFlag", false);
    }
  };

  onSelectHandler = (e, { value, name }) => {
    this.setState({
      [name]: value,
    });
  };

  onChangeFlagHandler = (flag, val) => {
    setTimeout(() => {
      this.setState({
        [flag]: val,
        msg: "",
      });
    }, 4000);
  };

  render() {
    console.log("PROPS: ", this.props);
    return (
      <Fragment>
        <h2 style={{ padding: "10px" }}>Update Desk Phone</h2>
        {this.state.successFlag ? (
          <Grid.Row>
            <Message style={{ width: "50%", margin: "auto" }} color="green">
              <Message.Header>
                Your item was successfully inventoried
              </Message.Header>
            </Message>
          </Grid.Row>
        ) : null}
        {this.state.errorFlag ? (
          <Grid.Row>
            <Message
              style={{
                width: "50%",
                margin: "auto",
                marginTop: "10px",
                marginBottom: "10px",
              }}
              color="red"
            >
              <Message.Header>{this.state.msg}</Message.Header>
            </Message>
          </Grid.Row>
        ) : null}
        <Form
          style={{
            height: "515px",
            paddingTop: "15px",
            paddingBottom: "15px",
            width: "70%",
            margin: "auto",
          }}
        >
          <Form.Group>
            <Form.Field width={2}>
              <label>ROV DP</label>
              <input
                name="name"
                value={this.state.name}
                onChange={this.onChangeHandler}
                type="number"
                min={1}
                placeholder={this.props.phoneName}
              />
            </Form.Field>
            <Form.Field width={4}>
              <label>Make</label>
              <input
                name="make"
                value={this.state.make}
                onChange={this.onChangeHandler}
                type="text"
                placeholder={this.props.phoneMake}
              />
            </Form.Field>
            <Form.Field width={5}>
              <label>Model</label>
              <input
                name="model"
                value={this.state.model}
                onChange={this.onChangeHandler}
                type="text"
                placeholder={this.props.phoneModel}
              />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field width={5}>
              <label>Phone Number:</label>
              <input
                name="number"
                value={this.state.number}
                onChange={this.handleChange}
                type="text"
                placeholder={this.props.phoneNumber}
              />
            </Form.Field>
            <Form.Field width={3}>
              <label>Extension:</label>
              <input
                name="extension"
                value={this.state.extension}
                onChange={this.onChangeHandler}
                type="text"
                placeholder="Extension"
              />
            </Form.Field>
            <Form.Field width={3}>
              <label>Location</label>
              <input
                name="location"
                value={this.state.location}
                onChange={this.onChangeHandler}
                type="text"
                placeholder={this.props.location}
              />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field width={7}>
              <label>User</label>
              <input
                name="user"
                value={this.state.user}
                onChange={this.onChangeHandler}
                type="text"
                placeholder={this.props.user}
              />
            </Form.Field>
            <Form.Field
              width={4}
              label="Division"
              name="division"
              control={Select}
              options={Divisions}
              value={this.state.division}
              onChange={this.onSelectHandler}
            />
          </Form.Group>
          <Form.Group>
            <Form.Field style={{ width: "70%" }}>
              <label>Comments</label>
              <textarea
                name="description"
                value={this.state.description}
                onChange={this.onChangeHandler}
              />
            </Form.Field>
          </Form.Group>
          <input
            onClick={this.onSubmitHandler}
            className="ui button"
            type="button"
            name="Submit"
            value="Submit"
          />
        </Form>
      </Fragment>
    );
  }
}

export default deskPhoneUpdate;

// {
/* <Form.Field
// className="phone_Model"
style={Styles.inputItem}
type="text"
label="Model"
name="model"
onChange={this.onChangeHandler}
/> */
// }
//
