/** LIBRARY */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Typography } from '@mui/material';
import moment from 'moment';
import clsx from 'clsx';
/** COMPONENTS */
/** COMMON */
import { Configs } from 'configs';
/** STYLES */
import styles from './style';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const CTable = ({
  data,
  rowsPerPage = Configs.pageSize,
  totalPage = Configs.pageSize,
  page = 1,
  isSort = true,
  stickyHeader = true,
  stickyColumn = false,
  selectedRow = null,
  onClickRow = () => { },
  onLoadMore = () => { },
  ...props
}) => {

  const classes = styles();
  const { t } = useTranslation();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [selected, setSelected] = useState(null);

  /** FUNCTION */
  const onRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const handleChangePage = (event, newPage) => {
    onLoadMore(newPage + 1)
  };


  /** LIFE CYCLE */

  /** RENDER */
  return (
    <Box className={classes.conBox} >
      <Paper className={classes.conPaper} sx={{ width: "100%" }}>
        <TableContainer {...props}>
          <Table stickyHeader={stickyHeader}>
            <TableHead>
              <TableRow>
                {data.header.map((itemHeader, indexHeader) => {
                  return (
                    <TableCell
                      component="th"
                      key={`header_${indexHeader}`}
                      align={itemHeader.align || 'center'}
                      padding={'normal'}
                      sortDirection={orderBy === itemHeader.id ? order : false}
                      className={clsx({
                        [classes.conCellSticky]: indexHeader === 0 && stickyColumn
                      })}
                      style={{ zIndex: indexHeader === 0 && stickyColumn && 1000 }}
                    >
                      <TableSortLabel
                        active={isSort ? orderBy === itemHeader.id : false}
                        direction={orderBy === itemHeader.id ? order : 'asc'}
                        onClick={createSortHandler(itemHeader.id)}
                        className={classes.txtHeaderTable}
                      >
                        {t(itemHeader.name)}
                      </TableSortLabel>
                    </TableCell>
                  )
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {stableSort(data.rows, getComparator(order, orderBy)).map((item, index) => {
                let isSelected = selectedRow && item.id === selectedRow.id
                return (
                  <TableRow key={`row_${index}`}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    hover
                    selected={selectedRow ? selected === index : false}
                    onClick={() => { setSelected(index) }}
                    className={selectedRow === true ? { [classes.conRowActive]: selected === index } : null}>
                    {data.header.map((itemHead, indexHead) => {
                      return (
                        <Box key={`cell_${index}_${indexHead}`}
                          component="td"
                          textAlign={itemHead.align || 'center'}
                          className={clsx({
                            [classes.conCell]: true,
                            [classes.conCellSticky]: indexHead === 0 && stickyColumn
                          })}
                        >
                          {itemHead.isCustom ?
                            <Box>
                              {itemHead.cell({ ...props, cell: item, index: index })}
                            </Box>

                            :
                            <Typography className={classes.txtRowCell}>
                              {itemHead.isDate ? moment(item[itemHead.id]).format(itemHead.dateFormat) : `${item[itemHead.id] || '-'} ${item[itemHead.id] ? (itemHead.unit || '') : ''}`}
                            </Typography>
                          }
                        </Box>
                      )
                    })}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[rowsPerPage]}
          component="div"
          count={totalPage}
          rowsPerPage={rowsPerPage}
          page={page - 1}
          onPageChange={handleChangePage}
        />
      </Paper>
    </Box>

  )
}

export default CTable
