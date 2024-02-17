import axios from "axios";
export const axiosJWT = axios.create();
export const getAllBrand = async () => {
	const res = await axiosJWT.get(
		`${process.env.REACT_APP_API_URL}/brand-product/get-all`,
	);
	return res.data;
};