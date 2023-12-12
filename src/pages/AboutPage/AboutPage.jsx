import { Box,Typography,Grid,Container } from "@mui/material";
import React from "react";
/** STYLES */
import styles from "./style";
import AnimationComponent from "../../components/AnimationComponent/AnimationComponent";
import { Parallax,ParallaxProvider } from "react-scroll-parallax";
import { Assets } from "configs";
import ImageCarousel from "components/ImageCarousel/ImageCarousel";

const AboutPage = () => {
	const classes = styles();

	const images = [
		{ mobile: Assets.bgHomeM2,default: Assets.bgHome2 },
		{ mobile: Assets.bgHomeM4,default: Assets.bgHymnsCenter },
		{ mobile: Assets.bgHomeM4,default: Assets.bgHome4 },
		{ mobile: Assets.bgHomeM5,default: Assets.bgHome5 },
		{ mobile: Assets.bgHomeM6,default: Assets.bgHome6 },

		// Thêm các đối tượng hình ảnh khác nếu cần
	];
	return (
		<>

			{/* <ImageCarousel images={images} /> */}
			{/* <Typography className={classes.conTextCreate}>  <AnimationComponent type="text" text="About" className={classes.conTextCreate} />
					<Typography className={classes.txtAboutInfo}>  <AnimationComponent type="text" text="Know more about my career" className={classes.txtAboutInfo} /></Typography>
				</Typography> */}

			<Container maxWidth="lg" style={{ marginTop: '130px' }}>
				<ParallaxProvider>
					<>
						<Parallax speed={-5}>
							<Container maxWidth="lg">
								<Box sx={{ width: '100%' }} >
									<AnimationComponent type="text" text="HYMNS CENTER" className={classes.txtHeaderTitle} />
									<Typography className={classes.txtTilte}>
										Hymns mang đến cho những người yêu thích âm nhạc một trải nghiệm học tập chất lượng và mua sắm đàn guitar thuận tiện. Hymns rất mong muốn được chia sẻ với cộng đồng âm nhạc những giá trị mà Hymns mang lại.
									</Typography>
									<AnimationComponent type="text" text="Lớp học Hymns" className={classes.txtHeaderTitle} />
									<Typography className={classes.txtTilte}>
										Hiện nay, Hymns là lớp học đàn guitar chuyên tập trung vào những bạn mới bắt đầu học guitar. Hymns sử dụng phương pháp giảng dạy cá nhân để tối đa hoá kết quả học tập cho từng học viên. Hymns luôn lắng nghe và tìm hiểu nhu cầu của từng học viên để có thể giúp họ phát triển kỹ năng chơi guitar một cách nhanh chóng và hiệu quả. Mục tiêu của lớp học là giúp các bạn học được cách chơi guitar một cách hiệu quả và có thể tự tin biểu diễn trước công chúng.
									</Typography>

									<Box sx={{ flexGrow: 1 }}>

										<Box sx={{ width: "100%",height: "600px",objectFit: 'cover',borderRadius: '8px',textAlign: "center" }} component={'img'} src={Assets.class} alt="logo" />

									</Box>
									<AnimationComponent type="text" text="Cửa hàng guitar online" className={classes.txtHeaderTitle} />
									<Typography className={classes.txtTilte}>
										Ngoài ra, Hymns còn chuyên cung cấp các sản phẩm đàn guitar và phụ kiện liên quan. Tất cả các sản phẩm của Hymns được chọn lựa kỹ càng để đảm bảo chất lượng và giá cả phù hợp nhất trong thị trường. Hymns cam kết mang lại cho khách hàng sự hài lòng và tin tưởng khi mua sắm tại shop nhạc cụ của Hymns.</Typography>
									<Typography className={classes.txtTilte}>
										Hymns là một cửa hàng chuyên kinh doanh các sản phẩm liên quan đến đàn guitar và phụ kiện.Với phương châm <b>"Sự hài lòng của khách hàng là trên hết"</b>, Hymns cam kết mang đến cho khách hàng những sản phẩm chất lượng và dịch vụ tốt nhất.
									</Typography>


									<Typography className={classes.txtTilte}>
										Hymns hiểu rằng mỗi khách hàng có nhu cầu khác nhau, vì vậy Hymns luôn sẵn sàng lắng nghe và tư vấn cho khách hàng để có thể chọn được sản phẩm phù hợp nhất với nhu cầu của mình.</Typography>
									<Box sx={{ flexGrow: 1 }}>
										<Grid container spacing={2} columns={16}>
											<Grid item xs={8}>
												<Box sx={{ width: "100%",height: "470px",objectFit: 'cover',borderRadius: '8px',textAlign: "center" }} component={'img'} src={Assets.bgHomeM1} alt="logo" />
											</Grid>
											<Grid item xs={8}>
												<Box sx={{ width: "100%",height: "470px",objectFit: 'cover',borderRadius: '8px',textAlign: "center" }} component={'img'} src={Assets.bgHomeM6} alt="logo" />
											</Grid>
										</Grid>
									</Box>

									<Typography className={classes.txtTilte}>Với mong muốn mang đến cho khách hàng những trải nghiệm mua sắm tốt nhất, Hymns đã xây dựng một website bán hàng trực tuyến tiện lợi và dễ sử dụng.Khách hàng có thể dễ dàng tìm kiếm và mua được sản phẩm mình yêu thích chỉ trong vài thao tác đơn giản.          </Typography >
									<Typography className={classes.txtTilte}>
										Hymns không chỉ là một lớp học đàn guitar và shop đàn online, mà còn là một cộng đồng yêu âm nhạc. Hymns mong muốn mang lại cho các bạn yêu thích âm nhạc một môi trường học tập và trải nghiệm thú vị.</Typography>
									<Box sx={{ flexGrow: 1 }}>

										<Box sx={{ width: "100%",height: "470px",objectFit: 'cover',borderRadius: '8px',textAlign: "center" }} component={'img'} src={Assets.bgHome2} alt="logo" />

									</Box>

									<Typography className={classes.txtTilte}>
										Nếu bạn đang quan tâm đến việc học guitar hoặc muốn mua sắm một cây đàn guitar mới, hãy liên hệ với Hymns để được tư vấn và hỗ trợ. Hymns mong nhiều bạn sẽ được học và biết đến môn học này một cách bài bản. Cảm ơn các bạn đã đọc bài viết này!
									</Typography>
								</Box>


							</Container>
						</Parallax>
					</>



				</ParallaxProvider>


			</Container>

		</>

	);
};

export default AboutPage;



