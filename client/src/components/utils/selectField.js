import React, { Fragment } from "react";
import { TextField, MenuItem } from "@mui/material";

export default function SelectField(props) {
  const { label, name, id, value } = props;

  return (
    <Fragment>
      {props.items && Array.isArray(props.items) && props.items.length > 0 ? (
        <TextField
          required
          label={label}
          name={name}
          id={id}
          fullWidth
          select
          value={value}
          onChange={props.onSelectHandler}
        >
          {props.items.map((item, index) => (
            <MenuItem key={index} value={item.value}>
              {item.text}
            </MenuItem>
          ))}
        </TextField>
      ) : null}
    </Fragment>
  );
}
