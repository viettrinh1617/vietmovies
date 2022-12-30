import React from "react";
import { FSelect } from "./form";

function ProductSort() {
  return (
    <FSelect name="sortBy" label="Sort By" size="small" sx={{ width: 300 }}>
      {[
        { value: "", label: "Featured" },
        { value: "release_date.desc", label: "Newest" },
        { value: "vote_average.desc", label: "Rating: High-Low" },
        { value: "vote_average.asc", label: "Rating: Low-High" },
      ].map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </FSelect>
  );
}

export default ProductSort;