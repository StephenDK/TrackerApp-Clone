import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { GetComputerData } from "../../actions/dataActions";
import moment from "moment";
// import { styled, useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom"; // Import Link for routing
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Box,
  Typography,
  Stack,
  InputAdornment,
  IconButton,
  OutlinedInput,
  InputLabel,
  FormControl,
  Divider,
} from "@mui/material";
import { showLoading, hideLoading } from "../../actions/loadingActions";

import ViewPort from "../utils/viewPort";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const columns = [
  {
    field: "serial",
    headerName: "Serial",
    flex: 0.5,
    editable: false,
    sortable: true,
  },
  {
    field: "name",
    headerName: "Computer Name",
    width: 200,
    flex: 0.3,
    sortable: true,
    editable: false,
  },
  {
    field: "make",
    headerName: "Make",
    width: 200,
    flex: 0.2,
    sortable: true,
    editable: false,
  },
  {
    field: "model",
    headerName: "Model",
    width: 250,
    flex: 0.4,
    sortable: true,
    editable: false,
  },
  {
    field: "user",
    headerName: "User",
    width: 250,
    flex: 0.4,
    sortable: true,
    editable: false,
  },
  {
    field: "location",
    headerName: "Location",
    width: 250,
    flex: 0.4,
    sortable: true,
    editable: false,
  },
  {
    field: "lastUpdated",
    headerName: "Last Updated",
    sortable: true,
    flex: 0.5,
    valueGetter: (params) => {
      if (params.row.lastUpdated === null) {
        return null;
      }
      return moment(params.row.lastUpdated).format(
        "dddd, MMMM Do YYYY, h:mm:ss a"
      );
    },
  },
  {
    field: "button",
    headerName: "View More", // Customize the header name
    width: 130,

    editable: false,
    sortable: false, // This column should not be sortable
    renderCell: (params) => (
      <Link
        to={`/${params.row.type}/${params.row.id}`}
        style={{ textDecoration: "none" }}
      >
        <Button color="primary" variant="contained" fullWidth>
          View Details
        </Button>
      </Link>
    ),
  },
];

