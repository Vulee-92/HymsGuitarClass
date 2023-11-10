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
	const { id,name,image,price,colors,status,priceSale,countInStock } =
		product;
	const navigate = useNavigate();
	const classes = styles();
	const handleDetailsProduct = (id) => {
		navigate(`/product-details/${id}`);
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
								onClick={() => handleDetailsProduct(id)}
								alt={name}
								src={image}
							/>
						</LazyLoad>

					</Box>

					<Stack spacing={2} sx={{ p: 2 }}>
						<LazyLoad>
							<Link color="inherit" underline="hover">
								<Typography
									className={classes.txtHeaderTitle}
									onClick={() => handleDetailsProduct(id)}
								>
									{name ? `${name.slice(0,30)}` : name}
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
							<Typography className={classes.txtPrice}>
								<Typography
									className={classes.txtPrice}
									sx={{
										color: "text.disabled",
										textDecoration: "line-through",
									}}
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
