import axios from "axios";
export const axiosJWT = axios.create();
export const createContacts = async (data) => {
	const res = await axios.post(
		`${process.env.REACT_APP_API_URL}/contact/create-contact`,
		data
	);
	return res.data;
};
export const signupUser = async (data) => {
	const res = await axios.post(
		`${process.env.REACT_APP_API_URL}/user/sign-up`,
		data
	);
	return res.data;
};
