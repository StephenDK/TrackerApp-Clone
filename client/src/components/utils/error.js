import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Alert, Typography, Snackbar, Slide } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

// import ClosingBar from "./closingBar";
import { clearError } from "../../actions/errorActions";

export default function ErrorMessage(props) {
  const dispatch = useDispatch();
  const { errorMsg, errorFlag } = useSelector((state) => state.error);

  function SlideTransition(props) {
    return (
      <Slide
        // onExit={() => console.log("EXITED")}
        // timeout={5}
        // addEndListener={() => console.log()}

        {...props}
        direction="up"
      />
    );
  }
  //   function SlideTransitionEnd(props) {
  //     return <Slide {...props} direction="down" />;
  //   }

  const action = (
    <Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        //   onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );

  const handleClose = () => {
    dispatch(clearError());
  };
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      open={errorFlag}
      action={action}
      autoHideDuration={5000}
      onClose={handleClose}
      TransitionComponent={SlideTransition}
      //   TransitionProps={{
      //     exit: true,
      //   }}
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
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          <Typography variant="subtitle2">{errorMsg}</Typography>
        </Alert>
        {/* <ClosingBar
            handleFlag={() => props.onHandleFlag("errorFlag", false)}
          /> */}
      </div>
    </Snackbar>
  );
}
