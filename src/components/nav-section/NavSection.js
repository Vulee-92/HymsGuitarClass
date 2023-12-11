import PropTypes from 'prop-types';
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import { Accordion,AccordionDetails,AccordionSummary,Box,IconButton,List,ListItemText,Typography } from '@mui/material';
//
import { StyledNavItem,StyledNavItemIcon } from './styles';
import styles from "./stylemui";

// ----------------------------------------------------------------------

NavSection.propTypes = {
	data: PropTypes.array,
};

export default function NavSection({ data = [],...other }) {
	return (
		<Box {...other}>
			<List disablePadding sx={{ p: 1 }}>
				{data.map((item) => (
					<NavItem key={item.title} item={item} />
				))}
			</List>
		</Box>
	);
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
	item: PropTypes.object,
};

function NavItem({ item }) {
	const { title,icon,info,children,path } = item;
	const [expanded,setExpanded] = useState(false);
	const classes = styles();


	const isProduct = title === 'Sản phẩm'; // Kiểm tra xem item có phải là "Product" không
	const isBlog = title === 'Blog';
	// const handleAccordionChange = () => {
	// 	if (isProduct) {
	// 		setExpanded((prevExpanded) => !prevExpanded);
	// 	}
	// 	if (isBlog) {
	// 		setExpanded((prevExpanded) => !prevExpanded);
	// 	}
	// };
	return (
		<>
			{/* onChange={handleAccordionChange} */}
			<Accordion expanded={expanded} >
				<AccordionSummary style={{ padding: "0px !important" }} >
					<StyledNavItem component={RouterLink}
						to={path}
						sx={{
							'&.active': {
								color: 'text.primary',
								bgcolor: 'action.selected',
								fontWeight: 'fontWeightBold',
							},
						}}>
						<StyledNavItemIcon>
							{icon && icon}

						</StyledNavItemIcon>
						<Typography className={classes.txtTilte} primary={title}>{title}</Typography>
						{info && info}
						{/* <StyledNavItemIcon>
							{isProduct && (
								<IconButton expanded={expanded} className="icon-rotate">
									<ExpandMoreIcon />
								</IconButton>
							)}
							{isBlog && (
								<IconButton expanded={expanded} className="icon-rotate">
									<ExpandMoreIcon />
								</IconButton>
							)}
						</StyledNavItemIcon> */}

					</StyledNavItem>
				</AccordionSummary>

				<AccordionDetails>
					{children && (
						<List>
							{children.map((child) => (
								<NavItem className={classes.txtTilte} key={child.title} item={child} />
							))}
						</List>
					)}
				</AccordionDetails>
			</Accordion>
		</>
	);
}


