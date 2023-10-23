

import React,{ useState,useEffect } from 'react';
import {
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Button,
	Grid,
	Box,
	Modal,
} from '@mui/material';
import axios from 'axios';
import CButton from 'components/CButton';
import styles from "./style";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: "10px !important",
			borderRadius: 30,
			overflow: "hidden",
			overflowY: "scroll",

			p: 4,
		},
	},
};
const ModalUserComponent = ({
	open,
	handleClose,
	userData,
	isCreating,
	handleUpdateUser,
}) => {
	const [formData,setFormData] = useState({
		_id: '',
		name: '',
		city: '',
		address: '',
		email: '',
		isAdmin: false,
		phone: '',
		password: '',
	});
	console.log("formData",formData)
	const [errors,setErrors] = useState({
		_id: false,
		name: false,
		city: false,
		email: false,
		isAdmin: false,
		address: false,
		phone: false,
		password: false,
	});

	const handleChange = (e) => {
		const { name,value } = e.target;
		setFormData({ ...formData,[name]: value });

		if (typeof value === 'string') {
			setErrors({ ...errors,[name]: value.trim() === '' });
		} else {
			setErrors({ ...errors,[name]: false });
		}
	};
	const [provinces,setProvinces] = useState([]);
	const [districts,setDistricts] = useState([]);
	const [wards,setWards] = useState([]);
	const classes = styles();
	const [selectedProvince,setSelectedProvince] = useState(null);
	const [isFormValid,setIsFormValid] = useState(false);
	const [updateRequested,setUpdateRequested] = useState(false);
	const [selectedProvinceName,setSelectedProvinceName] = useState(null);
	const BASE_API_URL = 'https://provinces.open-api.vn/api';

	const validateForm = () => {
		if (
			formData.name &&
			formData.email &&
			formData.phone &&
			formData.province &&
			formData.district &&
			formData.ward
		) {
			setIsFormValid(true);
		} else {
			setIsFormValid(false);
		}
	};

	const fetchProvinces = async () => {
		try {
			const response = await axios.get(`${BASE_API_URL}/p`);
			setProvinces(response?.data);
		} catch (error) {
			console.log(error);
		}
	};


	const fetchDistricts = async (provinceId) => {
		try {
			const response = await axios.get(
				`${BASE_API_URL}/p/${provinceId}/?depth=2`);
			setDistricts(response?.data?.districts);
		} catch (error) {
			setDistricts([]); // Set districts to an empty array or handle the error in an appropriate way
		}
	};
	const handleCityClick = () => {
		// Gọi API để lấy danh sách thành phố
		// fetchCities(selectedProvince);
	};
	const fetchWards = async (districtId) => {
		try {
			const response = await axios.get(
				`${BASE_API_URL}/d/${districtId}/?depth=2`
			);
			setWards(response?.data?.wards);
			console.log("responseresponseresponse",response?.data?.data?.ward)
		} catch (error) {
			console.log(error);
		}
	};

	const handleProvinceChange = (event) => {
		const provinceId = event.target.value;

		setSelectedProvince(provinceId);
		const selectedProvinceData = provinces.find(province => province.code === provinceId);
		setSelectedProvinceName(selectedProvinceData ? selectedProvinceData.name : null);
		fetchDistricts(provinceId);
		handleChange(event);
		validateForm();
	};



	const handleDistrictChange = (event) => {
		const districtId = event.target.value;
		fetchWards(districtId);
		handleChange(event);
		validateForm();
	};

	const handleSubmitForm = (e) => {
		console.log("first",1)
		e.preventDefault();

		// if (Object.values(errors).some((error) => error) || !isFormValid) {
		// 	alert('Vui lòng điền đầy đủ thông tin');
		// 	return;
		// }

		// if (updateRequested) {
		const updatedFormData = {
			...formData,
			province: selectedProvinceName,
			// district: selectedDistrictName,
			// ward: selectedWardName,
		};

		handleUpdateUser(formData);
		console.log("formDataformDataformDataformDataformData",formData)
		// window.location.reload();

		handleClose();
		setUpdateRequested(false);
		// }
	};


	// useEffect(() => {
	// 	validateForm();
	// },[formData]);

	useEffect(() => {
		fetchProvinces();
	},[]);

	// useEffect(() => {
	// 	if (isFormValid && selectedProvince !== null && updateRequested) {
	// 		handleUpdateUser(formData);
	// 		setUpdateRequested(false);
	// 	}
	// },[isFormValid,selectedProvince,updateRequested]);

	useEffect(() => {
		if (userData) {
			setFormData({
				_id: userData.id || '',
				name: userData.name || '',
				city: userData.city || '',
				address: userData.address || '',
				email: userData.email || '',
				isAdmin: userData.isAdmin || false,
				phone: userData.phone || '',
				password: userData.password || '',
			});
		}
	},[userData]);

	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: "50wh",
					bgcolor: 'background.paper',
					borderRadius: 10,
					boxShadow: 24,

					p: 4,
					// maxWidth: 900,
					backgroundColor: '#ffffff',
					boxShadow: "0px 50px 70px -10px rgba(11, 34, 56, 0.05) !important",
				}}
			>
				<form onSubmit={handleSubmitForm}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								className={classes.txtHeaderTitle}
								label="Họ tên"
								fullWidth
								name="name"
								value={formData.name}
								onChange={handleChange}
								error={Boolean(errors.name)}
								helperText={errors.name}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								label="Email"
								variant="outlined"
								fullWidth
								name="email"
								value={formData.email}
								onChange={handleChange}
								error={Boolean(errors.email)}
								helperText={errors.email}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								className={classes.txtHeaderTitle}
								label="Số điện thoại"
								variant="outlined"
								fullWidth
								name="phone"
								value={formData.phone}
								onChange={handleChange}
								error={Boolean(errors.phone)}
								helperText={errors.phone}
							/>
						</Grid>
						<Grid item xs={12}>
							<FormControl fullWidth variant="outlined">
								<InputLabel className={classes.txtHeaderTitle}>Tỉnh/Thành phố</InputLabel>
								<Select
									label="Tỉnh/Thành phố"
									name="provinceId"
									value={formData.provinceId}
									onChange={(e) => {
										handleChange(e);
										handleProvinceChange(e);
									}}
									error={Boolean(errors.provinceId)}
									MenuProps={MenuProps}
								>
									{provinces?.map((province) => (
										<MenuItem
											className={classes.txtTitleInput}

											key={province.code} value={province.code}>
											{province.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12}>
							<FormControl fullWidth variant="outlined">
								<InputLabel className={classes.txtHeaderTitle}>Quận/Huyện</InputLabel>
								<Select
									label="Quận/Huyện"
									name="districtId"
									value={formData.districtId}
									onChange={(e) => {
										handleChange(e);
										handleDistrictChange(e);
									}}
									error={Boolean(errors.districtId)}
									MenuProps={MenuProps}
								>
									{districts?.map((district) => (
										<MenuItem
											className={classes.txtTitleInput}
											key={district?.code} value={district?.name && district?.code}>
											{district?.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12}>
							<FormControl fullWidth variant="outlined">
								<InputLabel className={classes.txtHeaderTitle}>Phường/Xã</InputLabel>
								<Select
									label="Phường/Xã"
									name="wardId"
									value={formData.wardId}
									onChange={handleChange}
									error={Boolean(errors.wardId)}
									MenuProps={MenuProps}
								>
									{wards?.map((ward) => (
										<MenuItem
											className={classes.txtTitleInput}
											key={ward.code} value={ward.code}>
											{ward.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12}>
							<CButton style={{ fullWidth: "30%" }}
								// disabled={!name.length || !email.length || !contactmessenger.length}
								title={"Cập nhật"}
								onClick={handleSubmitForm}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										handleSubmitForm();
									}
								}}
							/>
							{/* <Button
								type="submit"
								variant="contained"
								color="primary"
								onClick={handleSubmitForm}
							// disabled={!isFormValid}
							>
								Cập nhật thông tin
							</Button> */}
						</Grid>
					</Grid>
				</form>


			</Box>
		</Modal>
	);
};

export default ModalUserComponent;
