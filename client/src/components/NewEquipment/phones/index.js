// CELL PHONE INDEX

import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import ViewPort from "../../utils/viewPort";

import NewPhone from "./newPhone";
import NewPhoneCheckout from "./phoneInventoryCheckout";

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
            aria-label="basic tabs example"
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
          {value === 0 && <NewPhone />}
          {value === 1 && <NewPhoneCheckout />}
          {/* {value === 2 && < />} */}
        </div>
      </Box>
    </ViewPort>
  );
}

// CELL PHONE INDEX
