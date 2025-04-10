// NEW DOCKING STATION INDEX

import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import ViewPort from "../../utils/viewPort";

import NewDockingstationForm from "./newDockingStation";
import NewDockingstationCheckout from "./dockingstationInventoryCheckout";

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
            aria-label="New Monitor Tabs"
            TabIndicatorProps={{
              style: { display: "none" },
            }}
          >
            <Tab label="Inventory" />
            <Tab label="Inventory & Checkout" />
            
          </Tabs>
        </Box>
        <div>
          {value === 0 && <NewDockingstationForm />}
          {value === 1 && <NewDockingstationCheckout />}
           
        </div>
      </Box>
    </ViewPort>
  );
}

// NEW DOCKING STATION INDEX
