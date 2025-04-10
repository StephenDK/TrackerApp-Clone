// Component: Telework Form
// Status: Finished
// Template Styles: WIP
// Date: 7/6/2024
// Author: StephenDK
import React, { Fragment, useState, useEffect } from "react";
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
  FormControlLabel,
  Switch,
  Typography,
  Button,
  DialogContent,
} from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import SendIcon from "@mui/icons-material/Send";
import HomeIcon from "@mui/icons-material/Home";

function TeleworkForm(props) {
  const dispatch = useDispatch();
  // State
  const [teleWork, setTeleWork] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    setTeleWork(props.teleWorkState);
  }, [props.teleWorkState]);

  const onSubmitHandler = async (event) => {
    try {
      // get token
      let token = await localStorage.getItem("token");

      let data = {
        token,
        teleWork,
        startDate,
        endDate,
      };

      if (!teleWork) {
        data.startDate = null;
        data.endDate = null;
      }

      console.log("DATA", data);
      const request = await axios.put(
        `${config.apiUrl}/api/v1/${props.API}/update/telework/${props.ID}`,
        data
      );
      if (request.status === 200) {
        dispatch(setSuccess("Telework Successfully Updated"));
        dispatch(ToggleCancel());
        props.updateUI(request.data.data);
        console.log("REQUEST", request.data.data);
      }
    } catch (err) {
      console.log(err.response.data);
      dispatch(setError(err.response.data.error));
    }
  };

  const onStartDateHandler = (value) => {
    let date = value._d.toISOString();
    setStartDate(date);
  };

  const onEndDateHandler = (value) => {
    let date = value._d.toISOString();
    setEndDate(date);
  };

  const onSwitchHandler = (e) => {
    console.log(e.target.checked);
    setTeleWork(e.target.checked);
  };
  return (
    <Fragment>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DialogContent>
          <Container
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <HomeIcon />
            </Avatar>
            <Typography variant="h4">Telework</Typography>

            <Grid container spacing={3} rowSpacing={3} sx={{ my: 1 }}>
              <Grid item xs={12} sm={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={teleWork}
                      color="primary"
                      size="medium"
                      onChange={onSwitchHandler}
                    />
                  }
                  label="Telework"
                  labelPlacement="bottom"
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <DatePicker
                  disabled={props.teleWorkState}
                  label="Start Date"
                  sx={{ width: "100%" }}
                  onChange={onStartDateHandler}
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <DatePicker
                  disabled={props.teleWorkState}
                  label="End Date"
                  sx={{ width: "100%" }}
                  onChange={onEndDateHandler}
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
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Container>
        </DialogContent>
      </LocalizationProvider>
    </Fragment>
  );
}

export default connect(null, {
  setSuccess,
  setError,
})(TeleworkForm);

/*

*/
