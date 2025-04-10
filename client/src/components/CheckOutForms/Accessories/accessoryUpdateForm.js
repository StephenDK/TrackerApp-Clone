import React, { Component, Fragment } from "react";
import { Button, Container, Form, Select } from "semantic-ui-react";
import axios from "axios";
import config from "../../../config";
import Managers from "../../Data/managers";
import Divisions from "../../Data/divisions";
import AccessoryCategory from "../../Data/accessoryCategories";

const Styles = {
  form: {
    paddingTop: "25px",
  },
  container: {
    paddingBottom: "25px",
    width: "50%",
  },
};

class AccessoryUpdateForm extends Component {
  state = {
    serial: "",
    make: "",
    model: "",
    userName: "",
    division: "",
    manager: "",
    category: "",
    description: this.props.description,
  };

  onChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onformSubmit = async () => {
    console.log(this.state);
    let token = await localStorage.getItem("token");
    let {
      serial,
      make,
      model,
      userName,
      division,
      manager,
      category,
      description,
    } = this.state;
    let info = {
      token,
      serial,
      make,
      model,
      category,
      userName,
      division,
      manager,
      description,
    };
    try {
      let data = await axios.put(
        `${config.apiUrl}/api/v1/accessory/update/${this.props._id}`,
        info
      );
      console.log(data);
      this.props.toggleModal();
      window.location.reload(false);
    } catch (error) {
      console.log(Object.keys(error));
      console.log(error.response);
    }
  };

  onSelectHandler = (e, { value, name }) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    console.log("UPDATE FORM:", this.props);
    return (
      <Fragment>
        <Container style={Styles.container}>
          <h2>Update Accessory Item</h2>
          <Form style={Styles.form}>
            <Form.Group>
              <Form.Field
                width={10}
                label="Serial"
                control="input"
                name="serial"
                text="text"
                placeholder={this.props.serial}
                onChange={this.onChangeHandler}
              />
              <Form.Field
                width={6}
                label="Category"
                onChange={this.onSelectHandler}
                value={this.state.category}
                name="category"
                control={Select}
                options={AccessoryCategory}
                placeholder={this.props.category}
              />
            </Form.Group>
            <Form.Group>
              <Form.Field
                width={8}
                label="Model"
                control="input"
                name="model"
                text="text"
                onChange={this.onChangeHandler}
                placeholder={this.props.model}
              />
              <Form.Field
                width={8}
                label="Make"
                control="input"
                name="make"
                text="text"
                placeholder={this.props.make}
                onChange={this.onChangeHandler}
              />
            </Form.Group>
            <Form.Field>
              <label>Comments</label>
              <textarea
                name="description"
                defaultValue={this.props.description}
                onChange={this.onChangeHandler}
              />
            </Form.Field>
            {this.props.checkedOut ? (
              <Fragment>
                <Form.Field
                  label="User"
                  name="userName"
                  control="input"
                  text="text"
                  onChange={this.onChangeHandler}
                  placeholder={this.props.userName}
                />
                <Form.Group>
                  <Form.Field
                    width={8}
                    label="Division"
                    name="division"
                    control={Select}
                    options={Divisions}
                    onChange={this.onSelectHandler}
                    placeholder={this.props.division}
                  />
                  <Form.Field
                    width={8}
                    label="Manager"
                    name="manager"
                    control={Select}
                    options={Managers}
                    onChange={this.onSelectHandler}
                    placeholder={this.props.manager}
                  />
                </Form.Group>
              </Fragment>
            ) : null}

            {/* <Form.Field label='' control='input' text='text' /> */}
            <Button onClick={this.onformSubmit}>Submit</Button>
          </Form>
        </Container>
      </Fragment>
    );
  }
}

export default AccessoryUpdateForm;