function Computers(props) {
  const dispatch = useDispatch();
  // const theme = useTheme();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    let initializePage = async () => {
      // Show loading
      dispatch(showLoading());
      // Make API call for checked out computers
      await dispatch(GetComputerData());

      // Hide loading
      dispatch(hideLoading());
    };

    initializePage();
  }, []);

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
  };

  const cancelSearch = () => {
    setSearchText("");
  };

  // Filter rows based on searchText
  const filteredRows = props.data.Computers.filter((o) =>
    Object.keys(o).some((k) => {
      return new RegExp(`.*${searchText}.*`, "ig").test(o[k]?.toString());
    })
  );

  return (
    <ViewPort>
      <Stack
        direction="row"
        spacing={3}
        style={{
          display: "flex",
          justifyContent: "flex-start",
          marginBottom: "6px",
        }}
        divider={<Divider orientation="vertical" flexItem />}
      >
        <div>
          <Typography
            variant="h5"
            sx={{
              mb: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%", // Optional: If you want to center within a specific height
            }}
          >
            Checked Out Computers
          </Typography>
        </div>
        <FormControl>
          <InputLabel>Search</InputLabel>
          <OutlinedInput
            fullWidth
            value={searchText}
            name="searchText"
            onChange={(e) => requestSearch(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={cancelSearch}
                  edge="end"
                  color="error"
                >
                  {<HighlightOffIcon />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </Stack>
      <Box sx={{ height: "92%", width: "100%" }}>
        <DataGrid
          paginationMode="client"
          rows={filteredRows}
          columns={columns}
          loading={props.loading.isLoading}
          // slots={{ toolbar: GridFilterForm }}
          // autoPageSize
          // disableExtendRowFullWidth
          // hideFooterPagination
          // initialState={{
          //   pagination: {
          //     paginationModel: {
          //       pageSize: 5,
          //     },
          //   },
          // }}
          // checkboxSelection

          sx={{
            "& .MuiTablePagination-displayedRows": {
              // Apply your inline styles here
              margin: 0,
            },
            "& .MuiTablePagination-selectLabel": {
              // Apply your inline styles here
              margin: 0,
            },
          }}
          disableSelectionOnClick
          disableRowSelectionOnClick
          disableColumnSelector
          cellModesModel={{ type: "view" }}
          // onRowClick={handleRowClick}
        />
      </Box>
    </ViewPort>
  );
}

function mapStateToProps({ data, loading }) {
  return { data, loading };
}

export default connect(mapStateToProps, {
  GetComputerData,
  showLoading,
  hideLoading,
})(Computers);

// import React, { Component, Fragment } from "react";
// import axios from "axios";
// import config from "../../config";
// // import { Dropdown } from "semantic-ui-react";
// import { Loader, Segment, Search } from "semantic-ui-react";
// // components
// import ComputerList from "./computerList";

// import "./styles/computerStyles.css";

// class Computers extends Component {
//   state = {
//     data: [],
//     search: "",
//     loading: true,
//     option: false,
//   };

//   async componentDidMount() {
//     const response = await axios.get(
//       `${config.apiUrl}/api/v1/computers/?checkedOut=true`
//     );

//     // let checkedOutComputers = response.data.computers.filter(
//     //   (item) => item.checkedOut === true
//     // );
//     // console.log('Non Free Agents', checkedOutComputers);
//     console.log(response.data.data);
//     this.setState({
//       data: response.data.data,
//       loading: false,
//     });
//     console.log("This.State", this.state);
//   }

//   sortResultsHandler = async (srtVal) => {
//     try {
//       let request = await axios.get(
//         `${config.apiUrl}/api/v1/computers?checkedOut=true&sort=${srtVal}`
//       );
//       console.log(request);
//       this.setState({
//         data: request.data.data,
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   onSearchHandler = (event) => {
//     // console.log(event.target.value)
//     this.setState({
//       search: event.target.value,
//     });
//   };

//   onCheckHandler = (event) => {
//     console.log(event.target.value);
//     this.setState({
//       option: !this.state.option,
//     });
//   };

//   computerDynamicSearch = () => {
//     // let val = this.state.option ? 'userName' : false || 'computerSerial';
//     return this.state.data.filter((item) =>
//       item.computerSerial
//         .toLowerCase()
//         .includes(this.state.search.toLowerCase())
//     );
//   };

//   render() {
//     return (
//       <div style={{ marginTop: "60px" }}>
//         <Fragment>
//           {this.state.loading ? (
//             <Segment loading style={{ height: "150px" }}>
//               <Loader />
//             </Segment>
//           ) : (
//             <Fragment>
//               <h2>Checked Out Computers</h2>
//               <Search
//                 value={this.state.search}
//                 onSearchChange={this.onSearchHandler}
//                 view={"inline-block"}
//                 showNoResults={false}
//               />
//               {/* <Dropdown
//               text="Sort"
//               icon="sort"
//               floating
//               labeled
//               button
//               className="icon"
//               direction="right"
//             >
//               <Dropdown.Menu style={{ width: "165px" }}>
//                 <Dropdown.Header icon="tags" content="Sort by Value" />
//                 <Dropdown.Item
//                   onClick={() => {
//                     this.sortResultsHandler("-createdAt");
//                   }}
//                   description={this.state.totalCount}
//                   text="Newest to Oldest"
//                 />
//                 <Dropdown.Item
//                   onClick={() => {
//                     this.sortResultsHandler("createdAt");
//                   }}
//                   description={this.state.desktopCount}
//                   text="Oldest to Newest"
//                 />
//                 <Dropdown.Item
//                   onClick={() => {
//                     this.sortResultsHandler("userName");
//                   }}
//                   description={this.state.laptopCount}
//                   text="A-Z"
//                 />
//                 <Dropdown.Item
//                   onClick={() => {}}
//                   description={this.state.monitorCount}
//                   text="Z-A"
//                 />
//                 <Dropdown.Item
//                   onClick={() => {
//                     this.sortResultsHandler("-location");
//                   }}
//                   description={this.state.dockCount}
//                   text="Location"
//                 />
//               </Dropdown.Menu>
//             </Dropdown> */}
//               <ComputerList computers={this.computerDynamicSearch()} />
//             </Fragment>
//           )}
//         </Fragment>
//       </div>
//     );
//   }
// }

// export default Computers;
