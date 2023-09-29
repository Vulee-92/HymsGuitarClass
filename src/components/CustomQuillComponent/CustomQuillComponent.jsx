import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Quill from 'quill';
import { Box } from '@mui/material';

const CustomQuillComponent = ({ value,onChange }) => {
	const modules = {
		toolbar: [
			['bold','italic','underline','strike'],
			[{ 'list': 'ordered' },{ 'list': 'bullet' }],
			['link','image','video'],
			['clean']
		],
		clipboard: {
			matchVisual: false
		}
	};

	const formats = [
		'bold',
		'italic',
		'underline',
		'strike',
		'list',
		'ordered',
		'bullet',
		'link',
		'image',
		'video'
	];

	// Tạo định dạng bảng tùy chỉnh
	// const Table = Quill.import('formats/table');
	// const TableCell = Quill.import('formats/table/cell');
	// const TableRow = Quill.import('formats/table/row');
	// Table.tagName = 'TABLE';
	// TableCell.tagName = 'TD';
	// TableRow.tagName = 'TR';
	// Quill.register(Table,true);
	// Quill.register(TableCell,true);
	// Quill.register(TableRow,true);
	return (
		<Box sx={{ height: 400 }}>
			<ReactQuill
				style={{ height: 300 }}
				theme="snow"
				value={value}
				onChange={onChange}
				modules={modules}
				formats={formats}
			/>
		</Box>

	);
};

export default CustomQuillComponent;
