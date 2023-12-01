import PropTypes from 'prop-types';
// @mui
import { alpha,styled } from '@mui/material/styles';
import { Box,Link,Card,Grid,Avatar,Typography,CardContent } from '@mui/material';
// utils
//
import SvgColor from '../../../components/svg-color';
import { useNavigate } from 'react-router-dom';

import styles from "./style";
import LazyLoad from 'react-lazyload';
// ----------------------------------------------------------------------
import { Assets } from "../../../configs";
import mask from "../../../assets/shape-avatar.svg";
import { useState } from 'react';
const StyledCardMedia = styled('div')({
	position: 'relative',
	paddingTop: 'calc(80% * 3 / 4)',
});

const StyledTitle = styled(Link)({
	marginTop: "10px",
	height: 44,
	overflow: 'hidden',
	WebkitLineClamp: 2,
	display: '-webkit-box',
	WebkitBoxOrient: 'vertical',
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
	zIndex: 9,
	width: 32,
	height: 32,
	position: 'absolute',
	left: theme.spacing(3),
	bottom: theme.spacing(-2),
}));

const StyledInfo = styled('div')(({ theme }) => ({
	display: 'flex',
	flexWrap: 'wrap',
	justifyContent: 'flex-end',
	marginTop: theme.spacing(3),
	color: theme.palette.text.disabled,
}));

const StyledCover = styled('img')({
	top: 0,
	width: '100%',
	height: '100%',
	objectFit: 'cover',
	position: 'absolute',
	cursor: "pointer",
	// transform: "scale(0.7)",
});

// ----------------------------------------------------------------------

BlogPostCardMobile.propTypes = {
	blog: PropTypes.object,
	index: PropTypes.number,
};

export default function BlogPostCardMobile({ blog,index,id }) {
	console.log("index",index)
	const { image,title } = blog;
	// const latestPostLarge = index === 0;
	const latestPost = index === 1 || index === 2 || index === 3 || index === 0;
	const navigate = useNavigate();
	const classes = styles();
	const handleDetailBlog = (id) => {
		navigate(`/blog-details/${id}`);
	};


	return (

		<Grid item xs={12} style={{ marginLeft: 25,marginRight: 10 }}>
			<Card sx={{ position: 'relative',borderRadius: "14px" }} className={classes.boxCard}>
				<StyledCardMedia

				>
					<SvgColor
						color="paper"
						src={mask}
						sx={{
							width: 80,
							height: 36,
							zIndex: 9,
							bottom: -15,
							position: 'absolute',
							color: 'background.paper',
						}}
					/>
					<StyledAvatar
						// alt={author.name}
						src={image}
						sx={{
							...((!latestPost) && {
								zIndex: 9,
								top: 24,
								left: 24,
								width: 40,
								height: 40,
							}),
						}}
					/>
					<LazyLoad>
						<StyledCover onClick={() => handleDetailBlog(id)} alt={title} src={image} />
					</LazyLoad>
				</StyledCardMedia>

				<CardContent

				>


					<StyledTitle
						onClick={() => handleDetailBlog(id)}
						variant="subtitle2"
						underline="hover"
						className={classes.txtBlogTitle}


					>
						{title}
					</StyledTitle>

					<StyledInfo>
						<Box
							key={index}
							sx={{
								display: 'flex',
								alignItems: 'center',

								color: 'grey.500',
							}}
						>
						</Box>
					</StyledInfo>
				</CardContent>
			</Card>
		</Grid>
	);
}
