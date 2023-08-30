import { Box, Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../../sections/@dashboard/products';
import { faker } from "@faker-js/faker";
import { useQuery } from "@tanstack/react-query";
import { sample } from "lodash";
import * as ProductService from "../../services/ProductService";
import { convertPrice } from "../../utils";

import styles from "./style";
import Loading from "../../components/LoadingComponent/Loading";
import TypeProduct from "components/TypeProduct/TypeProduct";
import AnimationComponent from "components/AnimationComponent/AnimationComponent";
import Typical from "react-typical";

const PRODUCT_COLOR = [
  "#00AB55",
  "#000000",
  "#FFFFFF",
  "#FFC0CB",
  "#FF4842",
  "#1890FF",
  "#94D82D",
  "#FFC107",
];

const ProductsPage = () => {
  const [openFilter, setOpenFilter] = useState(false);
  const [typeProducts, setTypeProducts] = useState([])
  const handleOpenFilter = () => {
    setOpenFilter(true);
  };
  const classes = styles();
  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

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
  const productList = products?.data?.map((product, index) => ({
    id: product._id,
    cover: product?.image,
    name: product?.name[index],
    price: convertPrice(faker.datatype.number({ min: 4, max: 99, precision: 0.01 })),
    // priceSale: convertPrice(index % 3
    //   ? null
    //   : faker.datatype.number({ min: 19, max: 29, precision: 0.01 }),),

    colors:
      (index === 0 && PRODUCT_COLOR.slice(0, 2)) ||
      (index === 1 && PRODUCT_COLOR.slice(1, 3)) ||
      (index === 2 && PRODUCT_COLOR.slice(2, 4)) ||
      (index === 3 && PRODUCT_COLOR.slice(3, 6)) ||
      (index === products.length - 1 && PRODUCT_COLOR.slice(4, 6)) ||
      (index === products.length - 2 && PRODUCT_COLOR.slice(5, 6)) ||
      PRODUCT_COLOR,
    status: sample(["new", "new", "", ""]),
    ...product,
  }));
  return (
    <Loading isLoading={isLoading}>

      <>
        {!isLoading && (
          <>
            {/* <Helmet>
        <title> Dashboard: Products | Minimal UI </title>
      </Helmet> */}
            < Box className={classes.container}>

              <Typography className={classes.conTextCreate}>
                <Typical
                  steps={['Guitar', 2000, 'Ukulele', 2000, 'Tuner', 2000, 'Pick', 2000, 'Capo', 2000]}
                  loop={Infinity}
                  wrapper="p"
                  className={classes.conTextCreate}
                />
              </Typography>

            </Box>
            <Box>
              {typeProducts.map((item) => {
                return (
                  <TypeProduct name={item} key={item} />
                )
              })}
            </Box>
            <Container>
              <AnimationComponent type="text" text="Product" className={classes.txtHeaderTitle} />

              {/* <Stack
                direction="row"
                flexWrap="wrap-reverse"
                alignItems="center"
                justifyContent="flex-end"
                sx={{ mb: 5 }}
              > */}
              {/* <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                  <ProductFilterSidebar
                    openFilter={openFilter}
                    onOpenFilter={handleOpenFilter}
                    onCloseFilter={handleCloseFilter}
                  /> */}
              {/* <ProductSort /> */}
              {/* </Stack> */}
              {/* </Stack> */}

              <ProductList products={productList} />
              {/* <ProductCartWidget /> */}
            </Container>
          </>
        )}
      </>

    </Loading >
  );
};

export default ProductsPage;
