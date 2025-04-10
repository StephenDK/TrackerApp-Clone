import React from "react";
import moment from "moment";
import { styled, useTheme } from "@mui/material/styles";
import { Paper, Box, Grid, Chip, Stack, Typography } from "@mui/material";

import Archived from "./Archive/archiveTile";

import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

function DeviceHistory({
  deviceHeading,
  api,
  data,
  keys,
  values,
  icon,
  archive,
}) {
  const theme = useTheme();
  console.log("[THEME]: ", theme);
  return (
    <Grid container spacing={2} sx={{ mb: 4 }}>
      {/* First Box */}
      <Grid item xs={12} sm={12} md={4} sx={{ display: "flex" }}>
        <Paper
          sx={{
            padding: 2,
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Icon */}
          <AdminPanelSettingsIcon sx={{ fontSize: 40 }} />

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6">Edited By:</Typography>
            </Box>
            <Box sx={{ flexGrow: 1, textAlign: "center" }}>
              <Typography variant="h6">{data.editedBy}</Typography>
            </Box>
          </Box>
          <br />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6">Last Updated:</Typography>
            </Box>
            <Box sx={{ flexGrow: 1, textAlign: "center" }}>
              <Typography variant="h6">
                {data.lastUpdated === null
                  ? ""
                  : moment(data.lastUpdated).format(
                      "dddd, MMMM Do YYYY, h:mm:ss a"
                    )}
              </Typography>
            </Box>
          </Box>
          <br />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6">Date Inventoried:</Typography>
            </Box>
            <Box sx={{ flexGrow: 1, textAlign: "center" }}>
              <Typography variant="h6">
                {data.createdAt === null
                  ? ""
                  : moment(data.createdAt).format(
                      "dddd, MMMM Do YYYY, h:mm:ss a"
                    )}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>
      {/* Second Box */}
      <Grid item xs={12} sm={12} md={4} sx={{ display: "flex" }}>
        <Paper
          sx={{
            padding: 2,
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Stack direction="row" sx={{ alignItems: "center" }}>
            {icon.Icon.component}
            <Typography variant="h5" sx={{ ml: 1 }}>
              {deviceHeading}:
            </Typography>
            {api === "deskphones" ? (
              <Typography
                variant="h6"
                sx={{
                  marginLeft: "auto",
                  color: theme.palette.primary.dark,
                }}
              >
                ROV DP: {data.phoneName}
              </Typography>
            ) : null}
            {api === "accessory" ? (
              <Typography
                variant="h6"
                sx={{
                  marginLeft: "auto",
                  color: theme.palette.primary.dark,
                }}
              >
                {data.barcode}
              </Typography>
            ) : null}
          </Stack>

          <Box sx={{ display: "flex", alignItems: "center", p: 1 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6">{keys.serial}</Typography>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                textAlign: "center",
                wordBreak: "break-word",
              }}
            >
              <Typography variant="h6">{data[values.serial]}</Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", p: 1 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6">{keys.name}</Typography>
            </Box>
            <Box
              sx={{ flexGrow: 1, textAlign: "center", wordBreak: "break-word" }}
            >
              <Typography variant="h6">{data[values.name]}</Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", p: 1 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6">{keys.make}</Typography>
            </Box>
            <Box sx={{ flexGrow: 1, textAlign: "center" }}>
              <Typography variant="h6">{data[values.make]}</Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", p: 1 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6">{keys.model}</Typography>
            </Box>
            <Box sx={{ flexGrow: 1, textAlign: "center" }}>
              <Typography variant="h6">{data[values.model]}</Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>

      {/* Third Box */}
      <Grid item xs={12} sm={12} md={4} sx={{ display: "flex" }}>
        {data.archive ? (
          <Archived archived={data.archive} archiveDate={data.archiveDate} />
        ) : (
          <Paper
            sx={{
              padding: 2,
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div>
              <Chip
                color={data.checkedOut ? "error" : "primary"}
                variant={data.checkedOut ? "filled" : "outlined"}
                icon={data.checkedOut ? <CheckIcon /> : <CloseIcon />}
                label={data.checkedOut ? "Checked Out" : "Checked In"}
                style={{ width: "100%" }}
              />
            </div>
            <br />
            <Box sx={{ display: "flex", alignItems: "center", p: 1 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6">Checked In:</Typography>
              </Box>
              <Box sx={{ flexGrow: 1, textAlign: "center" }}>
                <Typography variant="h6">
                  {data.checkedInDate === null
                    ? ""
                    : moment(data.checkedInDate).format(
                        "dddd, MMMM Do YYYY, h:mm:ss a"
                      )}
                </Typography>
              </Box>
            </Box>
            <br />
            <Box sx={{ display: "flex", alignItems: "center", p: 1 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6">Checked Out :</Typography>
              </Box>
              <Box sx={{ flexGrow: 1, textAlign: "center" }}>
                <Typography variant="h6">
                  {data.checkedOutDate === null
                    ? ""
                    : moment(data.checkedOutDate).format(
                        "dddd, MMMM Do YYYY, h:mm:ss a"
                      )}
                </Typography>
              </Box>
            </Box>
          </Paper>
        )}
      </Grid>
    </Grid>
  );
}

export default DeviceHistory;
