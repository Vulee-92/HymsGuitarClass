import axios from "axios";
export const axiosJWT = axios.create();
export const getAllCate = async () => {
	const res = await axiosJWT.get(
		`${process.env.REACT_APP_API_URL}/cate-product/get-all`,
	);
	return res.data;
};