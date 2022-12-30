import { useEffect, useState } from "react";
import {
  Card,
  Grid,
  Container,
  Typography,
  Box,
  Stack,
  Rating,
  Divider,
  Breadcrumbs,
  Link,
} from "@mui/material";
import { Link as RouterLink, useParams } from "react-router-dom";
import { fCurrency } from "../utils";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import apiService from "../app/apiService";
import LoadingScreen from "../components/LoadingScreen";
import { Alert } from "@mui/material";

import { API_KEY, BG_IMAGE_URL , IMAGE_URL} from "../app/config";

function DetailPage() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      const getProduct = async () => {
        setLoading(true);
        try {
          const res = await apiService.get(`/movie/${params.id}?api_key=${API_KEY}`);
          setProduct(res.data);
          console.log("detail",res.data);
          setError("");
        } catch (error) {
          console.log(error);
          setError(error.message);
        }
        setLoading(false);
      };
      getProduct();
    }
  }, [params]);
  return (
    <Container sx={{ my: 3, height: '100vh', backgroundSize: `cover`, 
      // backgroundImage: `url(${BG_IMAGE_URL}${product.backdrop_path})` 
      }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
        <Link underline="hover" color="inherit" component={RouterLink} to="/">
          MainPage
        </Link>
        <Typography color="text.primary">{product?.title}</Typography>
      </Breadcrumbs>
      <Box sx={{ position: "relative", height: 1 }}>
        {loading ? (
          <LoadingScreen />
        ) : (
          <>
            {error ? (
              <Alert severity="error">{error}</Alert>
            ) : (
              <>
                {product && (
                  <Card>
                    <Box
                              component="img"
                              sx={{
                                width: 1,
                                height: 1,
                              }}
                              src={`${BG_IMAGE_URL}${product.backdrop_path}`}
                              alt="product"
                            />
                    <Grid container>
                      <Grid item xs={12} md={6}>
                        <Box p={2}>
                          <Box
                            sx={{
                              borderRadius: 2,
                              overflow: "hidden",
                              display: "flex",
                            }}
                          >
                            <Box
                              component="img"
                              sx={{
                                width: 1,
                                height: 1,
                              }}
                              src={`${IMAGE_URL}${product.poster_path}`}
                              alt="product"
                            />
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography
                          variant="h6"
                          sx={{
                            mt: 2,
                            mb: 1,
                            display: "block",
                            textTransform: "uppercase",
                            color:
                              product.status === "sale"
                                ? "error.main"
                                : "info.main",
                          }}
                        >
                          {product.status}
                        </Typography>
                        <Typography variant="h5" paragraph>
                          {product.title}
                        </Typography>
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={1}
                          sx={{ mb: 2 }}
                        >
                          <Rating
                            max={5}
                            value={product.vote_average*0.5}
                            precision={0.1}
                            readOnly
                          />
                          <Typography
                            variant="body2"
                            sx={{ color: "text.secondary" }}
                          >
                            ({product.vote_count} votes)
                          </Typography>
                        </Stack>
                        <Typography variant="body1" sx={{ mb: 3 }}>
                          <Box
                            component="span"
                            sx={{
                              color: "text.disabled",
                              textDecoration: "line-through",
                            }}
                          >
                            {product.priceSale && fCurrency(product.priceSale)}
                          </Box>
                          &nbsp;{`Release date: ${product.release_date}`}
                        </Typography>

                        <Divider sx={{ borderStyle: "dashed" }} />
                        <Box>
                          <ReactMarkdown
                            rehypePlugins={[rehypeRaw]}
                            children={product.overview}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Card>
                )}
                {!product && (
                  <Typography variant="h6">404 Product not found</Typography>
                )}
              </>
            )}
          </>
        )}
      </Box>
    </Container>
  );
}

export default DetailPage;