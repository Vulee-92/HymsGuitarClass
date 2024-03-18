import React,{ useEffect,useState } from "react";
import * as ProductService from "../../services/ProductService";
import * as BrandProductService from "../../services/BrandProductService";
import { useQuery } from "@tanstack/react-query";
import { useLocation,useNavigate } from "react-router-dom";
import {
	Typography,
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Grid,
	Checkbox,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import styles from "./stylemui";

const NavbarComponent = ({ brands,categories }) => {
	const classes = styles();
	const [checkedMap,setCheckedMap] = useState({});
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		const searchParams = new URLSearchParams(location.search);
		const type = searchParams.get("type");
		const vendor = searchParams.get("vendor");
		const newCheckedMap = {};

		brands.forEach((brand) => {
			newCheckedMap[brand.slug] = type === "brand" && brand.slug === vendor;
		});

		categories.forEach((category) => {
			newCheckedMap[category.slug] = type === "type" && category.slug === type;
		});

		setCheckedMap(newCheckedMap);
	},[brands,categories,location.search]);

	const handleTypeClick = (slug) => {
		const searchParams = new URLSearchParams(location.search);
		const type = searchParams.get("type");

		if (type === "brand") {
			navigate(`?vendor=${slug}`,{ replace: true });
		} else if (type === "type") {
			navigate(`?type=${slug}`,{ replace: true });
		}
	};
	const handleNavigatetype = (type) => {
		navigate(`/product/accessories?vendor=${type.normalize('NFD').replace(/[\u0300-\u036f]/g,'')?.replace(/ /g,'_')}`,{ state: type })
	}
	return (
		<>
			{/* Accordion Thương hiệu */}
			<Accordion expanded={true} style={{ margin: "0px",boxShadow: "none" }}>
				<AccordionSummary
					style={{ marginTop: "0px" }}
					expandIcon={<FontAwesomeIcon icon={faChevronDown} fontSize={18} color="#000" />}
					aria-controls="panel1a-content"
					id="panel1a-header"
					className={classes.BoxTilte}
				>
					<Typography className={classes.txtTilte}>Thương hiệu</Typography>
				</AccordionSummary>
				<AccordionDetails sx={{ boxShadow: "none",padding: "0px !important" }}>
					<Grid container spacing={1}>
						{brands.map((item) => (
							<Grid item key={item.slug} sx={12} xl={12}>
								<Grid container spacing={2} alignItems="center">
									<Grid item xs={10} sm={10} onClick={() => handleNavigatetype(item.slug)}>
										<Checkbox
											checked={checkedMap[item.slug]}
											sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
										/>
										{item.brand}
									</Grid>
									<Grid item xs={2} sm={2} sx={{ textAlign: "right" }}>
										{/* ({count})10 */}10
									</Grid>
								</Grid>
							</Grid>
						))}
					</Grid>
				</AccordionDetails>
			</Accordion>

			{/* Accordion Loại sản phẩm */}
			<Accordion expanded={true} style={{ margin: "0px",boxShadow: "none" }}>
				<AccordionSummary
					style={{ marginTop: "0px" }}
					expandIcon={<FontAwesomeIcon icon={faChevronDown} fontSize={18} color="#000" />}
					aria-controls="panel1a-content"
					id="panel1a-header"
					className={classes.BoxTilte}
				>
					<Typography className={classes.txtTilte}>Loại sản phẩm</Typography>
				</AccordionSummary>
				<AccordionDetails sx={{ boxShadow: "none",padding: "0px !important" }}>
					<Grid container spacing={1}>
						{categories.map((item) => (
							<Grid item key={item.slug} sx={12} xl={12}>
								<Grid container spacing={2} alignItems="center">
									<Grid item xs={10} sm={10} onClick={() => handleTypeClick(item.slug)}>
										<Checkbox
											checked={checkedMap[item.slug]}
											sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
										/>
										{item.category}
									</Grid>
									<Grid item xs={2} sm={2} sx={{ textAlign: "right" }}>
										{/* ({count})10 */}10
									</Grid>
								</Grid>
							</Grid>
						))}
					</Grid>
				</AccordionDetails>
			</Accordion>
		</>
	);
};

export default NavbarComponent;

