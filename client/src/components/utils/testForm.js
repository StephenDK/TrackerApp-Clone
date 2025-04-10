// Component: Finished
// Template Styles: WIP
import React, { Fragment, useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { styled, useTheme } from "@mui/material/styles";
import { GetComputerTypes, GetComputerFile } from "../../actions/filesActions";
import { showLoading, hideLoading } from "../../actions/loadingActions";
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
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Divider,
} from "@mui/material";

import LoadingForm from "../loading/loadingComputerForm";
import SendIcon from "@mui/icons-material/Send";
import Computer from "@mui/icons-material/Computer";

function TestForm(props) {
  const dispatch = useDispatch();
  // State
  const [computerSerial, setComputerSerial] = useState("");
  const [computerMake, setComputerMake] = useState("");
  const [computerModel, setComputerModel] = useState("");
  const [type, setType] = useState("");
  const [uniqueMakes, setUniqueMakes] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);

  const [computerSerialValid, setComputerSerialValid] = useState(false);

  //   if (props.loading.isLoading) {
  //     return <LoadingForm />;
  //   }

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
            <Computer />
          </Avatar>
          <Typography variant="h4">Check Out Computer</Typography>

          <Grid container spacing={3} rowSpacing={3} sx={{ my: 1 }}>
            <Grid item xs={12} sm={12}>
              <TextField
                // error={computerSerialValid}
                required
                id="serial"
                name="serial"
                label="First.Last Name"
                // value={computerSerial}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                // error={computerSerialValid}
                required
                id="serial"
                name="serial"
                label="Election"
                // value={computerSerial}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                // error={computerSerialValid}
                required
                id="serial"
                name="serial"
                label="Location"
                // value={computerSerial}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                // error={computerSerialValid}
                required
                id="serial"
                name="serial"
                label="Division"
                // value={computerSerial}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                // error={computerSerialValid}
                required
                id="serial"
                name="serial"
                label="Manager"
                // value={computerSerial}
                fullWidth
              />
            </Grid>

            <Grid item xs={3} sm={2}>
              <Button
                color="primary"
                type="submit"
                // fullWidth
                size="large"
                variant="outlined"
                startIcon={<SendIcon />}
                // onClick={onSubmitHandler}
                sx={{ mt: 1, mb: 1 }}
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

function mapStateToProps({ files, loading }) {
  return { files, loading };
}

export default connect(mapStateToProps, {
  GetComputerTypes,
  GetComputerFile,
  showLoading,
  hideLoading,
})(TestForm);

/*
<DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="email"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch(ToggleCancel())}>Cancel</Button>
        <Button type="submit">Subscribe</Button>
      </DialogActions>

*/
