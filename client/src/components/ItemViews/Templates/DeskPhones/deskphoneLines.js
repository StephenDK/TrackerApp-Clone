import React from "react";

import {
  Avatar,
  Box,
  Grid,
  Typography,
  Paper,
  Stack,
  ListItem,
  List,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import PhoneIcon from "@mui/icons-material/Phone";

function DeskPhoneLines({ lines }) {
  return (
    <Grid item xs={12} sm={12} md={4} sx={{ display: "flex" }}>
      <Paper
        sx={{
          padding: 2,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Stack direction={"row"} spacing={1} sx={{ alignItems: "center" }}>
          <ContactPhoneIcon sx={{ fontSize: 40 }} />
          <Typography variant="h5">Lines:</Typography>
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
          {!lines || lines.length < 1 ? (
            <Typography variant="h5">Add a Line</Typography>
          ) : (
            <Grid container spacing={1}>
              {lines.map((item, index) => (
                <Grid item xs={12} sm={12} md={12} lg={6} key={index}>
                  <List>
                    <Paper
                      sx={{
                        height: "100px", // Set the desired fixed height here
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "10px",
                      }}
                    >
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <PhoneIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={item.lineName}
                          secondary={item.lineNumber}
                        />
                      </ListItem>
                    </Paper>
                  </List>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Paper>
    </Grid>
  );
}

export default DeskPhoneLines;
