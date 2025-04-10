import React, { useState, useRef } from "react";
// import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { redirect } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { Open_Nav, Close_Nav, ToggleCart } from "../../actions/navActions";
import { ClearUser } from "../../actions/userActions";
import { ClearFiles } from "../../actions/filesActions";
import { ToggleTheme } from "../../actions/navActions";

import { styled, useTheme } from "@mui/material/styles";

import {
  Box,
  Toolbar,
  List,
  CssBaseline,
  Divider,
  IconButton,
  Button,
} from "@mui/material";

import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";

import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

// Icons
import AddIcon from "@mui/icons-material/Add";
import ComputerIcon from "@mui/icons-material/Computer";
import MonitorIcon from "@mui/icons-material/Monitor";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import DockIcon from "@mui/icons-material/Dock";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CableIcon from "@mui/icons-material/Cable";
// import SearchIcon from "@mui/icons-material/Search";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import ArchiveIcon from "@mui/icons-material/Archive";
import InventoryIcon from "@mui/icons-material/Inventory";

// import LightDarkSwitch from "../utils/lightDarkSwitch";
import MenuPopOver from "../utils/menuPopOver";
import SearchAutocomplete from "./search";

// Cart
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const drawerWidth = 220;

const componentMapping = {
  Computers: {
    component: <ComputerIcon />,
    url: "/computers",
  },
  Phones: {
    component: <PhoneIphoneIcon />,
    url: "/phones",
  },
  "Desk Phones": {
    component: <LocalPhoneIcon />,
    url: "/deskphones",
  },
  Monitors: {
    component: <MonitorIcon />,
    url: "/monitors",
  },
  "Docking Stations": {
    component: <DockIcon />,
    url: "/docks",
  },
  Accessories: {
    component: <CableIcon />,
    url: "/accessories",
  },
  "ITAM Loaner Devices": {
    component: <AccountBalanceIcon />,
    url: "/itam",
  },
  Archive: { component: <ArchiveIcon />, url: "/archive" },
};

const menuItems = [
  "Computers",
  "Phones",
  "Desk Phones",
  "Monitors",
  "Docking Stations",
  "Accessories",
  "ITAM Loaner Devices",
  "Archive",
];

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function MiniDrawer(props) {
  const dispatch = useDispatch();
  // const history = useHistory();
  const navigate = useNavigate();
  const theme = useTheme();
  const buttonRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [openPopOver, setPopOver] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
    dispatch(Open_Nav());
  };

  const handleDrawerClose = () => {
    setOpen(false);
    dispatch(Close_Nav());
  };

  const handlePopOver = () => {
    setPopOver(!openPopOver);
  };

  const onHandleLogout = () => {
    localStorage.removeItem("token");
    dispatch(ClearUser());
    dispatch(Close_Nav());
    dispatch(ClearFiles());
    navigate("/");
  };

  // Theme select function
  // const onSelectTheme = () => {
  //   dispatch(ToggleTheme());
  // };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          {/* <Typography variant="h6" noWrap component="div">
            {props.user.email}
          </Typography>
          <div style={{ flexGrow: 1 }}></div>
          <LightDarkSwitch toggleTheme={onSelectTheme} /> */}
          <div style={{ flexGrow: 2 }}></div>
          <SearchAutocomplete />
          {/* <Divider orientation="vertical" />
          <IconButton
            onClick={() => {
              navigate("/cart");
            }}
            size="large"
          >
            <ShoppingCartIcon fontSize="inherit" />
          </IconButton> */}
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            ref={buttonRef}
            variant="contained"
            sx={{
              width: "115px",
              height: "50px",
              m: 2,
              mb: 1,
              minWidth: "55px",
            }}
            onClick={handlePopOver}
          >
            <AddIcon /> {open ? "New Item" : null}
          </Button>
        </Box>
        <MenuPopOver
          openPopOver={openPopOver}
          handlePopOver={handlePopOver}
          anchorEl={buttonRef.current}
        />
        <List>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => navigate("/dashboard")}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <InventoryIcon />
              </ListItemIcon>
              <ListItemText
                primary={"Inventory"}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>

          <Divider sx={{ mb: 2 }} />
          {menuItems.map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={() => {
                  navigate(componentMapping[text].url);
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {componentMapping[text].component}
                </ListItemIcon>

                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
          <Divider sx={{ mb: 2, mt: 2 }} />
          {/* <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={() => {
                navigate("/admin");
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <SupervisorAccountIcon />
              </ListItemIcon>
              <ListItemText primary={"Admin"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <Divider sx={{ mb: 2, mt: 2 }} /> */}
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={onHandleLogout}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={"Logout"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}

function mapStateToProps({ nav, user }) {
  return { nav, user };
}

export default connect(mapStateToProps, {
  Close_Nav,
  Open_Nav,
  ClearUser,
  ToggleTheme,
  ToggleCart,
})(MiniDrawer);

// import React, { Component } from "react";
// import { Menu } from "semantic-ui-react";
// import { withRouter } from "react-router-dom";

// class Navbar extends Component {
//   // componentDidMount() {
//   //   let token = localStorage.getItem("token");
//   //   console.log(token);
//   //   if (!token) {
//   //     alert("Your session has expired");
//   //     this.props.history.push("/");
//   //   }
//   // }
//   handleLogout = () => {
//     // remove token
//     localStorage.removeItem("token");
//     // push user home
//     this.props.history.push("/");
//   };

//   render() {
//     return (
//       <div style={{ position: "fixed", top: 0, width: "100%", zIndex: 4 }}>
//         <Menu pointing>
//           <Menu.Item
//             name="ASD Inventory"
//             position="left"
//             link={true}
//             href="/dashboard"
//           />
//           <Menu.Item name="Search" icon="search" link={true} href="/search" />
//           <Menu.Item link={true} name="Add to Inventory" href="/inventory" />
//           <Menu.Item name="Computers" link={true} href="/computers" />
//           <Menu.Item name="Phones" link={true} href="/phones" />
//           <Menu.Item name="Desk Phones" link={true} href="/desk/phones" />
//           <Menu.Item name="Monitors" link={true} href="/monitors" />
//           <Menu.Item
//             name="DockingStations"
//             link={true}
//             href="/dockingstations"
//           />
//           <Menu.Item
//             name="ITAM Loaner Devices"
//             link={true}
//             href="/borrowed"
//           />
//           <Menu.Item name="Accessories" link={true} href="/accessories" />
//           <Menu.Item name="Admin Tools" link={true} href="/admin" />
//           <Menu.Item name="Logout" onClick={this.handleLogout} />
//         </Menu>
//       </div>
//     );
//   }
// }

// export default withRouter(Navbar);
