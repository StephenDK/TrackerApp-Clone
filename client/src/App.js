import React from "react";
import { connect } from "react-redux";

import { Routes, Route } from "react-router-dom";

// import { Route, Switch } from "react-router-dom";

// Theme Provider and theme
// import { ThemeProvider } from "@mui/material/styles";
// import themes from "./theme";

import PrivateRoutes from "./components/PrivateRoute/privateRoute";

import "./App.css";

// components
// import CheckAuth from "./components/Auth/CheckAuth";
import Navbar from "./components/Navbar/Navbar";
// import ResetPassword from "./components/Home/resetPassword";
import Home from "./components/Home/home";
import Register from "./components/Home/register";
import Dashboard from "./components/Dashboard/Dashboard";
import Computers from "./components/Computers/Computers";
import Phones from "./components/Phones/Phones";
import Monitors from "./components/Monitors/Monitors";
import Docks from "./components/DockingStations/DockingStations";
import DeskPhones from "./components/DeskPhones/deskPhones";
import Accessories from "./components/Accessories/Accessories";
import ITAM from "./components/BorrowedDevices/borrowedDevices";
import Archive from "./components/Archive/archive";

import AddComputer from "./components/NewEquipment/computers/index";
import AddPhone from "./components/NewEquipment/phones/index";
import AddMonitor from "./components/NewEquipment/monitors/index";
import AddDock from "./components/NewEquipment/dockingstations/index";
import AddDeskPhone from "./components/NewEquipment/deskphone/index";
import AddAccessory from "./components/NewEquipment/accessories/index";
import AddITAM from "./components/NewEquipment/ITAMLoaner/index";

// import InventorySelection from "./components/NewEquipment/Inventory";
// import ItemDetail from "./components/Item/ItemDetail";
// import Tools from "./components/Admin/tools";
// import Delete from "./components/Admin/Delete";
// import AdminUpdateLocation from "./components/Admin/UpdateLocation";
// import Users from "./components/Admin/users";
// import UpdatePassword from "./components/Home/updatePassword";
// import BorrowedDeviceItem from "./components/BorrowedDevices/BorrowedDevice/listBorrowedItem";
// import DeskPhoneView from "./components/DeskPhones/View/deskPhoneView";

// // Individual Item Views
import ComputerView from "./components/ItemViews/Computers/computerView";
import MonitorView from "./components/ItemViews/Monitors/monitorView";
import PhoneView from "./components/ItemViews/Phones/phonesView";
import DockView from "./components/ItemViews/Docks/dockView";
import AccessoryView from "./components/ItemViews/Accessories/accessoryView";
import ItamView from "./components/ItemViews/ITAM/itamView";
import DeskPhoneView from "./components/ItemViews/Deskphones/deskphoneView";

// // Accessory Imports
// import AccessoryDetail from "./components/Item/AccessoryItem/accessoryDetail";

// // Search
// import Search from "./components/Search/search";
// import BulkEditTags from "./components/Admin/BulkEditTags";

import NavBarHandler from "./components/Navbar/navbarHandler";

// Cart
import Cart from "./components/Cart/cart";

// Admin
import Admin from "./components/Admin/admin";

// Errors
import SnackbarErrorMessages from "./components/utils/error";
import SnackbarSuccessMessages from "./components/utils/success";
// import ComputerView from "./components/ItemViews/Computers/computerView";

