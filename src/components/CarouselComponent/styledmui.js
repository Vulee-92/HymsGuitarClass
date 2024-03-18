/** LIBRARY */
import { makeStyles } from "@mui/styles"
import { Assets,Configs } from "../../configs"
import { Colors } from "../../utils/colors"
import CStyles from "../../utils/common"

export default makeStyles(() => {
	return {
		carouselContainer: {
			width: '100%',
			overflow: 'hidden',
			margin: "0 auto",
			height: '500px	', // Adjust the height as needed

		},
		carouselImage: {
			width: '100vw !important',
			// height: '100% !important', // Adjust the height as needed
			objectFit: 'cover',
			backgroundRepeat: 'no-repeat',
			backgroundSize: 'cover',
			transition: 'transform 0.3s ease',
			backgroundPosition: 'center center',
			"@media (max-width: 767px)": {
				marginTop: "20vh",
			},
		},

	};
}
)