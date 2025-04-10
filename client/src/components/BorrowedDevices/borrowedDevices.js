import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { GetITAMData } from "../../actions/dataActions";
import moment from "moment";
// import { styled, useTheme } from "@mui/material/styles";
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
    field: "serial",
    headerName: "Serial",
    flex: 0.4,
    editable: false,
    sortable: true,
  },
  {
    field: "deviceType",
    headerName: "Type",
    flex: 0.2,
    sortable: true,
    editable: false,
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
    flex: 0.3,
    sortable: true,
    editable: false,
  },
  {
    field: "user",
    headerName: "User",
    flex: 0.3,
    sortable: true,
    editable: false,
  },
  {
    field: "division",
    headerName: "Division",
    flex: 0.2,
    sortable: true,
    editable: false,
  },
  {
    field: "location",
    headerName: "Location",
    flex: 0.3,
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

function BorrowedDevices(props) {
  const dispatch = useDispatch();
  // const history = useHistory();
  // const theme = useTheme();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    let initializePage = async () => {
      // Show loading
      dispatch(showLoading());
      // Make API call for checked out computers
      await dispatch(GetITAMData());
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
  const filteredRows = props.data.ITAM.filter((o) =>
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
            Checked Out ITAM Equipment
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
  GetITAMData,
  showLoading,
  hideLoading,
})(BorrowedDevices);

// import React, { Fragment } from "react";

// import { Divider } from "semantic-ui-react";

// // Components
// import ListBorrowedDevices from "./listBorrowedDevices";

// // class borrowedDevices extends Component {

// //   render() {
// //     return (
// //       <Fragment>
// //         {/* Section for adding devices */}
// //         <AddBorrowedDevices />
// //         <Divider hidden />
// //         <h2>Borrowed Devices From TSS</h2>
// //         <ListBorrowedDevices />
// //         {/* section for showing all devices */}
// //       </Fragment>
// //     );
// //   }
// // }

// const borrowedDevices = () => {
//   let refresh = false;

//   // const refreshComponent = () => {
//   //   refresh = !refresh;
//   //   console.log(refresh);
//   // }

//   // console.log('First Console', refresh);

//   // refreshComponent();

//   // console.log('Second Console', refresh);

//   return (
//     <Fragment>
//       <div style={{ marginTop: "60px" }} />
//       {/* Section for adding devices */}
//       {/* <AddBorrowedDevices
//         // refreshComp={refreshComponent}
//       /> */}
//       {/* <Divider hidden /> */}
//       <h2>Borrowed Devices From TSS</h2>
//       <ListBorrowedDevices refreshComp={refresh} />
//       {/* section for showing all devices */}
//     </Fragment>
//   );
// };

// export default borrowedDevices;
