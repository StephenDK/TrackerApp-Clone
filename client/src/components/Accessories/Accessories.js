import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { GetAccessoryData } from "../../actions/dataActions";
import moment from "moment";
// import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom"; // Import Link for routing
// import { useHistory } from "react-router-dom";
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
    field: "barcode",
    headerName: "Barcode",

    flex: 0.3,
    sortable: true,
    editable: false,
  },
  {
    field: "serial",
    headerName: "Serial",
    flex: 0.5,
    editable: false,
    sortable: true,
  },
  {
    field: "make",
    headerName: "Make",

    flex: 0.2,
    sortable: true,
    editable: false,
  },
  {
    field: "model",
    headerName: "Model",

    flex: 0.4,
    sortable: true,
    editable: false,
  },
  {
    field: "user",
    headerName: "User",

    flex: 0.4,
    sortable: true,
    editable: false,
  },
  {
    field: "category",
    headerName: "Category",

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

function Accessories(props) {
  const dispatch = useDispatch();
  // const history = useHistory();
  // const theme = useTheme();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    let initializePage = async () => {
      // Show loading
      dispatch(showLoading());
      // Make API call for checked out Accessories
      await dispatch(GetAccessoryData());
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
  const filteredRows = props.data.Accessories.filter((o) =>
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
            Checked Out Accessories
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
      <Box sx={{ height: "95%", width: "100%" }}>
        <DataGrid
          paginationMode="client"
          rows={filteredRows}
          columns={columns}
          loading={props.loading.isLoading}
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
  GetAccessoryData,
  showLoading,
  hideLoading,
})(Accessories);

// import React, { Component, Fragment } from "react";
// import axios from "axios";
// import { Header, Segment, Loader } from "semantic-ui-react";
// import config from "../../config";

// // components
// import AccessoryList from "./accessoryList";

// class Accessories extends Component {
//   state = {
//     data: [],
//     search: "",
//     option: false,
//     loading: true,
//   };

//   async componentDidMount() {
//     const response = await axios.get(`${config.apiUrl}/api/v1/accessory`);

//     // Filter for Checked Out Accessories
//     let checkedOutAccessories = response.data.accessories.filter(
//       (item) => item.checkedOut === true
//     );

//     console.log();
//     this.setState({
//       data: checkedOutAccessories,
//       loading: false,
//     });
//   }

//   // onSearchHandler = (event) => {
//   //   // console.log(event.target.value)
//   //   this.setState({
//   //     search: event.target.value
//   //   });
//   // };

//   // onCheckHandler = (event) => {
//   //   console.log(event.target.value);
//   //   this.setState({
//   //     option: !this.state.option
//   //   });
//   // };

//   // computerDynamicSearch = () => {
//   //   // let val = this.state.option ? 'userName' : false || 'computerSerial';
//   //   return this.state.data.filter((item) =>
//   //     item.computerSerial
//   //       .toLowerCase()
//   //       .includes(this.state.search.toLowerCase())
//   //   );
//   // };

//   render() {
//     return (
//       <div>
//         <Fragment>
//           {this.state.loading ? (
//             <Segment loading style={{ height: "150px" }}>
//               <Loader />
//             </Segment>
//           ) : (
//             <Fragment>
//               <div style={{ marginTop: "60px" }}></div>
//               <Header as="h2">Checked Out Accessories</Header>
//               {/* <AccessoryList items={this.computerDynamicSearch()} /> */}
//               <AccessoryList items={this.state.data} />
//             </Fragment>
//           )}
//         </Fragment>
//       </div>
//     );
//   }
// }

// export default Accessories;
