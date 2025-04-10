import React, { useState } from "react";
import { Button, Container, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Alert from "@mui/material/Alert";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import axios from "axios";
import config from "../../../config";

function MissingComputersList({ missingComputers }) {
  return (
    <Paper elevation={3} style={{ maxHeight: "300px", overflowY: "auto" }}>
      <h2 style={{ marginTop: "10px" }}>Missing Computers</h2>
      <List>
        {missingComputers.map((computer, index) => (
          <ListItem key={index}>
            <ListItemText primary={computer} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

function TagList({ tags, onDelete }) {
  return (
    <Grid container spacing={1}>
      {tags.map((tag, index) => (
        <Grid item key={index}>
          <Chip
            label={tag}
            variant="outlined"
            color="primary"
            onDelete={() => onDelete(index)}
          />
        </Grid>
      ))}
    </Grid>
  );
}

function BulkEditTags() {
  const [file, setFile] = useState(null);
  const [tags, setTags] = useState([]);
  const [tagValue, setTagValue] = useState("");

  const [missingComputers, setMissingComputers] = useState([]);

  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const handleClose = () => {
    setAlert(false);
    setAlertMessage("");
    setAlertType("");
  };

  // Automatically close the alert after 3000 milliseconds (3 seconds)
  setTimeout(handleClose, 5000);

  const addTag = () => {
    if (tagValue.trim() !== "") {
      setTags([...tags, tagValue]);
      setTagValue("");
    }
  };

  const deleteTag = (indexToRemove) => {
    const updatedTags = tags.filter((_, index) => index !== indexToRemove);
    setTags(updatedTags);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleUpload = async () => {
    try {
      if (!file) {
        setAlertMessage("No file uploaded");
        setAlertType("warning");
        setAlert(true);
        return;
      }

      if (!tags.length) {
        setAlertMessage("No tags entered.");
        setAlertType("warning");
        setAlert(true);
        return;
      }

      const formData = new FormData();

      formData.append("file", file);

      const response = await axios.put(
        `${config.apiUrl}/api/v1/admin/batchtag`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important for file uploads
          },
          params: {
            tags: tags,
          },
        }
      );

      if (response.status === 200) {
        setMissingComputers(response.data.missingComputers);

        setAlert(true);
        setAlertType("success");
        setAlertMessage("You successfully tagged the devices!");

        setTags([]);
        setTagValue("");
        setFile(null);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <Container style={{ padding: "100px" }}>
      {alert && (
        <Alert
          onClose={handleClose}
          severity={alertType}
          style={{ marginBottom: "30px" }}
        >
          {alertMessage}
        </Alert>
      )}
      <div>
        <h1 style={{ marginBottom: "30px", textAlign: "center" }}>
          Bulk Edit Tags
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={12}>
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
            />
          </Grid>
          <Grid item xs={12} style={{ marginTop: "30px" }}>
            <TextField
              label="Tags (press Enter after typing a tag value)"
              value={tagValue}
              onChange={(event) => setTagValue(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
        </Grid>
        {tags.length > 0 ? (
          <div style={{ marginTop: "30px", display: "inline-block" }}>
            {" "}
            <h4>Tags to add:</h4> <TagList tags={tags} onDelete={deleteTag} />
          </div>
        ) : null}
        <Button
          onClick={addTag}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "30px", display: "none" }}
        >
          Submit
        </Button>

        <Button
          onClick={handleUpload}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "30px" }}
        >
          Submit
        </Button>
      </form>
      {missingComputers.length > 0 ? (
        <div style={{ marginTop: "30px", textAlign: "center" }}>
          {" "}
          <MissingComputersList missingComputers={missingComputers} />
        </div>
      ) : null}
    </Container>
  );
}

export default BulkEditTags;
