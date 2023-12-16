import React,{ useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const ImageCarouselZoom = (props) => {
	const [selectedImage,setSelectedImage] = useState(0);

	const handleImageClick = (index) => {
		setSelectedImage(index);
	};

	return (
		<>
			<Carousel
				showThumbs={false}
				autoPlay={false}
				interval={3000}
				infiniteLoop={true}
				showArrows={true}
				showIndicators={true}
				selectedItem={selectedImage}
				showStatus={false}  // Set showStatus to false to hide "1 of 2" text
			>
				{props?.data?.map((image,index) => (
					<div key={index} onClick={() => handleImageClick(index)}>
						<Zoom  >
							<img src={image} style={{ height: '300px',width: 'auto' }} alt={`Image ${index}`} />
						</Zoom>
					</div>
				))}
			</Carousel>

			{/* Thumbnail strip */}
			<div style={{ display: 'flex',justifyContent: 'center',marginTop: '10px' }}>
				{props?.data?.map((image,index) => (
					<div
						key={index}
						style={{
							margin: '0 5px',
							cursor: 'pointer',
							position: 'relative',
							opacity: index === selectedImage ? 1 : 1,
						}}
						onClick={() => handleImageClick(index)}
					>
						<img src={image} alt={`Thumbnail ${index}`} style={{ maxHeight: '50px',width: 'auto' }} />
						{/* Overlay div for non-selected thumbnails */}
						{index == selectedImage && (
							<div
								style={{
									position: 'absolute',
									top: 0,
									left: 0,
									width: '100%',
									height: '100%',
									backgroundColor: 'rgba(0, 0, 0, 0.3)',
								}}
							/>
						)}
					</div>
				))}
			</div>
		</>
	);
};

export default ImageCarouselZoom;
