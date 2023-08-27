import PropTypes from "prop-types";
// @mui
import { Box, Card, Link, Typography, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
// utils
import { fCurrency } from "../../../utils/formatNumber";
// components
import Label from "../../../components/label";
import { ColorPreview } from "../../../components/color-utils";
import { convertPrice } from "../../../utils";
import { useNavigate } from "react-router-dom";
import styles from "./style";
// ----------------------------------------------------------------------

const StyledProductImg = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
  cursor: "pointer",
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
  const { id, name, image, price, colors, status, priceSale } = product;
  const navigate = useNavigate();
  const classes = styles();
  const handleDetailsProduct = (id) => {
    navigate(`/product-details/${id}`);
  };
  return (
    <>
      <>
        <Card>
          <Box sx={{ pt: "100%", position: "relative" }}>
            {status && (
              <Label
                variant="filled"
                color={(status === "sale" && "error") || "info"}
                sx={{
                  zIndex: 9,
                  top: 16,
                  right: 16,
                  position: "absolute",
                  textTransform: "uppercase",
                }}
              >
                {status}
              </Label>
            )}
            <StyledProductImg
              onClick={() => handleDetailsProduct(id)}
              alt={name}
              src={image}
            />
          </Box>

          <Stack spacing={2} sx={{ p: 3 }}>
            <Link color="inherit" underline="hover">
              <Typography
                className={classes.txtHeaderTitle}
                onClick={() => handleDetailsProduct(id)}
              >
                {name}
              </Typography>
            </Link>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              {/* <ColorPreview colors={colors} /> */}
              <Box></Box>
              <Typography className={classes.txtPrice}>
                <Typography
                  className={classes.txtPrice}
                  // sx={{
                  //   color: "text.disabled",
                  //   textDecoration: "line-through",
                  // }}
                >
                  {priceSale && convertPrice(priceSale)}
                </Typography>
                &nbsp;
                {convertPrice(price)}
              </Typography>
            </Stack>
          </Stack>
        </Card>
      </>
    </>
  );
}
