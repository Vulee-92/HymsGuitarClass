import React,{ useEffect,useState } from "react";
import Drawer from "@mui/material/Drawer";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { convertPrice } from "utils";
import { useTheme } from "@mui/styles";
import { useLocation } from "react-router-dom";
import { Grid } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const MobileCartTotalPriceComponent = ({ name,totalPriceMemo,classes,handleAddOrderProduct,loading }) => {
	const [open,setOpen] = useState(false);
	const location = useLocation();

	useEffect(() => {
		if (location.pathname === "/order" || location.pathname === "/payment" || location.pathname === "/payment-ship") {
			setOpen(true);
		} else {
			setOpen(false);
		}
	},[location]);
	return (
		<Drawer
			sx={{
				flexShrink: 0,
				"& .MuiDrawer-paper": {
					boxSizing: "border-box",
					background: "#fff",
					borderTop: "2px solid rgb(224, 224, 224)",
					backdropFilter: "saturate(1) blur(10px) !important",
				},
			}}
			variant="persistent"
			anchor="bottom"
			open={open}
			// onClose={handleCartClose}
			disableDiscovery
		>
			<Container
				width={{ md: "xs",xl: "xs",lg: "xs" }}
				style={{ overflow: "hidden",padding: "0px" }}
			>
				<Grid container
				>
					<Grid item xs={7}>
						<Typography
							className={classes.priceTitle}
							style={{
								alignItems: "center",
								gap: "12px",
								padding: "30px",
								textAlign: "center",
							}}
						>
							{convertPrice(totalPriceMemo)}
						</Typography>
					</Grid>
					<Grid item xs={5} style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center'
					}}>
						<LoadingButton fullWidth size="large" type="submit" variant="contained" loading={loading}
							onClick={handleAddOrderProduct}
							className={classes.btnAddCard}
						>				{name}
						</LoadingButton>

					</Grid>
				</Grid>
			</Container>
		</Drawer>
	);
};

export default MobileCartTotalPriceComponent;
