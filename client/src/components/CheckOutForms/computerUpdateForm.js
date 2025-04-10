import React, { Component, Fragment } from "react";
import { Button, Container, Form } from "semantic-ui-react";
import axios from "axios";
import config from "../../config";

class computerUpdateForm extends Component {
  state = {
    computerName: "",
    computerMake: "",
    computerModel: "",
    userName: "",
    division: "",
    manager: "",
    description: "",
    location: "",
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
      computerName,
      computerMake,
      computerModel,
      userName,
      division,
      manager,
      description,
      location,
    } = this.state;
    let info = {
      token,
      computerName,
      computerMake,
      computerModel,
      userName,
      division,
      manager,
      description,
      location,
    };
    try {
      let data = await axios.put(
        `${config.apiUrl}/api/v1/computers/update/entry/${this.props.id}`,
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

  render() {
    console.log(this.props);
    return (
      <Fragment>
        <Container>
          <h2>Update Inventory Item</h2>
          <Form>
            <Form.Field
              label="Computer Name"
              control="input"
              name="computerName"
              text="text"
              placeholder={this.props.computerName}
              onChange={this.onChangeHandler}
            />
            <Form.Field
              label="Computer Model"
              control="input"
              name="computerModel"
              text="text"
              onChange={this.onChangeHandler}
              placeholder={this.props.modal}
            />
            <Form.Field
              label="Computer Make"
              control="input"
              name="computerMake"
              text="text"
              placeholder={this.props.make}
              onChange={this.onChangeHandler}
            />
            <Form.Field>
              <label>Comments</label>
              <textarea
                name="description"
                defaultValue={this.props.description}
                onChange={this.onChangeHandler}
              />
            </Form.Field>
            <Form.Field
              label="Location"
              control="input"
              name="location"
              text="text"
              placeholder={this.props.location}
              onChange={this.onChangeHandler}
            />
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
                <Form.Field
                  label="Division"
                  name="division"
                  control="input"
                  text="text"
                  onChange={this.onChangeHandler}
                  placeholder={this.props.division}
                />
                <Form.Field
                  label="Manager"
                  name="manager"
                  control="input"
                  text="text"
                  onChange={this.onChangeHandler}
                  placeholder={this.props.manager}
                />
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

export default computerUpdateForm;
