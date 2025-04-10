import React from "react";
import { connect } from "react-redux";
import { Box } from "@mui/material";

function ViewPort(props) {
  return (
    <Box
      className="View_Port"
      sx={{
        mt: 10,
        ml: props.nav.open_drawer ? 31 : 10,
        mr: "15px",
        transition: "margin-left 0.3s ease",
        height: "90%",
      }}
    >
      {props.children}
    </Box>
  );
}

function mapStateToProps({ nav }) {
  return { nav };
}

export default connect(mapStateToProps, null)(ViewPort);
