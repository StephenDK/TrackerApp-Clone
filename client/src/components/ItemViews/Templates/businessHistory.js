import React from "react";

import { Paper, Box, Grid, Chip, Stack, Typography } from "@mui/material";

import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import LabelIcon from "@mui/icons-material/Label";

function BusinessHistory({ data }) {
  console.log("DATTA: ", data);
  return (
    <div>
      <Paper>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Stack direction="row" sx={{ alignItems: "center" }}>
              <PersonIcon sx={{ fontSize: 40 }} />
              <Typography variant="h5" sx={{ ml: 1 }}>
                User:
              </Typography>
            </Stack>
            <div>
              <div style={{ textAlign: "center" }}>
                <Typography variant="h5" sx={{ p: 1 }}>
                  {data.userName === "" || data.userName === null
                    ? "In Inventory"
                    : data.userName}
                </Typography>
              </div>
              <br />
              <div style={{ textAlign: "center" }}>
                <Typography variant="h5" sx={{ p: 1 }}>
                  {data.election === "" || data.election === null
                    ? null
                    : data.election}
                </Typography>
              </div>
            </div>
          </Grid>

          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Stack direction="row" sx={{ alignItems: "center" }}>
              <BusinessIcon sx={{ fontSize: 40 }} />
              <Typography variant="h5" sx={{ ml: 1 }}>
                ROV:
              </Typography>
            </Stack>
            <Box sx={{ display: "flex", alignItems: "center", p: 1 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6">Division:</Typography>
              </Box>
              <Box sx={{ flexGrow: 1, textAlign: "center" }}>
                <Typography variant="h6">{data.division}</Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", p: 1 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6">Manager:</Typography>
              </Box>
              <Box sx={{ flexGrow: 1, textAlign: "center" }}>
                <Typography variant="h6">{data.manager}</Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", p: 1 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6">Location:</Typography>
              </Box>
              <Box sx={{ flexGrow: 1, textAlign: "center" }}>
                <Typography variant="h6">{data.location}</Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", p: 1 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6">Previous User:</Typography>
              </Box>
              <Box sx={{ flexGrow: 1, textAlign: "center" }}>
                <Typography variant="h6">{data.prevUser}</Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Stack direction="row" sx={{ alignItems: "center" }}>
              <LabelIcon sx={{ fontSize: 40 }} />

              <Typography variant="h5" sx={{ ml: 1 }}>
                Tags:
              </Typography>
            </Stack>
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
              {!data.tags || data.tags.length < 1 ? (
                <Typography variant="h5">No Tags</Typography>
              ) : (
                data.tags.map((item, index) => (
                  <Chip key={index} sx={{ m: 0.5 }} label={item} />
                ))
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default BusinessHistory;
