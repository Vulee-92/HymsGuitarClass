import { Box,FormControl,Input,InputAdornment,Typography,Grid,Snackbar,Alert,styled,Container } from "@mui/material";
import { useMutationHooks } from "hooks/useMutationHook";
import React,{ useState,useEffect } from "react";
import { useSelector } from "react-redux";
import * as ContactService from '../../services/ContactService'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as message from '../../components/Message/Message'
import { Colors } from "utils/colors";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import i18n from "utils/languages/i18n";
/** STYLES */
import styles from "./style";
import Loading from "../../components/LoadingComponent/Loading";
import AnimationComponent from "../../components/AnimationComponent/AnimationComponent";
import InputForm from "../../components/InputForm/InputForm";
import { Parallax,ParallaxBanner,ParallaxProvider } from "react-scroll-parallax";
import { Assets } from "configs";

const AboutPage = () => {
	const [name,setName] = useState("");
	const [email,setEmail] = useState("");
	const [contactmessenger,setContactMessages] = useState("");
	const { t } = useTranslation();
	const classes = styles();
	const location = useLocation();
	const [loading,setLoading] = useState(false);
	const [lang,setLang] = useState(i18n.language);
	const [errorMsg,setErrorMsg] = useState("");
	const user = useSelector((state) => state.user);
	const handleOnChangeEmail = (value) => {
		setEmail(value)
	}
	const handleOnChangeName = (value) => {
		setName(value)
	}
	const handleOnChangeMessage = (value) => {
		setContactMessages(value)
	}

	const mutation = useMutationHooks(
		data => ContactService.createContacts(data)
	)
	const { data,isLoading,isSuccess,isError } = mutation
	console.log("mutation",data)
	const clearForm = () => {
		setName("");
		setEmail("");
		setContactMessages("");
	};
	useEffect(() => {
		if (isSuccess) {
			message.success()
			clearForm();
		} else if (isError) {
			message.error()
		}
	},[isSuccess,isError])



	const [form,setForm] = useState({
		name: {
			value: "",
			isFocus: false,
			msg: "",
			error: false,
		},
		email: {
			value: "",
			isFocus: false,
			msg: "",
			error: false,
		},
		contactmessenger: {
			value: "",
			isFocus: false,
			msg: "",
			error: false,
		},
	});



	const onBlurFocusInput = (value,field) => {
		setForm({
			...form,
			[field]: {
				...form[field],
				isFocus: value,
			},
		});
	};

	/** FUNCTIONS */
	const handleContact = () => {
		mutation.mutate({
			name,
			email,
			contactmessenger
		}
		);
	};


	const onValidate = () => {
		handleContact();

		setErrorMsg("");
		setForm({
			...form,
			name: {
				...form.name,
				error: false,
			},
			email: {
				...form.email,
				error: false,
			},
			contactmessenger: {
				...form.contactmessenger,
				error: false,
			},
		});

		let isError = false;
		let newForm = { ...form };

		if (form.name.value.trim() === "") {
			isError = true;
			newForm.name.error = true;
			newForm.name.msg = t("txt_error_name_empty");
		}

		if (form.email.value.trim() === "") {
			isError = true;
			newForm.email.error = true;
			newForm.email.msg = t("txt_error_name_empty");
		}

		if (form.contactmessenger.value.trim() === "") {
			isError = true;
			newForm.contactmessenger.error = true;
			newForm.contactmessenger.msg = t("txt_error_name_empty");
		}

		if (isError) {
			return setForm(newForm);
		}
	};
	const ParallaxBannerw = styled(ParallaxBanner)(({ theme }) => ({
		padding: theme.spacing(1),
		height: '300px',
		width: '400px',
		textAlign: 'center',
	}));
	return (
		<>
			<Loading isLoading={isLoading || loading}>

				<Box className={classes.container}>
					<Typography className={classes.conTextCreate}>  <AnimationComponent type="text" text="About" className={classes.conTextCreate} />
						<Typography className={classes.txtAboutInfo}>  <AnimationComponent type="text" text="Know more about my career" className={classes.txtAboutInfo} /></Typography>
					</Typography>

				</Box>
				<Container maxWidth="md" style={{ marginTop: '100px' }}>
					<ParallaxProvider>
						<>
							<Parallax speed={-5}>
								<Container maxWidth="md">
									<Box sx={{ width: '100%' }} >
										<AnimationComponent type="text" text="HYMNS - VŨ LÊ" className={classes.txtHeaderTitle} />
										<Typography className={classes.txtTilte}>
											Tôi là Vũ Lê, sáng lập HYMNS - một lớp học đàn guitar và cũng là cửa hàng đàn guitar trực tuyến. HYMNS mang đến cho những người yêu thích âm nhạc một trải nghiệm học tập chất lượng và mua sắm đàn guitar thuận tiện. Tôi rất hân hạnh được giới thiệu về HYMNS và mong muốn được chia sẻ với cộng đồng âm nhạc những giá trị mà HYMNS mang lại.
										</Typography>
										{/* 
                    <Box sx={{ flexGrow: 1 }}>

                      <Box sx={{ width: "100%", height: "470px", objectFit: 'cover', borderRadius: '8px', textAlign: "center" }} component={'img'} src={Assets.hymns_4} alt="logo" />

                    </Box>
                    <Typography className={classes.txtTilte}> Tại HYMNS, HYMNS cung cấp đa dạng các loại đàn guitar từ các thương hiệu nổi tiếng trên thế giới như Fender, Gibson, Taylor, Martin... Bên cạnh đó, HYMNS cũng cung cấp các phụ kiện đi kèm như dây đàn, bộ giữ dây, bộ chỉnh âm thanh, bộ lau chùi... để giúp khách hàng có thể chăm sóc và bảo quản đàn guitar của mình tốt nhất.          </Typography>
                    <Typography className={classes.txtTilte}>HYMNS luôn đặt chất lượng sản phẩm lên hàng đầu, vì vậy các sản phẩm của HYMNS đều được nhập khẩu từ các nhà sản xuất uy tín trên thế giới.HYMNS cam kết sản phẩm của mình không chỉ đáp ứng được nhu cầu của khách hàng về chất lượng mà còn có giá cả hợp lý.          </Typography >
                  
                    <Typography className={classes.txtTilte}>Ngoài ra, HYMNS còn có đội ngũ nhân viên tư vấn chuyên nghiệp và tận tâm.Họ sẽ giúp khách hàng lựa chọn được sản phẩm phù hợp với nhu cầu sử dụng của mình.Đồng thời, nếu khách hàng có bất kỳ thắc mắc hay yêu cầu nào liên quan đến sản phẩm, dịch vụ của HYMNS, đội ngũ nhân viên tư vấn sẽ luôn sẵn sàng hỗ trợ.          </Typography >

                    <Typography className={classes.txtTilte}>Với mong muốn mang đến cho khách hàng những trải nghiệm mua sắm tốt nhất, HYMNS đã xây dựng một website bán hàng trực tuyến tiện lợi và dễ sử dụng.Khách hàng có thể dễ dàng tìm kiếm và mua được sản phẩm mình yêu thích chỉ trong vài thao tác đơn giản.          </Typography >
                    <Box sx={{ flexGrow: 1 }}>

                      <Box sx={{ width: "100%", height: "auto", objectFit: 'cover', borderRadius: '8px', textAlign: "center" }} component={'img'} src={Assets.hymns_5} alt="logo" />

                    </Box>
                    <Typography className={classes.txtTilte}>Tóm lại, HYMNS là địa chỉ tin cậy để khách hàng có thể tìm kiếm và mua sắm các sản phẩm liên quan đến đàn guitar và phụ kiện.Với chất lượng sản phẩm, dịch vụ tốt nhất và giá cả hợp lý, HYMNS hy vọng sẽ được trở thành người bạn đồng hành tin cậy của các tín đồ yêu nhạc.          </Typography > */}
										{/* <Typography variant="overline" display="block" gutterBottom>
                    overline text
                  </Typography> */}
										<AnimationComponent type="text" text="Về tôi" className={classes.txtHeaderTitle} />
										<Typography className={classes.txtTilte}>
											Hành trình âm nhạc của tôi bắt đầu từ hè năm lớp 7, khi tôi bước những bước đầu tiên vào việc chơi guitar acoustic dưới sự chỉ bày của một người Thầy trong hội thánh Tin Lành Phương Hoà. Một năm sau, tôi phát hiện ra niềm đam mê âm nhạc lớn nhất của mình với những bản cover theo phong cách fingerstyle. Ảnh hưởng đầu tiên của tôi chủ yếu là những người chơi guitar người Hàn và Nhật như Sungha Jung…
										</Typography>

										<Box sx={{ flexGrow: 1 }}>

											<Box sx={{ width: "100%",height: "470px",objectFit: 'cover',borderRadius: '8px',textAlign: "center" }} component={'img'} src={Assets.hymns_4} alt="logo" />

										</Box>
										<AnimationComponent type="text" text="Lớp học Hymns" className={classes.txtHeaderTitle} />
										<Typography className={classes.txtTilte}>
											Hiện nay, HYMNS là lớp học đàn guitar của tôi, chuyên tập trung vào những bạn mới bắt đầu học guitar. Tôi sử dụng phương pháp giảng dạy cá nhân để tối đa hoá kết quả học tập cho từng học viên. Tôi luôn lắng nghe và tìm hiểu nhu cầu của từng học viên để có thể giúp họ phát triển kỹ năng chơi guitar một cách nhanh chóng và hiệu quả. Mục tiêu của lớp học là giúp các bạn học được cách chơi guitar một cách hiệu quả và có thể tự tin biểu diễn trước công chúng.
										</Typography>

										<Box sx={{ flexGrow: 1 }}>

											<Box sx={{ width: "100%",height: "470px",objectFit: 'cover',borderRadius: '8px',textAlign: "center" }} component={'img'} src={Assets.bgClass} alt="logo" />

										</Box>
										<AnimationComponent type="text" text="Cửa hàng guitar online" className={classes.txtHeaderTitle} />
										<Typography className={classes.txtTilte}>
											Ngoài ra, HYMNS còn chuyên cung cấp các sản phẩm đàn guitar và phụ kiện liên quan. Tất cả các sản phẩm của HYMNS được chọn lựa kỹ càng để đảm bảo chất lượng và giá cả phù hợp nhất trong thị trường. HYMNS cam kết mang lại cho khách hàng sự hài lòng và tin tưởng khi mua sắm tại shop nhạc cụ của HYMNS.</Typography>
										<Typography className={classes.txtTilte}>
											HYMNS là một cửa hàng chuyên kinh doanh các sản phẩm liên quan đến đàn guitar và phụ kiện.Với phương châm <b>"Sự hài lòng của khách hàng là trên hết"</b>, HYMNS cam kết mang đến cho khách hàng những sản phẩm chất lượng và dịch vụ tốt nhất.
										</Typography>


										<Typography className={classes.txtTilte}>
											Tôi hiểu rằng mỗi khách hàng có nhu cầu khác nhau, vì vậy HYMNS luôn sẵn sàng lắng nghe và tư vấn cho khách hàng để có thể chọn được sản phẩm phù hợp nhất với nhu cầu của mình.</Typography>
										<Box sx={{ flexGrow: 1 }}>
											<Grid container spacing={2} columns={16}>
												<Grid item xs={8}>
													<Box sx={{ width: "100%",height: "470px",objectFit: 'cover',borderRadius: '8px',textAlign: "center" }} component={'img'} src={Assets.hymns_1} alt="logo" />
												</Grid>
												<Grid item xs={8}>
													<Box sx={{ width: "100%",height: "470px",objectFit: 'cover',borderRadius: '8px',textAlign: "center" }} component={'img'} src={Assets.hymns_2} alt="logo" />
												</Grid>
											</Grid>
										</Box>

										<Typography className={classes.txtTilte}>Với mong muốn mang đến cho khách hàng những trải nghiệm mua sắm tốt nhất, HYMNS đã xây dựng một website bán hàng trực tuyến tiện lợi và dễ sử dụng.Khách hàng có thể dễ dàng tìm kiếm và mua được sản phẩm mình yêu thích chỉ trong vài thao tác đơn giản.          </Typography >
										<Typography className={classes.txtTilte}>
											HYMNS không chỉ là một lớp học đàn guitar và shop đàn online, mà còn là một cộng đồng yêu âm nhạc. HYMNS mong muốn mang lại cho các bạn yêu thích âm nhạc một môi trường học tập và trải nghiệm thú vị.</Typography>
										<Box sx={{ flexGrow: 1 }}>

											<Box sx={{ width: "100%",height: "470px",objectFit: 'cover',borderRadius: '8px',textAlign: "center" }} component={'img'} src={Assets.bgBanner} alt="logo" />

										</Box>

										<Typography className={classes.txtTilte}>
											Nếu bạn đang quan tâm đến việc học guitar hoặc muốn mua sắm một cây đàn guitar mới, hãy liên hệ với HYMNS để được tư vấn và hỗ trợ. HYMNS mong nhiều bạn sẽ được học và biết đến môn học này một cách bài bản. Cảm ơn các bạn đã đọc bài viết này!
										</Typography>
									</Box>


								</Container>
							</Parallax>
						</>



					</ParallaxProvider>


				</Container>
			</Loading>

		</>

	);
};

export default AboutPage;



