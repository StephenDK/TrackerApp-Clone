// Package Imports
import { Fragment, useEffect } from "react";
import config from "../../config";
import { connect, useDispatch } from "react-redux";
// import "./home.css"
import { SetUser } from "../../actions/userActions";
import { setError } from "../../actions/errorActions";
import { setSuccess } from "../../actions/successActions";

// Material UI Imports
import { Grid, Box } from "@mui/material";

//  Images
import Image from "../../images/warehouse.png";

// Components
import Login from "../Home/login";
// import Footer from "../Footer/footer";

import axios from "axios";
import { useNavigate } from "react-router";

const Styles = {
  bannerContainer: {
    width: "100%",
    height: "250px",
  },
  banner: {
    width: "100%",
    height: "350px",
    borderRadius: "60px",
    paddingRight: "5px",
    paddingLeft: "5px",
    paddingTop: "20px",
  },
  loginGrid: {
    margin: "auto",
  },
};

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthentication = async () => {
      try {
        let token = localStorage.getItem("token");

        if (token === null || token === "") {
          return;
        }

        const request = await axios.post(
          `${config.apiUrl}/api/v1/auth/isauth`,
          {
            token,
          }
        );
        console.log("ISAUTH REQUEST: ", request);
        if (request.data.success === true) {
          dispatch(setSuccess("Login Successful"));
          dispatch(SetUser(request.data.data));
          navigate("/dashboard");
        }
      } catch (err) {
        console.log(err.response.data);
      }
    };
    if (localStorage.getItem("token")) {
      fetchAuthentication();
    } else {
      return;
    }
  }, []);

  return (
    <Fragment>
      {/* Grid setup */}
      <Box>
        <Grid container rowSpacing={1}>
          <Grid item xs={12}>
            <div className="banner" style={Styles.bannerContainer}>
              <img src={Image} alt="Campus" style={Styles.banner} />
            </div>
          </Grid>
          <Grid item xs={6} style={Styles.loginGrid}>
            <Login />
          </Grid>
        </Grid>
      </Box>
      {/* <Footer /> */}
    </Fragment>
  );
}

export default connect(null, {
  SetUser,
  setError,
  setSuccess,
})(Home);

// import React, { Component, Fragment } from "react";
// import { Form, Grid, Message } from "semantic-ui-react";
// import axios from "axios";
// import config from "../../config";
// // import { withRouter, Link } from "react-router-dom";
// import { redirect, useNavigate } from "react-router-dom";

// import "./home.css";

// const Styles = {
//   home: {
//     position: "fixed",
//     top: "30%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//   },
//   title: {
//     textAlign: "center",
//   },
//   btn: {
//     width: "100%",
//   },
//   forgotPassword: {
//     float: "left",
//     marginTop: "20px",
//     fontWeight: "bold",
//     fontSize: "14px",
//     textDecoration: "underline",
//   },
//   form: {
//     height: "200px",
//     paddingTop: "20px",
//     paddingBottom: "15px",
//   },
// };

// class Home extends Component {
//   state = {
//     email: "",
//     password: "",
//     error: false,
//     forgotPassword: false,
//     msg: "",
//   };

//   async componentDidMount() {
//     let token = await localStorage.getItem("token");
//     let data = {
//       token,
//     };
//     if (token) {
//       try {
//         let request = await axios.post(
//           `${config.apiUrl}/api/v1/auth/isauth`,
//           data
//         );
//         if (request.status === 200) {
//           redirect("/dashboard");
//         }
//       } catch (err) {
//         console.log(err.response);
//         return;
//       }
//     }
//   }

//   handleChange = (event) => {
//     this.setState({
//       [event.target.name]: event.target.value,
//     });
//   };

//   handleSubmit = async (event) => {
//     event.preventDefault();
//     const { email, password } = this.state;
//     let data = {
//       email,
//       password,
//     };

//     // making request
//     try {
//       let request = await axios.post(
//         `${config.apiUrl}/api/v1/auth/login`,
//         data
//       );

//       console.log(request);
//       localStorage.setItem("token", request.data.token);

//       redirect("/dashboard");
//     } catch (err) {
//       // console.log(Object.keys(err.response));
//       console.log(err.response.data);
//       this.setState({
//         error: true,
//         msg: err.response.data.error,
//         forgotPassword: true,
//       });
//       this.resetError();
//     }
//   };

//   resetError = () => {
//     setTimeout(() => {
//       this.setState({
//         error: false,
//         msg: "",
//       });
//     }, 3000);
//   };

//   render() {
//     return (
//       <Fragment>
//         <div style={Styles.home}>
//           <h1 style={Styles.title}>Welcome to Tracker App</h1>

//           <Grid columns={3} stackable padded={true} verticalAlign="middle">
//             <Grid.Row>
//               <Grid.Column textAlign="center">
//                 <i className="massive desktop icon"></i>
//               </Grid.Column>
//               <Grid.Column textAlign="center">
//                 <i className="massive mobile alternate icon"></i>
//               </Grid.Column>
//               <Grid.Column textAlign="center">
//                 <i className="massive laptop icon"></i>
//               </Grid.Column>
//             </Grid.Row>
//             <Grid.Row>
//               <Grid.Column style={{ width: "85%", margin: "auto" }}>
//                 <Form
//                   size={"small"}
//                   style={Styles.form}
//                   className="form-media"
//                   onSubmit={this.handleSubmit}
//                 >
//                   <Form.Group widths="equal">
//                     <Form.Input
//                       fluid
//                       label="Email"
//                       placeholder="Email"
//                       name="email"
//                       onChange={this.handleChange}
//                     />
//                     <Form.Input
//                       fluid
//                       label="Password"
//                       placeholder="Password"
//                       type="password"
//                       name="password"
//                       onChange={this.handleChange}
//                     />
//                     <Form.Button
//                       style={{ position: "relative", top: "23px" }}
//                       width={6}
//                     >
//                       Submit
//                     </Form.Button>
//                     {/* {this.state.forgotPassword ? (
//                       <Link
//                         to={`/forgot/password`}
//                         style={Styles.forgotPassword}
//                       >
//                         Forgot Password
//                       </Link>
//                     ) : null} */}
//                   </Form.Group>
//                   {this.state.error ? (
//                     <Message color="red">
//                       <Message.Content>{this.state.msg}</Message.Content>
//                     </Message>
//                   ) : null}
//                 </Form>
//               </Grid.Column>
//             </Grid.Row>
//           </Grid>
//         </div>
//       </Fragment>
//     );
//   }
// }

// export default Home;
