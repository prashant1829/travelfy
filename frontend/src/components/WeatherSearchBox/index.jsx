import "./WeatherSearchBox.css";
import { usePlacesWidget } from "react-google-autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

const WeatherSearchBox = ({ setCity }) => {
  const { ref } = usePlacesWidget({
    apiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    onPlaceSelected: (place) => {
      setCity(place.formatted_address);
    },
  });

  return (
    <Box
      sx={{
        "& .MuiTextField-root": { width: "100%" },
      }}
      className="search-box-wrapper"
    >
      <TextField
        id="outlined-basic"
        color="secondary"
        label="Where to?"
        variant="outlined"
        inputRef={ref}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon edge="end" />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default WeatherSearchBox;