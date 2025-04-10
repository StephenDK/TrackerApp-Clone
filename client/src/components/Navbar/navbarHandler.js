import React, { Fragment } from "react";
import { useLocation } from "react-router-dom"; // Ensure you import from 'react-router-dom'

const NavbarHandler = (props) => {
  const location = useLocation();

  // Define routes to show navbar here
  const showNavbarRoutes = [
    "/dashboard",
    "/cart",
    "/computers",
    "/phones",
    "/docks",
    "/monitors",
    "/deskphones",
    "/dockingstations",
    "/accessories",
    "/itam",
    "/archive",
    "/admin",
    "/add/computer",
    "/add/phone",
    "/add/monitor",
    "/add/dockingstation",
    "/add/deskphone",
    "/add/accessory",
    "/add/itam",
    /^\/computers\/[a-fA-F0-9]{24}$/,
    /^\/monitors\/[a-fA-F0-9]{24}$/,
    /^\/phones\/[a-fA-F0-9]{24}$/,
    /^\/docks\/[a-fA-F0-9]{24}$/,
    /^\/accessory\/[a-fA-F0-9]{24}$/,
    /^\/itam\/[a-fA-F0-9]{24}$/,
    /^\/deskphones\/[a-fA-F0-9]{24}$/,
  ];

  // Check if the current path matches one of the routes
  const shouldShowNavbar = showNavbarRoutes.some((route) =>
    typeof route === "string"
      ? route === location.pathname
      : route.test(location.pathname)
  );

  return <Fragment>{shouldShowNavbar ? props.children : null}</Fragment>;
};

export default NavbarHandler;
