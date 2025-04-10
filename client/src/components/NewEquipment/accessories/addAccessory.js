// Component: AddAccessory
// Status: Completed
// Template Styles: WIP
// Date: 5/16/2024
import React, { Fragment, useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import config from "../../../config";
import axios from "axios";
// import { styled, useTheme } from "@mui/material/styles";
import { GetAccessoryCategoryFile } from "../../../actions/filesActions";
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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import CableIcon from "@mui/icons-material/Cable";

import LoadingForm from "../../loading/loadingComputerForm";

function AddAccessory(props) {
  // State
  const [serial, setSerial] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [accessoryQuantityValid, setAccessoryQuantityValid] = useState(false);
  const [accessorySerialValid, setAccessorySerialValid] = useState(false);
  const [accessoryMakeValid, setAccessoryMakeValid] = useState(false);
  const [accessoryModelValid, setAccessoryModelValid] = useState(false);

  // const theme = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    let initializePage = async () => {
      dispatch(showLoading());
      // Make API call for accessory categories file
      await dispatch(GetAccessoryCategoryFile());

      dispatch(hideLoading());
    };

    initializePage();
  }, []);

  const onSubmitHandler = async (event) => {
    try {
      // get token
      let token = await localStorage.getItem("token");

      let data = {
        token,
        quantity,
        serial,
        make,
        model,
        category,
      };

      console.log("DATA", data);
      let request = await axios.post(`${config.apiUrl}/api/v1/accessory`, data);

      if (request.status === 200) {
        dispatch(setSuccess("Item Successfully Inventoried"));
      }

      setQuantity(1);
      setSerial("");
      setMake("");
      setModel("");
      setCategory("");
    } catch (err) {
      // console.log(err.response.data);
      dispatch(setError(err.response.data.error));
    }
  };

  const handleFieldChange = (fieldName, e) => {
    switch (fieldName) {
      case "accessoryQuantity":
        validateQuantity(e.target.value);
        setQuantity(e.target.value);
        break;
      case "accessorySerial":
        validateSerial(e.target.value);
        setSerial(e.target.value);
        break;
      case "accessoryMake":
        validateMake(e.target.value);
        setMake(e.target.value);
        break;
      case "accessoryModel":
        validateModel(e.target.value);
        setModel(e.target.value);
        break;
      case "category":
        setCategory(e.target.value);
        break;
      default:
        break;
    }
  };

  const validateQuantity = (input) => {
    let number = Number(input);
    if (!isNaN(number) && number > 0) {
      setAccessoryQuantityValid(false);
    } else {
      setAccessoryQuantityValid(true);
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
            <CableIcon />
          </Avatar>
          <Typography variant="h4" sx={{ mb: "40px" }}>
            Inventory New Accessory
          </Typography>
          <Grid container spacing={3} rowSpacing={3}>
            <Grid item xs={12} sm={2}>
              <TextField
                id="quantity"
                label="Quantity"
                type="number"
                value={quantity}
                required
                fullWidth
                error={accessoryQuantityValid}
                helperText={
                  accessoryQuantityValid
                    ? "Quantity must be a number and greater than zero"
                    : null
                }
                onChange={(e) => handleFieldChange("accessoryQuantity", e)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
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
                onChange={(e) => handleFieldChange("accessorySerial", e)}
                disabled={quantity > 1 ? true : false}
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
                onChange={(e) => handleFieldChange("accessoryMake", e)}
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
                onChange={(e) => handleFieldChange("accessoryModel", e)}
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
                disabled={
                  !accessoryQuantityValid &&
                  !accessorySerialValid &&
                  !accessoryMakeValid &&
                  !accessoryModelValid &&
                  make &&
                  model &&
                  category
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
  GetAccessoryCategoryFile,
  showLoading,
  hideLoading,
})(AddAccessory);
