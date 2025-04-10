import React from "react";

import { Box, Typography, Paper } from "@mui/material";
import moment from "moment";
import ArchiveIcon from "@mui/icons-material/Archive";
import CheckIcon from "@mui/icons-material/Check";

function DeskPhoneLines({ archive, archiveDate }) {
  return (
    <Paper
      sx={{
        padding: 2,
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div>
        <ArchiveIcon sx={{ fontSize: 40, mb: 3 }} />
      </div>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6">Archived:</Typography>
        </Box>
        <Box sx={{ flexGrow: 1, textAlign: "center" }}>
          <CheckIcon sx={{ fontSize: 30 }} />
        </Box>
      </Box>
      <br />
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6">Date Archived:</Typography>
        </Box>
        <Box sx={{ flexGrow: 1, textAlign: "center" }}>
          <Typography variant="h6">{archiveDate === null ? "" : moment(archiveDate).format("dddd, MMMM Do YYYY, h:mm:ss a")}</Typography>
        </Box>
      </Box>
    </Paper>
  );
}

export default DeskPhoneLines;
