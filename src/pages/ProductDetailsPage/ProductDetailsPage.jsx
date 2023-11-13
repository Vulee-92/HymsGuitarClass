import React from 'react'
import { useParams } from 'react-router-dom'
import ProductDetailsComponent from '../../components/ProductDetailsComponent/ProductDetailsComponent'
import { Box } from '@mui/material'
const ProductDetailsPage = () => {
	const { id } = useParams()
	return (
		<Box style={{ width: '100%',height: '100%',marginTop: `100px` }}>
			<ProductDetailsComponent idProduct={id} />
		</Box>
	)
}

export default ProductDetailsPage