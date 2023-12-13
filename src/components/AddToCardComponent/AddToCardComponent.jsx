import React,{ useState } from 'react';
import { useQuery } from 'react-query';
import * as ProductService from "../../services/ProductService";
import { LoadingButton } from '@mui/lab';
import { addOrderProduct,resetOrder } from "../../redux/slides/orderSlide";


const AddToCardComponent = ({ idProduct,order,dispatch,handleCartClick,setOpenDialog }) => {

	const [isProcessing,setIsProcessing] = useState(false);
	const [errorLimitOrder,setErrorLimitOrder] = useState(false);
	const [numProduct,setNumProduct] = useState(1); // Bạn có thể cần thay đổi giá trị mặc định của numProduct theo yêu cầu

	const { isLoading,data: productDetails } = useQuery(["productDetails",idProduct],fetchGetDetailsProduct,{ enabled: !!idProduct });

	const fetchGetDetailsProduct = async (context) => {
		const slug = context?.queryKey && context?.queryKey[1];
		// ... (các bước xử lý khác, nếu cần)
	};

	const handleAddOrderProduct = async () => {
		setIsProcessing(true);

		try {
			const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id);

			if (orderRedux?.amount + numProduct <= orderRedux?.countInstock || (!orderRedux && productDetails?.countInStock > 0)) {
				await dispatch(addOrderProduct({
					orderItem: {
						name: productDetails?.name,
						amount: numProduct,
						type: productDetails?.type,
						fee: productDetails?.fee,
						image: productDetails?.image,
						price: productDetails?.price,
						product: productDetails?._id,
						discount: productDetails?.discount,
						countInstock: productDetails?.countInStock,
					},
				}));
			} else {
				setErrorLimitOrder(true);
			}
		} catch (error) {
			console.error('Error adding order product:',error);
		} finally {
			setIsProcessing(false);
			handleCartClick();
			// setOpenDialog(true);
		}
	};

	return (
		<LoadingButton
			fullWidth
			size="large"
			type="submit"
			variant="contained"
			loading={isProcessing || isLoading}
			className={classes.nameProductInfo} // Hãy thay đổi className theo yêu cầu của bạn
			style={{
				// ... (thêm các thuộc tính style khác nếu cần)
			}}
			onClick={handleAddOrderProduct}
		>
			Thêm vào giỏ hàng
		</LoadingButton>
	);
};

export default AddToCardComponent;
