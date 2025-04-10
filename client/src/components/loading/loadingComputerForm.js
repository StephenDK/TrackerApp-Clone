import React from "react";
import { Box, Typography } from "@mui/material";

const Loading = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      {/* <CircularProgress size={80} thickness={4} /> */}
      <Typography
        variant="h6"
        color="textSecondary"
        style={{ marginTop: "16px" }}
      >
        Loading...
      </Typography>
    </Box>
  );
};

export default Loading;
