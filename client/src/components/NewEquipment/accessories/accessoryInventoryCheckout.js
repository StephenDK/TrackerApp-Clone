// Component: AccessoryInventoryCheckout
// STATUS: FINISHED
// Template Styles: WIP
// DATE: 05/16/2023
import React, { Fragment, useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import config from "../../../config";
import axios from "axios";
import { GetDivisionFile } from "../../../actions/filesActions";
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
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

import SelectField from "../../utils/selectField";
import BlankField from "../../utils/blankInput";

function AccessoryInventoryCheckout(props) {
  // // State
  const [serial, setSerial] = useState("");
  const [category, setCategory] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [division, setDivision] = useState("");
  const [manager, setManager] = useState("");
  const [user, setUser] = useState("");
  const [location, setLocation] = useState("");
  const [comments, setComments] = useState("");
  const [accessorySerialValid, setAccessorySerialValid] = useState(false);
  const [accessoryMakeValid, setAccessoryMakeValid] = useState(false);
  const [accessoryModelValid, setAccessoryModelValid] = useState(false);
  const [userNameValid, setUserNameValid] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    let initializeData = async () => {
      dispatch(showLoading());

      await dispatch(GetDivisionFile());

      dispatch(hideLoading());
    };
    initializeData();
  }, []);

  const onFormSubmit = async () => {
    try {
      let token = await localStorage.getItem("token");

      let data = {
        token,
        category,
        serial,
        make,
        model,
        division,
        manager,
        userName: user,
        location,
        description: comments,
      };
      // console.log("REQUEST: ", data);
      let req = await axios.post(
        `${config.apiUrl}/api/v1/accessory/addaccessory/checkout`,
        data
      );
      if (req.status === 200) {
        dispatch(setSuccess("Item Successfully Inventoried"));
      }
      console.log(req);
      clearInputs();
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
      case "serial":
        validateSerial(i);
        setSerial(i);
        break;
      case "category":
        setCategory(i);
        break;
      case "make":
        validateMake(i);
        setMake(i);
        break;
      case "model":
        validateModel(i);
        setModel(i);
        break;
      case "user":
        validateUserName(i);
        setUser(i);
        break;
      case "division":
        setUser(i);
        break;
      case "manager":
        setUser(i);
        break;
      case "location":
        setLocation(i);
        break;
      case "comments":
        setComments(i);
        break;
      default:
        break;
    }
  };

  const validateSerial = (input) => {
    const blacklistedChars = /^[^!@#$%^&*()+={}\[\]|;:'",<.>\/?~`]*$/;

    // Expression Check
    if (blacklistedChars.test(input)) {
      setAccessorySerialValid(false);
    } else {
      setAccessorySerialValid(true);
    }
  };
  const validateModel = (input) => {
    const blacklistedChars = /^[^!@#$%^&*()+={}\[\]|;:'",<.>\/?~`]*$/;

    // Expression Check
    if (blacklistedChars.test(input)) {
      setAccessoryModelValid(false);
    } else {
      setAccessoryModelValid(true);
    }
  };
  const validateMake = (input) => {
    const blacklistedChars = /^[^!@#$%^&*()+={}\[\]|;:'",<.>\/?~`]*$/;

    // Expression Check
    if (blacklistedChars.test(input)) {
      setAccessoryMakeValid(false);
    } else {
      setAccessoryMakeValid(true);
    }
  };

  const validateUserName = (input) => {
    const regPattern = /^[A-Za-z]+[.][A-Za-z]+$/;

    if (regPattern.test(input)) {
      setUserNameValid(false);
    } else {
      setUserNameValid(true);
    }
  };

  const clearInputs = () => {
    setCategory("");
    setSerial("");
    setMake("");
    setModel("");
    setDivision("");
    setManager("");
    setUser("");
    setLocation("");
    setComments("");
  };

  return (
    <Fragment>
      <Container maxWidth="md" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{
            my: { xs: 3, md: 6 },
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
            Inventory Accessory & Checkout
          </Typography>
          <Grid container spacing={3} rowSpacing={3}>
            <Grid item xs={12} sm={8}>
              <TextField
                error={accessorySerialValid}
                id="serial"
                name="serial"
                label="Serial"
                value={serial}
                fullWidth
                helperText={
                  accessorySerialValid ? "Incorrect character in serial" : null
                }
                onChange={(e) => handleFieldChange("serial", e)}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel>Category*</InputLabel>
                <Select
                  label="Category"
                  name="category"
                  id="category"
                  value={category}
                  onChange={(e) => handleFieldChange("category", e)}
                >
                  {props.files.jsonFiles.accessoryCategories.length > 0
                    ? props.files.jsonFiles.accessoryCategories.map((item) => (
                        <MenuItem key={item.type} value={item.type}>
                          {item.type}
                        </MenuItem>
                      ))
                    : null}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                error={accessoryMakeValid}
                required
                id="make"
                name="make"
                label="Make"
                value={make}
                fullWidth
                helperText={
                  accessoryMakeValid
                    ? "Incorrect character in accessory make"
                    : null
                }
                onChange={(e) => handleFieldChange("make", e)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={accessoryModelValid}
                required
                id="model"
                name="model"
                label="Model"
                value={model}
                fullWidth
                helperText={
                  accessoryModelValid
                    ? "Incorrect character in accessory model"
                    : null
                }
                onChange={(e) => handleFieldChange("model", e)}
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
                error={userNameValid}
                required
                id="user"
                name="user"
                value={user}
                fullWidth
                helperText={userNameValid ? "Must be First.Last name" : null}
                onChange={(e) => handleFieldChange("user", e)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <InputLabel>Location</InputLabel>
              <TextField
                error={accessorySerialValid}
                required
                id="location"
                name="location"
                value={location}
                fullWidth
                helperText={
                  accessorySerialValid ? "Incorrect character in serial" : null
                }
                onChange={(e) => handleFieldChange("location", e)}
              />
            </Grid>
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
                  !accessorySerialValid &&
                  !accessoryMakeValid &&
                  !accessoryModelValid &&
                  category &&
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
    </Fragment>
  );
}

function mapStateToProps({ files, loading }) {
  return { files, loading };
}

export default connect(mapStateToProps, {
  GetDivisionFile,
  showLoading,
  hideLoading,
})(AccessoryInventoryCheckout);
