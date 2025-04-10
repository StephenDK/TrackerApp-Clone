import React from "react";
// import { styled, useTheme } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

// import viewPort from "../../utils/viewPort";

// import NewComputerForm from "./newComputer";
import InventoryDeskphone from "./inventoryDeskphone";
import InventoryCheckoutDeskphone from "./deskphoneInventoryCheckout";
import ViewPort from "../../utils/viewPort";

export default function BasicTabs() {
  // const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // console.log("THEME: ", theme.palette);
  return (
    <ViewPort>
      <Box sx={{ width: "100%" }}>
        <Box>
          <Tabs
            centered
            value={value}
            // textColor={theme.palette.text.primary}
            onChange={handleChange}
            aria-label="basic tabs example"
            TabIndicatorProps={{
              style: { display: "none" },
            }}
          >
            <Tab label="Inventory" />
            <Tab label="Inventory & Checkout" />
            {/* Uncomment for bulk inventory computers */}
            {/* <Tab label="Bulk Inventory" />  */}
          </Tabs>
        </Box>
        <div>
          {value === 0 && <InventoryDeskphone />}
          {value === 1 && <InventoryCheckoutDeskphone />}
          {/* Uncomment for bulk inventory computer component */}
          {/* {value === 2 && <>} */}
        </div>
      </Box>
    </ViewPort>
  );
}
