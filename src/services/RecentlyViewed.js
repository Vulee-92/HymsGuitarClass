import axios from "axios";



// export const postRecentlyViewed = async (id) => {
// 	try {
// 		const res = await axios.post(
// 			`${process.env.REACT_APP_API_URL}/viewed/viewed-product/${id}`,
// 				{},
// 				{
// 					headers: {
// 						Accept: 'application/json',
// 						'Content-Type': 'application/json',
// 					},
// 					body: JSON.stringify({ userId })
// 				}
// 		);
// 		return res.data;
// 	} catch (error) {
// 		console.error('Error in postRecentlyViewed:',error);
// 		throw error; // rethrow the error for handling in the calling code
// 	}
// };
export const postRecentlyViewed = async (id,userId) => {
	try {
		// Nếu userId tồn tại, thêm vào URL
		const url = userId
			? `${process.env.REACT_APP_API_URL}/viewed/viewed-product/${id}/${userId}`
			: `${process.env.REACT_APP_API_URL}/viewed/viewed-product/${id}`;

		// Sử dụng axios.post với URL đã xây dựng
		const res = await axios.get(url,null,{
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			mode: 'cors'
		});

		return res.data;
	} catch (error) {
		// console.error('Error in postRecentlyViewed:',error);
		throw error; // Ném lại lỗi để xử lý ở mã gọi hàm
	}
};



export const getRecentlyViewed = async (id) => {
	try {
		const res = await axios.get(
			`${process.env.REACT_APP_API_URL}/viewed/viewed-user/${id}`,
			{
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			}
		);
		return res.data;
	} catch (error) {
		// console.error('Error in getRecentlyViewed:',error);
		throw error;
	}
};
