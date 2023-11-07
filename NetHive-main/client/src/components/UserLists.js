import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { visuallyHidden } from '@mui/utils';
import "../styles/Tablestyle.css";


function createData(id, userName, password, privilege, lock, customer_account,expiry,created,createdBy,modified,modifiedBy) {
  return {
    id,
    userName,
    password,
    privilege,
    lock,
    customer_account,
    expiry,
    created,
    createdBy,
    modified,
    modifiedBy,
  };
}
  
  const rows = [
    createData(1,'cughetti0','bvAM59haG?a','standard','No','CBP','5/11/2026','10/14/2022','dkneesha0','3/1/2023','gpitbladdo0'),
    createData(2,'amatisoff1','jyRX16+','admin','No','JQV','2/27/2025','3/8/2022','ldumini1','8/23/2023','kduinbleton1'),
    createData(3,'cjardein2','elPQ33B=vG','standard','Yes','MPW','3/29/2027','2/6/2022','ghakking2','10/15/2023','wpatman2'),
    createData(4,'lsevers3','hePC804','admin','Yes','GXB','12/3/2025','2/20/2022','ptreagus3','3/30/2023','mhellmer3'),
    createData(5,'mmckern4','pwZX46@iH#_','standard','No','TIY','6/20/2027','3/27/2022','bmealiffe4','8/15/2023','tsemiraz'),
    createData(6,'eprynne5','sdOX49>','admin','Yes','ZWU','11/17/2027','9/8/2022','bleupoldt5','2/6/2023','jbathow5'),
    createData(7,'cairy6','ylCS62qkCaL`','admin','No','EQR','10/31/2026','6/26/2022','barman6','12/7/2022','lmcillrik6'),
    createData(8,'mmcgennis7','rgHW65b=H','admin','Yes','UTY','1/29/2028','9/9/2022','hraulin7','4/20/2023','zmcguigan7'),
    createData(9,'bsacase8','ozOA97j','admin','No','VNQ','7/13/2025','12/4/2021','dbiddiss8','3/23/2023','oshepstone8'),
    createData(10,'cbruins9','hkNN21!%**6H','standard','Yes','XQJ','12/20/2027','4/25/2022','cgisburne9','10/24/2023','cbronot9'),
  ];
  
  
  
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
  
  const headCells = [
    {
      id: 'userName',
      Date: false,
      disablePadding: true,
      label: 'User Name',
    },
    {
      id: 'password',
      Date: false,
      disablePadding: false,
      label: 'Password',
    },
    {
      id: 'privilege',
      Date: false,
      disablePadding: false,
      label: 'Privilege',
    },
    {
      id: 'lock',
      Date: false,
      disablePadding: false,
      label: 'Locked?',
    },
    {
      id: 'customer_account',
      Date: false,
      disablePadding: false,
      label: 'Customer_Account',
    },
    {
      id: 'expiry',
      Date: true,
      disablePadding: false,
      label: 'expiry',
    },
    {
      id: 'created',
      Date: true,
      disablePadding: false,
      label: 'created',
    },
    {
      id: 'createdBy',
      Date: false,
      disablePadding: false,
      label: 'createdBy',
    },
    {
      id: 'modified',
      Date: true,
      disablePadding: false,
      label: 'modified',
    },
    {
      id: 'modifiedBy',
      Date: false,
      disablePadding: false,
      label: 'modifiedBy',
    },
  ];
  
  function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
      props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.Date ? 'left' : 'right'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : true}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
             <TableCell>
                {/* Edit Column */}
             </TableCell>
        </TableRow>
      </TableHead>
    );
  }
  
  EnhancedTableHead.propTypes = {
    // numSelected: PropTypes.id.isRequired,
     onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    // rowCount: PropTypes.id.isRequired,
  };
  
  function EnhancedTableToolbar(props) {
    const { numSelected } = props;
  
    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Users
          </Typography>
        )}
  
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Add User">
            <IconButton>
              <AddCircleOutlineIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    );
  }
  
  // EnhancedTableToolbar.propTypes = {
  //   numSelected: PropTypes.userName.isRequired,
  // };


export default function EnhancedTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('userName');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage],
  );

  return (
    <div className='table_container'>
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      align="right"
                      padding="none"
                    >
                      {row.userName}
                    </TableCell>
                    <TableCell align="right">{row.password}</TableCell>
                    <TableCell align="right">{row.privilege}</TableCell>
                    <TableCell align="right">{row.lock}</TableCell>
                    <TableCell align="right">{row.customer_account}</TableCell>
                    <TableCell align="left">{row.expiry}</TableCell>
                    <TableCell align="left">{row.created}</TableCell>
                    <TableCell align="right">{row.createdBy}</TableCell>
                    <TableCell align="left">{row.modified}</TableCell>
                    <TableCell align="right">{row.modifiedBy}</TableCell>
                    <TableCell>
                      <Tooltip title="Edit">
                        <IconButton>
                        <EditIcon
                            checked={isItemSelected}
                            inputProps={{'aria-labelledby': labelId,}}/>
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
    </div>
  );
}
