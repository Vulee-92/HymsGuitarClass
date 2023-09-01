import React from "react";
import { useNavigate } from "react-router-dom";

export const TypeProduct = ({ name }) => {
  const navigate = useNavigate();
  const handleNavigateType = (type) => {
    navigate(
      `/product/${type
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        ?.replace(/ /g, "_")}`,
      { state: type }
    );
  };
  return (
    <div
      style={{ padding: "10px 0px", cursor: "pointer" }}
      onClick={() => handleNavigateType(name)}
    >
      {name}
    </div>
  );
};

export default TypeProduct;
