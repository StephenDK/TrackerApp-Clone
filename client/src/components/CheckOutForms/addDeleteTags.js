import React, { Component, Fragment } from "react";
import axios from "axios";
import config from "../../config";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import Chip from "@mui/material/Chip";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import LabelIcon from "@mui/icons-material/Label";
import Avatar from "@mui/material/Avatar";

class AddDeleteTags extends Component {
  state = {
    tag: "",
    errorMessage: "",
  };

  onChangehandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onFormSubmit = async (event) => {
    event.preventDefault();
    try {
      let token = await localStorage.getItem("token");

      let data = {
        token,
        tag: this.state.tag,
      };
      console.log("SUBMITTING REQUEST", data);
      const request = await axios.put(
        `${config.apiUrl}/api/v1/${this.props.val}/tag/add/${this.props.id}`,
        data
      );

      console.log(request.data.data);
      // Call rerender component and close tag form
      this.props.reRender(request.data.data);
      // Close tag form
      this.props.toggleForm();
      // Scroll to top
      this.props.scrollToTop();
    } catch (err) {
      console.log(err.response);
      this.setState({
        errorMessage: err.response.data.error,
      });
      this.onHandleErrorMessage();
    }
  };

  onHandleErrorMessage = () => {
    setTimeout(() => {
      this.setState({
        errorMessage: "",
      });
    }, 3000);
  };

  onHandleDelete = async (tagText) => {
    try {
      let token = await localStorage.getItem("token");

      let data = {
        token,
        tag: tagText,
      };
      const request = await axios.put(
        `${config.apiUrl}/api/v1/${this.props.val}/tag/delete/${this.props.id}`,
        data
      );
      console.log(request);
      // Call rerender component and close tag form
      this.props.reRender(request.data.data);
      // Close tag form
      this.props.toggleForm();
      // Scroll to top
      this.props.scrollToTop();
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    console.log(this.props.id);
    return (
      <Fragment>
        <CssBaseline />
        <Grid container spacing={5}>
          <Grid item xs={12} sm={12} md={6}>
            <Box
              sx={{
                marginTop: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LabelIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Add Tag
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1, width: "50%" }}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="tag"
                  label="Tag"
                  name="tag"
                  helperText={
                    <Typography
                      variant="caption"
                      color="red"
                      style={{ fontSize: "15px" }}
                    >
                      {this.state.errorMessage}
                    </Typography>
                  }
                  autoFocus
                  onChange={this.onChangehandler}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  onClick={this.onFormSubmit}
                  sx={{ mt: 3, mb: 2 }}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Box
              sx={{
                marginTop: 4,
                paddingLeft: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h5">Remove Tags</Typography>
              <Box
                sx={{
                  marginTop: "15px",
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap", // Add this flexWrap property
                }}
              >
                {this.props.tags.length < 1 ? (
                  <p>No Tags</p>
                ) : (
                  this.props.tags.map((item, index) => (
                    <Chip
                      label={item}
                      key={index}
                      onDelete={() => this.onHandleDelete(item)}
                      sx={{ margin: "7px" }} // Add margin between chips
                    />
                  ))
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default AddDeleteTags;

//   <Fragment>
//     <Container maxWidth="md">
//       <Typography variant="h4" align="center">
//         Add Tag
//       </Typography>
//       <Box
//         display="flex"
//         flexDirection="column" // Arrange items in a column layout
//         justifyContent="center"
//         alignItems="center"
//         component="form"
//         noValidate
//         autoComplete="off"
//       >
//         <Box className="tag-field" display="flex" alignItems="center">
//           <TextField
//             id="outlined-basic"
//             name="tag"
//             label="Tag"
//             variant="outlined"
//             onChange={this.onChangehandler}
//             style={{ width: "50%" }}
//           />
//         </Box>
//         <Box mt={2}>
//           {" "}
//           {/* Add margin to create space between input and button */}
//           <Button
//             variant="contained"
//             endIcon={<SendIcon />}
//             onClick={this.onFormSubmit}
//           >
//             Send
//           </Button>
//         </Box>
//       </Box>
//       <Stack direction="row" spacing={1}>
//         {this.props.tags.length < 1 ? (
//           <p>No Tags</p>
//         ) : (
//           this.props.tags.map((item, index) => (
//             <Chip
//               label={item}
//               key={index}
//               onDelete={() => console.log("Deleting")}
//             />
//           ))
//         )}
//       </Stack>
//     </Container>
//   </Fragment>
