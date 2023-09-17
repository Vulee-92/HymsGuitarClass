import Meta from 'antd/es/card/Meta'
import PropTypes from 'prop-types';
import React from 'react'
import { WrapperReportText,StyleNameProduct,WrapperCardStyle,WrapperPriceText,WrapperDiscountText,StyleRoot,WrapperDiscountGrid,WrapperDiscountGridItem,WrapperTitle,WrapperProduct,WrapperProductBg,WrapperProductTiltle } from './style'
import { StarFilled } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { Avatar,Box,Card,CardContent,Container,Grid,ImageList,ImageListItem,Link,Stack,Typography,alpha } from '@mui/material'
// import { styled } from '@mui/styles'
import { fDate } from '../../utils/formatTime'
import Iconify from '../iconify/Iconify'
import { fCurrency,fCurrencyVND,fShortenNumber } from '../../utils/formatNumber'
import SvgColor from "../../components/svg-color";
import { Label } from '@mui/icons-material';
import styles from "./styledmui";

import { ColorPreview } from "../../components/color-utils";

import Slider from "react-slick";
import { convertPrice } from '../../utils';
// const StyledAvatar = styled(Avatar)(({ theme }) => ({
//   zIndex: 9,
//   width: 32,
//   height: 32,
//   position: "absolute",
//   left: theme.spacing(3),
//   bottom: theme.spacing(-2),
// }));

// const StyledInfo = styled("div")(({ theme }) => ({
//   display: "flex",
//   flexWrap: "wrap",
//   justifyContent: "flex-end",
//   marginTop: theme.spacing(3),
//   color: theme.palette.text.disabled,
// }));


