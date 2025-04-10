import React, { useEffect, useState } from "react";
import Axios from "axios";
import { connect, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import config from "../../config";

import { GetUser } from "../../actions/userActions";

function CheckAuth(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    let token = localStorage.getItem("token");
    let url = props.location.pathname;

    if (url.includes("/register/newuser/trackerapp/")) {
      console.log(props.location.pathname);
      return;
    }

    if (url.includes("/forgot/password")) {
      return;
    }
    if (!token) {
      alert("Your session has expired. Please login to continue.");
      props.history.push("/");
    }
    dispatch(GetUser());
  }, []);

  return null;
}

const ConnectedCheckAuth = connect(null, {
  GetUser,
})(CheckAuth);

export default withRouter(ConnectedCheckAuth);

// async componentDidMount() {
//   let token = await localStorage.getItem("token");
//   // console.log(token);
//   let url = this.props.location.pathname;

//   if (url.includes("/register/newuser/trackerapp/")) {
//     console.log(this.props.location.pathname);
//     return;
//   }

//   if (url.includes("/forgot/password")) {
//     return;
//   }
//   if (!token) {
//     alert("Your session has expired. Please login to continue.");
//     this.props.history.push("/");
//   } else {
//     let data = {
//       token,
//     };
//     try {
//       let req = await Axios.post(`${config.apiUrl}/api/v1/auth/isauth`, data);
//       this.dispatch(SetUser(req.data.user));
//       console.log(req);
//     } catch (err) {
//       console.log(err);
//       alert("Your session has expired. Your account is not active.");
//       this.props.history.push("/");
//     }
//   }
// }

// render() {
//   return <div></div>;
// }
