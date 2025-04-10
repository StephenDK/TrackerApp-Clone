import React, { useState, useEffect } from "react";
import config from "../../config";
import {
  Autocomplete,
  TextField,
  Link,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { styled, alpha, useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import axios from "axios";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchAutocomplete = () => {
  const theme = useTheme();
  console.log("[THEME] ", theme);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Debounce function to limit API requests
  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  // Fetch suggestions from the backend
  const fetchSuggestions = async (query) => {
    try {
      const response = await axios.get(`${config.apiUrl}/api/v1/search`, {
        params: { query },
      });
      setOptions(response.data.data);
      console.log("[SEARCH]", response.data.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching suggestions:", err);
    }
  };

  const debouncedFetchSuggestions = debounce(fetchSuggestions, 200);

  useEffect(() => {
    if (inputValue) {
      debouncedFetchSuggestions(inputValue);
      setLoading(true);
    } else {
      setOptions([]); // Clear options if input is empty
    }
  }, [inputValue]);

  return (
    <div>
      <Search>
        <Autocomplete
          freeSolo
          options={options}
          getOptionLabel={(option) => option.serial || ""}
          groupBy={(option) => option.type || ""}
          onInputChange={(event, newValue) => setInputValue(newValue.trim())}
          noOptionsText="No Results Found..."
          filterOptions={(x) => x}
          loading={loading}
          includeInputInList
          renderOption={(props, option) => {
            const { key, ...rest } = props;
            return (
              <Link
                href={`/${option.type}/${option.referenceId}`}
                underline="none"
                color="inherit"
                key={option.referenceId}
              >
                <List {...rest} key={key}>
                  <ListItem>
                    <ListItemText
                      primary={option.serial}
                      secondary={option.userName}
                    />
                  </ListItem>
                </List>
              </Link>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search…"
              variant="outlined"
              sx={{
                width: "18em",
              }}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <SearchIcon
                    sx={{
                      color: "white",
                    }}
                  />
                ),
                onKeyDown: (e) => {
                  if (e.key === "Enter") {
                    e.stopPropagation();
                  }
                },
              }}
            />
          )}
        />
      </Search>
    </div>
  );
};

export default SearchAutocomplete;
