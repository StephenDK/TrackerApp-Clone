import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import config from "../../config";
import axios from "axios";
import { connect, useDispatch } from "react-redux";

import { setError } from "../../actions/errorActions";

const PrivateRoutes = () => {
  const dispatch = useDispatch();
  const [auth, setAuth] = useState(true);
  useEffect(() => {
    let checkAuth = async () => {
      try {
        let token = localStorage.getItem("token");
        console.log(token);
        if (!token) {
          setAuth(false);
          dispatch(setError("Session Expired"));
          return;
        }

        const request = await axios.post(
          `${config.apiUrl}/api/v1/auth/isauth`,
          {
            token,
          }
        );

        // console.log("CHECKING AUTH", request);
      } catch (err) {
        console.log(Object.keys(err));
        console.log(err.response);
        dispatch(setError(err.response.data.error));
        setAuth(false);
      }
    };
    checkAuth();
  }, []);
  // Check session storage for token
  // let auth = localStorage.getItem("token");

  // console.log("PRIVATE ROUTE AUTH TOKEN: ", auth);

  return auth ? <Outlet /> : <Navigate to="/" />;
};

export default connect(null, {
  setError,
})(PrivateRoutes);
