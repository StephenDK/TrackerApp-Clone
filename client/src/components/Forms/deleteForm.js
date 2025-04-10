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
import { useNavigate } from "react-router-dom";
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
import Computer from "@mui/icons-material/Computer";

function DeleteForm(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    try {
      const request = await axios.delete(
        `${config.apiUrl}/api/v1/${props.API}/${props.ID}`
      );

      if (request.status === 200) {
        dispatch(setSuccess("Computer Successfully Deleted"));
        dispatch(ToggleCancel());
        navigate("/dashboard");
        console.log("REQUEST", request.data.data);
      }
    } catch (err) {
      // console.log(err.response.data);
      dispatch(setError(err.response.data.error));
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
            <Computer />
          </Avatar>
          <Typography variant="h4">Delete Inventory Item</Typography>

          <Grid container spacing={3} rowSpacing={3} sx={{ my: 1 }}>
            <Grid item xs={12} sm={12}>
              <Typography variant="h5">
                Are you sure you want to delete this inventory item?
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
})(DeleteForm);

/*
import React from "react";
import axios from "axios";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
import config from "../../config";

const DeleteComputer = (props) => {
  // const [open, setOpen] = React.useState(false)

  const handleDelete = async () => {
    const data = await axios.delete(
      `${config.apiUrl}/api/v1/${props.val}/${props.id}`
    );
    console.log(data);
    props.handleDeleteModal();
    props.history.push("/");
  };

  return (
    <Modal
      basic
      onClose={() => props.handleDeleteModal()}
      open={true}
      size="small"
    >
      <Header icon>
        <Icon name="trash alternate" />
        Delete Inventory Item:
      </Header>
      <Modal.Content>
        <p>Are you sure you want to delete this inventory item?</p>
      </Modal.Content>
      <Modal.Actions>
        <Button
          basic
          color="red"
          inverted
          onClick={() => props.handleDeleteModal()}
        >
          <Icon name="remove" /> No
        </Button>
        <Button color="green" inverted onClick={() => handleDelete()}>
          <Icon name="checkmark" /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default DeleteComputer;


*/
