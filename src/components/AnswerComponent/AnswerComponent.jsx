import { Accordion,AccordionDetails,AccordionSummary,Container,Grid,Typography } from '@mui/material'
import React from 'react'
import styles from "./style";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
const AnswerComponent = () => {
	const classes = styles();
	return (
		<Container maxWidth="lg">
			<Grid container spacing={2} sx={{ display: { xs: "flex" },marginLeft: "0px",width: "100%",justifyContent: "space-around",flexDirection: { xs: "column-reverse",sm: "column-reverse",md: "column-reverse",xl: "row",lg: "row" } }}>
				<Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ padding: { xl: " 10px 30px",xs: "0px 10px" } }}>
					<Typography className={classes.txtTitleBox}>Các câu hỏi thường gặp</Typography>
					<Accordion className={classes.boxAnswer} >
						<AccordionSummary expandIcon={<FontAwesomeIcon icon={faChevronDown} />} aria-controls='panel1a-content' id='panel1a-header'>
							<Typography className={classes.txtTilte}>Tôi có được kiểm tra sản phẩm trước khi mua?</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Typography className={classes.txtAnswer}>Nếu bạn muốn kiểm tra sản phẩm trước khi mua online, vui lòng gọi cho Hymns trước khi đến cửa hàng, nhân viên của chúng tôi luôn nhiệt tình hỗ trợ!</Typography>
						</AccordionDetails>
					</Accordion>
					<Accordion className={classes.boxAnswer}>
						<AccordionSummary expandIcon={<FontAwesomeIcon icon={faChevronDown} />} aria-controls='panel2a-content' id='panel2a-header'>
							<Typography className={classes.txtTilte}>Đơn hàng của tôi có phụ kiện đi kèm không?</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Typography className={classes.txtAnswer}>Sản phẩm không đi kèm phụ kiện, trừ khi phụ kiện đó được nêu rõ trong mô tả sản phẩm. Bạn có thể tìm trên cửa hàng trực tuyến hoặc hỏi Đội Kinh Doanh & Chăm Sóc Khách Hàng nhiệt tình của chúng tôi để được hỗ trợ ngay hôm nay! Chúng tôi sẽ rất vui lòng giúp bạn!</Typography>
						</AccordionDetails>
					</Accordion>
					<Accordion className={classes.boxAnswer}>
						<AccordionSummary expandIcon={<FontAwesomeIcon icon={faChevronDown} />} aria-controls='panel3a-content' id='panel3a-header'>
							<Typography className={classes.txtTilte}>Đơn hàng của tôi có được bảo hành không?</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Typography className={classes.txtAnswer}>Đơn hàng của bạn sẽ được bảo hành trong 1 năm đối với đàn guitar. Nếu có bất kỳ phụ kiện nào hư hỏng do quá trình vận chuyển, xin vui lòng liên hệ với chúng tôi. Để tiện cho việc xử lý, bạn nhớ quay video khi mở sản phẩm nhé. Mong rằng bạn sẽ hài lòng với dịch vụ của chúng tôi!
							</Typography>
						</AccordionDetails>
					</Accordion>
				</Grid>
			</Grid>
		</Container >
	)
}

export default AnswerComponent