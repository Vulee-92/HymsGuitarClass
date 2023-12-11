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
	paddingTop: 'calc(100% * 3 / 4)',
});

const StyledTitle = styled(Link)({
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

BlogPostCard.propTypes = {
	blog: PropTypes.object,
	index: PropTypes.number,
};

export default function BlogPostCard({ blog,index,id }) {
	const { image,title } = blog;
	const latestPostLarge = index === 0;
	const latestPost = index === 1 || index === 2;
	const navigate = useNavigate();
	const classes = styles();
	const handleDetailBlog = (id) => {
		navigate(`/blog-details/${id}`);
	};
	const [isFirstLayout,setIsFirstLayout] = useState(true);

	const toggleLayout = () => {
		setIsFirstLayout(prevState => !prevState);
	};


	return (

		<Grid item xs={6} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
			<Card sx={{ position: 'relative',borderRadius: "14px" }} className={classes.boxCard}>
				<StyledCardMedia
					sx={{
						...((latestPostLarge || latestPost) && {
							pt: 'calc(100% * 4 / 3)',
							'&:after': {
								top: 0,
								content: "''",
								width: '100%',
								height: '100%',
								position: 'absolute',
								// bgcolor: (theme) => alpha(theme.palette.grey[800],0.72),
							},
						}),
						...(latestPostLarge && {
							pt: {
								xs: 'calc(100% * 4 / 3)',
								sm: 'calc(100% * 3 / 4.66)',
							},
						}),
					}}
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
							...((latestPostLarge || latestPost) && { display: 'none' }),
						}}
					/>
					<StyledAvatar
						// alt={author.name}
						src={image}
						sx={{
							...((latestPostLarge || latestPost) && {
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
					sx={{
						pt: 4,
						...((latestPostLarge || latestPost) && {
							bottom: 0,
							width: '100%',
							position: 'absolute',
						}),
					}}
				>
					{/* <Typography gutterBottom variant="caption" sx={{ color: 'text.disabled',display: 'block' }}>
						{fDate(createdAt)}
					</Typography> */}

					<StyledTitle
						onClick={() => handleDetailBlog(id)}
						underline="hover"
						className={classes.txtBlogTitle}
						style={{
							color: (latestPostLarge || latestPost) ? "#fff" : "#000"
						}}

					>
						{title}
					</StyledTitle>

					<StyledInfo>
						<Box
							key={index}
							sx={{
								display: 'flex',
								alignItems: 'center',
								ml: index === 0 ? 0 : 1.5,
								...((latestPostLarge || latestPost) && {
									color: 'grey.500',
								}),
							}}
						>
						</Box>
					</StyledInfo>
				</CardContent>
			</Card>
		</Grid>
	);
}
