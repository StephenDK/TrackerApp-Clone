import React, { Component, Fragment } from "react";
import config from "../../config";
import { Form, Select, Radio, Grid, Message } from "semantic-ui-react";
import axios from "axios";

// Selection Keys
const computerMake = [
  { name: "HP", text: "HP", value: "HP" },
  { name: "Dell", text: "Dell", value: "Dell" },
  { name: "Lenovo", text: "Lenovo", value: "Lenovo" },
  { name: "MS Tablet", text: "MS Tablet", value: "MS Tablet" },
  { name: "Apple Tablet", text: "Apple Tablet", value: "Apple Tablet" },
];

const computerModels = [
  {
    name: "EliteBook 840 G8",
    text: "EliteBook 840 G8",
    value: "EliteBook 840 G8",
  },
  {
    name: "EliteBook 840 G3",
    text: "EliteBook 840 G3",
    value: "EliteBook 840 G3",
  },
  {
    name: "EliteBook 840 G4",
    text: "EliteBook 840 G4",
    value: "EliteBook 840 G4",
  },
  {
    name: "EliteBook 840 G5",
    text: "EliteBook 840 G5",
    value: "EliteBook 840 G5",
  },
  {
    name: "EliteBook 840 G6",
    text: "EliteBook 840 G6",
    value: "EliteBook 840 G6",
  },
  {
    name: "Surface Tablet 128 GB",
    text: "Surface Tablet 128 GB",
    value: "Surface Tablet 128 GB",
  },
  {
    name: "EliteBook Folio 9480m",
    text: "EliteBook Folio 9480m",
    value: "EliteBook Folio 9480m",
  },
  {
    name: "EliteDesk 800 G3 Mini",
    text: "EliteDesk 800 G3 Mini",
    value: "EliteDesk 800 G3 Mini",
  },
  {
    name: "EliteBook x360 1030 G4",
    text: "EliteBook x360 1030 G4",
    value: "EliteBook x360 1030 G4",
  },
  {
    name: "EliteDesk 800 G4",
    text: "EliteDesk 800 G4",
    value: "EliteDesk 800 G4",
  },
  {
    name: "EliteDesk 800 G2",
    text: "EliteDesk 800 G2",
    value: "EliteDesk 800 G2",
  },
  {
    name: "EliteBook Folio 9470m",
    text: "EliteBook Folio 9470m",
    value: "EliteBook Folio 9470m",
  },
  {
    name: "iPad 6th Generation",
    text: "iPad 6th Generation",
    value: "iPad 6th Generation",
  },
];

class NewComputer extends Component {
  state = {
    computerSerial: "",
    computerMake: "",
    computerModel: "",
    type: "",
    successflag: false,
    errorFlag: false,
    msg: "",
    // periphs: [],
    // selected1: false,
    // selected2: false,
    // selected3: false,
    selected4: false,
    selected5: false,
  };

