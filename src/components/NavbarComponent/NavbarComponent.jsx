import React,{ useEffect,useState } from "react";
import * as ProductService from "../../services/ProductService";
import { useQuery } from "@tanstack/react-query";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { useNavigate } from "react-router-dom";
import { Typography,Accordion,AccordionDetails,AccordionSummary,useMediaQuery } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import styles from "./stylemui";
const NavbarComponent = () => {
	const [typeProducts,setTypeProducts] = useState([])
	const fetchProductAll = async () => {
		const res = await ProductService.getAllProduct();
		return res;
	};
	const classes = styles();
	const navigate = useNavigate();
	const fetchAllTypeProduct = async () => {
		// const res = await ProductService.getAllTypeProduct()
		// if (res?.status === 'OK') {
		// 	setTypeProducts(res?.data)
		// }
	}
	const { isLoading,data: products,isPreviousData } = useQuery(
		["products"],
		fetchProductAll,
		{
			retry: 3,
			retryDelay: 100,
			keepPreviousData: true,
		}
	);
	useEffect(() => {
		// fetchAllTypeProduct()
	},[])
	// Sử dụng useMediaQuery để xác định kích thước màn hình
	const isDesktop = useMediaQuery('(min-width:899px)');
	return (

		<div>
			<Accordion
				style={{ margin: "0px",boxShadow: "none" }}
				expanded={isDesktop}
			>
				<AccordionSummary style={{ marginTop: "0px" }}
					expandIcon={<FontAwesomeIcon icon={faChevronDown} fontSize={18} color="#000" />}
					aria-controls="panel1a-content"
					id="panel1a-header"
					className={classes.BoxTilte}
				>
					<Typography className={classes.txtTilte}>Loại sản phẩm</Typography>
				</AccordionSummary>
				<AccordionDetails sx={{ boxShadow: "none",padding: "0px !important" }}>
					<Typography className={classes.txtTilteItem}>
						{typeProducts.map((item) => {
							return (
								<>
									<TypeProduct className={classes.txtTilteItem} products={item.type} count={item.count} name={item.type} key={item.type} />
								</>
							)
						})}
					</Typography>
				</AccordionDetails>
			</Accordion>
		</div>
	);
};

export default NavbarComponent;

