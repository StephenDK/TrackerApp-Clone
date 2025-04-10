// STATUS: FINISHED
// Template Styles: WIP
// Editor: StephenDK
// DATE: 12/19/2023
import React, { Fragment, useState, useEffect, useCallback } from "react";
import config from "../../../config";
import { connect, useDispatch } from "react-redux";
import axios from "axios";

import { GetMonitorFile } from "../../../actions/filesActions";

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
import MonitorIcon from "@mui/icons-material/Monitor";
import ModelSelectField from "../../utils/modelSelectField";
import LoadingForm from "../../loading/loadingComputerForm";

function NewMonitor(props) {
  const [monitorSerial, setMonitorSerial] = useState("");
  const [monitorMake, setMonitorMake] = useState("");
  const [monitorModel, setMonitorModel] = useState("");
  const [validSerial, setValidSerial] = useState(false);
  const [uniqueMakes, setUniqueMakes] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);
  const dispatch = useDispatch();

  const dispatchCallback = useCallback(dispatch, [dispatch]);

  useEffect(() => {
    let initializePage = async () => {
      dispatchCallback(showLoading());

      await dispatchCallback(GetMonitorFile());

      dispatchCallback(hideLoading());
    };

    initializePage();
  }, [dispatchCallback]);

  useEffect(() => {
    if (
      props.files.jsonFiles.monitors &&
      props.files.jsonFiles.monitors.length > 0
    ) {
      let makes = [];
      props.files.jsonFiles.monitors.forEach((item) => {
        if (!makes.includes(item.make)) {
          makes.push(item.make);
        }
      });
      setUniqueMakes([...makes]);
    }
  }, [props.files.jsonFiles.monitors]);

  const clearState = () => {
    setMonitorSerial("");
    setMonitorMake("");
    setMonitorModel("");
  };

  // Submit Handler
  const onSubmitHandler = async () => {
    try {
      const token = await localStorage.getItem("token");

      let data = {
        token,
        monitorSerial,
        monitorModel,
        monitorMake,
      };

      const req = await axios.post(`${config.apiUrl}/api/v1/monitors`, data);

      if (req.status === 200) {
        dispatch(setSuccess("Item Successfully Inventoried"));
        clearState();
      }
    } catch (err) {
      // console.log(err.response);
      dispatch(setError(err.response.data.error));
    }
  };

  // onChangeHandler
  const handleFieldChange = (fieldName, e) => {
    switch (fieldName) {
      case "monitorSerial":
        validateSerial(e.target.value);
        setMonitorSerial(e.target.value);
        break;
      case "monitorMake":
        setMonitorMake(e.target.value);
        const filteredModels = props.files.jsonFiles.monitors
          .filter((item) => item.make === e.target.value)
          .map((item) => item.model);
        setSelectedModels(filteredModels);
        setMonitorModel("");
        break;
      case "monitorModel":
        setMonitorModel(e.target.value);
        break;
      default:
        break;
    }
  };

  // Regex serial validation
  const validateSerial = (input) => {
    const blacklistedChars = /^[-/.\w:]+$/;

    // Expression Check
    if (blacklistedChars.test(input)) {
      setValidSerial(false);
    } else {
      setValidSerial(true);
    }
  };

  if (props.loading.isLoading) {
    return <LoadingForm />;
  }

  console.log(dispatchCallback);

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
            <MonitorIcon />
          </Avatar>
          <Typography variant="h4" sx={{ mb: "40px" }}>
            Inventory New Monitor
          </Typography>
          <Grid container spacing={3} rowSpacing={3}>
            <Grid item xs={12} sm={12}>
              <TextField
                error={validSerial}
                required
                id="serial"
                name="serial"
                label="Serial"
                value={monitorSerial}
                fullWidth
                helperText={
                  validSerial ? "Incorrect character in serial" : null
                }
                onChange={(e) => handleFieldChange("monitorSerial", e)}
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
                value={monitorMake}
                onChange={(e) => handleFieldChange("monitorMake", e)}
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
                field="monitorModel"
                deviceModel={monitorModel}
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
                  !validSerial && monitorSerial && monitorMake && monitorModel
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
  GetMonitorFile,
  showLoading,
  hideLoading,
})(NewMonitor);
