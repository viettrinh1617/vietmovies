import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import { FTextField } from "./form";

function ProductSearch() {
  return (
    <FTextField
      name="searchQuery"
      sx={{ width: 300 }}
      size="small"
      // onChange={(event) => {
      //   let filter = event.target.value;
      //   if(filter){
      //     setSearchParams(filter)}       
      //   }
      // }
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}

export default ProductSearch;