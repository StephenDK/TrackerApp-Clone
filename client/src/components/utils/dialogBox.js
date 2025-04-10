import React from "react";
import { connect, useDispatch } from "react-redux";
import { ToggleCancel } from "../../actions/navActions";
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import CancelIcon from "@mui/icons-material/Cancel";

function DialogBox(props) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      open={props.toggleDialog}
      onClose={() => dispatch(ToggleCancel())}
      fullScreen={fullScreen}
    >
      {props.children}

      <DialogActions>
        <Button
          variant="contained"
          onClick={() => dispatch(ToggleCancel())}
          startIcon={<CancelIcon />}
          color="error"
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function mapStateToProps({ nav }) {
  return { nav };
}

export default connect(mapStateToProps, {
  ToggleCancel,
})(DialogBox);
