import React, { Component, Fragment } from "react";
import { Button, Container, Form } from "semantic-ui-react";
import axios from "axios";
import config from "../../config";

class dockUpdateForm extends Component {
  state = {
    dockingStationSerial: "",
    dockingStationMake: "",
    dockingStationModel: "",
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
    // console.log(this.state);
    try {
      let token = await localStorage.getItem("token");
      let {
        dockingStationSerial,
        dockingStationMake,
        dockingStationModel,
        userName,
        division,
        manager,
        description,
        location,
      } = this.state;

      let info = {
        token,
        dockingStationSerial,
        dockingStationMake,
        dockingStationModel,
        userName,
        division,
        manager,
        description,
        location,
      };

      let data = await axios.put(
        `${config.apiUrl}/api/v1/dockingstations/update/entry/${this.props.id}`,
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
              label="Dockingstation Serial"
              control="input"
              name="dockingStationSerial"
              text="text"
              placeholder={this.props.dockingStationSerial}
              onChange={this.onChangeHandler}
            />
            <Form.Field
              label="Dockingstation Make"
              control="input"
              name="dockingStationMake"
              text="text"
              onChange={this.onChangeHandler}
              placeholder={this.props.dockingStationMake}
            />
            <Form.Field
              label="Dockingstation Model"
              control="input"
              name="dockingStationModel"
              text="text"
              onChange={this.onChangeHandler}
              placeholder={this.props.dockingStationModel}
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
            <Button onClick={this.onformSubmit}>Submit</Button>
          </Form>
        </Container>
      </Fragment>
    );
  }
}

export default dockUpdateForm;
