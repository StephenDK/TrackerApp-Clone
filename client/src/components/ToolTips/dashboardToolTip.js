import * as React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Backdrop from "@mui/material/Backdrop";

//Icons
import ComputerIcon from "@mui/icons-material/Computer";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import MonitorIcon from "@mui/icons-material/Monitor";
import DockIcon from "@mui/icons-material/Dock";
import PhoneIcon from "@mui/icons-material/Phone";
import RememberMeIcon from "@mui/icons-material/RememberMe";
import CategoryIcon from "@mui/icons-material/Category";

const actions = [
  {
    icon: <CategoryIcon />,
    name: "New Accessory",
    url: "/addaccessory",
  },
  { icon: <RememberMeIcon />, name: "New ITAM Loaner", url: "/borrowed/add" },
  {
    icon: <PhoneIcon />,
    name: "New Desk Phone",
    url: "/desk/phones/inventory",
  },
  {
    icon: <DockIcon />,
    name: "New Docking Station",
    url: "/adddockingstation",
  },
  { icon: <MonitorIcon />, name: "New Monitor", url: "/addmonitor" },
  { icon: <PhoneIphoneIcon />, name: "New Phone", url: "/addphone" },
  { icon: <ComputerIcon />, name: "New Computer", url: "/addcomputer" },
];

export default function SpeedDialTooltipOpen() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Get the history object from React Router
  const history = useHistory();

  const handleActionClick = ({ url }) => {
    // Construct the URL or path based on the action's name
    const path = `${url}`;
    console.log(path);

    // Navigate to the corresponding page
    history.push(path);

    // Close the SpeedDial
    handleClose();
  };

  return (
    <Box sx={{ height: 125, transform: "translateZ(0px)", flexGrow: 1 }}>
      <Backdrop open={true} />
      <SpeedDial
        direction="left"
        ariaLabel="Dashboard Items"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={true}
      >
        {actions.map((action) => (
          <SpeedDialAction
            sx={{ width: "100%", mr: 10, ml: 10 }}
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            style={{ whiteSpace: "nowrap" }}
            tooltipOpen
            onClick={(event) => handleActionClick(action)}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
