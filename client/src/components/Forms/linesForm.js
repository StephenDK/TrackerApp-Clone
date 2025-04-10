import React, { useState } from "react";
import axios from "axios";
import config from "../../config";
import { connect, useDispatch } from "react-redux";
import { setSuccess } from "../../actions/successActions";
import { setError } from "../../actions/errorActions";
import {
  Box,
  Grid,
  Typography,
  Paper,
  DialogContent,
  Container,
  Avatar,
  TextField,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import DeleteIcon from "@mui/icons-material/Delete";
import PhoneIcon from "@mui/icons-material/Phone";

function DeskPhoneLines({ updateUI, ID, lines }) {
  const dispatch = useDispatch();

  // State
  const [lineName, setLineName] = useState("");
  const [lineNumber, setLineNumber] = useState("");

  // Add Line Handler
  const onAddLineHandler = async () => {
    console.log("Click");
    try {
      let token = await localStorage.getItem("token");

      let data = {
        token,
        name: lineName,
        number: lineNumber,
      };
      let request = await axios.post(
        `${config.apiUrl}/api/v1/deskphones/line/${ID}`,
        data
      );
      console.log(request);
      if (request.status === 200) {
        dispatch(setSuccess("Line Successfully Added"));
        // console.log(request.data.data);
        updateUI(request.data.data);
        setLineName("");
        setLineNumber("");
      }
    } catch (err) {
      console.log(err.response.data);
      console.log("DISPATCH(): ", err.response.data.error);
      dispatch(setError(err.response.data.error));
    }
  };

  // Remove Line Handler
  const onRemoveLineHandler = async (line) => {
    console.log("Click");
    try {
      let token = await localStorage.getItem("token");
      let request = await axios.put(
        `${config.apiUrl}/api/v1/deskphones/line/${ID}`,
        { token, lineNumber: line }
      );
      console.log(request);
      if (request.status === 200) {
        dispatch(setSuccess("Line Successfully Deleted"));
        // console.log(request.data.data);
        updateUI(request.data.data);
      }
    } catch (err) {
      console.log(err.response.data);
      // console.log("DISPATCH(): ", err.response.data.error);
      dispatch(setError(err.response.data.error));
    }
  };

  const handleFieldChange = (fieldName, e) => {
    let i = e.target.value;
    switch (fieldName) {
      case "lineName":
        setLineName(i);
        break;
      case "lineNumber":
        setLineNumber(i);
        break;
      default:
        break;
    }
  };

  return (
    <DialogContent>
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LocalPhoneIcon />
        </Avatar>
        <Typography variant="h4">Add and Delete Lines</Typography>

        <Grid item xs={12} sm={12} md={12}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              padding: "10px",
              height: "175px",
              overflow: "auto",
              width: "400px",
            }}
          >
            {!lines || lines.length < 1 ? (
              <Typography variant="h5">Add a Line</Typography>
            ) : (
              <Grid container spacing={2}>
                {lines.map((item, index) => (
                  <Grid item xs={12} sm={12} md={12} lg={12} key={index}>
                    <Paper>
                      <List>
                        <ListItem
                          secondaryAction={
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              onClick={() =>
                                onRemoveLineHandler(item.lineNumber)
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                          }
                        >
                          <ListItemAvatar>
                            <Avatar>
                              <PhoneIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={item.lineName}
                            secondary={item.lineNumber}
                          />
                        </ListItem>
                      </List>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </Grid>

        <Grid container spacing={2} rowSpacing={2} sx={{ my: 1 }}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextField
              // error={computerNameValid}
              id="lineName"
              name="lineName"
              label="Line Name"
              required
              value={lineName}
              fullWidth
              onChange={(e) => handleFieldChange("lineName", e)}
              // helperText={
              //   computerNameValid
              //     ? "Incorrect character in computer name"
              //     : null
              // }
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextField
              // error={computerNameValid}
              id="lineNumber"
              name="lineNumber"
              label="Line Number"
              required
              value={lineNumber}
              fullWidth
              onChange={(e) => handleFieldChange("lineNumber", e)}
              // helperText={
              //   computerNameValid
              //     ? "Incorrect character in computer name"
              //     : null
              // }
            />
          </Grid>

          <Grid item xs={3} sm={2}>
            <Button
              color="primary"
              type="submit"
              size="large"
              variant="contained"
              //   startIcon={<SendIcon />}
              onClick={onAddLineHandler}
              sx={{ mt: 1, mb: 1 }}
              //   disabled={
              //     userNameValid || computerNameValid || phoneNumberValid
              //   }
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Container>
    </DialogContent>
  );
}

export default connect(null, {
  setSuccess,
  setError,
})(DeskPhoneLines);

//  {
//    /* <Badge
//                         badgeContent={
//                           <IconButton aria-label="delete">
//                             <DeleteIcon />
//                           </IconButton>
//                         }
//                         sx={{
//                           height: "100px", // Set the desired fixed height here
//                           display: "flex",
//                           flexDirection: "column",
//                           justifyContent: "center",
//                           alignItems: "center",
//                           padding: "10px",
//                         }}
//                       >
//                         <Typography variant="h6" gutterBottom>
//                           {item.lineName}
//                         </Typography>
//                         <Typography variant="subtitle1" gutterBottom>
//                           {item.lineNumber}
//                         </Typography>
//                       </Badge> */
//  }
