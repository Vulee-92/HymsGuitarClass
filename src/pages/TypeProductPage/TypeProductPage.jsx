import React, { Fragment } from "react";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import { Col, Pagination, Row } from "antd";
import { WrapperNavbar, WrapperProducts } from "./style";
import { useLocation } from "react-router-dom";
import * as ProductService from "../../services/ProductService";
import { useEffect } from "react";
import { useState } from "react";
import Loading from "../../components/LoadingComponent/Loading";
import { useSelector } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";
import { Box, Container, Grid } from "@mui/material";
import { ProductList } from "../../sections/@dashboard/products";
import { convertPrice } from "utils";
import { faker } from "@faker-js/faker";

const TypeProductPage = () => {
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 500);

  const { state } = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [panigate, setPanigate] = useState({
    page: 0,
    limit: 10,
    total: 1,
  });

  const fetchProductType = async (type, page, limit) => {
    setLoading(true);
    const res = await ProductService.getProductType(type, page, limit);
    if (res?.status === "OK") {
      setLoading(false);
      setProducts(res?.data);
      setPanigate({ ...panigate, total: res?.totalPage });
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (state) {
      fetchProductType(state, panigate.page, panigate.limit);
    }
  }, [state, panigate.page, panigate.limit]);
  console.log('fetchProductType', products)
  const onChange = (current, pageSize) => {
    setPanigate({ ...panigate, page: current - 1, limit: pageSize });
  };

  const productList = products?.data?.map((product, index) => ({
    id: product._id,
    cover: product?.image,
    name: product?.name[index],
    price: convertPrice(faker.datatype.number({ min: 4, max: 99, precision: 0.01 })),
    ...product,
  }));

  return (
    <Container maxWidth="1800px" style={{ marginTop: "100px" }}>
      <Loading isLoading={loading}>
        <div
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <div style={{ margin: "0 auto", height: "100%" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={2} style={{ textAlign: "end", marginTop: "40px" }}>
                <NavbarComponent />
              </Grid>
              <Grid item xs={12} sm={6} md={10}>
                <Grid container spacing={2}>
                  {products
                    ?.filter((pro) => {
                      if (searchDebounce === "") {
                        return pro;
                      } else if (
                        pro?.name
                          ?.toLowerCase()
                          ?.includes(searchDebounce?.toLowerCase())
                      ) {
                        return pro;
                      }
                    })
                    .map((products) => (
                      <Grid sx={{ mt: "20px" }} item xs={12} sm={6} md={3} key={products.id} style={{ maxWidth: "100%" }}>

                        <ProductList products={[products]} />
                      </Grid>
                    ))}
                </Grid>
              </Grid>
              <Pagination
                defaultCurrent={panigate.page + 1}
                total={panigate?.total}
                onChange={onChange}
                style={{ textAlign: "center", marginTop: "10px" }}
              />
            </Grid>
          </div>
        </div>
      </Loading>
    </Container>
  );
};

export default TypeProductPage;