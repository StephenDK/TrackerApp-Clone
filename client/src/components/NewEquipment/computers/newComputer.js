// Component: Finished
// Template Styles: WIP
import React, { Fragment, useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import config from "../../../config";
import axios from "axios";
// import { styled, useTheme } from "@mui/material/styles";
import {
  GetComputerTypes,
  GetComputerFile,
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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import ComputerIcon from "@mui/icons-material/Computer";

import LoadingForm from "../../loading/loadingComputerForm";
import ModelSelectField from "../../utils/modelSelectField";

function NewComputer(props) {
  // State
  const [computerSerial, setComputerSerial] = useState("");
  const [computerMake, setComputerMake] = useState("");
  const [computerModel, setComputerModel] = useState("");
  const [type, setType] = useState("");
  const [uniqueMakes, setUniqueMakes] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);

  const [computerSerialValid, setComputerSerialValid] = useState(false);
  // const theme = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    let initializePage = async () => {
      dispatch(showLoading());
      // Make API call for computer types file

      await dispatch(GetComputerTypes());
      // Make the API request for computer make
      // await dispatch(GetComputerMakeFile());

      // Make the API request for computer model
      await dispatch(GetComputerFile());

      dispatch(hideLoading());
    };

    initializePage();
  }, []);

  useEffect(() => {
    if (
      props.files.jsonFiles.computers &&
      props.files.jsonFiles.computers.length > 0
    ) {
      let makes = [];
      props.files.jsonFiles.computers.forEach((item) => {
        if (!makes.includes(item.make)) {
          makes.push(item.make);
        }
      });
      setUniqueMakes([...makes]);
    }
  }, [props.files.jsonFiles.computers]);

  const onSubmitHandler = async (event) => {
    try {
      // get token
      let token = await localStorage.getItem("token");

      let data = {
        token,
        computerSerial,
        computerMake,
        computerModel,
        type,
      };

      console.log("DATA", data);
      const request = await axios.post(
        `${config.apiUrl}/api/v1/computers`,
        data
      );
      if (request.status === 200) {
        dispatch(setSuccess("Item Successfully Inventoried"));
      }

      setComputerSerial("");
      setComputerMake("");
      setComputerModel("");
      setType("");
    } catch (err) {
      // console.log(err.response.data);
      dispatch(setError(err.response.data.error));
    }
  };

  const handleFieldChange = (fieldName, e) => {
    switch (fieldName) {
      case "computerSerial":
        validateSerial(e.target.value);
        setComputerSerial(e.target.value);
        break;
      case "computerMake":
        setComputerMake(e.target.value);
        const filteredModels = props.files.jsonFiles.computers
          .filter((item) => item.make === e.target.value)
          .map((item) => item.model);
        setSelectedModels(filteredModels);
        setComputerModel("");
        break;
      case "computerModel":
        setComputerModel(e.target.value);
        break;
      case "type":
        setType(e.target.value);
        break;
      default:
        break;
    }
  };

  const validateSerial = (input) => {
    const blacklistedChars = /^[-/.\w:]+$/;

    // Expression Check
    if (blacklistedChars.test(input)) {
      setComputerSerialValid(false);
    } else {
      setComputerSerialValid(true);
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
            <ComputerIcon />
          </Avatar>
          <Typography variant="h4" sx={{ mb: "40px" }}>
            Inventory New Computer
          </Typography>
          <Grid container spacing={3} rowSpacing={3}>
            <Grid item xs={12} sm={9}>
              <TextField
                error={computerSerialValid}
                required
                id="serial"
                name="serial"
                label="Serial"
                value={computerSerial}
                fullWidth
                helperText={
                  computerSerialValid ? "Incorrect character in serial" : null
                }
                onChange={(e) => handleFieldChange("computerSerial", e)}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel>Type*</InputLabel>
                <Select
                  label="Type"
                  name="type"
                  id="type"
                  value={type}
                  onChange={(e) => handleFieldChange("type", e)}
                >
                  {props.files.jsonFiles.computerTypes.length > 0
                    ? props.files.jsonFiles.computerTypes.map((item) => (
                        <MenuItem key={item.type} value={item.type}>
                          {item.type}
                        </MenuItem>
                      ))
                    : null}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Make</InputLabel>
              <Select
                sx={{
                  width: "100%",
                }}
                label="Make"
                id="make"
                name="make"
                value={computerMake}
                onChange={(e) => handleFieldChange("computerMake", e)}
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
                field="computerModel"
                deviceModel={computerModel}
                onChangeHandler={handleFieldChange}
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
                  !computerSerialValid &&
                  computerSerial &&
                  computerMake &&
                  computerModel &&
                  type
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
  GetComputerTypes,
  GetComputerFile,
  showLoading,
  hideLoading,
  setError,
  setSuccess,
})(NewComputer);
