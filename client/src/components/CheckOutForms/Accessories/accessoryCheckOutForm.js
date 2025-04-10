import React, { Component, Fragment } from "react";
import axios from "axios";
import config from "../../../config";
import Elections from "../../Data/Elections";
import Divisions from "../../Data/divisions";
import Managers from "../../Data/managers";
import { Button, Form, Select, Container } from "semantic-ui-react";

const Styles = {
  form: {
    paddingBottom: "15px",
    paddingTop: "25px",
    height: "70vh",
  },
};

class ComputerCheckOut extends Component {
  state = {
    name: "",
    manager: "",
    division: "",
    description: "",
    election: "",
  };

  onChangehandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onFormSubmit = async () => {
    try {
      let token = await localStorage.getItem("token");
      let { name, manager, division, description, election } = this.state;
      // console.log(this.state);
      let info = {
        token,
        name,
        manager,
        division,
        description,
        election,
      };

      const data = await axios.put(
        `${config.apiUrl}/api/v1/accessory/checkout/${this.props.id}`,
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

  render() {
    console.log("CheckOut Props:", this.props);
    return (
      <Fragment>
        <Container>
          <h2>Checkout Accessory Item</h2>
          <Form style={Styles.form}>
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

            <Form.Field>
              <label>Comments</label>
              <textarea
                name="description"
                defaultValue={this.props.description}
                onChange={this.onChangehandler}
              />
            </Form.Field>
            <Button onClick={this.onFormSubmit}>Submit</Button>
          </Form>
        </Container>
      </Fragment>
    );
  }
}

export default ComputerCheckOut;
