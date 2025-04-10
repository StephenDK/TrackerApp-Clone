// Component: Finished
// Template Styles: WIP
// Date: 7/6/2024
// Author: StephenDK
import React, { Fragment } from "react";
import { connect, useDispatch } from "react-redux";
// import { styled, useTheme } from "@mui/material/styles";
import axios from "axios";
import config from "../../config.js";
import { setSuccess } from "../../actions/successActions.js";
import { setError } from "../../actions/errorActions.js";
import { ToggleCancel, ToggleCheckOut } from "../../actions/navActions.js";
import {
  Container,
  Avatar,
  Grid,
  Typography,
  Button,
  DialogContent,
} from "@mui/material";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import SendIcon from "@mui/icons-material/Send";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";

function CheckInForm(props) {
  const dispatch = useDispatch();
  // State

  const [option, setOption] = React.useState(null);

  const onSubmitHandler = async (event) => {
    try {
      // get token
      let token = await localStorage.getItem("token");

      let data = {
        token,
        setLocation: option,
      };

      const request = await axios.put(
        `${config.apiUrl}/api/v1/${props.API}/checkin/${props.ID}`,
        data
      );

      if (request.status === 200) {
        dispatch(setSuccess("Item Successfully Checked In"));
        dispatch(ToggleCancel());
        props.updateUI(request.data.data);

        // console.log("REQUEST", request.data.data);
      }

      // console.log("DATA", data);
    } catch (err) {
      // console.log(err.response.data);
      dispatch(setError(err.response.data.error));
    }
  };

  const optionHandler = (event, newAlignment) => {
    // console.log("NEW ALIGNMENT: ", newAlignment);
    setOption(newAlignment);
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

          <Grid container spacing={3} rowSpacing={1} sx={{ my: 1 }}>
            <Grid item xs={12}>
              <ToggleButtonGroup
                value={option}
                exclusive
                onChange={optionHandler}
                aria-label="text alignment"
                style={{ width: "100%" }}
              >
                <ToggleButton
                  value="Berger Inventory"
                  aria-label="left aligned"
                  style={{ width: "100%" }}
                >
                  <Fragment>
                    <KeyboardReturnIcon />
                    <Typography color={"primary"} sx={{ m: 1 }}>
                      Return to ASD Berger Inventory
                    </Typography>
                  </Fragment>
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            <Grid item xs={12}>
              <ToggleButtonGroup
                value={option}
                exclusive
                onChange={optionHandler}
                aria-label="text alignment"
                style={{ width: "100%" }}
              >
                <ToggleButton
                  value="Ridder Inventory"
                  aria-label="left aligned"
                  style={{ width: "100%" }}
                >
                  <Fragment>
                    <KeyboardReturnIcon />
                    <Typography color={"primary"} sx={{ m: 1 }}>
                      Return to ASD Ridder Inventory
                    </Typography>
                  </Fragment>
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>

            <Grid item xs={12}>
              <Button
                color="primary"
                type="submit"
                size="large"
                variant="contained"
                startIcon={<SendIcon />}
                onClick={onSubmitHandler}
                sx={{ mt: 1, mb: 1 }}
                disabled={!option}
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
  ToggleCancel,
  ToggleCheckOut,
})(CheckInForm);

/*


*/
