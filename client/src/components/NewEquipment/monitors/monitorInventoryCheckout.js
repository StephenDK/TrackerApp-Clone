// STATUS: FINISHED
// Template Styles: WIP
// Editor: StephenDK
// DATE: 1/8/2024
import React, { Fragment, useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import config from "../../../config";
import axios from "axios";
import { GetDivisionFile } from "../../../actions/filesActions";
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
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

import SelectField from "../../utils/selectField";
import BlankField from "../../utils/blankInput";
import LoadingForm from "../../loading/loadingComputerForm";
import ModelSelectField from "../../utils/modelSelectField";

function MonitorIntentoryCheckout(props) {
  const [monitorSerial, setMonitorSerial] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [division, setDivision] = useState("");
  const [manager, setManager] = useState("");
  const [user, setUser] = useState("");
  const [location, setLocation] = useState("");
  const [comments, setComments] = useState("");
  const [validateInput, setValidateInput] = useState({
    invalidMonitorSerial: false,
    invalidUser: false,
  });
  const [uniqueMakes, setUniqueMakes] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    let initializeData = async () => {
      dispatch(showLoading());

      await dispatch(GetDivisionFile());

      dispatch(hideLoading());
    };
    initializeData();
    if (
      props.files.jsonFiles.monitors &&
      props.files.jsonFiles.monitors.length > 0
    ) {
      let makes = [];
      props.files.jsonFiles.monitors.forEach((item) => {
        if (!makes.includes(item.make)) {
          makes.push(item.make);
        }
      });
      setUniqueMakes([...makes]);
    }
  }, []);

  const onFormSubmit = async () => {
    try {
      let token = await localStorage.getItem("token");

      let data = {
        token,
        monitorSerial,
        monitorMake: make,
        monitorModel: model,
        user,
        division,
        manager,
        location,
        description: comments,
      };

      // console.log(data);
      let req = await axios.post(
        `${config.apiUrl}/api/v1/monitors/inventory/checkout`,
        data
      );
      console.log(req);
      if (req.status === 200) {
        dispatch(setSuccess("Item Successfully Inventoried"));
      }
      clearFields();
    } catch (err) {
      console.log(err);
      dispatch(setError(err.response.data.error));
    }
  };

  const clearFields = () => {
    setMonitorSerial("");
    setMake("");
    setModel("");
    setDivision("");
    setManager("");
    setUser("");
    setLocation("");
    setComments("");
  };

  const onDivisionSelectHandler = (e) => {
    setDivision(e.target.value);
    const data = props.files.jsonFiles.divisions.find(
      (obj) => obj.value === e.target.value
    );
    setManager(data.manager);
  };

  const validateUserName = (input) => {
    const regPattern = /^[A-Za-z]+[.][A-Za-z]+$/;

    if (regPattern.test(input)) {
      setValidateInput({
        ...validateInput,
        invalidUser: false,
      });
    } else {
      setValidateInput({
        ...validateInput,
        invalidUser: true,
      });
    }
  };

  const handleFieldChange = (fieldName, e) => {
    let i = e.target.value;
    switch (fieldName) {
      case "serial":
        validateSerial(i, "invalidMonitorSerial");
        setMonitorSerial(i);
        break;
      case "make":
        setMake(i);
        const filteredModels = props.files.jsonFiles.monitors
          .filter((item) => item.make === e.target.value)
          .map((item) => item.model);
        setSelectedModels(filteredModels);
        setModel("");
        break;
      case "model":
        setModel(i);
        break;
      case "user":
        validateUserName(i);
        setUser(i);
        break;
      case "location":
        setLocation(i);
        break;
      case "comments":
        setComments(i);
        break;
      default:
        break;
    }
  };

  const validateSerial = (input, key) => {
    const blacklistedChars = /^[-/.\w:]+$/;

    // Expression Check
    if (blacklistedChars.test(input)) {
      setValidateInput({
        ...validateInput,
        [key]: false,
      });
    } else {
      setValidateInput({
        ...validateInput,
        [key]: true,
      });
    }
  };

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
            <ShoppingCartCheckoutIcon />
          </Avatar>
          <Typography variant="h4" sx={{ mb: "40px" }}>
            Inventory Monitor & Checkout
          </Typography>
          <Grid container spacing={3} rowSpacing={3}>
            <Grid item xs={12} sm={12}>
              <TextField
                error={validateInput.invalidMonitorSerial}
                required
                id="serial"
                name="serial"
                label="Monitor Serial"
                value={monitorSerial}
                fullWidth
                helperText={
                  validateInput.invalidMonitorSerial
                    ? "Incorrect Character in Serial"
                    : null
                }
                onChange={(e) => handleFieldChange("serial", e)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputLabel>Make*</InputLabel>
              <Select
                sx={{
                  width: "100%",
                }}
                id="make"
                name="make"
                value={make}
                onChange={(e) => handleFieldChange("make", e)}
              >
                {uniqueMakes.length > 0
                  ? uniqueMakes.map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))
                  : null}
              </Select>
            </Grid>

            <Grid item xs={12} sm={6}>
              <ModelSelectField
                items={selectedModels}
                deviceModel={model}
                field="model"
                onChangeHandler={handleFieldChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>*Division</InputLabel>
              <SelectField
                name="division"
                id="division"
                value={division}
                items={props.files.jsonFiles.divisions}
                onSelectHandler={(e) => onDivisionSelectHandler(e)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <BlankField title={"*Manager"} value={manager} />
            </Grid>
            <Grid item xs={12} sm={8}>
              <InputLabel>*First.Last Name</InputLabel>
              <TextField
                error={validateInput.invalidUser}
                required
                id="user"
                name="user"
                value={user}
                fullWidth
                helperText={
                  validateInput.invalidUser ? "Must be First.Last" : null
                }
                onChange={(e) => handleFieldChange("user", e)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <InputLabel>Location</InputLabel>
              <TextField
                required
                id="location"
                name="location"
                value={location}
                fullWidth
                onChange={(e) => handleFieldChange("location", e)}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                id="outlined-textarea"
                label="Comments"
                name="comments"
                value={comments}
                variant="filled"
                multiline
                fullWidth
                onChange={(e) => handleFieldChange("comments", e)}
              />
            </Grid>
            <Grid item xs={3} sm={2}>
              <Button
                color="primary"
                type="submit"
                fullWidth
                variant="contained"
                onClick={onFormSubmit}
                sx={{ mt: 3, mb: 2 }}
                disabled={
                  !validateInput.invalidMonitorSerial &&
                  !validateInput.invalidUser &&
                  monitorSerial &&
                  make &&
                  model &&
                  division &&
                  manager
                    ? false
                    : true
                }
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
  GetDivisionFile,
  showLoading,
  hideLoading,
})(MonitorIntentoryCheckout);

// class monitorInventoryCheckout extends Component {
//   state = {
//     monitorSerial: "",
//     monitor2Serial: "",
//     monitorMake: "",
//     monitorModel: "",
//     name: "",
//     manager: "",
//     division: "",
//     location: "",
//     description: "",
//     teleWork: false,
//     submitError: false,
//     submitSuccess: false,
//   };

//   onChangeHandler = (event) => {
//     this.setState({
//       [event.target.name]: event.target.value,
//     });
//   };

//   errorMessageHandler = (key) => {
//     setTimeout(() => {
//       this.setState({
//         [key]: false,
//       });
//     }, 1000 * 2);
//   };

//   onSelectHandler = (e, { value, name }) => {
//     // console.log(name)
//     // console.log(value);
//     this.setState({
//       [name]: value,
//     });
//   };

//   onTeleWorkCheckHandler = (event) => {
//     console.log(event);
//     this.setState({
//       teleWork: !this.state.teleWork,
//     });
//   };

//   onFormSubmit = async () => {
//     console.log(this.state);
//     try {
//       if (this.state.monitorSerial === "" && this.state.name === "") {
//         this.setState({
//           submitError: true,
//         });
//         this.errorMessageHandler("submitError");
//         return;
//       }
//       let monitor = await axios.post(
//         `${config.apiUrl}/api/v1/monitors/inventory/checkout`,
//         this.state
//       );
//       this.setState({
//         monitorSerial: "",
//         monitor2Serial: "",
//         monitorMake: "",
//         monitorModel: "",
//         name: "",
//         manager: "",
//         division: "",
//         location: "",
//         description: "",
//         teleWork: false,
//         submitSuccess: true,
//       });
//       this.errorMessageHandler("submitSuccess");
//       console.log(monitor);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   render() {
//     return (
//       <div style={{ marginTop: "60px" }}>
//         <Fragment>
//           <Segment>
//             <Segment.Group>
//               <Form className="form" style={{ marginTop: "10px" }}>
//                 {this.state.submitSuccess ? (
//                   <Message color="green">
//                     <Message.Header>Success</Message.Header>
//                     <p>Your item was inventoried and checked out.</p>
//                   </Message>
//                 ) : null}
//                 <Form.Group>
//                   <Form.Field>
//                     <label>Monitor Serial</label>
//                     <input
//                       name="monitorSerial"
//                       value={this.state.monitorSerial}
//                       onChange={this.onChangeHandler}
//                       type="text"
//                       placeholder="Serial #"
//                     />
//                   </Form.Field>

//                   <Form.Field
//                     label="Second Monitor Serial # (Optional)"
//                     value={this.state.monitor2Serial}
//                     name="monitor2Serial"
//                     control="input"
//                     placeholder="Serial #2"
//                     onChange={this.onChangeHandler}
//                   />
//                 </Form.Group>
//                 <Form.Group>
//                   <Form.Field
//                     label="Make"
//                     value={this.state.monitorMake}
//                     name="monitorMake"
//                     control={Select}
//                     options={monitorMake}
//                     onChange={this.onSelectHandler}
//                   ></Form.Field>
//                   <Form.Field
//                     label="Model"
//                     value={this.state.monitorModel}
//                     name="monitorModel"
//                     control={Select}
//                     options={monitorModels}
//                     onChange={this.onSelectHandler}
//                   ></Form.Field>
//                   <Form.Field
//                     label="Location"
//                     value={this.state.location}
//                     name="location"
//                     control="input"
//                     onChange={this.onChangeHandler}
//                   ></Form.Field>
//                 </Form.Group>
//                 <Form.Field>
//                   <label>First.Last Name</label>
//                   <input
//                     type="text"
//                     value={this.state.name}
//                     onChange={this.onChangeHandler}
//                     placeholder="Full Name"
//                     name="name"
//                   />
//                 </Form.Field>
//                 <Form.Group>
//                   <Form.Field
//                     label="Manager"
//                     value={this.state.manager}
//                     name="manager"
//                     control={Select}
//                     options={divisionManagers}
//                     onChange={this.onSelectHandler}
//                   />
//                   <Form.Field
//                     label="Division"
//                     value={this.state.division}
//                     name="division"
//                     control={Select}
//                     options={divisions}
//                     onChange={this.onSelectHandler}
//                   />
//                 </Form.Group>
//                 <Form.Field>
//                   <label>Comments</label>
//                   <textarea
//                     name="description"
//                     value={this.state.description}
//                     onChange={this.onChangeHandler}
//                   />
//                 </Form.Field>
//                 <Form.Field>
//                   <Checkbox
//                     onChange={this.onTeleWorkCheckHandler}
//                     checked={this.state.teleWork}
//                     label="Will this device be used for teleworking"
//                   />
//                 </Form.Field>
//                 {this.state.submitError ? (
//                   <Label
//                     color="red"
//                     content="Serial number and name cannot be empty!"
//                   />
//                 ) : null}
//               </Form>

//               <Container style={{ marginBottom: "40px" }} textAlign="center">
//                 <Button onClick={this.onFormSubmit}>Submit</Button>
//               </Container>
//             </Segment.Group>
//           </Segment>
//         </Fragment>
//       </div>
//     );
//   }
// }

// export default monitorInventoryCheckout;
