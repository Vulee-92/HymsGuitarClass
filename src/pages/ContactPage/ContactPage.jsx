import React, { useState } from 'react'
import Loading from '../../components/LoadingComponent/Loading'
import styles from "./style";
import { Box, Container, Typography } from '@mui/material';
function ContactPage() {
  const { isLoading, setIsLoading } = useState(false);
  const classes = styles();
  return (
    // <Loading isLoading={isLoading}>

    <>
      {/* {!isLoading && ( */}
      <>
        {/* <Helmet>
        <title> Dashboard: Products | Minimal UI </title>
      </Helmet> */}
        <Box className={classes.container} style={{ position: 'relative' }}>
          <Typography className={classes.txtHeaderTitleContact} style={{ position: 'absolute', zIndex: 9999, left: '33.3%' }}>
            Contact
          </Typography>
        </Box>



        <Container>
          <Typography className={classes.txtHeaderTitle}>
            Products
          </Typography>

        </Container>
      </>
      {/* )} */}
    </>
    // 
    // </Loading >

  )
}

export default ContactPage