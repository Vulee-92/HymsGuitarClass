import axios from "axios";
import { axiosJWT } from "./UserService";
import LRUCache from "lru-cache";

const cache = new LRUCache({ max: 100, maxAge: 1000 * 60 * 10 }); // Lưu trữ tối đa 100 kết quả, mỗi kết quả được lưu trữ trong 10 phút

// export const getAllProduct = async (search, limit) => {
//     let res = {}
//     if (search?.length > 0) {
//         res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all?filter=name&filter=${search}&limit=${limit}`)
//     } else {
//         res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all?limit=${limit}`)
//     }
//     return res.data
// }
export const getAllProduct = async (search, limit) => {
  const cacheKey = `${search}-${limit}`;
  const cachedResult = cache.get(cacheKey);

  if (cachedResult) {
    return cachedResult;
  }

  let res = {};
  if (search?.length > 0) {
    res = await axios.get(
      `${process.env.REACT_APP_API_URL}/product/get-all?filter=name&filter=${search}&limit=${limit}`
    );
  } else {
    res = await axios.get(
      `${process.env.REACT_APP_API_URL}/product/get-all?limit=${limit}`
    );
  }

	const result = res.data;
		  cache.set(cacheKey, result); // Lưu kết quả vào bộ nhớ đệm

  return result;
};

export const getProductType = async (type, page, limit) => {
  if (type) {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/product/get-all?filter=type&filter=${type}&limit=${limit}&page=${page}`
    );
    return res.data;
  }
};

export const createProduct = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/product/create`,
    data
  );
  return res.data;
};

export const getDetailsProduct = async (id) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/product/get-details/${id}`
  );
  return res.data;
};


export const updateProduct = async (id, access_token, data) => {
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_API_URL}/product/update/${id}`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const deleteProduct = async (id, access_token) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_API_URL}/product/delete-product/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const deleteManyProduct = async (data, access_token) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_URL}/product/delete-many`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getAllTypeProduct = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/product/get-all-type`
  );
  return res.data;
};
