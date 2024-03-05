import React,{ useEffect,useRef,useState } from 'react'
import * as ProductService from "../../services/ProductService";
import { useNavigate } from 'react-router-dom';
import { Box,Button,Input,InputAdornment,List,ListItem,Menu,Typography,alpha } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass,faSearch,faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from "./stylemui";
import { styled } from '@mui/styles';
import { convertPrice } from '../../utils';
const StyledMenu = styled(({ numResults,...props }) => (
	<Menu
		elevation={0}
		anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'right',
		}}
		transformOrigin={{
			vertical: 'top',
			horizontal: 'right',
		}}
		{...props}
	/>
))(({ theme,numResults }) => ({
	'& .MuiPaper-root': {
		borderRadius: 6,
		minHeight: numResults ? `${Math.min(numResults,5) * 48}px` : '50px',
		width: '300px',
		overflowY: "hidden",


		boxShadow:
			'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
		'& .MuiMenu-list': {
			padding: '4px 0',
		},
		'& .MuiMenuItem-root': {
			'& .MuiSvgIcon-root': {
				fontSize: 18,
				color: "#000",
				marginRight: "10px",
			},
			// '&:active': {
			// 	backgroundColor: alpha(
			// 		theme.palette.primary.main,
			// 		theme.palette.action.selectedOpacity,
			// 	),
			// },
		},
	},
}));
const Overlay = styled('div')({
	position: 'fixed',
	top: 0,
	height: "100vh",
	left: 0,
	right: 0,
	bottom: 0,
	filter: 'blur(100%)',
	backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu nền mờ
	zIndex: 99999, // Đảm bảo overlay hiển thị phía trên ô search
});
const SearchComponent = () => {
	const [search,setSearch] = useState('');
	const [productsSearch,setProductsSearch] = useState([]);
	const debounceTimer = useRef(null);
	const navigate = useNavigate();
	const classes = styles();
	const [overlayVisible,setOverlayVisible] = useState(false);
	useEffect(() => {
		const fetchSearchProduct = async () => {
			const res = await ProductService.getSearchProduct(search);
			setProductsSearch(res);
		};

		// Xóa timer debounce cũ nếu có
		if (debounceTimer.current) {
			clearTimeout(debounceTimer.current);
		}

		// Thiết lập timer debounce mới
		debounceTimer.current = setTimeout(() => {
			if (search.trim() !== '') { // Kiểm tra xem search có giá trị không
				fetchSearchProduct();
			}
		},1000);

		// Hủy timer debounce khi component unmount
		return () => {
			clearTimeout(debounceTimer.current);
		};
	},[search]);



	const handleProductClick = (productName) => {
		// Xử lý sản phẩm khi được bấm
		if (productName) {
			const selectedProductSlug = productName?.slug ?? null;
			navigate(`/p/${selectedProductSlug}`);
		}
		handleCloseSearchh()
	};
	// // Hàm search với debounce
	// const debouncedSearch = debounce((value) => {
	// 	setSearch(value);
	// },1000);
	const handleInputChange = (e) => {
		setSearch(e.target.value);
	};





	const renderSearch = () => {
		return (
			<>
				<Button
					id="basic-button"
					aria-controls={opens ? 'basic-menu' : undefined}
					aria-haspopup="true"
					aria-expanded={opens ? 'true' : undefined}
					onClick={handleClickSearch}
				>
					<FontAwesomeIcon icon={faMagnifyingGlass} sx={{ color: "#fff" }} />
				</Button>
				{overlayVisible && <Overlay />}
				<StyledMenu numResults={productsSearch?.length}
					id="basic-menu"
					anchorEl={anchorElSearchs}
					open={opens}
					onClose={handleCloseSearchh}
					sx={{ maxHeight: "500px",marginTop: "20px" }}
				>
					<Box className={classes.conSearch}>
						<Input className={classes.conInput}
							fullWidth
							onChange={handleInputChange}
							// value={search}
							endAdornment={
								<InputAdornment position='end'
									onClick={() => setSearch('')}
								>
									{search !== '' && <FontAwesomeIcon style={{ cursor: 'pointer',paddingRight: 15 }} icon={faTimes} color={"#000"} />}
								</InputAdornment>
							}
							placeholder="Search…"
						/>
						{search == '' && (
							<Box className={classes.conSearchButton} sx={{ paddingRight: 2 }}>
								<FontAwesomeIcon icon={faSearch} color={"#000"} />
							</Box>
						)}


					</Box>
					<List>
						{productsSearch?.data?.map((option,index) => (
							<ListItem key={index} onClick={() => handleProductClick(option)} sx={{ display: "block",borderBottom: "1px solid #f5f5f5" }}>
								<Box sx={{ display: 'flex',alignItems: 'center',justifyContent: "space-around" }}>
									<Box sx={{ cursor: 'pointer' }} >
										<Typography className={classes.txtNameSearch} >{option?.name}</Typography>
										<Typography className={classes.txtPriceSearch} >{convertPrice(option?.price)}</Typography>
									</Box>
									<img src={option?.image[0]} alt={option?.name} style={{ marginLeft: 'auto',height: 35,width: 35,cursor: 'pointer' }} />
								</Box>
							</ListItem>
						))}

					</List>


				</StyledMenu >
			</>
		)

	};
	useEffect(() => {
		// Xóa giá trị của productsSearch khi giá trị search thay đổi
		return () => {
			setProductsSearch(null); // Giả sử setProductsSearch là hàm để cập nhật giá trị productsSearch
		};
	},[search]);
	const [anchorElSearchs,setAnchorElSearchs] = React.useState(null);

	const opens = Boolean(anchorElSearchs);
	const handleClickSearch = (event) => {
		setAnchorElSearchs(event.currentTarget);
		setOverlayVisible(true); // Hiển thị overlay khi bấm vào ô search
	};

	const handleCloseSearchh = () => {
		setAnchorElSearchs(null);
		setOverlayVisible(false); // Ẩn overlay khi đóng ô search
	};

	return (
		<>
			{renderSearch()}
		</>
	)
}

export default SearchComponent