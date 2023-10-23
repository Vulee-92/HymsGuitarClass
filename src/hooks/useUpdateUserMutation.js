import { useMutation } from "@tanstack/react-query";

import * as UserService from "../services/UserService";

const useUpdateUserMutation = () => {
	const mutation = useMutation((data) => {
		console.log(data)
		const { id,token,...rests } = data;
		return UserService.updateUser(data?._id,{ ...rests },token);
	});

	const handleUpdateUser = async (selectedUserId) => {
		try {
			const response = await mutation.mutateAsync(selectedUserId);
			console.log(response)
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
