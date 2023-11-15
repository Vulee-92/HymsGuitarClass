import axios from "axios";
export const axiosJWT = axios.create();
export const loginUser = async (data) => {
	const res = await axios.post(
		`${process.env.REACT_APP_API_URL}/user/sign-in`,
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

export const getDetailsUser = async (id,access_token) => {
	const res = await axiosJWT.get(
		`${process.env.REACT_APP_API_URL}/user/get-details/${id}`,
		{
			headers: {
				token: `Bearer ${access_token}`,
				'Content-Type': 'application/json'
			},
		}
	);
	return res.data;
};

// export const refreshToken = async () => {
//     const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/refresh-token`, {
//       withCredentials: true,
//       crossDomain: true,
//     })
//     return res.data
// }
export const refreshToken = async (refreshToken) => {
	if (!refreshToken) {
		throw new Error("Missing refresh token");
	}

	console.log("refreshToken",refreshToken);
	const res = await axios.post(
		`${process.env.REACT_APP_API_URL}/user/refresh-token`,
		{},
		{
			headers: {
				token: `Bearer ${refreshToken}`,
			},
		}
	);
	return res.data;
};


export const logoutUser = async () => {
	const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/log-out`);
	return res.data;
};
export const updateUser = async (id,data,access_token) => {
	if (!access_token) {
		throw new Error("Missing access token");
	}

	try {
		const res = await axiosJWT.put(
			`${process.env.REACT_APP_API_URL}/user/update-user/${id}`,
			data,
			{
				headers: {
					token: `Bearer ${access_token}`,
				},
			}
		);
		return res.data;
	} catch (error) {
		throw error;
	}
};


export const verifyUser = async (userId,verificationCode) => {
	try {
		const res = await axios.get(
			`${process.env.REACT_APP_API_URL}/user/verify/${userId}/${verificationCode}`
		);
		return res.data;
	} catch (error) {
		throw error;
	}
};

export const forgotPassword = async (data) => {
	const res = await axios.post(
		`${process.env.REACT_APP_API_URL}/user/forgot-password`,
		data
	);

	return res.data;
};
export const getAllUser = async (access_token) => {
	const res = await axiosJWT.get(
		`${process.env.REACT_APP_API_URL}/user/getAll`,
		{
			headers: {
				token: `Bearer ${access_token}`,
			},
		}
	);
	return res.data;
};

export const deleteUser = async (id,access_token,data) => {
	const res = await axiosJWT.delete(
		`${process.env.REACT_APP_API_URL}/user/delete-user/${id}`,
		data,
		{
			headers: {
				token: `Bearer ${access_token}`,
			},
		}
	);
	return res.data;
};

export const deleteManyUser = async (data,access_token) => {
	const res = await axiosJWT.post(
		`${process.env.REACT_APP_API_URL}/user/delete-many`,
		data,
		{
			headers: {
				token: `Bearer ${access_token}`,
			},
		}
	);
	return res.data;
};
