import React, { Component } from "react";
import axios from "axios";
import config from "../../config";
import Elections from "../Data/Elections";
import Divisions from "../Data/divisions";
import Managers from "../Data/managers";
import { Button, Form, Checkbox, Select } from "semantic-ui-react";

class ComputerCheckOut extends Component {
  state = {
    name: "",
    manager: "",
    division: "",
    description: "",
    teleWork: false,
    election: "",
    location: "",
    perifs: [
      "Keyboard",
      "Mouse",
      "AC Adapter",
      "Phone Charger",
      "Wireless Keyboard",
      "Wireless Mouse",
    ],
    addedPerifs: [],
  };

  onChangehandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onFormSubmit = async () => {
    try {
      let token = await localStorage.getItem("token");
      let {
        name,
        manager,
        division,
        description,
        teleWork,
        election,
        location,
      } = this.state;
      // console.log(this.state);
      let info = {
        token,
        name,
        manager,
        division,
        description,
        teleWork,
        election,
        location,
        addedPerifs: this.state.addedPerifs,
      };

      const data = await axios.put(
        `${config.apiUrl}/api/v1/${this.props.val}/${this.props.id}`,
        info
      );

      console.log(data);
      this.props.toggleForm();
      window.location.reload(false);
    } catch (err) {
      console.log(err.response);
    }
  };

  onCheckHandler = (event) => {
    console.log(event);
    this.setState({
      teleWork: !this.state.teleWork,
    });
  };

  onSelectHandler = (e, { value, name }) => {
    this.setState({
      [name]: value,
    });
  };

  addPerifToInventory = (value) => {
    let item = this.state.perifs.filter((element) => value === element);
    this.setState({
      perifs: this.state.perifs.filter((el) => value !== el),
      addedPerifs: [...this.state.addedPerifs, ...item],
    });
  };

  removePerifFromSelection = (value) => {
    let item = this.state.addedPerifs.filter((element) => value === element);
    console.log(item);
    this.setState({
      addedPerifs: this.state.addedPerifs.filter((el) => value !== el),
      perifs: [...this.state.perifs, ...item],
    });
  };

  render() {
    console.log(this.props.id);
    return (
      <Form>
        <Form.Field>
          <label>First.Last Name</label>
          <input
            type="text"
            onChange={this.onChangehandler}
            placeholder="Full Name"
            name="name"
          />
        </Form.Field>
        <Form.Field
          label="Election"
          name="election"
          value={this.state.election}
          control={Select}
          options={Elections}
          onChange={this.onSelectHandler}
        />
        {this.props.val !== "phones" ? (
          <Form.Field>
            <label>Location</label>
            <input
              type="text"
              onChange={this.onChangehandler}
              placeholder="Location"
              name="location"
            />
          </Form.Field>
        ) : null}
        <Form.Field
          label="Manager"
          name="manager"
          control={Select}
          options={Managers}
          value={this.state.manager}
          onChange={this.onSelectHandler}
        />
        <Form.Field
          label="Division"
          name="division"
          control={Select}
          options={Divisions}
          value={this.state.division}
          onChange={this.onSelectHandler}
        />

        {this.props.val !== "monitors" ? (
          <Form.Field>
            <label>Peripherals (Click items to add to Inventory)</label>
            <div>
              <div>
                {this.state.perifs.length < 1 ? (
                  <div>All Items Selected</div>
                ) : (
                  this.state.perifs.map((element, index) => (
                    <Button
                      style={{ margin: "3px" }}
                      key={index}
                      color="green"
                      onClick={() => this.addPerifToInventory(element)}
                    >
                      {element}
                    </Button>
                  ))
                )}
              </div>
              <br />
              <br />
              <label style={{ fontWeight: "bold" }}>Added Peripherals</label>
              <div>
                {this.state.addedPerifs.length < 1 ? (
                  <div>No Items selected:</div>
                ) : (
                  this.state.addedPerifs.map((element, index) => (
                    <Button
                      style={{ margin: "3px" }}
                      key={index}
                      color="red"
                      onClick={() => this.removePerifFromSelection(element)}
                    >
                      {element}
                    </Button>
                  ))
                )}
              </div>
            </div>
          </Form.Field>
        ) : null}
        <Form.Field>
          <label>Comments</label>
          <textarea name="description" onChange={this.onChangehandler} />
        </Form.Field>
        <Form.Field>
          <Checkbox
            onChange={this.onCheckHandler}
            label="Will this device be used for teleworking"
          />
        </Form.Field>
        <Button onClick={this.onFormSubmit}>Submit</Button>
      </Form>
    );
  }
}

export default ComputerCheckOut;
