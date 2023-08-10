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
import { Container, Grid } from "@mui/material";

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

  const onChange = (current, pageSize) => {
    setPanigate({ ...panigate, page: current - 1, limit: pageSize });
  };
  return (
    <Container maxWidth="1800px">
      <Loading isLoading={loading}>
        <div
          style={{
            width: "100%",
            // background: "#efefef",
            height: "100%",
          }}
        >
          <div style={{ margin: "0 auto", height: "100%" }}>
            <Grid container spacing={2}>
              {/* <Row
                style={{
                  // flexWrap: "nowrap",
                  paddingTop: "10px",
                  height: "100%",
                  justifyContent: "center",
                }}
              > */}
              <Grid item xs={12} sm={6} md={2} style={{ textAlign: "end", marginTop: "40px" }}>
                <NavbarComponent />
              </Grid>

              {/* <Col
                  span={20}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                > */}
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
                    ?.map((product) => {
                      return (
                        <Grid sx={{ mt: "20px" }} item xs={12} sm={6} md={3}>
                          <CardComponent
                            key={product._id}
                            countInStock={product.countInStock}
                            description={product.description}
                            image={product.image}
                            name={product.name}
                            price={product.price}
                            rating={product.rating}
                            type={product.type}
                            selled={product.selled}
                            discount={product.discount}
                            id={product._id}
                          />
                        </Grid>
                      );
                    })}
                </Grid>
              </Grid>
              <Pagination
                defaultCurrent={panigate.page + 1}
                total={panigate?.total}
                onChange={onChange}
                style={{ textAlign: "center", marginTop: "10px" }}
              />
              {/* </Col> */}
              {/* </Row> */}
            </Grid>
          </div>
        </div>
      </Loading>
    </Container>
  );
};

export default TypeProductPage;
