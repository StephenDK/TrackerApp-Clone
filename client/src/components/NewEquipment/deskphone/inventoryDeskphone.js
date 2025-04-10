// Component: Inventory Desk Phone
// Status: Completed
// Template Styles: WIP
// Date: 5/15/2024
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import config from "../../../config";
import axios from "axios";
import { GetDeskPhoneFile } from "../../../actions/filesActions";
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

import PhoneIcon from "@mui/icons-material/Phone";

import LoadingForm from "../../loading/loadingComputerForm";
import ModelSelectField from "../../utils/modelSelectField";

function InventoryDeskphone(props) {
  // State
  const [rovdp, setRovDP] = useState("");
  const [mac, setMac] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");

  const [uniqueMakes, setUniqueMakes] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    let initializeData = async () => {
      dispatch(showLoading());

      await dispatch(GetDeskPhoneFile());

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
      };
      console.log("REQUEST: ", data);
      let request = await axios.post(
        `${config.apiUrl}/api/v1/deskphones/`,
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

  const handleFieldChange = (fieldName, e) => {
    let i = e.target.value;
    switch (fieldName) {
      case "rovdp":
        // validateROVDP(i);
        setRovDP(i);
        break;
      case "mac":
        // validateMac(i);
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
      default:
        break;
    }
  };

  //   const validateMac = (input) => {
  //     const blacklistedChars = /^[-/.\w:]+$/;

  //     // Expression Check
  //     if (blacklistedChars.test(input)) {
  //       setValidateInput({
  //         ...validateInput,
  //         invalidMAC: false,
  //       });
  //     } else {
  //       setValidateInput({
  //         ...validateInput,
  //         invalidMAC: true,
  //       });
  //     }
  //   };

  //   const validateROVDP = (input) => {
  //     const blacklistedChars = /^[0-9]+$/;

  //     // Expression Check
  //     if (blacklistedChars.test(input)) {
  //       setValidateInput({
  //         ...validateInput,
  //         invalidROVDP: false,
  //       });
  //     } else {
  //       setValidateInput({
  //         ...validateInput,
  //         invalidROVDP: true,
  //       });
  //     }
  //   };

  const clearInputFields = () => {
    setRovDP("");
    setMac("");
    setPhoneNumber("");
    setMake("");
    setModel("");
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
          <PhoneIcon />
        </Avatar>
        <Typography variant="h4" sx={{ mb: "40px" }}>
          Inventory Desk Phone
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
              //   helperText={
              //     validateInput.invalidROVDP ? "ROVDP must be a number" : null
              //   }
              onChange={(e) => handleFieldChange("rovdp", e)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              //   error={validateInput.invalidMAC}
              required
              id="mac"
              name="mac"
              label="MAC"
              value={mac}
              fullWidth
              //   helperText={
              //     validateInput.invalidMAC ? "Incorrect character in MAC" : null
              //   }
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

          <Grid item xs={3} sm={2}>
            <Button
              color="primary"
              type="submit"
              fullWidth
              variant="contained"
              onClick={onFormSubmit}
              sx={{ mt: 3, mb: 2 }}
              disabled={!mac || !rovdp || !phoneNumber || !make || !model}
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
  GetDeskPhoneFile,
  showLoading,
  hideLoading,
})(InventoryDeskphone);
