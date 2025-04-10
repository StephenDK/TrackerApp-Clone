// Component: Delete Device Component
// Status: WIP
// Template Styles: WIP
// Date: 7/7/2024
// Author: StephenDK
import React, { Fragment } from "react";
import { connect, useDispatch } from "react-redux";
// import { styled, useTheme } from "@mui/material/styles";
import axios from "axios";
import config from "../../config.js";
// import { useNavigate } from "react-router-dom";
import { setSuccess } from "../../actions/successActions.js";
import { setError } from "../../actions/errorActions.js";
import { ToggleCancel } from "../../actions/navActions.js";
import {
  Container,
  Avatar,
  Grid,
  Typography,
  Button,
  DialogContent,
} from "@mui/material";

import SendIcon from "@mui/icons-material/Send";

function ArchiveItem(props) {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    try {
      // get token
      let token = await localStorage.getItem("token");

      let data = {
        token,
        archive: props.archiveState,
      };

      const request = await axios.put(
        `${config.apiUrl}/api/v1/${props.API}/archive/${props.ID}`,
        data
      );

      if (request.status === 200) {
        dispatch(setSuccess(`${props.device} Successfully Archived`));
        props.updateUI(request.data.data);
        dispatch(ToggleCancel());
        console.log("REQUEST", request.data.data);
      }
    } catch (err) {
      // console.log(err.response.data);
      dispatch(setError(err.response.data.error));
    }
  };

  const device = props.device;
  const textTitle = props.archiveState ? "Un-Archive" : "Archive";
  const textHeading = props.archiveState
    ? `Are you sure you want to un-archive this ${device.toLowerCase()}?`
    : `Are you sure you want to archive this ${device.toLowerCase()}?`;
  const textSubHeading = props.archiveState
    ? `Un-archiving will restore this ${device.toLowerCase()} to active status and make it available for use again.`
    : `Archived ${
        device.toLowerCase() + "s"
      } are those that have been returned to ITAM,
                TSS, are broken, replaced by Asset refresh, or lost or stolen.`;

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
          <Typography variant="h4">
            {textTitle} {props.device}
          </Typography>

          <Grid container spacing={3} rowSpacing={3} sx={{ my: 1 }}>
            <Grid item xs={12} sm={12}>
              <Typography style={{ textAlign: "center" }} variant="h6">
                {textHeading}
              </Typography>
              <br />
              <Typography variant="subtitle1" style={{ textAlign: "center" }}>
                {textSubHeading}
              </Typography>
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
                // disabled={userNameValid || computerNameValid}
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
})(ArchiveItem);
