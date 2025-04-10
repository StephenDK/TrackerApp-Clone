import React, { Fragment, useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import config from "../../../config";
import axios from "axios";
import { GetPhoneFile } from "../../../actions/filesActions";
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
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";

import LoadingForm from "../../loading/loadingComputerForm";
import ModelSelectField from "../../utils/modelSelectField";

// Start of form validation
const normalizeInput = (value, previousValue) => {
  if (!value) return value;
  const currentValue = value.replace(/[^\d]/g, "");
  const cvLength = currentValue.length;

  if (!previousValue || value.length > previousValue.length) {
    if (cvLength < 4) return currentValue;
    if (cvLength < 7)
      return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;
    return `(${currentValue.slice(0, 3)}) ${currentValue.slice(
      3,
      6
    )}-${currentValue.slice(6, 10)}`;
  }
};

function NewPhone(props) {
  // State
  const [imei, setIMEI] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [uniqueMakes, setUniqueMakes] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);
  const [imeiValid, setIMEIValid] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    let initializePage = async () => {
      dispatch(showLoading());

      // Make the API request for phones
      await dispatch(GetPhoneFile());

      dispatch(hideLoading());
    };

    initializePage();
  }, []);

  useEffect(() => {
    if (
      props.files.jsonFiles.phones &&
      props.files.jsonFiles.phones.length > 0
    ) {
      let makes = [];
      props.files.jsonFiles.phones.forEach((item) => {
        if (!makes.includes(item.make)) {
          makes.push(item.make);
        }
      });
      setUniqueMakes([...makes]);
    }
  }, [props.files.jsonFiles.phones]);

  const onSubmitHandler = async (event) => {
    try {
      // Get token
      let token = await localStorage.getItem("token");

      let data = {
        token,
        phoneIMEI: imei,
        phoneNumber,
        phoneMake: make,
        phoneModel: model,
      };

      console.log("DATA", data);
      const request = await axios.post(`${config.apiUrl}/api/v1/phones`, data);
      if (request.status === 200) {
        dispatch(setSuccess("Item Successfully Inventoried"));
      }

      setIMEI("");
      setPhoneNumber("");
      setMake("");
      setModel("");
    } catch (err) {
      console.log(err.response.data);
      console.log("DISPATCH(): ", err.response.data.error);
      dispatch(setError(err.response.data.error));
    }
  };

  const handleFieldChange = (fieldName, e) => {
    switch (fieldName) {
      case "imei":
        validateSerial(e.target.value);
        setIMEI(e.target.value);
        break;
      case "make":
        setMake(e.target.value);
        const filteredModels = props.files.jsonFiles.phones
          .filter((item) => item.make === e.target.value)
          .map((item) => item.model);
        setSelectedModels(filteredModels);
        setModel("");
        break;
      case "model":
        setModel(e.target.value);
        break;
      default:
        break;
    }
  };
  const handlePhoneNumberChange = ({ target: { value } }) => {
    // Old Code
    // this.setState((prevState) => ({
    //   phoneNumber: normalizeInput(value, prevState.phoneNumber),
    // }));
    // New Code
    setPhoneNumber(normalizeInput(value, phoneNumber));
  };

  const validateSerial = (input) => {
    const blacklistedChars = /^[-/.\w:]+$/;

    // Expression Check
    if (blacklistedChars.test(input)) {
      setIMEIValid(false);
    } else {
      setIMEIValid(true);
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
            <PhoneIphoneIcon />
          </Avatar>
          <Typography variant="h4" sx={{ mb: "40px" }}>
            Inventory New Phone
          </Typography>
          <Grid container spacing={3} rowSpacing={3}>
            <Grid item xs={12} sm={7}>
              <TextField
                error={imeiValid}
                required
                id="imei"
                name="imei"
                label="IMEI"
                value={imei}
                fullWidth
                helperText={imeiValid ? "Incorrect character in IMEI" : null}
                onChange={(e) => handleFieldChange("imei", e)}
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                // error={imeiValid}
                id="number"
                name="number"
                label="Phone Number"
                value={phoneNumber}
                fullWidth
                // helperText={imeiValid ? "Incorrect character in IMEI" : null}
                onChange={(e) => handlePhoneNumberChange(e)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Make*</InputLabel>
              <Select
                sx={{
                  width: "100%",
                }}
                // label="Make"
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
                field="model"
                deviceModel={model}
                onChangeHandler={handleFieldChange}
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
                disabled={!imeiValid && imei && make && model ? false : true}
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
  GetPhoneFile,
  showLoading,
  hideLoading,
})(NewPhone);

// import React, { Component, Fragment } from "react";
// import { Form, Select, Message } from "semantic-ui-react";
// import config from "../../../config";
// import axios from "axios";
// import PhoneModels from "../../Data/phoneModels";

// // Start of form validation
// const normalizeInput = (value, previousValue) => {
//   if (!value) return value;
//   const currentValue = value.replace(/[^\d]/g, "");
//   const cvLength = currentValue.length;

//   if (!previousValue || value.length > previousValue.length) {
//     if (cvLength < 4) return currentValue;
//     if (cvLength < 7)
//       return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;
//     return `(${currentValue.slice(0, 3)}) ${currentValue.slice(
//       3,
//       6
//     )}-${currentValue.slice(6, 10)}`;
//   }
// };

// const validateInput = (value) => {
//   let error = "";

//   if (!value) error = "Required!";
//   else if (value.length !== 14)
//     error = "Invalid phone format. ex: (555) 555-5555";

//   return error;
// };
// // End of form validation

// class NewPhone extends Component {
//   // Start of form validation
//   constructor() {
//     super();

//     this.state = {
//       phoneNumber: "",
//       error: "",
//       phoneIMEI: "",
//       phoneMake: "",
//       phoneModel: "",
//       successflag: false,
//       errorFlag: false,
//       msg: "",
//     };
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.handleReset = this.handleReset.bind(this);
//   }

//   handleChange({ target: { value } }) {
//     this.setState((prevState) => ({
//       phoneNumber: normalizeInput(value, prevState.phoneNumber),
//     }));
//   }

//   handleSubmit(e) {
//     e.preventDefault();
//     const error = validateInput(this.state.phoneNumber);

//     this.setState({ error }, () => {
//       if (!error) {
//         setTimeout(() => {
//           alert(JSON.stringify(this.state, null, 4));
//         }, 300);
//       }
//     });
//   }

//   handleReset() {
//     this.setState({ phoneNumber: "", error: "" });
//   }
//   // End of form validation

//   onChangeHandler = (event) => {
//     this.setState({ [event.target.name]: event.target.value });
//   };

//   onSelectHandler = (e, { value, name }) => {
//     this.setState({
//       [name]: value,
//     });
//   };

//   onCheckHandler = (e, { value, name }) => {
//     this.setState((prevState) => ({
//       peripherals: [value],
//     }));
//   };

//   onChangeFlagHandler = (flag, val) => {
//     setTimeout(() => {
//       this.setState({
//         [flag]: val,
//       });
//     }, 4000);
//   };

//   onSubmitHandler = async (event) => {
//     console.log("Submiting State", this.state);
//     const { phoneNumber, phoneIMEI, phoneMake, phoneModel } = this.state;

//     let token = await localStorage.getItem("token");

//     let data = {
//       token,
//       phoneNumber,
//       phoneIMEI,
//       phoneMake,
//       phoneModel,
//     };

//     try {
//       const request = await axios.post(`${config.apiUrl}/api/v1/phones`, data);
//       if (request.status === 200) {
//         this.setState({
//           successFlag: true,
//         });
//         this.onChangeFlagHandler("successFlag", false);

//         this.setState({
//           phoneNumber: "",
//           error: "",
//           phoneIMEI: "",
//           phoneMake: "",
//           phoneModel: "",
//         });
//       }
//     } catch (err) {
//       this.setState({
//         errorFlag: true,
//         msg: err.response.data.error,
//       });
//       this.onChangeFlagHandler("errorFlag", false);
//     }
//   };

//   render() {
//     return (
//       <div style={{ marginTop: "60px" }}>
//         <Fragment>
//           {this.state.successFlag ? (
//             <Message color="green">
//               <Message.Header>Your item was inventoried</Message.Header>
//             </Message>
//           ) : null}
//           {this.state.errorFlag ? (
//             <Message color="red">
//               <Message.Header>{this.state.msg}</Message.Header>
//             </Message>
//           ) : null}
//           <Form className="form" style={{ marginTop: "10px" }}>
//             <Form.Group>
//               <Form.Field>
//                 <label>Phone IMEI:</label>
//                 <input
//                   name="phoneIMEI"
//                   onChange={this.onChangeHandler}
//                   type="text"
//                   value={this.state.phoneIMEI}
//                   placeholder="IMEI #"
//                 />
//               </Form.Field>
//               <Form.Field>
//                 <label>Phone Number:</label>
//                 <input
//                   type="text"
//                   name="phoneNumber"
//                   value={this.state.phoneNumber}
//                   onChange={this.handleChange}
//                   placeholder="(123) 456-7890"
//                 />
//               </Form.Field>
//               <Form.Field
//                 label="Make"
//                 name="phoneMake"
//                 value={this.state.phoneMake}
//                 control={Select}
//                 options={phoneMakes}
//                 onChange={this.onSelectHandler}
//               />
//               <Form.Field
//                 label="Model"
//                 name="phoneModel"
//                 value={this.state.phoneModel}
//                 control={Select}
//                 options={PhoneModels}
//                 onChange={this.onSelectHandler}
//               />
//             </Form.Group>
//             <input
//               value="Submit"
//               type="button"
//               name="Submit"
//               onClick={this.onSubmitHandler}
//             />
//           </Form>
//         </Fragment>
//       </div>
//     );
//   }
// }

// export default NewPhone;
