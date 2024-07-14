import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useContext, useEffect, useState } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Backdrop,
  CircularProgress,
} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import { useNavigate } from 'react-router-dom';
import { allCategoryUrl, baseUrl, categoryUrl, postUrl } from 'src/api';
import axios from 'axios';
import Swal from 'sweetalert2';
import { notifyError, notifySuccess } from 'src/utils/Toast';
import Context from 'src/context/context';
import { ToastContainer } from 'react-toastify';





// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'title', label: 'Title', alignRight: false },
  { id: 'view', label: 'Views', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: "edit", label: "Edit", align: false },
  { id: "delete", label: "Delete", align: false },
];

// ----------------------------------------------------------------------

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

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.title.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis?.map((el) => el[0]);
}



export default function PostPage() {
  const {token} = useContext(Context)
  const navigate = useNavigate()
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [loader, setLoader] = useState(false);
  const [posts, setPosts] = useState([])

  const [currentData, setCurrentData] = useState([])
  const [lastPage, setLastPage] = useState(null)
  const [totalLength, setTotalLength] = useState(0)




  // get all  categories
  const allPosts =()=>{
    let config = {
      method: 'get',
      url: postUrl,
      headers: { 
        'Authorization': `Bearer ${token}`
      }
    };
    
    axios.request(config)
    .then((response) => {
      setPosts(response?.data?.posts?.data)
      setLastPage(response?.data?.posts?.last_page)
      setTotalLength(response?.data?.posts?.total)
    })
    .catch((error) => {
      // console.log(error);
    });
    
  }


  //call posts 
  useEffect(()=>{
    allPosts()
  },[])


  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = posts.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 50));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - posts.length) : 0;

  const filteredUsers = applySortFilter(posts, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers?.length && !!filterName;

    // handle delete category
    const handleDeleteRow = (id) => {
      const url = `${postUrl}/${id}`;
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(url, { headers: { Authorization: `Bearer ${token}` } })
            .then((response) => {
              notifySuccess(response?.data?.message);
              allPosts();
            });
        }
      }).catch((e)=> notifyError())

    };

  // for table pagination
  const handleChangePage = (event, newPage) => {
    setLoader(true)
    setPage(newPage);
    const updatePage = newPage+1;
    if(updatePage <=lastPage){
      if(newPage>page){
        let config = {
          method: 'get',
          url: `${postUrl}?page=${updatePage}`,
          headers: { 
            'Authorization': `Bearer ${token}`, 
          }
        };
        
        axios.request(config)
        .then((response) => {
          setLoader(false)
          const preData = posts;
          const currentData = response?.data?.posts?.data;
          setCurrentData(currentData)
          const storeData = preData.concat(currentData)
          setPosts(storeData)
        })
        .catch((error) => {
          setLoader(false)
        });
      }else{
        setLoader(false)
       const storeData = posts.diff(currentData)
       setPosts(storeData)
      
      }
    }else{
      setLoader(false)
      notifyError('No more page to show!')
    }
    
   
  };

  
  

  return (
    <>
      <Helmet>
        <title> Posts | List </title>
      </Helmet>

      <div>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loader}
          // onClick={handleLoader}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Posts
          </Typography>
          <Button onClick={(e)=> navigate('/dashboard/posts/store')} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Post
          </Button>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={posts?.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, title,image, views, status} = row;
                    const selectedUser = selected.indexOf(title) !== -1;

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell >
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={title} src={`${baseUrl}/storage/${image}`} />
                            <Typography variant="subtitle2" noWrap>
                              {title}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left" style={{ textTransform: 'uppercase' }}>{views}</TableCell>

                        <TableCell align="left">
                          <Label color={(status === 'banned' && 'error') || 'success'}>active</Label>
                        </TableCell>

                        <TableCell align="left">
                          <Button variant='outlined' onClick={(e)=> navigate('/dashboard/posts/store', {state:{row:row}})}>
                              Edit
                          </Button>
                        </TableCell>
                        <TableCell variant='contained' align="left">
                          <Button  onClick={(e)=> handleDeleteRow(id)}  style={{color: '#FF0000'}}>
                              Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          {/* <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={posts?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
             <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              component="div"
              count={totalLength}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Card>
      </Container>

   <ToastContainer />
   
    </>
  );
}
