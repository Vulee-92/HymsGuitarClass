import { Box, Checkbox, Grid, Paper } from "@mui/material";
import { styled } from "@mui/styles";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export const TypeProduct = ({ name, products, count }) => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);

  const handleNavigateType = (type) => {
    navigate(
      `/product/${type
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        ?.replace(/ /g, "_")}`,
      { state: type }
    );
  };
  const handleNavigate = () => {
    navigate(
      `/product`,

    );
  };

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  const filteredProducts = checked
    ? { name }
    : products;

  const handleTypeClick = () => {
    if (checked) {
      setChecked(false);
      handleNavigate()
    } else {
      setChecked(true);
      handleNavigateType(name);
    }
  };

  return (
    <Box style={{ padding: "10px 0px", cursor: "pointer" }}>
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
