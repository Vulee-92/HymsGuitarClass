import PropTypes from "prop-types";
// @mui
import { Box,Card,Link,Typography,Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
// utils
// components
import Label from "../../../components/label";
import { convertPrice } from "../../../utils";
import { useNavigate } from "react-router-dom";
import styles from "./style";
import LazyLoad from "react-lazyload";
// ----------------------------------------------------------------------

const StyledProductImg = styled("img")({
	top: 0,
	width: "100%",
	height: "100%",
	objectFit: "cover",
	position: "absolute",
	cursor: "pointer",
	transform: "scale(0.7)",
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
	product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
	const { id,name,image,price,colors,status,priceSale,countInStock,slug } =
		product;
	const firstImage = image[0];
	const navigate = useNavigate();
	const classes = styles();
	const handleDetailsProduct = (slug) => {
		navigate(`/product-details/${slug}`);
	};
	return (
		<>
			<>
				<Card className={classes.boxCard}>
					<Box
						className={classes.boxBorderCard}
						sx={{ pt: "100%",position: "relative" }}
					>
						{status && (
							<Label
								variant="filled"
								color={(status === "sale" && "error") || "info"}
								sx={{
									zIndex: 9,
									top: 16,
									background: "none",
									border: "1px solid #212B36",
									right: 16,
									color: "#212B36",
									position: "absolute",
									textTransform: "",
								}}
							>
								{status}
							</Label>
						)}
						<LazyLoad>
							<StyledProductImg
								onClick={() => handleDetailsProduct(slug)}
								alt={name}
								src={firstImage}
							/>
						</LazyLoad>

					</Box>

					<Stack spacing={2} sx={{ p: 2 }}>
						<LazyLoad>
							<Link color="inherit" underline="hover">
								<Typography
									className={classes.txtHeaderTitle}
									onClick={() => handleDetailsProduct(slug)}
								>
									{name ? `${name.slice(0,300)}` : name}
								</Typography>
							</Link>
						</LazyLoad>

						<Typography
							className={
								countInStock === 0
									? classes.txtStockingOut
									: classes.txtStocking
							}
						>
							{countInStock === 0 ? "hết hàng" : "còn hàng"}
						</Typography>
						<Stack
							direction="row"
							alignItems="center"
							justifyContent="space-between"
						>
							{/* <ColorPreview colors={colors} /> */}

							<Box></Box>
							<Typography className={classes.txtPrice} onClick={() => handleDetailsProduct(slug)}>
								<Typography
									className={classes.txtPrice}
									sx={{
										color: "text.disabled",
										textDecoration: "line-through",
									}}
									onClick={() => handleDetailsProduct(slug)}
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
