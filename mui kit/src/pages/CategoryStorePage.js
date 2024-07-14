import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useContext, useState } from 'react';
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
  Box,
  TextField,
  Grid,
  Select,
} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';

import { useLocation, useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useForm } from 'react-hook-form';
import Context from 'src/context/context';
import { categoryUrl } from 'src/api';
import axios from 'axios';
import { notifyError, notifySuccess } from 'src/utils/Toast';
import { ToastContainer } from 'react-toastify';
// ----------------------------------------------------------------------


export default function CategoryStorePage() {
  const navigate = useNavigate()
  const  {token}  = useContext(Context)
  const location = useLocation(); 

  console.log('locs', location)

  const defaultValues = {
    catName: location?.state !==null?location?.state?.row?.category_name:'',
    catSlug: location?.state !==null?location?.state?.row?.category_slug:'',
    position: location?.state !==null?location?.state?.row?.category_position: 'tag'
  };
  const methods = useForm({defaultValues});
  const {watch,setValue} = methods;
  const values = watch();


  const handleSelectPosition = (event) => {
    setValue('position', event.target.value)
  };

  // handle create new category

  const handleCreateCategory = () =>{
    let data = new FormData();
      data.append('category_name', values.catName);
      data.append('category_slug', values.catSlug);
      data.append('category_position', values.position);

      var config;

      if(location?.state !==null){
        config = {
          method: 'post',
          url: `${categoryUrl}/${location?.state?.row?.id}`,
          headers: { 
            'Authorization': `Bearer ${token}`, 
          },
          data : data
        };
      }else{
        config = {
          method: 'post',
          url: categoryUrl,
          headers: { 
            'Authorization': `Bearer ${token}`, 
          },
          data : data
        };
      }


      axios.request(config)
      .then((response) => {
        notifySuccess(response?.data?.message)
        setTimeout(()=>{
          navigate('/dashboard/category')
        },1500)
      })
      .catch((error) => {
        notifyError()
      });
  }

  // handle slug 
  const handleSlug = (e)=>{
    console.log('ew',  e.target.value)
      const inputValue = e.target.value;
        setValue('catName',inputValue)
        const slug = inputValue.toLowerCase().replace(/[^\w-]+/g, '-');
        setValue('catSlug',slug)
      }

  console.log('valysd', values)

  return (
    <>
      <Helmet>
        <title> Category | Store </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Category Store
          </Typography>
          {/* {location?.state !==null &&  <Button  variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            Update Category
          </Button>} */}
         
        </Stack>

        <Grid container spacing={3}>
         <Grid item xs={8} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <TextField focused name="catName" label="Category Name" value={values.catName} onChange={(e)=>handleSlug(e)} />
              <TextField focused name="catSlug" label="Category Slug" value={values.catSlug} onChange={(e)=>setValue('catSlug',e.target.value)} />
              <FormControl >
                <InputLabel id="demo-simple-select-label">Position</InputLabel>
                <Select
                  focused
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={values.position}
                  label="Position"
                  defaultValue='tag'
                  onChange={handleSelectPosition}
                >
                  <MenuItem value='header'>Header</MenuItem>
                  <MenuItem value='tag'>Tag</MenuItem>
                  <MenuItem value='filter'>Filter</MenuItem>
                </Select>
              </FormControl>
            </Stack>
            <Box sx={{mt:3}} display='flex' justifyContent='center' justifyItems='center'>
              {(values.catName !='' && values.position !='')
                ? <Button onClick={(e)=>handleCreateCategory()} variant='contained'>{location?.state !==null?'Update':'Create'}</Button>
                : <Button variant='contained' disabled> {location?.state !==null?'Update':'Create'}</Button>
              }
             
            </Box>
          </Card>
         
        </Grid>
        </Grid>
      </Container>

      <ToastContainer />
    </>
  );
}
