import React from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import BlogDetailsComponent from '../../components/BlogDetailsComponent/BlogDetailsComponent'
const BlogDetailsPage = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	return (
		<div style={{ width: '100%',height: '100%',marginTop: `100px` }}>
			<div style={{ width: '100%',height: '100%',margin: '0 auto' }} >
				<BlogDetailsComponent idBlog={id} />
			</div>
		</div>
	)
}

export default BlogDetailsPage