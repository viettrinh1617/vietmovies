import { Box, Button, Stack, Typography } from "@mui/material";
import { FMultiCheckbox, FRadioGroup, FSelect, FSwitch } from "./form";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { useEffect, useState } from "react";

import { API_KEY } from "../app/config";
import apiService from "../app/apiService";
import LoadingScreen from "../components/LoadingScreen";

export const BOOLEAN_OPTIONS = [
  "Yes", "No"
]

export const SORT_BY_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "release_date", label: "Newest" },
  { value: "vote_average.desc", label: "Rating: High-Low" },
  { value: "vote_average.asc", label: "Rating: Low-High" },
];

export const FILTER_GENDER_OPTIONS = ["Men", "Women", "Kids"];

export const FILTER_CATEGORY_OPTIONS = [
  "All",
  "Shose",
  "Apparel",
  "Accessories",
];

export const FILTER_PRICE_OPTIONS = [
  { value: "below", label: "Below $25" },
  { value: "between", label: "Between $25 - $75" },
  { value: "above", label: "Above $75" },
];

function ProductFilter({ resetFilter }) {


const [genres, setGenres] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

useEffect(() => {
const getGenres = async () => {
  setLoading(true);
  try {
    const res = await apiService.get(`genre/movie/list?api_key=${API_KEY}`);
    setGenres(res.data.genres);
    setError("");
  } catch (error) {
    console.log(error);
    setError(error.message);
  }
  setLoading(false);
};

getGenres();
}, []);

  return (
    <Stack spacing={3} sx={{ p: 3, width: 250 }}>
      {/* <Stack spacing={1}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Include Adult Results
        </Typography>
        <FRadioGroup
          name="include_adult"
          options={
            BOOLEAN_OPTIONS
          }
          row={false}
        />
      </Stack> */}
      {/* <Stack spacing={1}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Gender
        </Typography>
        <FMultiCheckbox
          name="gender"
          options={FILTER_GENDER_OPTIONS}
          sx={{ width: 1 }}
        />
      </Stack>

      <Stack spacing={1}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Category
        </Typography>
        <FRadioGroup
          name="category"
          options={
            FILTER_CATEGORY_OPTIONS
          }
          row={false}
        />
      </Stack> */}

      <Stack spacing={1}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Genres
        </Typography>
        <FSelect
          name="genres"
          > 
            <option key={'default'} value = ""> All </option>
            {genres.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </FSelect>
      </Stack>

      <Box>
        <Button
          size="large"
          type="submit"
          color="inherit"
          variant="outlined"
          onClick={resetFilter}
          startIcon={<ClearAllIcon />}
        >
          Clear All
        </Button>
      </Box>
    </Stack>
  );
}

export default ProductFilter;