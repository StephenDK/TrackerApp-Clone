// Component: Computer Checkout Form
// Status: Finished
// Template Styles: WIP
// Date: 7/6/2024
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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  DialogContent,
} from "@mui/material";

import SelectField from "../utils/selectField";
import BlankField from "../utils/blankInput";

import SendIcon from "@mui/icons-material/Send";
// import Computer from "@mui/icons-material/Computer";

function CheckOutForm(props) {
  const dispatch = useDispatch();
  // State
  const [name, setUserName] = useState("");
  const [election, setElection] = useState("");
  const [location, setLocation] = useState("");
  const [division, setDivision] = useState("");
  const [manager, setManager] = useState("");
  const [comment, setComment] = useState("");

  const [validatedUserName, setValidatedUserName] = useState(false);

  const onSubmitHandler = async (event) => {
    try {
      // get token
      let token = await localStorage.getItem("token");

      let data = {
        token,
        name,
        location,
        election,
        division,
        manager,
        comment,
      };

      console.log("DATA", data);
      const request = await axios.put(
        `${config.apiUrl}/api/v1/${props.API}/${props.ID}`,
        data
      );
      if (request.status === 200) {
        dispatch(setSuccess("Item Successfully Checked Out"));
        dispatch(ToggleCancel());
        props.updateUI(request.data.data);
        console.log("REQUEST", request.data.data);
      }

      setUserName("");
      setLocation("");
      setElection("");
      setDivision("");
      setManager("");
      setComment("");
    } catch (err) {
      // console.log(err.response.data);
      dispatch(setError(err.response.data.error));
    }
  };

  const handleFieldChange = (fieldName, e) => {
    switch (fieldName) {
      case "user":
        validateUserName(e.target.value);
        setUserName(e.target.value);
        break;
      case "location":
        setLocation(e.target.value);
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

  const validateUserName = (input) => {
    const regPattern = /^[A-Za-z]+[.][A-Za-z]+$/;

    if (regPattern.test(input)) {
      setValidatedUserName(false);
    } else {
      setValidatedUserName(true);
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
            <Grid item xs={12} sm={8}>
              <TextField
                error={validatedUserName}
                required
                id="user"
                name="user"
                label="First.Last Name"
                value={name}
                fullWidth
                onChange={(e) => handleFieldChange("user", e)}
                helperText={
                  validatedUserName ? "Incorrect character in serial" : null
                }
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                // error={computerSerialValid}
                id="location"
                name="location"
                label="Location"
                value={location}
                fullWidth
                onChange={(e) => handleFieldChange("location", e)}
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

            <Grid item xs={12} sm={12}>
              <TextField
                id="outlined-textarea"
                label="Comments"
                name="comment"
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
                  !validatedUserName && name && election && division && manager
                    ? false
                    : true
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
})(CheckOutForm);

/*

  onChangehandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onFormSubmit = async () => {
    try {
      let token = await localStorage.getItem("token");
      let {
        name,
        manager,
        division,
        description,
        teleWork,
        election,
        location,
      } = this.state;
      // console.log(this.state);
      let info = {
        token,
        name,
        manager,
        division,
        description,
        teleWork,
        election,
        location,
        addedPerifs: this.state.addedPerifs,
      };

      const data = await axios.put(
        `${config.apiUrl}/api/v1/${this.props.val}/${this.props.id}`,
        info
      );

      console.log(data);
      this.props.toggleForm();
      window.location.reload(false);
    } catch (err) {
      console.log(err.response);
    }
  };

  onCheckHandler = (event) => {
    console.log(event);
    this.setState({
      teleWork: !this.state.teleWork,
    });
  };

  onSelectHandler = (e, { value, name }) => {
    this.setState({
      [name]: value,
    });
  };

  addPerifToInventory = (value) => {
    let item = this.state.perifs.filter((element) => value === element);
    this.setState({
      perifs: this.state.perifs.filter((el) => value !== el),
      addedPerifs: [...this.state.addedPerifs, ...item],
    });
  };

  removePerifFromSelection = (value) => {
    let item = this.state.addedPerifs.filter((element) => value === element);
    console.log(item);
    this.setState({
      addedPerifs: this.state.addedPerifs.filter((el) => value !== el),
      perifs: [...this.state.perifs, ...item],
    });
  };

  render() {
    console.log(this.props.id);
    return (
      <Form>
        <Form.Field>
          <label>First.Last Name</label>
          <input
            type="text"
            onChange={this.onChangehandler}
            placeholder="Full Name"
            name="name"
          />
        </Form.Field>
        <Form.Field
          label="Election"
          name="election"
          value={this.state.election}
          control={Select}
          options={Elections}
          onChange={this.onSelectHandler}
        />
        {this.props.val !== "phones" ? (
          <Form.Field>
            <label>Location</label>
            <input
              type="text"
              onChange={this.onChangehandler}
              placeholder="Location"
              name="location"
            />
          </Form.Field>
        ) : null}
        <Form.Field
          label="Manager"
          name="manager"
          control={Select}
          options={Managers}
          value={this.state.manager}
          onChange={this.onSelectHandler}
        />
        <Form.Field
          label="Division"
          name="division"
          control={Select}
          options={Divisions}
          value={this.state.division}
          onChange={this.onSelectHandler}
        />

        {this.props.val !== "monitors" ? (
          <Form.Field>
            <label>Peripherals (Click items to add to Inventory)</label>
            <div>
              <div>
                {this.state.perifs.length < 1 ? (
                  <div>All Items Selected</div>
                ) : (
                  this.state.perifs.map((element, index) => (
                    <Button
                      style={{ margin: "3px" }}
                      key={index}
                      color="green"
                      onClick={() => this.addPerifToInventory(element)}
                    >
                      {element}
                    </Button>
                  ))
                )}
              </div>
              <br />
              <br />
              <label style={{ fontWeight: "bold" }}>Added Peripherals</label>
              <div>
                {this.state.addedPerifs.length < 1 ? (
                  <div>No Items selected:</div>
                ) : (
                  this.state.addedPerifs.map((element, index) => (
                    <Button
                      style={{ margin: "3px" }}
                      key={index}
                      color="red"
                      onClick={() => this.removePerifFromSelection(element)}
                    >
                      {element}
                    </Button>
                  ))
                )}
              </div>
            </div>
          </Form.Field>
        ) : null}
        <Form.Field>
          <label>Comments</label>
          <textarea name="description" onChange={this.onChangehandler} />
        </Form.Field>
        <Form.Field>
          <Checkbox
            onChange={this.onCheckHandler}
            label="Will this device be used for teleworking"
          />
        </Form.Field>
        <Button onClick={this.onFormSubmit}>Submit</Button>
      </Form>
    );
  }
}

export default ComputerCheckOut;




*/
