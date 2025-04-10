// Component: WIP
// Template Styles: WIP
import React, { Fragment, useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import config from "../../../config";
import axios from "axios";
// import { useTheme } from "@mui/material/styles";
import { GetDockFile } from "../../../actions/filesActions";
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
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import DockIcon from "@mui/icons-material/Dock";

import LoadingForm from "../../loading/loadingComputerForm";
import ModelSelectField from "../../utils/modelSelectField";

function NewDockingstation(props) {
  const dispatch = useDispatch();
  // const theme = useTheme();
  const [dockSerial, setDockSerial] = useState("");
  const [dockMake, setDockMake] = useState("");
  const [dockModel, setDockModel] = useState("");
  const [uniqueMakes, setUniqueMakes] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);
  const [dockSerialValid, setDockSerialValid] = useState(false);

  useEffect(() => {
    let initializePage = async () => {
      dispatch(showLoading());

      // Make the API request for docks
      await dispatch(GetDockFile());

      dispatch(hideLoading());
    };

    initializePage();
  }, []);

  useEffect(() => {
    if (props.files.jsonFiles.docks && props.files.jsonFiles.docks.length > 0) {
      let makes = [];
      props.files.jsonFiles.docks.forEach((item) => {
        if (!makes.includes(item.make)) {
          makes.push(item.make);
        }
      });
      setUniqueMakes([...makes]);
    }
  }, [props.files.jsonFiles.docks]);

  // onSubmitHandler
  const onSubmitHandler = async (event) => {
    try {
      // get token
      let token = await localStorage.getItem("token");

      let data = {
        token,
        dockSerial,
        dockMake,
        dockModel,
      };

      console.log("DATA", data);
      const request = await axios.post(
        `${config.apiUrl}/api/v1/dockingstations/adddockinstation`,
        data
      );
      if (request.status === 200) {
        dispatch(setSuccess("Item Successfully Inventoried"));
      }

      setDockSerial("");
      setDockMake("");
      setDockModel("");
    } catch (err) {
      // console.log(err.response.data);
      dispatch(setError(err.response.data.error));
    }
  };

  // onChangeHandler
  const handleFieldChange = (fieldName, e) => {
    switch (fieldName) {
      case "dockSerial":
        validateSerial(e.target.value);
        setDockSerial(e.target.value);
        break;
      case "dockMake":
        setDockMake(e.target.value);
        const filteredModels = props.files.jsonFiles.docks
          .filter((item) => item.make === e.target.value)
          .map((item) => item.model);
        setSelectedModels(filteredModels);
        setDockModel("");
        break;
      case "dockModel":
        setDockModel(e.target.value);
        break;
      default:
        break;
    }
  };

  // input validation
  const validateSerial = (input) => {
    const blacklistedChars = /^[-/.\w:]+$/;

    // Expression Check
    if (blacklistedChars.test(input)) {
      setDockSerialValid(false);
    } else {
      setDockSerialValid(true);
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
            <DockIcon />
          </Avatar>
          <Typography variant="h4" sx={{ mb: "40px" }}>
            Inventory New Docking Station
          </Typography>
          <Grid container spacing={3} rowSpacing={3}>
            <Grid item xs={12} sm={12}>
              <TextField
                error={dockSerialValid}
                required
                id="serial"
                name="serial"
                label="Serial"
                value={dockSerial}
                fullWidth
                helperText={
                  dockSerialValid ? "Incorrect character in serial" : null
                }
                onChange={(e) => handleFieldChange("dockSerial", e)}
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
                value={dockMake}
                onChange={(e) => handleFieldChange("dockMake", e)}
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
                field="dockModel"
                deviceModel={dockModel}
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
                disabled={
                  !dockSerialValid && dockMake && dockModel ? false : true
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
  GetDockFile,
  showLoading,
  hideLoading,
})(NewDockingstation);

// class newDockingStation extends Component {
//   state = {
//     dockSerial: "",
//     dockMake: "",
//     dockModel: "",
//     successFlag: false,
//     errorFlag: false,
//   };

//   onSelectHandler = (e, { value, name }) => {
//     // console.log(name)
//     // console.log(value);
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
//       let token = localStorage.getItem("token");
//       let { dockSerial, dockModel, dockMake } = this.state;
//       let data = {
//         token,
//         dockingStationSerial: dockSerial,
//         dockingStationMake: dockMake,
//         dockingStationModel: dockModel,
//       };

//       let response = await axios.post(
//         `${config.apiUrl}/api/v1/dockingstations/adddockinstation`,
//         data
//       );
//       // console.log(data);
//       console.log(response);
//       if (response.status === 200) {
//         this.setState({
//           successFlag: true,
//         });
//         this.onChangeFlagHandler("successFlag", false);
//       } else if (response.status !== 200) {
//         this.setState({
//           errorFlag: true,
//         });
//         this.onChangeFlagHandler("errorFlag", false);
//       }

//       this.setState({
//         dockSerial: "",
//         dockMake: "",
//         dockModel: "",
//       });
//     } catch (err) {
//       console.log(err.response);
//     }
//   };

//   onChangeFlagHandler = (flag, val) => {
//     setTimeout(() => {
//       this.setState({
//         [flag]: val,
//       });
//     }, 3500);
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
//               <Message.Header>Error Occured</Message.Header>
//             </Message>
//           ) : null}
//           <Form className="form" style={{ marginTop: "10px" }}>
//             <Form.Group>
//               <Form.Field>
//                 <label>Dockingstation Serial:</label>
//                 <input
//                   name="dockSerial"
//                   onChange={this.onChangeHandler}
//                   type="text"
//                   value={this.state.dockSerial}
//                   placeholder="Serial"
//                 />
//               </Form.Field>
//               <Form.Field
//                 label="Make"
//                 value={this.state.dockMake}
//                 name="dockMake"
//                 control={Select}
//                 options={dockMake}
//                 onChange={this.onSelectHandler}
//               />
//               <Form.Field
//                 label="Model"
//                 value={this.state.dockModel}
//                 name="dockModel"
//                 control={Select}
//                 options={dockModel}
//                 onChange={this.onSelectHandler}
//               />
//             </Form.Group>
//             <Form.Group>
//               <input
//                 value="Submit"
//                 type="button"
//                 name="Submit"
//                 onClick={this.onSubmitHandler}
//               />
//             </Form.Group>
//           </Form>
//         </Fragment>
//       </div>
//     );
//   }
// }

// export default newDockingStation;
