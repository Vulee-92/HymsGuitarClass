import React from 'react'
import { Box, Button, Container, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import styles from "./stylemui";
import { Helmet } from 'react-helmet-async';
export const NotFoundPage = ({ children }) => {
  const classes = styles();
  const StyledContent = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  }));

  return (
    <div>
      <>
        <Helmet>
          <title> 404 Page Not Found | Minimal UI </title>
        </Helmet>

        <Container>
          <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
            <Typography variant="h3" paragraph style={{ color: "#245c4f" }} className={classes.txtHeaderTitle}>
              Sorry, page not found!
            </Typography>

            <Typography sx={{ color: 'text.secondary' }} className={classes.txtTilte}>
              Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be sure to check your
              spelling.
            </Typography>

            <Box
              component="img"
              src="/assets/illustrations/illustration_404.svg"
              sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
            />

            <Button href="/" size="large" variant="contained" style={{ backgroundColor: "#245c4f", color: "#fff" }} className={classes.txtTilte} component={RouterLink}>
              Go to Home
            </Button>
          </StyledContent>
        </Container>
      </>
      {/* <FooterComponent /> */}

    </div>

  )
}
export default NotFoundPage