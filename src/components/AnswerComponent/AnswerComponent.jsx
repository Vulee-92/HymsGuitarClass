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
							<Typography className={classes.txtAnswer}>Sản phẩm không có phụ kiện đi kèm, trừ trường hợp những phụ kiện đó được nêu rõ trong phần mô tả sản phẩm. Bạn có thể tìm trên cửa hàng trực tuyến hoặc hỏi Đội Ngũ Kinh Doanh & Chăm Sóc Khách Hàng nhiệt tình của chúng tôi để được hỗ trợ ngay hôm nay!</Typography>
						</AccordionDetails>
					</Accordion>
					<Accordion className={classes.boxAnswer}>
						<AccordionSummary expandIcon={<FontAwesomeIcon icon={faChevronDown} />} aria-controls='panel3a-content' id='panel3a-header'>
							<Typography className={classes.txtTilte}>Đơn hàng của tôi có được bảo hành không?</Typography>
						</AccordionSummary>
					</Accordion>
				</Grid>
			</Grid>
		</Container >
	)
}

export default AnswerComponent