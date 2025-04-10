// Component: Finished
// Template Styles: WIP
import React, { Fragment, useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import config from "../../config";
import axios from "axios";
// import { styled, useTheme } from "@mui/material/styles";

import { setError } from "../../actions/errorActions";
import { setSuccess } from "../../actions/successActions";
import { showLoading, hideLoading } from "../../actions/loadingActions";
import {
  Container,
  Paper,
  Avatar,
  Grid,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import LoadingForm from "../loading/loadingComputerForm";

function Register(props) {
  const { id: trackerUserToken } = useParams();
  // State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValid, setEmailValid] = useState(false);

  // const theme = useTheme();
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  // useEffect(() => {
  //   let initializePage = async () => {
  //     dispatch(showLoading());

  //     // const request = await axios.post(`${config.apiUrl}/api/v1/auth/isauth`, {
  //     //   token,
  //     // });
  //     dispatch(hideLoading());
  //   };

  //   initializePage();
  // }, []);

  const onSubmitHandler = async (event) => {
    try {
      let data = {
        email,
        password,
        trackerUserToken,
      };

      console.log("DATA", data);
      const request = await axios.post(
        `${config.apiUrl}/api/v1/auth/register`,
        data
      );
      if (request.status === 200) {
        dispatch(
          setSuccess("Account Successfully Created. Welcome to TrackerApp")
        );

        localStorage.setItem("token", request.data.token);
        Navigate("/dashboard");
      }
    } catch (err) {
      // console.log(err.response.data);
      dispatch(setError(err.response.data.error));
    }
  };

  const handleFieldChange = (fieldName, e) => {
    switch (fieldName) {
      case "email":
        validateEmail(e.target.value);
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      default:
        break;
    }
  };

  const validateEmail = (input) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Expression Check
    if (emailRegex.test(input)) {
      setEmailValid(false); // Valid email
    } else {
      setEmailValid(true); // Invalid email
    }
  };

  if (props.loading.isLoading) {
    return <LoadingForm />;
  }

  return (
    <Fragment>
      <Container maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{
            my: { xs: 3, md: 3 },
            p: { xs: 2, md: 3 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <PersonAddIcon />
          </Avatar>
          <Typography variant="h4" sx={{ mb: "40px" }}>
            TrackerApp Register
          </Typography>
          <Grid container spacing={3} rowSpacing={3}>
            <Grid item xs={12} sm={12}>
              <TextField
                error={emailValid}
                required
                id="email"
                name="email"
                label="Email"
                value={email}
                fullWidth
                helperText={
                  emailValid ? "Please enter a valid email address." : null
                }
                onChange={(e) => handleFieldChange("email", e)}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                // error={computerSerialValid}
                required
                id="password"
                name="password"
                label="Password"
                type="password"
                value={password}
                fullWidth
                // helperText={
                //   computerSerialValid ? "Incorrect character in serial" : null
                // }
                onChange={(e) => handleFieldChange("password", e)}
              />
            </Grid>

            <Grid item xs={3} sm={2}>
              <Button
                color="primary"
                type="submit"
                fullWidth
                variant="contained"
                onClick={onSubmitHandler}
                sx={{ mt: 3, mb: 2 }}
                disabled={!email || !password || emailValid}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Fragment>
  );
}

function mapStateToProps({ loading }) {
  return { loading };
}

export default connect(mapStateToProps, {
  showLoading,
  hideLoading,
})(Register);

// import React, { Component, Fragment } from "react";
// import { Button, Form } from "semantic-ui-react";
// import { withRouter } from "react-router-dom";
// import config from "../../config";
// import axios from "axios";

// class Register extends Component {
//   state = {
//     email: "",
//     password: "",
//   };

//   onHandleSubmit = async () => {
//     try {
//       let { email, password } = this.state;
//       let trackerUserToken = this.props.match.params.id;
//       let data = {
//         trackerUserToken,
//         email,
//         password,
//       };
//       let request = await axios.post(`${config.apiUrl}/api/v1/auth`, data);
//       console.log(request);
//       let token = request.data.token;
//       localStorage.setItem("token", token);
//       this.props.history.push("/dashboard");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   handleInput = (event) => {
//     this.setState({
//       [event.target.name]: event.target.value,
//     });
//   };

//   render() {
//     return (
//       <Fragment>
//         <Form style={{ width: "50%", margin: "auto", paddingTop: "10px" }}>
//           <h2>Register for TrackApp</h2>
//           <Form.Field>
//             <label>Email</label>
//             <input type="text" name="email" onChange={this.handleInput} />
//           </Form.Field>
//           <Form.Field>
//             <label>Password</label>
//             <input
//               type="password"
//               name="password"
//               onChange={this.handleInput}
//             />
//           </Form.Field>
//           <Form.Field>
//             <Button onClick={this.onHandleSubmit}>Submit</Button>
//           </Form.Field>
//         </Form>
//       </Fragment>
//     );
//   }
// }

// export default withRouter(Register);
