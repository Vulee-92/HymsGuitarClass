import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	name: "",
	email: "",
	phone: "",
	address: "",
	avatar: "",
	password: "",
	province: "",
	ward: "",
	access_token: "",
	id: "",
	isAdmin: false,
	city: "",
	refreshToken: "",
	createdAt: ""
};

export const userSlide = createSlice({
	name: "user",
	initialState,
	reducers: {
		updateUser: (state,action) => {
			const {
				name = "",
				email = "",
				access_token = "",
				address = "",
				phone = "",
				password = "",
				province = "",
				ward = "",
				avatar = "",
				createdAt = "",
				_id = "",
				isAdmin,
				city = "",
				refreshToken = "",
			} = action.payload;
			state.name = name;
			state.email = email;
			state.password = password;
			state.address = address;
			state.phone = phone;
			state.avatar = avatar;
			state.createdAt = createdAt;
			state.province = province;
			state.ward = ward;
			state.id = _id;
			state.access_token = access_token;
			state.isAdmin = isAdmin;
			state.city = city;
			state.refreshToken = refreshToken ? refreshToken : state.refreshToken;
		},
		resetUser: (state) => {
			state.name = "";
			state.email = "";
			state.address = "";
			state.password = "";
			state.phone = "";
			state.province = "";
			state.ward = "";
			state.avatar = "";
			state.createdAt = "";
			state.id = "";
			state.access_token = "";
			state.isAdmin = false;
			state.city = "";
			state.refreshToken = "";
		},
	},
});

// Action creators are generated for each case reducer function
export const { updateUser,resetUser } = userSlide.actions;

export default userSlide.reducer;
