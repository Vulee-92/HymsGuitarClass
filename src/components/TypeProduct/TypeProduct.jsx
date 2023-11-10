import { Box,Checkbox,Grid,Paper } from "@mui/material";
import { styled } from "@mui/styles";
import React,{ useState } from "react";
import { useNavigate } from "react-router-dom";

export const TypeProduct = ({ name,products,count }) => {
	const navigate = useNavigate();
	const [checked,setChecked] = useState(false);
	const [checkedTypes,setCheckedTypes] = useState([]);

	const handleNavigateType = (type) => {
		navigate(
			`/product/${type
				.normalize("NFD")
				.replace(/[\u0300-\u036f]/g,"")
				?.replace(/ /g,"_")}`,
			{ state: type }
		);
	};
	const handleNavigate = () => {
		navigate(
			`/product`,
		);
	};

	const handleTypeClick = () => {
		if (checked) {
			setChecked(false);
			handleNavigate();
		} else {
			setChecked(true);
			handleNavigateType(name);

			// Xóa checkbox cũ khỏi danh sách
			const newCheckedTypes = checkedTypes.filter((type) => type !== name);

			// Cập nhật giá trị của biến trạng thái
			setCheckedTypes(newCheckedTypes);
		}
	};



	return (
		<Box style={{ padding: "10px 0px",cursor: "pointer" }}>
			<Grid container spacing={2} alignItems="center">
				<Grid item xs={10} sm={10} onClick={handleTypeClick}>
					<Checkbox checked={checked} onClick={handleTypeClick} sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }} />
					{name}
				</Grid>
				<Grid item xs={2} sm={2} sx={{ textAlign: "right" }}>
					({count})
				</Grid>
			</Grid>
		</Box>
	);
};

export default TypeProduct;
