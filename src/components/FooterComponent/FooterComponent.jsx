import { Box, Container, Grid, IconButton, InputBase, Link, Paper, Typography } from '@mui/material'
import React from 'react'
import styles from "./stylemui";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
const FooterComponent = () => {
  const classes = styles();
  return (
    <Box
      component="footer"
      className={classes.footer}
    >
      <Container className={classes.container}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4} >
            <Typography className={classes.nameProduct}>
              Hymns
            </Typography>
            <Typography className={classes.txtTilte}>
              Trang web chính thức của Hymns. Cảm ơn bạn đã ghé thăm!
            </Typography>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Typography className={classes.nameProduct}>
              Trang
            </Typography>
            <Typography className={classes.txtTilte}>
              Giới thiệu
            </Typography>
            <Typography className={classes.txtTilte}>
              Sản phẩm
            </Typography>
            <Typography className={classes.txtTilte}>
              Liên hệ
            </Typography>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Typography className={classes.nameProduct}>
              Tài khoản
            </Typography>
            <Typography className={classes.txtTilte}>
              Đăng nhập
            </Typography>
            <Typography className={classes.txtTilte}>
              Thông tin tài khoản
            </Typography>
            <Typography className={classes.txtTilte}>
              Đơn hàng của bạn
            </Typography>
            <Typography className={classes.txtTilte}>
              Đăng xuất
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography className={classes.nameProduct}>
              Đăng ký
            </Typography>
            <Typography className={classes.txtTilte}>

              Đăng ký để nhận nội dung độc quyền và tin tức mới nhất
            </Typography>
            <Paper
              className={classes.inputEmail}
              component="form"
              sx={{ display: 'flex', alignItems: 'left', width: 350 }}
            >
              <InputBase
                className={classes.inputEmailBase}
                sx={{ ml: 1, flex: 1 }}
                placeholder="Enter email address"
                inputProps={{ 'aria-label': 'Enter email address' }}
              />
              <IconButton className={classes.customSendEmail} type="button" aria-label="search">
                <FontAwesomeIcon icon={faPaperPlane} />
              </IconButton>

            </Paper>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography className={classes.txtCopyRight} align="center">
            {" © "}
            <Link className={classes.txtCopyRightLink} color="inherit" href="/">
              Hymns. All Rights Reserved
            </Link>{" "}
            {new Date().getFullYear()}
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default FooterComponent