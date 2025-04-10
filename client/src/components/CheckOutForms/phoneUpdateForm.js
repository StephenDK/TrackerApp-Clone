import React, { Component, Fragment } from "react";
import { Button, Container, Form } from "semantic-ui-react";
import axios from "axios";
import config from "../../config";

class phoneUpdateForm extends Component {
  state = {
    phoneIMEI: "",
    phoneNumber: "",
    phoneMake: "",
    phoneModel: "",
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
        phoneIMEI,
        phoneNumber,
        phoneMake,
        phoneModel,
        userName,
        division,
        manager,
        description,
        location,
      } = this.state;

      let info = {
        token,
        phoneIMEI,
        phoneNumber,
        phoneMake,
        phoneModel,
        userName,
        division,
        manager,
        description,
        location,
      };
      let data = await axios.put(
        `${config.apiUrl}/api/v1/phones/update/entry/${this.props.id}`,
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
              label="Phone IMEI"
              control="input"
              name="phoneIMEI"
              text="text"
              placeholder={this.props.phoneIMEI}
              onChange={this.onChangeHandler}
            />
            <Form.Field
              label="Phone Number"
              control="input"
              name="phoneNumber"
              text="text"
              onChange={this.onChangeHandler}
              placeholder={this.props.phoneNumber}
            />
            <Form.Field
              label="Phone Model"
              control="input"
              name="phoneModel"
              text="text"
              onChange={this.onChangeHandler}
              placeholder={this.props.modal}
            />
            <Form.Field
              label="Phone Make"
              control="input"
              name="phoneMake"
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
            <Button onClick={this.onformSubmit}>Submit</Button>
          </Form>
        </Container>
      </Fragment>
    );
  }
}

export default phoneUpdateForm;
