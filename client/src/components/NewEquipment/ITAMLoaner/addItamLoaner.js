// Component: Add ITAM Loaner Device
// Status: WIP
// Template Styles: WIP
// Date: 7/7/2024
// Author: StephenDK
import React, { Fragment, useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import config from "../../../config";
import axios from "axios";
// import { styled, useTheme } from "@mui/material/styles";
import { GetItamCategoryFile } from "../../../actions/filesActions";
import { setError } from "../../../actions/errorActions";
import { setSuccess } from "../../../actions/successActions";
import { showLoading, hideLoading } from "../../../actions/loadingActions";
import {
  Container,
  Paper,
  Avatar,
  Grid,
  TextField,
  Typography,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

import LoadingForm from "../../loading/loadingComputerForm";
// import ModelSelectField from "../../utils/modelSelectField";

function AddItamEquipment(props) {
  // State
  const [serial, setSerial] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [category, setCategory] = useState("");

  // const [isSerialValid, setIsSerialValid] = useState(false);
  // const theme = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    let initializePage = async () => {
      dispatch(showLoading());

      await dispatch(GetItamCategoryFile());

      dispatch(hideLoading());
    };

    initializePage();
  }, []);

  const onSubmitHandler = async (event) => {
    try {
      // get token
      let token = await localStorage.getItem("token");

      let data = {
        token,
        serial,
        make,
        model,
        category,
      };

      console.log("DATA", data);
      const request = await axios.post(`${config.apiUrl}/api/v1/itam`, data);
      if (request.status === 200) {
        dispatch(setSuccess("Item Successfully Inventoried"));
      }

      setSerial("");
      setMake("");
      setModel("");
      setCategory("");
    } catch (err) {
      // console.log(err.response.data);
      dispatch(setError(err.response.data.error));
    }
  };

  const handleFieldChange = (fieldName, e) => {
    switch (fieldName) {
      case "serial":
        // validateSerial(e.target.value);
        setSerial(e.target.value);
        break;
      case "category":
        setCategory(e.target.value);
        break;
      case "make":
        setMake(e.target.value);
        break;
      case "model":
        setModel(e.target.value);
        break;
      default:
        break;
    }
  };

  // const validateSerial = (input) => {
  //   const blacklistedChars = /^[-/.\w:]+$/;

  //   // Expression Check
  //   if (blacklistedChars.test(input)) {
  //     setComputerSerialValid(false);
  //   } else {
  //     setComputerSerialValid(true);
  //   }
  // };

  if (props.loading.isLoading) {
    return <LoadingForm />;
  }

  return (
    <Fragment>
      <Container maxWidth="md" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{
            my: { xs: 3, md: 3 },
            p: { xs: 2, md: 3 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <AccountBalanceIcon />
          </Avatar>
          <Typography variant="h4" sx={{ mb: "40px" }}>
            Inventory ITAM Loaner Equipment
          </Typography>
          <Grid container spacing={3} rowSpacing={3}>
            <Grid item xs={12} sm={8}>
              <TextField
                // error={isSerialValid}
                required
                id="serial"
                name="serial"
                label="Serial"
                value={serial}
                fullWidth
                // helperText={
                //   isSerialValid ? "Incorrect character in serial" : null
                // }
                onChange={(e) => handleFieldChange("serial", e)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel>Category*</InputLabel>
                <Select
                  name="category"
                  id="category"
                  value={category}
                  onChange={(e) => handleFieldChange("category", e)}
                >
                  {props.files.jsonFiles.itamCategories.length > 0
                    ? props.files.jsonFiles.itamCategories.map((item) => (
                        <MenuItem key={item.type} value={item.type}>
                          {item.type}
                        </MenuItem>
                      ))
                    : null}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                // error={computerSerialValid}
                required
                id="make"
                name="make"
                label="Make"
                value={make}
                fullWidth
                // helperText={
                //   computerSerialValid ? "Incorrect character in serial" : null
                // }
                onChange={(e) => handleFieldChange("make", e)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                // error={computerSerialValid}
                required
                id="model"
                name="model"
                label="Model"
                value={model}
                fullWidth
                // helperText={
                //   computerSerialValid ? "Incorrect character in serial" : null
                // }
                onChange={(e) => handleFieldChange("model", e)}
              />
            </Grid>

            <Grid item xs={3} sm={2}>
              <Button
                color="primary"
                type="submit"
                fullWidth
                variant="contained"
                onClick={onSubmitHandler}
                sx={{ mt: 3, mb: 2 }}
                // disabled={
                //   !computerSerialValid &&
                //   computerSerial &&
                //   computerMake &&
                //   computerModel &&
                //   type
                //     ? false
                //     : true
                // }
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Fragment>
  );
}

function mapStateToProps({ files, loading }) {
  return { files, loading };
}

export default connect(mapStateToProps, {
  GetItamCategoryFile,
  showLoading,
  hideLoading,
})(AddItamEquipment);

// import React, { Component, Fragment } from "react";
// import axios from "axios";
// // import { Form, Button, Message, Select } from "semantic-ui-react";
// import DeviceTypes from "../Data/deviceTypes";
// import config from "../../config";
// import Grid from "@mui/material/Grid";
// import Typography from "@mui/material/Typography";
// import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Button from "@mui/material/Button";
// import {
//   Container,
//   Paper,
//   MenuItem,
//   Avatar,
//   Alert,
//   IconButton,
// } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import CloseIcon from "@mui/icons-material/Close";

// class addBorrowedDevice extends Component {
//   state = {
//     serial: "",
//     make: "",
//     model: "",
//     type: "",
//     flag: true,
//     msg: "",
//     color: null,
//   };

//   onSelectHandler = (e, { value, name }) => {
//     this.setState({
//       [name]: value,
//     });
//   };

//   onChangeHandler = (event) => {
//     this.setState({
//       [event.target.name]: event.target.value,
//     });
//   };

//   onSubmitHandler = async () => {
//     try {
//       let { serial, make, model, type } = this.state;
//       let token = await localStorage.getItem("token");
//       let data = {
//         token,
//         serial,
//         make,
//         model,
//         type,
//       };
//       // make request
//       let request = await axios.post(`${config.apiUrl}/api/v1/borrowed`, data);
//       console.log(request);

//       if (request.status === 200) {
//         this.setState({
//           serial: "",
//           flag: true,
//           msg: "Your itme was successfully inventoried.",
//           color: "green",
//         });
//       }
//       this.onChangeFlagHandler(false);
//       // this.props.refreshComp();
//     } catch (err) {
//       console.log(Object.keys(err));
//       console.log(err.response);
//       this.setState({
//         flag: true,
//         msg: err.response.data.error,
//         color: "red",
//       });
//       this.onChangeFlagHandler(false);
//     }
//   };

//   onChangeFlagHandler = (val) => {
//     setTimeout(() => {
//       this.setState({
//         flag: val,
//         msg: "",
//       });
//     }, 3000);
//   };

//   render() {
//     const deviceTypes = DeviceTypes;
//     return (
//       <Fragment>
//         {/* {this.state.flag ? (
//           <Message color={this.state.color}>
//             <Message.Header>{this.state.msg}</Message.Header>
//           </Message>
//         ) : null} */}
//         <div style={{ marginBottom: "60px" }} />

//         <Container maxWidth="md" sx={{ mb: 4 }}>
//           <Paper
//             variant="outlined"
//             sx={{
//               my: { xs: 3, md: 6 },
//               p: { xs: 2, md: 3 },
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//           >
//             <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
//               <AddIcon />
//             </Avatar>
//             <Typography variant="h4" sx={{ mb: "40px" }}>
//               Add Borrowed Device
//             </Typography>

//             <Grid container spacing={3} rowSpacing={3}>
//               <Grid item xs={12} sm={12}>
//                 <TextField
//                   required
//                   id="serial"
//                   name="serial"
//                   label="Serial"
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12} sm={12}>
//                 <TextField
//                   required
//                   id="make"
//                   name="make"
//                   label="Make"
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   required
//                   id="model"
//                   name="model"
//                   label="Model"
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Type"
//                   id="select"
//                   fullWidth
//                   select
//                   // value={selectedValue}
//                   // onChange={handleChange}
//                 >
//                   {deviceTypes.map((item) => (
//                     <MenuItem key={item.value} value={item.value}>
//                       {item.text}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               </Grid>
//               <Grid item xs={3} sm={2}>
//                 <Button
//                   type="submit"
//                   fullWidth
//                   variant="contained"
//                   onClick={this.onFormSubmit}
//                   sx={{ mt: 3, mb: 2 }}
//                 >
//                   Submit
//                 </Button>
//               </Grid>
//             </Grid>
//           </Paper>
//           {this.state.flag ? (
//             <Fragment>
//               <Alert
//                 variant="filled"
//                 severity="error"
//                 sx={{ width: "100%" }}
//                 action={
//                   <IconButton
//                     aria-label="close"
//                     color="inherit"
//                     size="small"
//                     onClick={() => {
//                       console.log("Close");
//                     }}
//                   >
//                     <CloseIcon />
//                   </IconButton>
//                 }
//               >
//                 <Typography variant="h6">This is an error</Typography>
//               </Alert>
//             </Fragment>
//           ) : null}
//         </Container>
//       </Fragment>
//     );
//   }
// }

// export default addBorrowedDevice;

// {
//   /* <Form
//           style={{
//             height: "15vh",
//             paddingTop: "60px",
//             width: "75%",
//             margin: "auto",
//           }}
//         >
//           <h2>Add borrowed device</h2>
//           <Form.Group>
//             <Form.Field>
//               <label>Serial</label>
//               <input
//                 placeholder="Serial"
//                 onChange={this.onChangeHandler}
//                 value={this.state.serial}
//                 name="serial"
//               />
//             </Form.Field>
//             <Form.Field>
//               <label>Make</label>
//               <input
//                 placeholder="Make"
//                 onChange={this.onChangeHandler}
//                 value={this.state.make}
//                 name="make"
//               />
//             </Form.Field>
//             <Form.Field>
//               <label>Model</label>
//               <input
//                 placeholder="Model"
//                 onChange={this.onChangeHandler}
//                 value={this.state.model}
//                 name="model"
//               />
//             </Form.Field>
//             <Form.Field
//               label="Device Type"
//               name="type"
//               value={this.state.type}
//               control={Select}
//               options={DeviceTypes}
//               onChange={this.onSelectHandler}
//             />
//             <Form.Field>
//               <Button
//                 content="Submit"
//                 style={{ position: "relative", top: "26px" }}
//                 onClick={this.onSubmitHandler}
//               />
//             </Form.Field>
//           </Form.Group>
//         </Form> */
// }
