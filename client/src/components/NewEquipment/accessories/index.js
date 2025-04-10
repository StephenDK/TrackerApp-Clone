// NEW ACCESSORY INDEX

import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import ViewPort from "../../utils/viewPort";

import NewAccessory from "./addAccessory";
import AccessoryInventoryCheckout from "./accessoryInventoryCheckout";

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
            aria-label="New Accessories Tabs"
            TabIndicatorProps={{
              style: { display: "none" },
            }}
          >
            <Tab label="Inventory" />
            <Tab label="Inventory & Checkout" />
            {/* <Tab label="Bulk Inventory" /> */}
          </Tabs>
        </Box>
        <div>
          {value === 0 && <NewAccessory />}
          {value === 1 && <AccessoryInventoryCheckout />}
          {/* {value === 2 && <NewAccessory />} */}
        </div>
      </Box>
    </ViewPort>
  );
}

// NEW ACCESSORY INDEX
