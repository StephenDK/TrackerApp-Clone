// Component: Tags Form
// Status: Finished
// Template Styles: WIP
// Date: 7/7/2024
// Author: StephenDK
import React, { Fragment, useState } from "react";
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
  TextField,
  Typography,
  Button,
  Chip,
  Box,
  Paper,
  DialogContent,
} from "@mui/material";

import SendIcon from "@mui/icons-material/Send";
import LabelIcon from "@mui/icons-material/Label";

function TagsForm(props) {
  const dispatch = useDispatch();
  // State
  const [tag, setTag] = useState("");

  const onSubmitHandler = async (event) => {
    try {
      let token = localStorage.getItem("token");

      let data = {
        token,
        tag,
      };

      const request = await axios.put(
        `${config.apiUrl}/api/v1/${props.API}/tag/add/${props.ID}`,
        data
      );
      console.log("REQUEST", request.data.data);
      if (request.status === 200) {
        dispatch(setSuccess("Tag Successfully Added"));
        dispatch(ToggleCancel());
        props.updateUI(request.data.data);
      }
    } catch (err) {
      console.log(err.response.data);
      dispatch(setError(err.response.data.error));
    }
  };

  const onHandleDelete = async (tagText) => {
    try {
      let token = await localStorage.getItem("token");

      let data = {
        token,
        tag: tagText,
      };
      const request = await axios.put(
        `${config.apiUrl}/api/v1/${props.API}/tag/delete/${props.ID}`,
        data
      );
      if (request.status === 200) {
        dispatch(setSuccess("Tag Successfully Deleted"));
        dispatch(ToggleCancel());
        props.updateUI(request.data.data);
      }
    } catch (err) {
      console.log(err);
      dispatch(setError(err.response.data.error));
    }
  };

  const handleFieldChange = (fieldName, e) => {
    switch (fieldName) {
      case "tag":
        setTag(e.target.value);
        break;
      default:
        break;
    }
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
            <LabelIcon />
          </Avatar>
          <Typography variant="h4">Add & Delete Tags</Typography>

          <Grid container spacing={3} rowSpacing={3} sx={{ my: 1 }}>
            <Grid item xs={12} sm={12}>
              <Paper elevation={2}>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    padding: "10px",
                    height: "175px",
                    overflow: "auto",
                    width: "100%",
                  }}
                >
                  {!props.data || props.data.length < 1 ? (
                    <Typography variant="h5">Add a Tag</Typography>
                  ) : (
                    props.data.map((item, index) => (
                      <Chip
                        key={index}
                        sx={{ m: 0.5 }}
                        label={item}
                        onDelete={() => onHandleDelete(item)}
                      />
                    ))
                  )}
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                id="tag"
                name="tag"
                label="Add Tag"
                value={tag}
                fullWidth
                onChange={(e) => handleFieldChange("tag", e)}
              />
            </Grid>
            <Grid item xs={4} sm={4}>
              <Button
                color="primary"
                type="submit"
                size="large"
                variant="contained"
                startIcon={<SendIcon />}
                onClick={onSubmitHandler}
                sx={{ mt: 1, mb: 1 }}
                disabled={!tag}
              >
                Add Tag
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
})(TagsForm);

/*

*/
