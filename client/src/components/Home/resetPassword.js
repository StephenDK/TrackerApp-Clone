import React, { Component } from "react";
import { Button, Form, Message } from "semantic-ui-react";
import config from "../../config";
import axios from "axios";

const Styles = {
  form: {
    width: "50%",
    margin: "auto",
    paddingTop: "20px",
  },
};

class ResetPassword extends Component {
  state = {
    email: "",
    errorFlag: false,
    successFlag: false,
    msg: "",
  };

  onChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onHandleMessages = async (flag) => {
    setTimeout(async () => {
      this.setState({
        [flag]: !this.state[flag],
      });
    }, 4000);
  };

  onSubmitHandler = async () => {
    let { email } = this.state;
    let data = {
      email,
    };
    console.log(email);
    try {
      let request = await axios.post(
        `${config.apiUrl}/api/v1/auth/register/forgot/password`,
        data
      );
      console.log(request);
      this.setState({
        successFlag: true,
        msg: request.data.msg,
      });
      await this.onHandleMessages("successFlag");

      setTimeout(() => {
        this.props.history.push("/");
      }, 5000);
    } catch (err) {
      console.log(err.response.data);
      this.setState({
        errorFlag: true,
        msg: err.response.data.error,
      });
      await this.onHandleMessages("errorFlag");
    }
  };

  render() {
    return (
      <Form style={Styles.form}>
        {this.state.errorFlag ? (
          <Message color="red">
            <Message.Header>Error</Message.Header>
            <p>{this.state.msg}</p>
          </Message>
        ) : null}
        {this.state.successFlag ? (
          <Message color="green">
            <Message.Header>Success</Message.Header>
            <p>{this.state.msg}</p>
          </Message>
        ) : null}
        <h3>Forgot Password</h3>
        <Form.Field>
          <label>Email</label>
          <input
            style={Styles.input}
            name="email"
            type="text"
            placeholder="Email"
            onChange={this.onChangeHandler}
          />
        </Form.Field>
        <Button onClick={this.onSubmitHandler}>Submit</Button>
      </Form>
    );
  }
}

export default ResetPassword;