const CardComponent = (props,post,index) => {
	const classes = styles();
	const {
		// countInStock,
		// description,
		image,
		name,
		price,
		// rating,
		// type,
		// discount,
		selled,
		// createdAt,
		id,
		// cover,
		// title,
		view,
		comment,
		share,
		// author,
	} = props;
	const navigate = useNavigate();
	const handleDetailsProduct = (id) => {
		navigate(`/product-details/${id}`);

	};

	const latestPostLarge = index === 0;
	const latestPost = index === 1 || index === 2;

	const POST_INFO = [
		{ number: comment,icon: "eva:message-circle-fill" },
		{ number: view,icon: "eva:eye-fill" },
		{ number: share,icon: "eva:share-fill" },
	];

	var settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1
	};

	return (
		<section className="content" id="Explore">


			<img onClick={() => handleDetailsProduct(id)} style={{
				maxHeight: '25em',
				display: 'block',
				position: 'relative',
				top: 0,
				left: '50%',
				cursor: 'pointer',
				transform: 'translate3d(-50%, 0, 0)'
			}} src={image} alt="img 01" />
			<Typography className={classes.nameProduct} style={{ cursor: 'pointers' }} onClick={() => handleDetailsProduct(id)}> 			{name ? `${name.slice(0,70)} ...` : name}</Typography>
			{/* <h3 class="product__subtitle" onClick={() => handleDetailsProduct(id)}> gỗ hồng đào</h3> */}
			{/* <p class="product__description">Thông số : Full gỗ hồng đào nguyên tấm , có ti chỉnh cần , gắn khóa đúc cao cấp
              Tặng kèm : Bao vãi yamaha , capo , pick , bộ dây sơ cua
              Đàn Guitar Acoustic Fh200 Full gỗ hồng đào  là mẫu đàn guitar chất lượng được rất nhiều guitarrist chọn mua tại GIÓ GUITAR  bởi đàn guitar nằm trong phân khúc đàn guitar phổ thông với giá thành vừa phải phù hợp với dòng gutiar sinh viên đà nẵng,Đàn guitar Fh200 Full gỗ hồng đào là 1 cây đàn guitar đáng để bạn suy nghỉ để chọn mua đó!

              Nổi bậc với thiết kế chắc chắn, hiện đại.Được gia công tỉ mỉ, các phím đàn , lược đàn đều được tính toán kĩ trước khi lắp ráp, tạo cảm giác thoải mái nhất cho người sử dụng.Đàn guitar Fh200 Full gỗ hồng đào bảo đảm cho người chơi cảm giác phiêu nhất !

              Đàn Guitar Acoustic Fh200 Full gỗ hồng đào tại Shop Đàn GIÓ GUITAR là một trong số ít đàn guitar có âm hưởng, tốc độ truyền âm thanh, độ vang rất tốt và giai điệu rõ ràng được rất nhiều guitarist đặc biệt là giới trẻ đánh giá cao.

              Bạn có thể chơi Đàn Guitar Fh200 Full gỗ hồng đào ở ngoài trời trong các buổi du ngoạn với đám bạn, người yêu hay trình diễn nó trên sân khấu với nhiều thể loại nhạc khác nhau từ cổ điển, country, jazz cho đến flamenco, ballad và các bản nhạc hiện đại với sắc độ biểu cảm tạo nên sự gắn kết, khuấy động không khí vui tươi chốn đông người.</p> */}


			<Typography className={classes.txtPrice} style={{ textAlign: 'center',cursor: 'pointers',fontSize: "18px" }}>{convertPrice(price)}</Typography>

		</section>
		// <Card className={classes.Image}>
		//   <Box sx={{ pt: "140%", position: "relative" }}>
		//     {/* {status && ( */}
		//     <Label
		//       variant="filled"
		//       // color={(status === "sale" && "error") || "info"}
		//       sx={{
		//         zIndex: 9,
		//         top: 16,
		//         right: 16,
		//         position: "absolute",
		//         textTransform: "uppercase",
		//       }}
		//     >
		//       {/* {status} */}
		//     </Label>
		//     <img
		//       style={{
		//         top: 0,
		//         width: "100%",
		//         height: "100%",
		//         objectFit: "cover",
		//         position: "absolute",
		//       }}
		//       alt={image}
		//       src={image}
		//       onClick={() => handleDetailsProduct(id)}
		//     />
		//   </Box>

		//   <Stack spacing={2} sx={{ p: 3 }}>
		//     <Link color="inherit" underline="hover">
		//       <Typography
		//         onClick={() => handleDetailsProduct(id)}
		//         className={classes.NameCard}
		//         variant="subtitle2"
		//         noWrap
		//       >
		//         {name}
		//       </Typography>
		//     </Link>

		//     <Stack
		//       direction="row"
		//       alignItems="center"
		//       justifyContent="space-between"
		//       onClick={() => handleDetailsProduct(id)}
		//     >
		//       <Box></Box>
		//       <Typography variant="subtitle1">
		//         <Typography
		//           component="span"
		//           variant="body1"
		//           sx={{
		//             color: "text.disabled",
		//             textDecoration: "line-through",
		//           }}
		//         >
		//           {selled && fCurrency(selled)}
		//         </Typography>
		//         <span> da ban {selled || 1000}+</span>
		//         {fCurrencyVND(price)}
		//       </Typography>
		//     </Stack>
		//   </Stack>
		// </Card>

		// <WrapperCardStyle
		//   hoverable
		//   headStyle={{ width: "200px", height: "200px" }}
		//   style={{ width: 240 }}
		//   bodyStyle={{ padding: "10px" }}
		//   cover={<img alt={image} src={image} />}
		//   onClick={() => handleDetailsProduct(id)}
		// >
		//   <img
		//     src={image}
		//     style={{
		//       width: "68px",
		//       height: "14px",
		//       position: "absolute",
		//       top: -1,
		//       left: -1,
		//       borderTopLeftRadius: "3px",
		//     }}
		//   />
		//   <StyleNameProduct>{name}</StyleNameProduct>
		//   <WrapperReportText>
		//     <span>
		//       <StarFilled style={{ fontSize: "10px", color: "yellow" }} />
		//     </span>
		//     <span> da ban {selled || 1000}+</span>
		//   </WrapperReportText>
		//   <WrapperPriceText>
		//     {price.toLocaleString()}d{" "}
		//     <WrapperDiscountText>- {discount}%</WrapperDiscountText>
		//   </WrapperPriceText>
		// </WrapperCardStyle>

		// <Grid
		//   item
		//   xs={12}
		//   sm={latestPostLarge ? 12 : 6}
		//   md={latestPostLarge ? 6 : 3}
		// >
		//   <Card sx={{ position: "relative" }}>
		//     <StyledCardMedia
		//       sx={{
		//         ...((latestPostLarge || latestPost) && {
		//           pt: "calc(100% * 4 / 3)",
		//           "&:after": {
		//             top: 0,
		//             content: "''",
		//             width: "100%",
		//             height: "100%",
		//             position: "absolute",
		//             // bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
		//           },
		//         }),
		//         ...(latestPostLarge && {
		//           pt: {
		//             xs: "calc(100% * 4 / 3)",
		//             sm: "calc(100% * 3 / 4.66)",
		//           },
		//         }),
		//       }}
		//       onClick={() => handleDetailsProduct(id)}
		//     >
		//       <SvgColor
		//         color="paper"
		//         src="/assets/icons/shape-avatar.svg"
		//         sx={{
		//           width: 80,
		//           height: 36,
		//           zIndex: 9,
		//           bottom: -15,
		//           position: "absolute",
		//           color: "background.paper",
		//           ...((latestPostLarge || latestPost) && { display: "none" }),
		//         }}
		//         onClick={() => handleDetailsProduct(id)}
		//       />
		//       <Avatar
		//         alt={image}
		//         src={image}
		//         sx={{
		//           ...((latestPostLarge || latestPost) && {
		//             zIndex: 9,
		//             top: 24,
		//             left: 24,
		//             width: 40,
		//             height: 40,
		//           }),
		//         }}
		//       />

		//       <StyledCover alt={image} src={image} />
		//     </StyledCardMedia>

		//     <CardContent
		//       sx={{
		//         pt: 4,
		//         ...((latestPostLarge || latestPost) && {
		//           bottom: 0,
		//           width: "100%",
		//           position: "absolute",
		//         }),
		//       }}
		//       onClick={() => handleDetailsProduct(id)}
		//     >
		//       <Typography
		//         gutterBottom
		//         variant="caption"
		//         sx={{ color: "text.disabled", display: "block" }}
		//         onClick={() => handleDetailsProduct(id)}
		//       >
		//         {fDate(createdAt)}
		//       </Typography>

		//       <StyledTitle
		//         color="inherit"
		//         variant="subtitle2"
		//         underline="hover"
		//         sx={{
		//           ...(latestPostLarge && { typography: "h5", height: 60 }),
		//           ...((latestPostLarge || latestPost) && {
		//             color: "common.white",
		//           }),
		//         }}
		//         onClick={() => handleDetailsProduct(id)}
		//       >
		//         {name}
		//       </StyledTitle>

		//       <Box>
		//         <Box
		//           key={index}
		//           sx={{
		//             display: "flex",
		//             alignItems: "center",
		//             ml: index === 0 ? 0 : 1.5,
		//             ...((latestPostLarge || latestPost) && {
		//               color: "grey.500",
		//             }),
		//           }}
		//         >
		//           <Iconify
		//             icon={"eva:message-circle-fill"}
		//             sx={{ width: 16, height: 16, mr: 0.5 }}
		//           />
		//           <Typography variant="caption">{fShortenNumber(123)}</Typography>
		//         </Box>
		//       </Box>
		//     </CardContent>
		//   </Card>
		// </Grid>
	);
}

export default CardComponent