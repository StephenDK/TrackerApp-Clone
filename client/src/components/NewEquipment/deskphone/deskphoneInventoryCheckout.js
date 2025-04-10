// Component: Inventory Desk Phone
// Status: Completed
// Template Styles: WIP
// Date: 5/15/2024
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import config from "../../../config";
import axios from "axios";
import {
  GetDivisionFile,
  GetDeskPhoneFile,
} from "../../../actions/filesActions";
import { setError } from "../../../actions/errorActions";
import { setSuccess } from "../../../actions/successActions";
import { showLoading, hideLoading } from "../../../actions/loadingActions";
import {
  Container,
  Paper,
  Avatar,
  Grid,
  TextField,
  Typography,
  Button,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

import PhoneIcon from "@mui/icons-material/Phone";
import DeleteIcon from "@mui/icons-material/Delete";

import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import AddIcon from "@mui/icons-material/Add";
import SelectField from "../../utils/selectField";
import BlankField from "../../utils/blankInput";
import LoadingForm from "../../loading/loadingComputerForm";
import ModelSelectField from "../../utils/modelSelectField";

function InventoryCheckoutDeskphone(props) {
  // State
  const [rovdp, setRovDP] = useState("");
  const [mac, setMac] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [division, setDivision] = useState("");
  const [manager, setManager] = useState("");
  const [user, setUser] = useState("");
  const [location, setLocation] = useState("");
  const [comments, setComments] = useState("");
  const [lines, setLines] = useState([]);
  const [lineName, setLineName] = useState("");
  const [lineNumber, setLineNumber] = useState("");
  const [validateInput, setValidateInput] = useState({
    invalidROVDP: false,
    invalidMAC: false,
    invalidUser: false,
  });
  const [uniqueMakes, setUniqueMakes] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    let initializeData = async () => {
      dispatch(showLoading());

      await dispatch(GetDeskPhoneFile());
      await dispatch(GetDivisionFile());

      dispatch(hideLoading());
    };
    initializeData();
  }, []);

  useEffect(() => {
    if (
      props.files.jsonFiles.deskphones &&
      props.files.jsonFiles.deskphones.length > 0
    ) {
      let makes = [];
      props.files.jsonFiles.deskphones.forEach((item) => {
        if (!makes.includes(item.make)) {
          makes.push(item.make);
        }
      });
      setUniqueMakes([...makes]);
    }
  }, [props.files.jsonFiles.deskphones]);

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

  const onFormSubmit = async () => {
    try {
      let token = await localStorage.getItem("token");

      let data = {
        token,
        name: rovdp,
        mac,
        number: phoneNumber,
        make,
        model,
        division,
        manager,
        user,
        location,
        description: comments,
        lines,
      };
      console.log("REQUEST: ", data);
      let request = await axios.post(
        `${config.apiUrl}/api/v1/deskphones/addphone/checkout`,
        data
      );
      if (request.status === 200) {
        dispatch(setSuccess("Item Successfully Inventoried"));
      }
      clearInputFields();
    } catch (err) {
      console.log(err.response.data);
      console.log("DISPATCH(): ", err.response.data.error);
      dispatch(setError(err.response.data.error));
    }
  };

  const onDivisionSelectHandler = (e) => {
    setDivision(e.target.value);
    const data = props.files.jsonFiles.divisions.find(
      (obj) => obj.value === e.target.value
    );
    setManager(data.manager);
  };

  const handleFieldChange = (fieldName, e) => {
    let i = e.target.value;
    switch (fieldName) {
      case "rovdp":
        validateROVDP(i);
        setRovDP(i);
        break;
      case "mac":
        validateMac(i);
        setMac(i);
        break;
      case "phoneNumber":
        setPhoneNumber((prevNumber) => normalizeInput(i, prevNumber));
        break;
      case "make":
        setMake(i);
        const filteredModels = props.files.jsonFiles.deskphones
          .filter((item) => item.make === i)
          .map((item) => item.model);
        setSelectedModels(filteredModels);
        setModel("");
        break;
      case "model":
        setModel(i);
        break;
      case "user":
        validateUserName(i);
        setUser(i);
        break;
      case "location":
        setLocation(i);
        break;
      case "lineName":
        setLineName(i);
        break;
      case "lineNumber":
        setLineNumber(i);
        break;
      case "comments":
        setComments(i);
        break;
      default:
        break;
    }
  };

  const validateMac = (input) => {
    const blacklistedChars = /^[-/.\w:]+$/;

    // Expression Check
    if (blacklistedChars.test(input)) {
      setValidateInput({
        ...validateInput,
        invalidMAC: false,
      });
    } else {
      setValidateInput({
        ...validateInput,
        invalidMAC: true,
      });
    }
  };

  const validateROVDP = (input) => {
    const blacklistedChars = /^[0-9]+$/;

    // Expression Check
    if (blacklistedChars.test(input)) {
      setValidateInput({
        ...validateInput,
        invalidROVDP: false,
      });
    } else {
      setValidateInput({
        ...validateInput,
        invalidROVDP: true,
      });
    }
  };

  const validateUserName = (input) => {
    const regPattern = /^[A-Za-z]+[.][A-Za-z]+$/;

    if (regPattern.test(input)) {
      setValidateInput({
        ...validateInput,
        invalidUser: false,
      });
    } else {
      setValidateInput({
        ...validateInput,
        invalidUser: true,
      });
    }
  };

  const onAddLineHandler = () => {
    console.log("Adding Line");
    if (lineName === "" || lineNumber === "") {
      console.log("LINE NOT ADDED");
      return;
    }
    let newLine = {
      lineName,
      lineNumber,
    };

    console.log("NEW LINE:", newLine);
    setLines((prevLines) => [...prevLines, newLine]);
    setLineName("");
    setLineNumber("");
  };

  const onRemoveLineHandler = (title) => {
    console.log("Removing Line");
    let data = lines.filter((item) => item.lineNumber !== title);
    console.log(data);
    setLines([...data]);
  };

  const clearInputFields = () => {
    setRovDP("");
    setMac("");
    setPhoneNumber("");
    setMake("");
    setModel("");
    setDivision("");
    setManager("");
    setUser("");
    setLocation("");
    setLines([]);
    setComments("");
    setLineName("");
    setLineNumber("");
  };

  if (props.loading.isLoading) {
    return <LoadingForm />;
  }

  return (
    <Container maxWidth="md" sx={{ mb: 4 }}>
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
          <ShoppingCartCheckoutIcon />
        </Avatar>
        <Typography variant="h4" sx={{ mb: "40px" }}>
          Inventory Desk Phone & Checkout
        </Typography>
        <Grid container spacing={3} rowSpacing={3}>
          <Grid item xs={12} sm={2}>
            <TextField
              id="rovdp"
              label="ROV DP"
              type="number"
              value={rovdp}
              required
              fullWidth
              helperText={
                validateInput.invalidROVDP ? "ROVDP must be a number" : null
              }
              onChange={(e) => handleFieldChange("rovdp", e)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              error={validateInput.invalidMAC}
              required
              id="mac"
              name="mac"
              label="MAC"
              value={mac}
              fullWidth
              helperText={
                validateInput.invalidMAC ? "Incorrect character in MAC" : null
              }
              onChange={(e) => handleFieldChange("mac", e)}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              required
              id="phoneNumber"
              name="phoneNumber"
              label="Phone Number"
              value={phoneNumber}
              fullWidth
              onChange={(e) => handleFieldChange("phoneNumber", e)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <InputLabel>Make*</InputLabel>
            <Select
              sx={{
                width: "100%",
              }}
              id="make"
              name="make"
              value={make}
              onChange={(e) => handleFieldChange("make", e)}
            >
              {uniqueMakes.length > 0
                ? uniqueMakes.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))
                : null}
            </Select>
          </Grid>

          <Grid item xs={12} sm={6}>
            <ModelSelectField
              items={selectedModels}
              deviceModel={model}
              field="model"
              onChangeHandler={handleFieldChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>Division*</InputLabel>
            <SelectField
              name="division"
              id="division"
              value={division}
              items={props.files.jsonFiles.divisions}
              onSelectHandler={(e) => onDivisionSelectHandler(e)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <BlankField title={"Manager*"} value={manager} />
          </Grid>
          <Grid item xs={12} sm={8}>
            <InputLabel>First.Last Name*</InputLabel>
            <TextField
              error={validateInput.invalidUser}
              id="user"
              name="user"
              value={user}
              fullWidth
              helperText={
                validateInput.invalidUser ? "Must be First.Last" : null
              }
              onChange={(e) => handleFieldChange("user", e)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <InputLabel>Location</InputLabel>
            <TextField
              id="location"
              name="location"
              value={location}
              fullWidth
              onChange={(e) => handleFieldChange("location", e)}
            />
          </Grid>

          <Grid container justifyContent="center" sx={{ mt: 3 }}>
            <Grid item>
              <Typography variant="h5">Add Desk Phone Line</Typography>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={5}>
            <InputLabel>Line Name</InputLabel>
            <TextField
              id="lineName"
              name="lineName"
              value={lineName}
              fullWidth
              onChange={(e) => handleFieldChange("lineName", e)}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <InputLabel>Line Number</InputLabel>
            <TextField
              id="lineNumber"
              name="lineNumber"
              value={lineNumber}
              fullWidth
              onChange={(e) => handleFieldChange("lineNumber", e)}
            />
          </Grid>
          <Grid item xs={12} sm={2} style={{ paddingTop: "45px" }}>
            <Button
              variant="outlined"
              style={{ height: "50px" }}
              startIcon={<AddIcon />}
              onClick={onAddLineHandler}
            >
              Add Line
            </Button>
          </Grid>
          {lines.length < 1
            ? null
            : lines.map((item, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <List>
                    <Paper elevation={1}>
                      <ListItem
                        secondaryAction={
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => onRemoveLineHandler(item.lineNumber)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        }
                      >
                        <ListItemAvatar>
                          <Avatar>
                            <PhoneIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={item.lineName}
                          secondary={item.lineNumber}
                        />
                      </ListItem>
                    </Paper>
                  </List>
                </Grid>
              ))}

          <Grid item xs={12} sm={12}>
            <TextField
              id="outlined-textarea"
              label="Comments"
              name="comments"
              value={comments}
              variant="filled"
              multiline
              fullWidth
              onChange={(e) => handleFieldChange("comments", e)}
            />
          </Grid>
          <Grid item xs={3} sm={2}>
            <Button
              color="primary"
              type="submit"
              fullWidth
              variant="contained"
              onClick={onFormSubmit}
              sx={{ mt: 3, mb: 2 }}
              disabled={
                !validateInput.invalidROVDP &&
                !validateInput.invalidMAC &&
                !validateInput.invalidUser &&
                mac &&
                make &&
                model &&
                division &&
                user &&
                manager
                  ? false
                  : true
              }
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

function mapStateToProps({ files, loading }) {
  return { files, loading };
}

export default connect(mapStateToProps, {
  GetDivisionFile,
  GetDeskPhoneFile,
  showLoading,
  hideLoading,
})(InventoryCheckoutDeskphone);
