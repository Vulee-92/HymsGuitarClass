import React from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import ProductDetailsComponent from '../../components/ProductDetailsComponent/ProductDetailsComponent'
const ProductDetailsPage = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	return (
		<div style={{ width: '100%',height: '100%',marginTop: `100px` }}>
			<div style={{ width: '100%',height: '100%',margin: '0 auto' }} >
				<ProductDetailsComponent idProduct={id} />
			</div>
		</div>
	)
}

export default ProductDetailsPage