// Component: Finished
// Template Styles: WIP
// Date: 5/2/2024
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
  Select,
  MenuItem,
} from "@mui/material";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

import SelectField from "../../utils/selectField";
import BlankField from "../../utils/blankInput";
import LoadingForm from "../../loading/loadingComputerForm";
import ModelSelectField from "../../utils/modelSelectField";

function DockingstationInventoryCheckout(props) {
  // State
  const [serial, setSerial] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [division, setDivision] = useState("");
  const [manager, setManager] = useState("");
  const [user, setUser] = useState("");
  const [location, setLocation] = useState("");
  const [comments, setComments] = useState("");
  const [validateInput, setValidateInput] = useState({
    invalidSerial: false,
    invalidUser: false,
  });
  const [uniqueMakes, setUniqueMakes] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    let initializeData = async () => {
      dispatch(showLoading());

      await dispatch(GetDivisionFile());

      dispatch(hideLoading());
    };
    initializeData();
    if (props.files.jsonFiles.docks && props.files.jsonFiles.docks.length > 0) {
      let makes = [];
      props.files.jsonFiles.docks.forEach((item) => {
        if (!makes.includes(item.make)) {
          makes.push(item.make);
        }
      });
      setUniqueMakes([...makes]);
    }
  }, []);

  const onFormSubmit = async () => {
    try {
      let token = await localStorage.getItem("token");

      let data = {
        token,
        dockSerial: serial,
        dockMake: make,
        dockModel: model,
        division,
        manager,
        userName: user,
        location,
        description: comments,
      };
      console.log("REQUEST: ", data);
      let req = await axios.post(
        `${config.apiUrl}/api/v1/dockingstations/adddock/checkout`,
        data
      );
      if (req.status === 200) {
        dispatch(setSuccess("Item Successfully Inventoried"));
      }
      setSerial("");
      setMake("");
      setModel("");
      setDivision("");
      setManager("");
      setUser("");
      setLocation("");
      setComments("");
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
      case "make":
        setMake(i);
        const filteredModels = props.files.jsonFiles.docks
          .filter((item) => item.make === e.target.value)
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
      case "comments":
        setComments(i);
        break;
      default:
        break;
    }
  };

  const validateSerial = (input) => {
    const blacklistedChars = /^[-/.\w:]+$/;

    // Expression Check
    if (blacklistedChars.test(input)) {
      setValidateInput({
        ...validateInput,
        invalidSerial: false,
      });
    } else {
      setValidateInput({
        ...validateInput,
        invalidSerial: true,
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

  if (props.loading.isLoading) {
    return <LoadingForm />;
  }

  return (
    <Fragment>
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
            Inventory Docking Station & Checkout
          </Typography>
          <Grid container spacing={3} rowSpacing={3}>
            <Grid item xs={12} sm={12}>
              <TextField
                error={validateInput.invalidSerial}
                required
                id="serial"
                name="serial"
                label="Serial"
                value={serial}
                fullWidth
                helperText={
                  validateInput.invalidSerial
                    ? "Incorrect character in serial"
                    : null
                }
                onChange={(e) => handleFieldChange("serial", e)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputLabel>Make*</InputLabel>
              <Select
                sx={{
                  width: "100%",
                }}
                // label="Make"
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
                  !validateInput.invalidSerial &&
                  !validateInput.invalidUser &&
                  serial &&
                  make &&
                  model &&
                  division &&
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
})(DockingstationInventoryCheckout);
