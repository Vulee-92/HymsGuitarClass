import React,{ useMemo,useState } from 'react'
import { Divider,Radio,Table } from 'antd';
import Loading from '../LoadingComponent/Loading';
import { Box,Button,IconButton,Tooltip,Typography } from '@mui/material';
import { Excel } from 'antd-table-saveas-excel';
import ModalComponent from '../ModalComponent/ModalComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
const TableComponent = (props) => {
	const [isModalOpenDelete,setIsModalOpenDelete] = useState(false);
	const [isLoadingDelete,setIsLoadingDelete] = useState(false);
	const {
		selectionType = "checkbox",
		data: dataSource = [],
		columns = [],
		isLoading = false,
		handleDelteMany,
	} = props;
	const [rowSelectedKey,setRowSelectedKey] = useState([]);

	const rowSelection = {
		onChange: (selectedRowKeys,selectedRows) => {
			setRowSelectedKey(selectedRowKeys);
		},
		// getCheckboxProps: (record) => ({
		//   disabled: record.name === 'Disabled User',
		//   // Column configuration not to be checked
		//   name: record.name,
		// }),

	};
	const handleCancelDelete = () => {
		setIsModalOpenDelete(false);

	};
	const newColumnExport = useMemo(() => {
		const arr = columns?.filter((col) => col.dataIndex !== "action");
		return arr;
	},[columns]);

	const handleDeleteAll = () => {
		setIsModalOpenDelete(false);
		handleDelteMany(rowSelectedKey);
		setIsLoadingDelete(true);
	};

	const exportExcel = () => {
		const excel = new Excel();
		excel
			.addSheet("test")
			.addColumns(newColumnExport)
			.addDataSource(dataSource,{
				str2Percent: true,
			})
			.saveAs("Hymns.xlsx");
	};



	return (
		<>
			<div>
				<Button xs={12}
					md={6}
					lg={4}
					onClick={exportExcel}
					variant="contained"
					style={{ marginRight: "10px" }}
				>
					Export Excel
				</Button>
				{rowSelectedKey.length > 0 && (
					// <Button
					//   variant="contained"
					//   onClick={() => setIsModalOpenDelete(true)}
					//   item
					//   xs={12}
					//   md={6}
					//   lg={8}
					// >
					//   Xoá
					// </Button>
					<Box item
						xs={12}
						md={6}
						lg={8}>
						{rowSelectedKey.length > 0 ? (
							<Typography component="div" variant="subtitle1">
								{rowSelectedKey.length} selected
							</Typography>
						) : (
							// <StyledSearch
							//   value={filterName}
							//   onChange={onFilterName}
							//   placeholder="Search user..."
							//   startAdornment={
							//     <InputAdornment position="start">
							//       <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
							//     </InputAdornment>
							//   }
							// />
							<div></div>
						)}

						{rowSelectedKey.length > 0 ? (
							<Tooltip title="Delete">
								<IconButton>
									<FontAwesomeIcon icon={faTrash} />
								</IconButton>
							</Tooltip>
						) : (
							<Tooltip title="Filter list">
								<IconButton>
									<FontAwesomeIcon icon={faTrash} />

								</IconButton>
							</Tooltip>
						)}
					</Box>
				)}
				<Divider />
				<Loading isLoading={isLoading}>
					<Table
						rowSelection={{
							type: selectionType,
							...rowSelection,
						}}
						columns={columns}
						dataSource={dataSource}
						{...props}
					/>
				</Loading>
			</div>
			<ModalComponent
				title="Xóa người dùng"
				open={isModalOpenDelete}
				onCancel={handleCancelDelete}
				onOk={handleDeleteAll}

			>
				<Loading isLoading={isLoadingDelete}>
					<div>Bạn có chắc chắn xóa những người dùng này không?</div>
				</Loading>
			</ModalComponent>
		</>
	);
}

export default TableComponent