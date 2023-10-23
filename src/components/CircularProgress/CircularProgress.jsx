import React from "react"
import { motion,useTransform } from "framer-motion"

export function CircularProgress({ progress }) {
	const circleLength = useTransform(progress,[0,100],[0,1])
	const checkmarkPathLength = useTransform(progress,[0,95,100],[0,0,1])
	const circleSize = useTransform(progress,[0,100],[1,0.5]) // Thêm dòng này

	return (
		<motion.svg
			xmlns="http://www.w3.org/2000/svg"
			width="258"
			height="258"
			viewBox="0 0 258 258"
			style={{ scale: circleSize,transformOrigin: 'center' }} // Thêm dòng này
		>
			{/* Check mark */}
			<motion.path
				transform="translate(60 85)"
				d="M3 50L45 92L134 3"
				fill="transparent"
				stroke="rgb(67, 110, 103)"
				strokeWidth={8}
				style={{ pathLength: checkmarkPathLength,transformOrigin: 'center' }} // Thêm dòng này
			/>

			<motion.path
				d="M 130 6 C 198.483 6 254 61.517 254 130 C 254 198.483 198.483 254 130 254 C 61.517 254 6 198.483 6 130 C 6 61.517 61.517 6 130 6 Z"
				fill="transparent"
				strokeWidth="8"
				stroke="rgb(67, 110, 103)"
				style={{
					pathLength: circleLength,
					transformOrigin: 'center' // Thêm dòng này
				}}
			/>
		</motion.svg>
	)
}
