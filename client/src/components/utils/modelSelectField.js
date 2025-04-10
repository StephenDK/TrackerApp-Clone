import React, { Fragment } from "react";
import { Select, MenuItem, InputLabel } from "@mui/material";

import BlankInput from "./blankInput";

export default function ModelSelectField(props) {
  return (
    <Fragment>
      {props.items && Array.isArray(props.items) && props.items.length > 0 ? (
        <Fragment>
          <InputLabel>Model*</InputLabel>
          <Select
            sx={{
              width: "100%",
            }}
            name="model"
            id="model"
            value={props.deviceModel || ""}
            onChange={(e) => props.onChangeHandler(props.field, e)}
          >
            {props.items.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </Fragment>
      ) : (
        <BlankInput title={"Model*"} />
      )}
    </Fragment>
  );
}

// InputLabel>Make</InputLabel>
//               <Select
//                 sx={{
//                   width: "100%",
//                 }}
//                 label="Make"
//                 name="make"
//                 id="make"
//                 value={computerMake}
//                 onChange={(e) => handleFieldChange("computerMake", e)}
//               >
//                 {uniqueMakes.length > 0
//                   ? uniqueMakes.map((item) => (
//                       <MenuItem key={item} value={item}>
//                         {item}
//                       </MenuItem>
//                     ))
//                   : null}
//               </Select>
