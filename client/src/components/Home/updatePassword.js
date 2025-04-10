import React, { Component } from "react";
import { Button, Form, Message } from "semantic-ui-react";
import config from "../../config";
import axios from "axios";

const Styles = {
  form: {
    width: "50%",
  },
};

class UpdatePassword extends Component {
  state = {
    password: "",
    confirmPassword: "",
    errorFlag: false,
    successFlag: false,
    msg: "",
  };

  onChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onHandleMessages = (flag) => {
    setTimeout(async () => {
      await this.setState({
        [flag]: !this.state[flag],
      });
    }, 4000);
  };

  onSubmitHandler = async () => {
    let { password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      this.setState({
        errorFlag: true,
        msg: "The passwords do not match",
      });
      this.onHandleMessages("errorFlag");
      return;
    }

    if (password.length < 6 && confirmPassword.length < 6) {
      this.setState({
        errorFlag: true,
        msg: "Your password must be longer than 6 characters",
      });
      this.onHandleMessages("errorFlag");
      return;
    }
    try {
      console.log("submitting");
      let userToken = this.props.match.params.id;
      let data = {
        userToken,
        password,
      };
      let request = await axios.put(
        `${config.apiUrl}/api/v1/auth/register/forgot/password/reset`,
        data
      );

      this.setState({
        successFlag: true,
        msg: request.data.msg,
      });
      this.onHandleMessages("successFlag");

      setTimeout(() => {
        this.props.history.push("/");
      }, 5000);
    } catch (err) {
      // console.log(err.response.data.error);
      this.setState({
        errorFlag: true,
        msg: err.response.data.error,
      });
      this.onHandleMessages("errorFlag");
    }
    // try {
    //   //let request = await axios.post('https://zme7d.sse.codesandbox.io/api/v1/auth/register/forgot/password', data);
    //   // console.log(request);
    //   // this.setState({
    //   //   successFlag: true,
    //   //   msg: request.data.msg
    //   // })
    //   await this.onHandleMessages('successFlag');
    //   await this.props.history.push("/");
    // } catch(err) {
    //   console.log(err.response.data);
    //   this.setState({
    //     errorFlag: true,
    //     msg: err.response.data.error
    //   })
    //   this.onHandleMessages('errorFlag');
    // }
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
        <h3>New Password</h3>
        <Form.Field>
          <label>Password</label>
          <input
            style={Styles.input}
            name="password"
            type="password"
            placeholder="Password"
            onChange={this.onChangeHandler}
          />
        </Form.Field>
        <Form.Field>
          <label>Confirm Password</label>
          <input
            style={Styles.input}
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            onChange={this.onChangeHandler}
          />
        </Form.Field>
        <Button onClick={this.onSubmitHandler}>Submit</Button>
      </Form>
    );
  }
}

export default UpdatePassword;
