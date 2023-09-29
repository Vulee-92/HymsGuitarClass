// useUpdateUserMutation.js

import { useMutation } from 'react-query';
import UserService from './path-to-your-user-service'; // Đường dẫn tới file UserService

const useUpdateUserMutation = () => {
	const mutation = useMutation((data) => {
		const { id,token,...rests } = data;
		return UserService.updateUser(id,{ ...rests },token);
	});

	const handleUpdateUser = async (updatedUser) => {
		try {
			const response = await mutation.mutateAsync(updatedUser);
			// Xử lý dữ liệu trả về (nếu cần)
		} catch (error) {
			// Xử lý lỗi (nếu cần)
		}
	};

	return {
		handleUpdateUser,
		isLoading: mutation.isLoading,
	};
};

export default useUpdateUserMutation;
