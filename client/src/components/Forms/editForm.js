// Component: Edit Device Form
// Template Styles: WIP
// Date: 7/14/2024
// Author: StephenDK
import React, { Fragment, useState } from "react";
import { connect, useDispatch } from "react-redux";
// import { styled, useTheme } from "@mui/material/styles";
import axios from "axios";
import config from "../../config.js";
import { setSuccess } from "../../actions/successActions.js";
import { setError } from "../../actions/errorActions.js";
import { ToggleCancel } from "../../actions/navActions.js";
import {
  Container,
  Avatar,
  Grid,
  TextField,
  Typography,
  Button,
  InputLabel,
  DialogContent,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";

import SelectField from "../utils/selectField";
import BlankField from "../utils/blankInput";

import SendIcon from "@mui/icons-material/Send";
// import Computer from "@mui/icons-material/Computer";

function EditForm(props) {
  const dispatch = useDispatch();
  // State
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [computerName, setComputerName] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [election, setElection] = useState("");
  const [location, setLocation] = useState("");
  const [division, setDivision] = useState("");
  const [manager, setManager] = useState("");
  const [comment, setComment] = useState("");

  const [computerNameValid, setcomputerNameValid] = useState(false);
  const [phoneNumberValid, setPhoneNumberValid] = useState(false);
  const [userNameValid, setUserNameValid] = useState(false);

  const onSubmitHandler = async (event) => {
    try {
      // get token
      let token = await localStorage.getItem("token");

      let data = {
        token,
        computerName,
        phoneNumber,
        userName,
        make,
        model,
        location,
        election,
        division,
        manager,
        comment,
      };

      console.log("DATA", data);
      const request = await axios.put(
        `${config.apiUrl}/api/v1/${props.API}/update/${props.ID}`,
        data
      );
      if (request.status === 200) {
        dispatch(setSuccess("Item Successfully Updated"));
        dispatch(ToggleCancel());
        props.updateUI(request.data.data);
        console.log("REQUEST", request.data.data);
      }
    } catch (err) {
      // console.log(err.response.data);
      dispatch(setError(err.response.data.error));
    }
  };

  const handleFieldChange = (fieldName, e) => {
    switch (fieldName) {
      case "computerName":
        validateComputerName(e.target.value);
        setComputerName(e.target.value);
        break;
      case "phoneNumber":
        validatePhoneNumber(e.target.value);
        setPhoneNumber(e.target.value);
        break;
      case "make":
        setMake(e.target.value);
        break;
      case "model":
        setModel(e.target.value);
        break;
      case "location":
        setLocation(e.target.value);
        break;
      case "userName":
        validateUserName(e.target.value);
        setUserName(e.target.value);
        break;
      case "division":
        setDivision(e.target.value);
        break;
      case "manager":
        setManager(e.target.value);
        break;
      case "election":
        setElection(e.target.value);
        break;
      case "comment":
        setComment(e.target.value);
        break;
      default:
        break;
    }
  };

  const onDivisionSelectHandler = (e) => {
    setDivision(e.target.value);
    const data = props.divisions.find((obj) => obj.value === e.target.value);
    setManager(data.manager);
  };

  // Start of form validation
  const normalizeInput = (value, previousValue) => {
    if (!value) return value;
    const currentValue = value.replace(/[^\d]/g, "");
    const cvLength = currentValue.length;

    if (!previousValue || value.length > previousValue.length) {
      if (cvLength < 4) return currentValue;
      if (cvLength < 7)
        return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;
      return `(${currentValue.slice(0, 3)}) ${currentValue.slice(
        3,
        6
      )}-${currentValue.slice(6, 10)}`;
    }
  };

  const handlePhoneNumberChange = ({ target: { value } }) => {
    // Old Code
    // this.setState((prevState) => ({
    //   phoneNumber: normalizeInput(value, prevState.phoneNumber),
    // }));
    // New Code
    setPhoneNumber(normalizeInput(value, phoneNumber));
  };

  const validateComputerName = (input) => {
    const regPattern = /^[a-zA-Z0-9]+$/;

    if (regPattern.test(input)) {
      setcomputerNameValid(false); // Valid input
    } else {
      setcomputerNameValid(true); // Invalid input
    }
  };

  const validateUserName = (input) => {
    const regPattern = /^[A-Za-z]+[.][A-Za-z]+$/;

    if (regPattern.test(input)) {
      setUserNameValid(false); // Valid input
    } else {
      setUserNameValid(true); // Invalid input
    }
  };

  const validatePhoneNumber = (input) => {
    const regPattern = /^[0-9()\- ]+$/;
    console.log("Checking phone number");
    if (regPattern.test(input)) {
      setPhoneNumberValid(false); // Valid input
    } else {
      setPhoneNumberValid(true); // Invalid input
    }
  };

  return (
    <Fragment>
      <DialogContent>
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            {props.icon.Icon.component}
          </Avatar>
          <Typography variant="h4">{props.textHeading}</Typography>

          <Grid container spacing={3} rowSpacing={3} sx={{ my: 1 }}>
            {props.API === "computers" ? (
              <Grid item xs={12} sm={12}>
                <TextField
                  error={computerNameValid}
                  id="computerName"
                  name="computerName"
                  label="Computer Name"
                  value={computerName}
                  fullWidth
                  onChange={(e) => handleFieldChange("computerName", e)}
                  helperText={
                    computerNameValid
                      ? "Incorrect character in computer name"
                      : null
                  }
                />
              </Grid>
            ) : null}
            {props.API === "phones" || props.API === "deskphones" ? (
              <Grid item xs={12} sm={12}>
                <TextField
                  error={phoneNumberValid}
                  id="phoneNumber"
                  name="phoneNumber"
                  label="Phone Number"
                  value={phoneNumber}
                  fullWidth
                  onChange={(e) => handlePhoneNumberChange(e)}
                  helperText={
                    phoneNumberValid
                      ? "Incorrect character in phone number"
                      : null
                  }
                />
              </Grid>
            ) : null}
            <Grid item xs={12} sm={6}>
              <TextField
                id="make"
                name="make"
                label="Make"
                value={make}
                fullWidth
                onChange={(e) => handleFieldChange("make", e)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="model"
                name="model"
                label="Model"
                value={model}
                fullWidth
                onChange={(e) => handleFieldChange("model", e)}
              />
            </Grid>
            <Grid item xs={12} sm={props.checkedOut ? 4 : 12}>
              <TextField
                id="location"
                name="location"
                label="Location"
                value={location}
                fullWidth
                onChange={(e) => handleFieldChange("location", e)}
              />
            </Grid>
            {props.checkedOut ? (
              <Fragment>
                <Grid item xs={12} sm={8}>
                  <TextField
                    error={userNameValid}
                    id="user"
                    name="user"
                    label="First.Last Name"
                    value={userName}
                    fullWidth
                    onChange={(e) => handleFieldChange("userName", e)}
                    helperText={
                      userNameValid ? "User name must be first.last" : null
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormControl sx={{ width: "100%" }}>
                    <InputLabel>Election*</InputLabel>
                    <Select
                      name="election"
                      label="Election*"
                      id="election"
                      value={election}
                      onChange={(e) => handleFieldChange("election", e)}
                    >
                      {props.elections.length > 0
                        ? props.elections.map((item, index) => (
                            <MenuItem key={index} value={item.name}>
                              {item.name}
                            </MenuItem>
                          ))
                        : null}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel>Division*</InputLabel>
                  <SelectField
                    name="division"
                    id="division"
                    value={division}
                    items={props.divisions}
                    onSelectHandler={(e) => onDivisionSelectHandler(e)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <BlankField title={"Manager*"} value={manager} />
                </Grid>
              </Fragment>
            ) : null}

            <Grid item xs={12} sm={12}>
              <TextField
                id="outlined-textarea"
                label="Comments"
                name="comments"
                value={comment}
                variant="filled"
                multiline
                fullWidth
                onChange={(e) => handleFieldChange("comment", e)}
              />
            </Grid>
            <Grid item xs={3} sm={2}>
              <Button
                color="primary"
                type="submit"
                size="large"
                variant="contained"
                startIcon={<SendIcon />}
                onClick={onSubmitHandler}
                sx={{ mt: 1, mb: 1 }}
                disabled={
                  userNameValid || computerNameValid || phoneNumberValid
                }
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Container>
      </DialogContent>
    </Fragment>
  );
}

export default connect(null, {
  setSuccess,
  setError,
})(EditForm);

/*

*/
