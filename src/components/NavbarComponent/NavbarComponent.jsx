import { Checkbox, Col, Rate, Row } from "antd";
import React, { useEffect, useState } from "react";
import {
  WrapperContent,
  WrapperLableText,
  WrapperTextPrice,
  WrapperTextValue,
} from "./style";
import * as ProductService from "../../services/ProductService";
import { useQuery } from "@tanstack/react-query";
import TypeProduct from "components/TypeProduct/TypeProduct";
const NavbarComponent = () => {
  const onChange = () => { };

  const [typeProducts, setTypeProducts] = useState([])
  const fetchProductAll = async () => {
    const res = await ProductService.getAllProduct();
    return res;
  };
  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct()
    if (res?.status === 'OK') {
      setTypeProducts(res?.data)
    }
  }





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
      <WrapperLableText>Lable</WrapperLableText>
      <WrapperContent>
        {typeProducts.map((item) => {
          return (
            <TypeProduct name={item} key={item} />
          )
        })}
      </WrapperContent>
    </div>
  );
};

export default NavbarComponent;
