import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Alert, Typography, Snackbar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

// import ClosingBar from "./closingBar";
import { clearSuccess } from "../../actions/successActions";

export default function ErrorMessage(props) {
  const dispatch = useDispatch();
  const { successMsg, successFlag } = useSelector((state) => state.success);

  const action = (
    <Fragment>
      <IconButton size="small" aria-label="close" color="inherit">
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );

  const handleClose = () => {
    dispatch(clearSuccess());
  };
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      open={successFlag}
      action={action}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <div>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleClose}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          <Typography variant="subtitle2">{successMsg}</Typography>
        </Alert>
        {/* <ClosingBar
            handleFlag={() => props.onHandleFlag("errorFlag", false)}
          /> */}
      </div>
    </Snackbar>
  );
}
