import React from "react";
import { Checkbox,Grid } from "@mui/material";

export const TypeProduct = ({ name,count,slug,type,checked,onClick }) => {
	return (
		<Grid container spacing={2} alignItems="center">
			<Grid item xs={10} sm={10} onClick={() => onClick(slug)}>
				<Checkbox
					checked={checked}
					sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
				/>
				{name}
			</Grid>
			<Grid item xs={2} sm={2} sx={{ textAlign: "right" }}>
				({count})
			</Grid>
		</Grid>
	);
};

export default TypeProduct;
