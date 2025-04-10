// MONITOR INDEX

import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import ViewPort from "../../utils/viewPort";

import NewMonitorForm from "./newMonitor";
import NewMonitorCheckOut from "./monitorInventoryCheckout";

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ViewPort>
      <div style={{ marginBottom: "60px" }} />
      <Box sx={{ width: "100%" }}>
        <Box>
          <Tabs
            centered
            value={value}
            onChange={handleChange}
            aria-label="Inventory Monitor Selection"
            TabIndicatorProps={{
              style: { display: "none" },
            }}
          >
            <Tab label="Inventory" sx={{}} />
            <Tab label="Inventory & Checkout" />
            {/* <Tab label="Bulk Inventory" /> */}
          </Tabs>
        </Box>
        <div>
          {value === 0 && <NewMonitorForm />}
          {value === 1 && <NewMonitorCheckOut />}
          {/* {value === 2 && <NewMonitorForm />} */}
        </div>
      </Box>
    </ViewPort>
  );
}

// MONITOR INDEX
