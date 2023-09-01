import { Checkbox, Rate, } from "antd";
import React, { useEffect, useState } from "react";
import {
  WrapperTextPrice,
  WrapperTextValue,
} from "./style";
import * as ProductService from "../../services/ProductService";
import { useQuery } from "@tanstack/react-query";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { useNavigate } from "react-router-dom";
import { Typography, Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import styles from "./stylemui";
const NavbarComponent = () => {
  const onChange = () => { };
  const [typeProducts, setTypeProducts] = useState([])
  const fetchProductAll = async () => {
    const res = await ProductService.getAllProduct();
    return res;
  };
  const classes = styles();
  const navigate = useNavigate();
  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct()
    if (res?.status === 'OK') {
      setTypeProducts(res?.data)
    }
  }

  const handleAllClick = () => {
    // setTypeProduct(null);
    navigate("/product"); // cập nhật đường dẫn trên route khi chọn nút "All"
  };

  const renderAllButton = () => {
    return (
      <Typography onClick={handleAllClick}>All</Typography>
    );
  };



  const { isLoading, data: products, isPreviousData } = useQuery(
    ["products"],
    fetchProductAll,
    {
      retry: 3,
      retryDelay: 100,
      keepPreviousData: true,
    }
  );
  console.log('productList', products)
  useEffect(() => {
    fetchAllTypeProduct()
  }, [])



  const renderContent = (type, options) => {
    switch (type) {
      case "text":
        return options.map((option) => {
          return <WrapperTextValue>{option}</WrapperTextValue>;
        });
      case "checkbox":
        return (
          <Checkbox.Group
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
            onChange={onChange}
          >
            {options.map((option) => {
              return (
                <Checkbox style={{ marginLeft: 0 }} value={option.value}>
                  {option.label}
                </Checkbox>
              );
            })}
          </Checkbox.Group>
        );
      case "star":
        return options.map((option) => {
          return (
            <div style={{ dispaly: "flex" }}>
              <Rate
                style={{ fontSize: "12px" }}
                disabled
                defaultValue={option}
              />
              <span> {`tu ${option}  sao`}</span>
            </div>
          );
        });
      case "price":
        return options.map((option) => {
          return <WrapperTextPrice>{option}</WrapperTextPrice>;
        });
      default:
        return {};
    }
  };

  return (

    <div>
      <Accordion style={{ margin: "0px", boxShadow: "none" }}>
        <AccordionSummary style={{ marginTop: "0px" }}
          expandIcon={<FontAwesomeIcon icon={faChevronDown} fontSize={23} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className={classes.BoxTilte}
        >
          <Typography className={classes.txtTilte}>Loại sản phẩm</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ boxShadow: "none" }}>
          <Typography className={classes.txtTilte} onClick={handleAllClick}>All</Typography>
          <Typography className={classes.txtTilte}>
            {typeProducts.map((item) => {
              return (
                <>
                  <TypeProduct className={classes.txtTilte} name={item} key={item} />
                </>
              )
            })}
          </Typography>
        </AccordionDetails>
      </Accordion>

    </div>

  );
};

export default NavbarComponent;



// import { Checkbox, Col, Rate, Row } from "antd";
// import React, { useEffect, useState } from "react";
// import {
//   WrapperContent,
//   WrapperLableText,
//   WrapperTextPrice,
//   WrapperTextValue,
// } from "./style";
// import * as ProductService from "../../services/ProductService";
// import { useQuery } from "@tanstack/react-query";
// import TypeProduct from "components/TypeProduct/TypeProduct";
// import {
//   Accordion,
//   AccordionDetails,
//   AccordionSummary,
//   FormControlLabel,
//   Radio,
//   RadioGroup,
//   Typography,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// function removeVietnamese(str) {
//   str = str.toLowerCase();
//   str = str.replace(/[\u00E0\u00E1\u1EA1\u1EA3\u00E3\u00E2\u1EA7\u1EA9\u1EAB\u1EAD\u00E2\u00E8\u00E9\u1EBB\u1EBD\u1EBF\u00EA\u1EC1\u1EC3\u1EC5\u1EC7\u00EC\u00ED\u1EC9\u0129\u00EE\u00F2\u00F3\u1ECF\u1ED1\u1ED3\u1ED5\u1ED7\u00F4\u1ED9\u1EDB\u1EDD\u1EDF\u1EE1\u1EE3\u00F9\u00FA\u1EE5\u1EE7\u0169\u01B0\u1EEB\u1EED\u1EEF\u1EF1\u00FD]/g, function (v) {
//     return String.fromCharCode(v.charCodeAt(0) - 32);
//   });
//   return str;
// }

// const NavbarComponent = () => {
//   const [typeProduct, setTypeProduct] = useState(null); // sử dụng state để lưu trữ loại sản phẩm được chọn
//   const [typeProducts, setTypeProducts] = useState([]);
//   const navigate = useNavigate(); // sử dụng hook useNavigate để cập nhật đường dẫn trên route

//   const fetchProductAll = async () => {
//     const res = await ProductService.getAllProduct();
//     return res;
//   };

//   const fetchAllTypeProduct = async () => {
//     const res = await ProductService.getAllTypeProduct();
//     if (res?.status === "OK") {
//       setTypeProducts(res?.data);
//     }
//   };

//   const handleAllClick = () => {
//     setTypeProduct(null);
//     navigate("/product"); // cập nhật đường dẫn trên route khi chọn nút "All"
//   };

//   const renderAllButton = () => {
//     return (
//       <TypeProduct name="All" key="all" onClick={handleAllClick} />
//     );
//   };

//   const handleTypeProductChange = (event) => {
//     const selectedTypeProduct = event.target.value;
//     setTypeProduct(selectedTypeProduct);
//     if (selectedTypeProduct) {
//       const decodedString = decodeURIComponent(selectedTypeProduct);
//       const typeProduct = removeVietnamese(decodedString).replace(/\s+/g, '_');
//       navigate(`/product/${typeProduct}`);
//     } else {
//       navigate('/product');
//     }
//   };

//   const { isLoading, data: products, isPreviousData } = useQuery(
//     ["products"],
//     fetchProductAll,
//     {
//       retry: 3,
//       retryDelay: 100,
//       keepPreviousData: true,
//     }
//   );

//   useEffect(() => {
//     fetchAllTypeProduct();
//   }, []);

//   const renderContent = (type, options) => {
//     switch (type) {
//       case "text":
//         return options.map((option) => {
//           return <WrapperTextValue>{option}</WrapperTextValue>;
//         });
//       case "checkbox":
//         return (
//           <Checkbox.Group
//             style={{
//               width: "100%",
//               display: "flex",
//               flexDirection: "column",
//               gap: "12px",
//             }}
//             options={options}
//           />
//         );
//       case "rate":
//         return <Rate disabled defaultValue={options} />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div>
//       <RadioGroup
//         value={typeProduct}
//         onChange={handleTypeProductChange} // sử dụng hàm handleTypeProductChange để cập nhật state và đường dẫn trên route
//       >
//         {renderContent()}
//         {renderAllButton()}
//         {typeProducts.map((item) => (
//           <FormControlLabel
//             key={item}
//             value={item}
//             control={<Radio />}
//             label={item}
//             name={item}
//           />
//         ))}
//       </RadioGroup>
//       {/* Các phần tử khác */}
//     </div>
//   );
// };

// export default NavbarComponent;