  onChangeHandler = (event) => {
    // console.log(event.target.value);
    // console.log(event.target.name);
    // console.log(event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  };

  onSelectHandler = (e, { value, name }) => {
    // console.log(name)
    // console.log(value);
    this.setState({
      [name]: value,
    });
  };

  onTypeHandler = (e, { value, name, option }) => {
    this.setState({
      [name]: value,
      [option]: !this.state[option],
    });
  };

  onChangeFlagHandler = (flag, val) => {
    setTimeout(() => {
      this.setState({
        [flag]: val,
      });
    }, 4000);
  };

  // onCheckHandler = (e, { value, name }) => {
  //   // console.log(value)
  //   //  NOTE USE VALUE INSTEAD AND NAME FOR SELECTED
  //   console.log(name);
  //   // if not in array already add it
  //   if (this.state.periphs.indexOf(name) < 0) {
  //     this.setState((prevState) => ({
  //       periphs: [...prevState.periphs, name],
  //       [value]: !prevState[value]
  //     }));
  //   }
  // };

  // onClearHandler = () => {
  //   this.setState({
  //     periphs: [],
  //     selected1: false,
  //     selected2: false,
  //     selected3: false,
  //     selected4: false,
  //     selected5: false
  //   });
  // };

  onSubmitHandler = async (event) => {
    try {
      // event.preventDefault();
      const { computerSerial, computerMake, computerModel, type } = this.state;

      // get token
      let token = await localStorage.getItem("token");

      let data = {
        token,
        computerSerial,
        computerMake,
        computerModel,
        type,
      };

      console.log(this.state);
      const request = await axios.post(
        `${config.apiUrl}/api/v1/computers`,
        data
      );
      if (request.status === 200) {
        this.setState({
          successFlag: true,
        });
        this.onChangeFlagHandler("successFlag", false);
      }

      this.setState({
        computerSerial: "",
        computerName: "",
        computerMake: "",
        computerModel: "",
        type: "",
        selected4: false,
        selected5: false,
      });
      // console.log(data);
    } catch (err) {
      console.log(err.response.data);
      this.setState({
        errorFlag: true,
        msg: err.response.data.error,
      });
      this.onChangeFlagHandler("errorFlag", false);
    }
  };
  render() {
    return (
      <div style={{ marginTop: "60px" }}>
        <Fragment>
          {this.state.successFlag ? (
            <Message color="green">
              <Message.Header>Your item was inventoried</Message.Header>
            </Message>
          ) : null}
          {this.state.errorFlag ? (
            <Message color="red">
              <Message.Header>{this.state.msg}</Message.Header>
            </Message>
          ) : null}
          <Grid>
            <Form
              className="form"
              style={{ paddingTop: "20px", margin: "auto" }}
            >
              <Form.Group>
                <Form.Field>
                  <label>Computer Serial</label>
                  <input
                    name="computerSerial"
                    value={this.state.computerSerial}
                    onChange={this.onChangeHandler}
                    type="text"
                    placeholder="Serial #"
                  />
                </Form.Field>
                <Form.Field
                  label="Make"
                  onChange={this.onSelectHandler}
                  value={this.state.computerMake}
                  name="computerMake"
                  control={Select}
                  options={computerMake}
                />
                <Form.Field
                  label="Model"
                  value={this.state.computerModel}
                  name="computerModel"
                  control={Select}
                  options={computerModels}
                  onChange={this.onSelectHandler}
                ></Form.Field>
              </Form.Group>
              <Form.Group>
                <label>Device Type</label>
                <Form.Field
                  control={Radio}
                  label="Desktop"
                  value="Desktop"
                  name="type"
                  option="selected4"
                  checked={this.state.selected4}
                  onClick={this.onTypeHandler}
                />
                <Form.Field
                  control={Radio}
                  label="Laptop"
                  value="Laptop"
                  name="type"
                  option="selected5"
                  checked={this.state.selected5}
                  onClick={this.onTypeHandler}
                />
              </Form.Group>
              {/* <Form.Group>
                <label>Peripherials:</label>
                <Form.Field
                  control={Radio}
                  label="Charger"
                  value="selected1"
                  name="Charger"
                  checked={this.state.selected1}
                  onChange={this.onCheckHandler}
                />
                <Form.Field
                  control={Radio}
                  label="Keyboard"
                  value="selected2"
                  name="Keyboard"
                  checked={this.state.selected2}
                  onChange={this.onCheckHandler}
                />
                <Form.Field
                  control={Radio}
                  name="Mouse"
                  label="Mouse"
                  value="selected3"
                  checked={this.state.selected3}
                  onChange={this.onCheckHandler}
                />
                <button onClick={this.onClearHandler}>Clear</button>
              </Form.Group> */}
              <input
                onClick={this.onSubmitHandler}
                type="button"
                name="Submit"
                value="Submit"
              />
            </Form>
          </Grid>
        </Fragment>
      </div>
    );
  }
}

export default NewComputer;
