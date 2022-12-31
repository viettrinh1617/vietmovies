import React, { useState, useEffect } from "react";
import { Navigate, useSearchParams,  } from 'react-router-dom';
import { Alert, Box, Container, Stack} from "@mui/material";
import ProductFilter from "../components/ProductFilter";
import ProductSearch from "../components/ProductSearch";
import ProductSort from "../components/ProductSort";
import ProductList from "../components/ProductList";
import { FormProvider } from "../components/form";
import { useForm } from "react-hook-form";
import apiService from "../app/apiService";
import { API_KEY } from "../app/config";

import {Pagination, Typography} from "@mui/material";

import orderBy from "lodash/orderBy";
import LoadingScreen from "../components/LoadingScreen";


function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  // lưu form values trên url dưới dạng query params
  // ví dụ https://vietmovies.netlify.app?page=1&genres=family?query=abc
  // khi vào đường link trên thì parse query param và truyền vào defaultValues của useForm
  const [searchParams, setSearchParams] = useSearchParams();
 
  const defaultValues = {
    genres: searchParams.get('genres') || "All",
    priceRange: "",
    // sortBy: "popularity.desc",
    // searchQuery: "",
    sortBy: searchParams.get('sort_by')|| "popularity.desc",
    searchQuery: searchParams.get('query') || "",
    include_adult: "false"
  };
  const methods = useForm({
    defaultValues,
  });
  const { watch, reset } = methods;
  const filters = watch();
  const filterProducts = applyFilter(products, filters);
  const clearAll = () => {
    reset();
    setSearchParams("");
    Navigate("/")
  }

  useEffect(() => {
    // gui cac params vao url
    setSearchParams({
      query: filters.searchQuery,
      genres: filters.genres,
      sort_by: filters.sortBy,
      page: page
    })

    const getProducts = async () => {
      setLoading(true);

      try {
        if(filters.searchQuery)          
          {
            const res = await apiService.get(`search/movie?api_key=${API_KEY}&page=${page}&include_adult=false&include_video=true&query=${encodeURIComponent(filters.searchQuery)}`);
            setProducts(res.data.results);
            setTotalPage(res.data.total_pages);
            setError("");
          }
          else
          { 
            let url = `discover/movie?api_key=${API_KEY}&include_video=true&include_adult=false&page=${page}`
            // if(filters.include_adult==="Yes"){
            //   url+= `&include_adult=true`
            // }
            if(filters.genres!=="All") {
              url+= `&with_genres=${filters.genres}`
            }
            if(filters.sortBy){
              url += `&sort_by=${filters.sortBy}`
            }
            const res = await apiService.get(url);
            setProducts(res.data.results);
            setTotalPage(res.data.total_pages)
            setError("");
          }
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
      setLoading(false);
    };
    getProducts();
  }, [filters.searchQuery, filters.genres, filters.sortBy, filters.include_adult, page]);


  // console.log(products);
  return (
  <>
    <Container sx={{ display: "flex", minHeight: "100vh", mt: 3 }}>
      <Stack>
        <FormProvider methods={methods}>
          <ProductFilter resetFilter={clearAll} />
        </FormProvider>
      </Stack>
      <Stack sx={{ flexGrow: 1 }}>
        <FormProvider methods={methods}>
          <Stack
            spacing={2}
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ sm: "center" }}
            justifyContent="space-between"
            mb={2}
          >
            <ProductSearch />
            <ProductSort />
          </Stack>
        </FormProvider>
        <Box sx={{ position: "relative", height: 1 }}>
          {loading ? (
            <LoadingScreen />
          ) : (
            <>
              {error ? (
                <Alert severity="error">{error}</Alert>
              ) : (
                <ProductList products={filterProducts} />
              )}
            </>
          )}
        </Box>
      </Stack>
    </Container>
    <Box sx={{margin: 'auto', mt:4, display: 'flex'}}>
          <Pagination count={totalPage<500?totalPage:500} page={page} onChange={(event,value)=>setPage(value)} />
    </Box>
  </>
  );
}

function applyFilter(products, filters) {
  const { sortBy } = filters;
  
  let filteredProducts = products;

  // FILTER PRODUCTS
  // if (filters.gender?.length > 0) {
  //   filteredProducts = products.filter((product) =>
  //     filters.gender.includes(product.gender)
  //   );
  // }
  if (filters.genres !== "All") {
    filteredProducts = products.filter(
      (product) => product.genre_ids.includes(filters.genres));
      console.log('filter',filters.genres);
    filteredProducts = products.filter(product => product.genre_ids.includes(parseInt(filters.genres)))
    }
  if (filters.genres === "All") {filteredProducts = products}
  // if (filters.priceRange) {
  //   filteredProducts = products.filter((product) => {
  //     if (filters.priceRange === "below") {
  //       return product.price < 25;
  //     }
  //     if (filters.priceRange === "between") {
  //       return product.price >= 25 && product.price <= 75;
  //     }
  //     return product.price > 75;
  //   });
  // }
  // if (filters.searchQuery) {
  //   filteredProducts = products.filter((product) =>
  //     product.title.toLowerCase().includes(filters.searchQuery.toLowerCase())
  //   );
  // }

   // SORT BY
  // if (sortBy === "featured") {
  //   filteredProducts = orderBy(products, ["sold"], ["desc"]);
  // }
  let sortedFilteredProducts = filteredProducts;
  if (sortBy === "") {
    sortedFilteredProducts = orderBy(filteredProducts, ["popularity"], ["desc"]);
  }
  if (sortBy === "release_date.desc") {
    sortedFilteredProducts = orderBy(filteredProducts, ["release_date"], ["desc"]);
  }
  if (sortBy === "vote_average.desc") {
    sortedFilteredProducts = orderBy(filteredProducts, ["vote_average"], ["desc"]);
  }
  if (sortBy === "vote_average.asc") {
    sortedFilteredProducts = orderBy(filteredProducts, ["vote_average"], ["asc"]);
  }

  return sortedFilteredProducts;
}

export default HomePage;