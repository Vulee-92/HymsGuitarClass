import axios from "axios";
import { axiosJWT } from "./UserService";
import LRUCache from "lru-cache";

const cache = new LRUCache({ max: 100,maxAge: 1000 * 60 * 10 }); // Lưu trữ tối đa 100 kết quả, mỗi kết quả được lưu trữ trong 10 phút


export const getAllBlog = async (search,limit) => {
	const cacheKey = `${search}-${limit}`;
	const cachedResult = cache.get(cacheKey);

	if (cachedResult) {
		return cachedResult;
	}

	let res = {};
	if (search?.length > 0) {
		res = await axios.get(
			`${process.env.REACT_APP_API_URL}/blog/get-all-blog?filter=name&filter=${search}&limit=${limit}`
		);
	} else {
		res = await axios.get(
			`${process.env.REACT_APP_API_URL}/blog/get-all-blog?limit=${limit}`
		);
	}
	const result = res.data;

	cache.set(cacheKey,result); // Lưu kết quả vào bộ nhớ đệm

	return result;
}

export const getDetailsBlog = async (id) => {
	const res = await axios.get(
		`${process.env.REACT_APP_API_URL}/blog/get-details/${id}`
	);
	return res.data;
};




export const updateBlog = async (id,access_token,data) => {
	const res = await axiosJWT.put(
		`${process.env.REACT_APP_API_URL}/blog/update/${id}`,
		data,
		{
			headers: {
				token: `Bearer ${access_token}`,
			},
		}
	);
	return res.data;
};

export const deleteBlog = async (id,access_token) => {
	const res = await axiosJWT.delete(
		`${process.env.REACT_APP_API_URL}/blog/delete/${id}`,
		{
			headers: {
				token: `Bearer ${access_token}`,
			},
		}
	);
	return res.data;
};

export const deleteManyBlog = async (data,access_token) => {
	const res = await axiosJWT.post(
		`${process.env.REACT_APP_API_URL}/blog/delete-many`,
		data,
		{
			headers: {
				token: `Bearer ${access_token}`,
			},
		}
	);
	return res.data;
};

export const getAllTypeBlog = async () => {
	const res = await axios.get(
		`${process.env.REACT_APP_API_URL}/blog/get-all-type`
	);
	return res.data;
};
