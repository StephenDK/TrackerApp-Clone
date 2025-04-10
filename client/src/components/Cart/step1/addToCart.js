import React from "react";

import {
  Container,
  Paper,
  Avatar,
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material";

const AddToCart = () => {
  return (
    <Container maxWidth="md" sx={{ mb: 4 }}>
      <Paper
        variant="outlined"
        sx={{
          my: { xs: 3, md: 3 },
          p: { xs: 2, md: 3 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          {/* <ComputerIcon /> */}
        </Avatar>
        <Typography variant="h4" sx={{ mb: "40px" }}>
          Inventory New Computer
        </Typography>
        <Grid container spacing={3} rowSpacing={3}>
          <Grid item xs={12} sm={9}>
            <TextField
              // error={computerSerialValid}
              required
              id="serial"
              name="serial"
              label="Serial"
              // value={computerSerial}
              fullWidth
              // helperText={
              //   computerSerialValid ? "Incorrect character in serial" : null
              // }
              // onChange={(e) => handleFieldChange("computerSerial", e)}
            />
          </Grid>
          {/* <Grid item xs={12} sm={3}>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel>Type*</InputLabel>
                <Select
                  label="Type"
                  name="type"
                  id="type"
                  value={type}
                  onChange={(e) => handleFieldChange("type", e)}
                >
                  {props.files.jsonFiles.computerTypes.length > 0
                    ? props.files.jsonFiles.computerTypes.map((item) => (
                        <MenuItem key={item.type} value={item.type}>
                          {item.type}
                        </MenuItem>
                      ))
                    : null}
                </Select>
              </FormControl>
            </Grid> */}
          {/* <Grid item xs={12} sm={6}>
              <InputLabel>Make</InputLabel>
              <Select
                sx={{
                  width: "100%",
                }}
                label="Make"
                id="make"
                name="make"
                value={computerMake}
                onChange={(e) => handleFieldChange("computerMake", e)}
              >
                {uniqueMakes.length > 0
                  ? uniqueMakes.map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))
                  : null}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <ModelSelectField
                items={selectedModels}
                field="computerModel"
                deviceModel={computerModel}
                onChangeHandler={handleFieldChange}
              />
            </Grid> */}

          <Grid item xs={3} sm={2}>
            <Button
              color="primary"
              type="submit"
              fullWidth
              variant="contained"
              // onClick={onSubmitHandler}
              sx={{ mt: 3, mb: 2 }}
              // disabled={
              //   !computerSerialValid &&
              //   computerSerial &&
              //   computerMake &&
              //   computerModel &&
              //   type
              //     ? false
              //     : true
              // }
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default AddToCart;