function App(props) {
  // const theme = props.nav.light === true ? themes.light : themes.dark;

  return (
    <>
      <NavBarHandler>
        <Navbar />
      </NavBarHandler>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<Dashboard />} path="/dashboard" exact />
          <Route element={<Computers />} path="/computers" exact />
          <Route element={<Phones />} path="/phones" exact />
          <Route element={<Monitors />} path="/monitors" exact />
          <Route element={<Docks />} path="/docks" exact />
          <Route element={<DeskPhones />} path="/deskphones" exact />
          <Route element={<Accessories />} path="/accessories" exact />
          <Route element={<ITAM />} path="/itam" exact />
          <Route element={<Archive />} path="/archive" exact />

          <Route element={<AddComputer />} path="/add/computer" exact />
          <Route element={<AddPhone />} path="/add/phone" exact />
          <Route element={<AddMonitor />} path="/add/monitor" exact />
          <Route element={<AddDock />} path="/add/dockingstation" exact />
          <Route element={<AddDeskPhone />} path="/add/deskphone" exact />
          <Route element={<AddAccessory />} path="/add/accessory" exact />
          <Route element={<AddITAM />} path="/add/itam" exact />

          <Route element={<ComputerView />} path="/computers/:id" exact />
          <Route element={<MonitorView />} path="/monitors/:id" exact />
          <Route element={<PhoneView />} path="/phones/:id" exact />
          <Route element={<DockView />} path="/docks/:id" exact />
          <Route element={<AccessoryView />} path="/accessory/:id" exact />
          <Route element={<ItamView />} path="/itam/:id" exact />
          <Route element={<DeskPhoneView />} path="/deskphones/:id" exact />
          {/* <Route element={<BorrowedDevices />} path="/BorrowedDevices" exact /> */}

          <Route element={<Cart />} path="/cart" />
          <Route element={<Admin />} path="/admin" exact />
        </Route>
        {/* <Route element={<Home />} path="/" /> */}
        <Route element={<Home />} path="/" exact />
        <Route
          element={<Register />}
          path="/register/newuser/trackerapp/:id"
          exact
        />
      </Routes>
      {/* <Cart /> */}
      <SnackbarErrorMessages />
      <SnackbarSuccessMessages />
    </>
    // <Fragment>
    //   <ThemeProvider theme={theme}>
    //     <Switch>
    //       <Route exact path="/" component={Home} /> DONE
    //       <Route
    //         exact
    //         path="/register/newuser/trackerapp/:id"
    //         component={Register}
    //       />
    //       <Route exact path="/forgot/password" component={ResetPassword} />
    //       <Route
    //         exact
    //         path="/forgot/password/reset/:id"
    //         component={UpdatePassword}
    //       />
    //       <Route
    //         path="/(.+)"
    //         render={() => (
    //           <Fragment>
    //             <CheckAuth />
    //             <Navbar />
    //             {/* <Route exact path="/dashboard" component={Dashboard} /> */} DONE
    //             <Route exact path="/computers" component={Computers} />  DONE
    //             <Route exact path="/phones" component={Phones} />  DONE
    //             <Route exact path="/monitors" component={Monitors} /> DONE

    //             <Route exact path="/addphone" component={AddPhone} />  DONE
    //             <Route exact path="/addcomputer" component={AddComputer} />  DONE
    //             {/* Accessories */}
    //             <Route exact path="/addaccessory" component={AddAccessory} />  DONE
    //             <Route exact path="/search" component={Search} />

    //             <Route exact path="/adddockingstation" component={AddDock} />  DONE
    //             <Route exact path="/dockingstations" component={Docks} />  DONE
    //             <Route exact path="/addmonitor" component={AddMonitor} />  DONE
    //             <Route exact path="/inventory" component={InventorySelection} />
    //             <Route exact path="/admin" component={Tools} />
    //             <Route
    //               exact
    //               path="/admin/update/location"
    //               component={AdminUpdateLocation}
    //             />
    //             <Route exact path="/admin/delete" component={Delete} />

    //
    //
    //             <Route
    //               exact
    //               path="/desk/phones"
    //               component={DeskPhoneDashboard}
    //             />
    //             <Route
    //               exact
    //               path="/desk/phones/inventory"
    //               component={InventoryDeskPhone}
    //             />
    //             <Route
    //               exact
    //               path="/deskphones/:id"
    //               component={(props) => <DeskPhoneView {...props} />}
    //             />
    //             <Route exact path="/accessories" component={Accessories} />
    //             <Route
    //               exact
    //               path="/borrowed/add"
    //               component={AddBorrowedDevice}
    //             />
    //             <Route exact path="/admin/users" component={Users} />
    //             <SnackbarErrorMessages />
    //             <SnackbarSuccessMessages />
    //           </Fragment>
    //         )}
    //       />
    //     </Switch>
    //   </ThemeProvider>
    // </Fragment>
  );
}

function mapStateToProps({ nav }) {
  return { nav };
}

export default connect(mapStateToProps, null)(App);

/*
 return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          // {/* Protected routes go here */
// <Route element={<AccountPage />} path="/settings" exact />
// <Route
//   element={<Dashboard handleuser={handleUser} />}
//   path="/dashboard"
//   exact
// />
// {/* <Route> element = {}</Route> */}
//   <Route element={<Poll user={user} />} path="/new/poll" exact />
//   <Route element={<Rating user={user} />} path="/new/rating" exact />

//   <Route element={<SingleRating />} path="/ratings/:id" exact />
//   <Route element={<SinglePoll />} path="/polls/:id" exact />
//   {/* Search Routes */}
//   <Route element={<SearchPolls />} path="/search/polls" exact />
//   <Route element={<SearchRatings />} path="/search/ratings" exact />
//   <Route element={<UserPolls />} path="/account/polls" exact />
//   <Route element={<UserRatings />} path="/account/ratings" exact />
// </Route>
//     {/* Unprotected routes go here */}
//     <Route path="/" element={<Home />} />
//     <Route path="/register" element={<Register />} />
//     <Route path="/login" element={<Login />} />

//     <Route path="*" element={<NotFound />} />
//   </Routes>
// </>
// */
