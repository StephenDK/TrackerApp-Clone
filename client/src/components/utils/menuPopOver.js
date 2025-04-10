import React from "react";
// import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Box } from "@mui/material";

export default function PositionedMenu(props) {
  const navigate = useNavigate();

  return (
    <Menu
      open={props.openPopOver}
      onClose={props.handlePopOver}
      // Needs to be fixed
      anchorEl={props.anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      <Box sx={{ width: "200px" }}>
        <MenuItem
          onClick={() => {
            props.handlePopOver();
            navigate("/add/computer");
          }}
        >
          Computer
        </MenuItem>
        <MenuItem
          onClick={() => {
            props.handlePopOver();
            navigate("/add/phone");
          }}
        >
          Phone
        </MenuItem>
        <MenuItem
          onClick={() => {
            props.handlePopOver();
            navigate("/add/monitor");
          }}
        >
          Monitor
        </MenuItem>
        <MenuItem
          onClick={() => {
            props.handlePopOver();
            navigate("/add/dockingstation");
          }}
        >
          Docking Station
        </MenuItem>
        <MenuItem
          onClick={() => {
            props.handlePopOver();
            navigate("/add/deskphone");
          }}
        >
          Desk Phone
        </MenuItem>
        <MenuItem
          onClick={() => {
            props.handlePopOver();
            navigate("/add/accessory");
          }}
        >
          Accessory
        </MenuItem>
        <MenuItem
          onClick={() => {
            props.handlePopOver();
            navigate("/add/itam");
          }}
        >
          ITAM Loaner
        </MenuItem>
      </Box>
    </Menu>
  );
}
