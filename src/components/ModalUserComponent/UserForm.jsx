import React,{ useState,useEffect } from 'react';
import {
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Button,
	Grid,
	Typography,
	useTheme,
} from '@mui/material';
import axios from 'axios';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

const UserForm = ({
	formData,
	handleChange,
	errors,
	handleUpdateUser,
	handleClose,
}) => {
	const [provinces,setProvinces] = useState([]);
	const [districts,setDistricts] = useState([]);
	const [wards,setWards] = useState([]);
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
			// console.log(error);
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

	const fetchWards = async (districtId) => {
		try {
			const response = await axios.get(
				`${BASE_API_URL}/d/${districtId}/?depth=2`
			);
			setWards(response?.data?.wards);
		} catch (error) {
			// console.log(error);
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
		e.preventDefault();

		if (Object.values(errors).some((error) => error) || !isFormValid) {
			alert('Vui lòng điền đầy đủ thông tin');
			return;
		}

		if (updateRequested) {
			const updatedFormData = {
				...formData,
				province: selectedProvinceName,
				// district: selectedDistrictName,
				// ward: selectedWardName,
			};

			handleUpdateUser(updatedFormData);
			handleClose();
			setUpdateRequested(false);
		}
	};



	useEffect(() => {
		validateForm();
	},[formData]);

	useEffect(() => {
		fetchProvinces();
	},[]);

	useEffect(() => {
		if (isFormValid && selectedProvince !== null && updateRequested) {
			handleUpdateUser(formData);
			setUpdateRequested(false);
		}
	},[isFormValid,selectedProvince,updateRequested]);

	return (
		<form onSubmit={handleSubmitForm}>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<TextField
						label="Họ tên"
						variant="outlined"
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
						<InputLabel>Tỉnh/Thành phố</InputLabel>
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
								<MenuItem key={province.code} value={province.code}>
									{province.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12}>
					<FormControl fullWidth variant="outlined">
						<InputLabel>Quận/Huyện</InputLabel>
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
								<MenuItem key={district?.code} value={district?.name && district?.code}>
									{district?.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12}>
					<FormControl fullWidth variant="outlined">
						<InputLabel>Phường/Xã</InputLabel>
						<Select
							label="Phường/Xã"
							name="wardId"
							value={formData.wardId}
							onChange={handleChange}
							error={Boolean(errors.wardId)}
							MenuProps={MenuProps}
						>
							{wards?.map((ward) => (
								<MenuItem key={ward.code} value={ward.code}>
									{ward.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12}>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						disabled={!isFormValid}
					>
						Cập nhật thông tin
					</Button>
				</Grid>
			</Grid>
		</form>
	);
};

export default UserForm;
