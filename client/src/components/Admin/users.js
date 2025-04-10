import React, { Component, Fragment } from "react";
import axios from "axios";
import { Modal, Button } from "semantic-ui-react";
import config from "../../config";

import ListUsers from "./listUsers";

class Users extends Component {
  state = {
    users: [],
    toggleModal: false,
    email: "",
    LoggedInUser: {},
    generatedURL: "",
  };

  async componentDidMount() {
    try {
      let token = await localStorage.getItem("token");
      console.log("TOKEN", token);
      let data = {
        token,
      };
      console.log("Making First Request");
      let user = await axios.post(`${config.apiUrl}/api/v1/users/user`, data);
      console.log(user);
      this.setState({
        LoggedInUser: { ...user.data.data },
      });
      console.log("Making Second Request");
      let request = await axios.get(`${config.apiUrl}/api/v1/users`);
      console.log(request);
      this.setState({
        users: request.data.data,
      });
    } catch (err) {
      console.log(err.response.data);
    }
  }

  handleModal = () => {
    this.setState({
      toggleModal: !this.state.toggleModal,
    });
  };

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  // handleSubmit = async () => {
  //   try {
  //     let token = await localStorage.getItem("token");
  //     let email = this.state.email;
  //     let data = {
  //       token,
  //       email
  //     };
  //     let request = await axios.post(
  //       "https://gentle-headland-50783.herokuapp.com/api/v1/auth/register/email",
  //       data
  //     );
  //     console.log(request);
  //     if (request.status === 200) {
  //       this.handleModal();
  //     }
  //   } catch (err) {
  //     console.log(err.response);
  //   }
  // };

  handleGenerateURL = async () => {
    // Make api request
    // Send user credentials and keys
    // return URL generated
    console.log("Getting Generated URL");
    try {
      let token = await localStorage.getItem("token");
      // console.log('TOKEN', token);

      let request = await axios.post(
        `${config.apiUrl}/api/v1/auth/register/email/${token}`
      );

      console.log("RESPONSE: ", request);
      this.setState({
        generatedURL: request.data.url,
      });
      navigator.clipboard.writeText(request.data.url);
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div style={{ marginTop: "60px" }}>
        <Fragment>
          <Button onClick={this.handleModal} style={{ margin: "15px" }}>
            Add New User
          </Button>
          {this.state.toggleModal ? (
            <Modal
              open={true}
              onClose={() => {
                this.setState({ generatedURL: "" });
                this.handleModal();
              }}
              // onUnmount={() => this.setState({ generatedURL: "" })}
            >
              <Modal.Header>Add User</Modal.Header>
              <Modal.Content>
                <h4>Please forward generated URL to the new user.</h4>
                <Button color="green" onClick={this.handleGenerateURL}>
                  Generate URL
                </Button>
                <Modal.Description>
                  <p style={{ wordWrap: "break-word" }}>
                    {this.state.generatedURL}
                  </p>
                </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
                <Button
                  negative
                  onClick={() => {
                    this.setState({ generatedURL: "" });
                    this.handleModal();
                  }}
                >
                  Cancel
                </Button>
              </Modal.Actions>
            </Modal>
          ) : null}
          <ListUsers
            users={this.state.users}
            loggedInUser={this.state.LoggedInUser}
          />
        </Fragment>
      </div>
    );
  }
}

export default Users;
