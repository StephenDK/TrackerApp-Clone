import React, { useEffect, useState, Fragment } from "react";
import { connect, useDispatch } from "react-redux";
import config from "../../../config";
import Axios from "axios";
import moment from "moment";
// import { styled, useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom"; // Import Link for routing
import { DataGrid } from "@mui/x-data-grid";
import { Button, Box, Typography, Stack, Divider } from "@mui/material";
import { showLoading, hideLoading } from "../../../actions/loadingActions";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const columns = [
  {
    field: "author",
    headerName: "Author",
    // width: 200,
    flex: 0.3,
    sortable: true,
    editable: false,
  },
  {
    field: "action",
    headerName: "Action",
    // flex: 0.5,
    editable: false,
    sortable: true,
  },

  {
    field: "createdAt",
    headerName: "Date Created",
    sortable: true,
    flex: 0.5,
    valueGetter: (params) => {
      if (params.row.createdAt === null) {
        return null;
      }
      return moment(params.row.createdAt).format(
        "dddd, MMMM Do YYYY, h:mm:ss a"
      );
    },
  },
  // {
  //   field: "button",
  //   headerName: "View More", // Customize the header name
  //   width: 130,

  //   editable: false,
  //   sortable: false, // This column should not be sortable
  //   renderCell: (params) => (
  //     <Link
  //       to={`/${params.row.type}/${params.row.id}`}
  //       style={{ textDecoration: "none" }}
  //     >
  //       <Button color="primary" variant="contained" fullWidth>
  //         View Details
  //       </Button>
  //     </Link>
  //   ),
  // },
];

function Actions(props) {
  const dispatch = useDispatch();
  // const theme = useTheme();
  const [actions, setActions] = useState([]);

  useEffect(() => {
    let initializePage = async () => {
      // Show loading
      dispatch(showLoading());
      // // Make API call for checked out computers
      let fetchActions = await Axios.get(`${config.apiUrl}/api/v1/actions`);

      console.log(fetchActions.data.data);
      setActions(fetchActions.data.data);
      // Hide loading
      dispatch(hideLoading());
    };

    initializePage();
  }, []);

  return (
    <Fragment>
      <Stack
        direction="row"
        spacing={3}
        style={{
          display: "flex",
          justifyContent: "flex-start",
          marginBottom: "6px",
        }}
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
            Tracker Actions
          </Typography>
        </div>
      </Stack>
      <Box sx={{ height: "80%", width: "80%" }}>
        <DataGrid
          paginationMode="client"
          rows={actions}
          columns={columns}
          loading={props.loading.isLoading}
          getRowId={(row) => row._id}
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
    </Fragment>
  );
}

function mapStateToProps({ data, loading }) {
  return { data, loading };
}

export default connect(mapStateToProps, {
  showLoading,
  hideLoading,
})(Actions);
