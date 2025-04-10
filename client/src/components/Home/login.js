// import "./login.css";
import React, { Fragment, useState } from "react";
import { connect, useDispatch } from "react-redux";
import config from "../../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GetUser } from "../../actions/userActions";
import {
  TextField,
  Typography,
  Button,
  Container,
  Paper,
  Avatar,
  Grid,
} from "@mui/material";
import { setSuccess } from "../../actions/successActions";
import { setError } from "../../actions/errorActions";

function Login() {
  const dispatch = useDispatch();
  //create parameters and functions for login
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const Navigate = useNavigate();

  //function for submit and information to be sent to backend
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // console.log("button triggered");
    console.log(email);
    console.log(password);
    try {
      let response = await axios.post(`${config.apiUrl}/api/v1/auth/login`, {
        email,
        password,
      });
      console.log(response);
      localStorage.setItem("token", response.data.token);

      // Dispatch Set User
      dispatch(GetUser(response.data.token));

      dispatch(setSuccess("Login Successful"));
      Navigate("/dashboard");
    } catch (err) {
      console.log(err.response);
      dispatch(setError(err.response.data.error));
    }
  };

  const handleFieldChange = (fieldName, e) => {
    switch (fieldName) {
      case "email":
        // validateSerial(e.target.value);
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <Fragment>
      <Container maxWidth="xs" sx={{ mb: 4 }}>
        <Paper
          // variant="outlined"
          elevation={6}
          sx={{
            my: { xs: 1, md: 3 },
            p: { xs: 2, md: 3 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            {/* <ComputerIcon /> */}
          </Avatar>
          <Typography variant="h4" sx={{ mb: "20px" }}>
            Tracker App
          </Typography>

          <form onSubmit={onSubmitHandler}>
            <Grid container spacing={3} rowSpacing={3}>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="email"
                  name="email"
                  label="Email"
                  value={email}
                  fullWidth
                  onChange={(e) => handleFieldChange("email", e)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  type="password"
                  id="password"
                  name="password"
                  label="Password"
                  value={password}
                  fullWidth
                  onChange={(e) => handleFieldChange("password", e)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={3} sm={3}>
                <Button
                  color="primary"
                  type="submit"
                  fullWidth
                  variant="contained"
                  onClick={onSubmitHandler}
                  sx={{ mt: 3, mb: 2 }}
                  // disabled={
                  //   !computerSerialValid &&
                  //   computerSerial &&
                  //   computerMake &&
                  //   computerModel &&
                  //   type
                  //     ? false
                  //     : true
                  // }
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Fragment>
  );
}

export default connect(null, {
  GetUser,
})(Login);
