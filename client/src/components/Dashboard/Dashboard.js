import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
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
import { GetInventoryData } from "../../actions/dataActions";
import { showLoading, hideLoading } from "../../actions/loadingActions";

import ViewPort from "../utils/viewPort";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const columns = [
  {
    field: "serial",
    headerName: "Serial",
    flex: 0.8,
    editable: false,
    sortable: true,
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
    field: "type",
    headerName: "Type",
    width: 150,
    editable: false,
    sortable: true,
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

function Dashboard(props) {
  const dispatch = useDispatch();
  // const history = useHistory();
  // const theme = useTheme();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    let initializePage = async () => {
      dispatch(showLoading());
      // Make API call for computer types file

      await dispatch(GetInventoryData());

      dispatch(hideLoading());
    };

    initializePage();
  }, []);

  // Printing functionality
  // const handlePrint = () => {
  //   console.log("Handeling Print");
  //   const gridState = apiRef;
  //   console.log("GRID STATE: ", gridState.current.getDataAsCsv());
  // };

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
  };

  const cancelSearch = () => {
    setSearchText("");
  };

  // Filter rows based on searchText
  const filteredRows = props.data.Inventory.filter((o) =>
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
            ASD Inventory
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
      {/* Come back later for print functionality */}
      {/* <Button onClick={handlePrint}>Print</Button> */}
      <Box sx={{ height: "92%", width: "100%" }}>
        <DataGrid
          // apiRef={apiRef}
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
          // hideFooterSelectedRowCount
          // rowsPerPageOptions={[]}
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
        {/* <DashboardToolTip /> */}
      </Box>
    </ViewPort>
  );
}

function mapStateToProps({ data, loading }) {
  return { data, loading };
}

export default connect(mapStateToProps, {
  GetInventoryData,
  showLoading,
  hideLoading,
})(Dashboard);
