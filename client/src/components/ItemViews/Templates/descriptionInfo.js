import React from "react";
import moment from "moment";

import { Paper, Box, Grid, Chip, Stack, Typography } from "@mui/material";

import DeskPhoneLines from "./DeskPhones/deskphoneLines";

import CloseIcon from "@mui/icons-material/Close";

import CommentIcon from "@mui/icons-material/Comment";
import HomeIcon from "@mui/icons-material/Home";

function DescriptionInfo({ API, data, lines }) {
  return (
    <div>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {/* First Box */}
        <Grid item xs={12} sm={12} md={8} sx={{ display: "flex" }}>
          <Paper
            sx={{
              padding: 2,
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div>
              {/* Icon */}
              <Stack direction="row" sx={{ alignItems: "center" }}>
                <CommentIcon sx={{ fontSize: 40 }} />

                <Typography variant="h5" sx={{ ml: 1 }}>
                  Comments:
                </Typography>
              </Stack>
            </div>
            <div style={{ height: "145px", overflow: "auto" }}>
              {data.description === null || data.description === ""
                ? "No Comment"
                : data.description}
            </div>
          </Paper>
        </Grid>

        {/* Second Box */}
        {API === "deskphones" ? (
          <DeskPhoneLines lines={data.lines} />
        ) : (
          <Grid item xs={12} sm={12} md={4} sx={{ display: "flex" }}>
            <Paper
              sx={{
                padding: 2,
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Chip
                color={data.teleWork ? "error" : "primary"}
                variant={data.teleWork ? "filled" : "outlined"}
                icon={data.teleWork ? <HomeIcon /> : <CloseIcon />}
                label={
                  data.teleWork ? "Teleworking" : "Not Assigned for Teleworking"
                }
                style={{ width: "100%" }}
              />
              <br />
              <Box sx={{ display: "flex", alignItems: "center", p: 1 }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">Telework Start Date:</Typography>
                </Box>
                <Box sx={{ flexGrow: 1, textAlign: "center" }}>
                  <Typography variant="h6">
                    {data.teleWorkStartDate === null
                      ? ""
                      : moment(data.teleWorkStartDate).format(
                          "dddd, MMMM Do YYYY, h:mm:ss a"
                        )}
                  </Typography>
                </Box>
              </Box>
              <br />
              <Box sx={{ display: "flex", alignItems: "center", p: 1 }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">Telework End Date:</Typography>
                </Box>
                <Box sx={{ flexGrow: 1, textAlign: "center" }}>
                  <Typography variant="h6">
                    {data.teleWorkEndDate === null
                      ? ""
                      : moment(data.teleWorkEndDate).format(
                          "dddd, MMMM Do YYYY, h:mm:ss a"
                        )}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        )}
      </Grid>
    </div>
  );
}

export default DescriptionInfo;
