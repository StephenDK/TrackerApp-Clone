import React, { Fragment } from "react";
import { InputLabel, TextField } from "@mui/material";

export default function BlankInput(props) {
  const { title, name, id, value } = props;

  return (
    <Fragment>
      <InputLabel>{title}</InputLabel>
      <TextField
        name={name}
        id={id}
        fullWidth
        value={value}
        onChange={props.onSelectHandler}
        disabled
        variant="outlined"
      />
    </Fragment>
  );
}
