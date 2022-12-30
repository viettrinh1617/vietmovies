import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";


import { IMAGE_URL } from "../app/config";

function ProductCard({ product }) {
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate(`/movie/${product.id}`)}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={`${IMAGE_URL}${product.poster_path}`}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="body1" component="div" noWrap>
            {product.title}
          </Typography>
          <Stack
            direction="row"
            spacing={0.5}
            alignItems="center"
            justifyContent="flex-end"
          >
            {product.vote_average && (
              <Typography
                component="span"
                sx={{ textDecoration: "none" }}
              >
                {`${(product.vote_average*0.5).toFixed(1)}⛤`}
              </Typography>
            )}
            <Typography variant="subtitle1" sx={{color:"text.disabled"}}>
              {`${product.vote_count} votes`}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ProductCard;