import { Helmet } from 'react-helmet-async';
import { filter, set } from 'lodash';
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
  Box,
  TextField,
  Grid,
  Select,
  CircularProgress,
  Backdrop,
  Tooltip,
} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';

import { useLocation, useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import SunEditor from "suneditor-react";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { allCategoryUrl, baseUrl, categoryUrl, postUrl } from 'src/api';
import Context from 'src/context/context';
import { notifyError, notifySuccess } from 'src/utils/Toast';

import InfoIcon from '@mui/icons-material/Info';
import { ToastContainer } from 'react-toastify';
// ----------------------------------------------------------------------


const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function PostStorePage() {
  const navigate = useNavigate();
  const {token} = useContext(Context)
  const location = useLocation(); 
  const [expanded, setExpanded] = useState('panel1');
  const handleChangeAccordian = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const [loader, setLoader] = useState(false);
  const handleClose = () => {
    setLoader(false);
  };
  const handleLoader = () => {
    setLoader(true);
  };


  const[storedHeader, setStoredHeader] = useState(null)
  const[storedTag, setStoredTag] = useState(null)
  const[storedFilter, setStoredFilter] = useState(null)
  const[storedFeatureImage, setStoredFeaturedImage] = useState(null)

  const [categories, setCategories] = useState([])
  const defaultValues = {
    catId: '',
    headerId: '',
    filterId: '',

    title: location?.state?.row?.title?location?.state?.row?.title: '',
    slug: location?.state?.row?.slug?location?.state?.row?.slug: '',
    description: location?.state?.row?.title?location?.state?.row?.description: '',
    featuredImage:'',

    previewTitle1: location?.state?.row?.preview_title_1?location?.state?.row?.preview_title_1: '',
    previewTitle2: location?.state?.row?.preview_title_2?location?.state?.row?.preview_title_2: '',
    previewTitle3: location?.state?.row?.preview_title_3?location?.state?.row?.preview_title_3: '',
    previewTitle4: location?.state?.row?.preview_title_4?location?.state?.row?.preview_title_4: '',
    previewTitle5: location?.state?.row?.preview_title_5?location?.state?.row?.preview_title_5: '',
    previewTitle6: location?.state?.row?.preview_title_6?location?.state?.row?.preview_title_6: '',
    previewTitle7: location?.state?.row?.preview_title_7?location?.state?.row?.preview_title_7: '',
    previewTitle8: location?.state?.row?.preview_title_8?location?.state?.row?.preview_title_8: '',
    previewTitle9: location?.state?.row?.preview_title_9?location?.state?.row?.preview_title_9: '',
    previewTitle10: location?.state?.row?.preview_title_10?location?.state?.row?.preview_title_10: '',
    previewTitle11: location?.state?.row?.preview_title_11?location?.state?.row?.preview_title_11: '',
    previewTitle12: location?.state?.row?.preview_title_12?location?.state?.row?.preview_title_12: '',

    key_f_1: location?.state?.row?.key_f_1?location?.state?.row?.key_f_1: '',
    key_f_2: location?.state?.row?.key_f_2?location?.state?.row?.key_f_2: '',
    key_f_3: location?.state?.row?.key_f_3?location?.state?.row?.key_f_3: '',
    key_f_4: location?.state?.row?.key_f_4?location?.state?.row?.key_f_4: '',
    key_f_5: location?.state?.row?.key_f_5?location?.state?.row?.key_f_5: '',
    key_f_6: location?.state?.row?.key_f_6?location?.state?.row?.key_f_6: '',
    key_f_7: location?.state?.row?.key_f_7?location?.state?.row?.key_f_7: '',
    key_f_8: location?.state?.row?.key_f_8?location?.state?.row?.key_f_8: '',
    
    previewImage1: '',
    previewImage2: '',
    previewImage3: '',
    previewImage4: '',
    previewImage5: '',
    previewImage6: '',
    previewImage7: '',
    previewImage8: '',
    previewImage9: '',
    previewImage10: '',
    previewImage11: '',
    previewImage12: '',

    fileUrl: location?.state?.row?.file_url?location?.state?.row?.file_url: '',
    previewUrl: location?.state?.row?.preview_url?location?.state?.row?.preview_url: '',
    readingTime: location?.state?.row?.read_time?location?.state?.row?.read_time: '',
    gifFile: '',

    authorName: location?.state?.row?.author_name?location?.state?.row?.author_name: '',
    authorUrl: location?.state?.row?.author_url?location?.state?.row?.author_url: '',
    other: location?.state?.row?.others?location?.state?.row?.others: '',
    
  };
  const methods = useForm({defaultValues});
  const {watch,setValue} = methods;
  const values = watch();

    // get all  categories
    const allCategories =()=>{
      let config = {
        method: 'get',
        url: categoryUrl,
        headers: { 
          'Authorization': `Bearer ${token}`
        }
      };
      
      axios.request(config)
      .then((response) => {
        setCategories(response?.data?.categorys)
        if(location?.state !=null && response?.data?.categorys.length>0){
          
          response?.data?.categorys.forEach(element => {
            if(location?.state?.row?.header_id === element.id){
              setStoredHeader(element.category_name)
              setValue('headerId', element.id)
            }
            if(location?.state?.row?.cat_id === element.id){
              setStoredTag(element.category_name)
              setValue('catId', element.id)
            }
            if(location?.state?.row?.filter_id === element.id){
              setStoredFilter(element.category_name)
              setValue('filterId', element.id)
            }
            
          });
        }
      })
      .catch((error) => {
        // console.log(error);
      });
      
    }

    //call categories 
    useEffect(()=>{
      allCategories()
    },[])


  //  udate loaction fileds
   useEffect(()=>{
    if(location?.state !==null){
      setStoredFeaturedImage(location?.state?.row?.image)
    }
    
   },[]) 


   console.log('location', location)




  const handleChangePosition = (event,position) => {
    if(position ==='tag'){
      setValue('catId',event.target.value);
    }
    if(position ==='header'){
      setValue('headerId',event.target.value);
    }
    if(position ==='filter'){
      setValue('filterId',event.target.value);
    }
  };

  // handle editor change
  const handleEditorChange = (content) => {
    setValue('description', content)
  };

  // const handle previewTitle
  const handlePreviewTitle = (e,num) =>{
    if(num===1){setValue('previewTitle1', e.target.value)}
    if(num===2){setValue('previewTitle2', e.target.value)}
    if(num===3){setValue('previewTitle3', e.target.value)}
    if(num===4){setValue('previewTitle4', e.target.value)}
    if(num===5){setValue('previewTitle5', e.target.value)}
    if(num===6){setValue('previewTitle6', e.target.value)}
    if(num===7){setValue('previewTitle7', e.target.value)}
    if(num===8){setValue('previewTitle8', e.target.value)}
    if(num===9){setValue('previewTitle9', e.target.value)}
    if(num===10){setValue('previewTitle10', e.target.value)}
    if(num===11){setValue('previewTitle11', e.target.value)}
    if(num===12){setValue('previewTitle12', e.target.value)}
  }

  // const handle previewImage
  const handlePreviewImage = (e,num) =>{
    if(num===1){setValue('previewImage1', e.target.files[0])}
    if(num===2){setValue('previewImage2', e.target.files[0])}
    if(num===3){setValue('previewImage3', e.target.files[0])}
    if(num===4){setValue('previewImage4', e.target.files[0])}
    if(num===5){setValue('previewImage5', e.target.files[0])}
    if(num===6){setValue('previewImage6', e.target.files[0])}
    if(num===7){setValue('previewImage7', e.target.files[0])}
    if(num===8){setValue('previewImage8', e.target.files[0])}
    if(num===9){setValue('previewImage9', e.target.files[0])}
    if(num===10){setValue('previewImage10', e.target.files[0])}
    if(num===11){setValue('previewImage11', e.target.files[0])}
    if(num===12){setValue('previewImage12', e.target.files[0])}
  }
 



  // store post 
  const handleStorePost = () =>{
    setLoader(true)
    let data = new FormData();
      data.append('cat_id', values.catId);
      data.append('header_id', values.headerId);
      data.append('filter_id', values.filterId);
      data.append('read_time', values.readingTime);
      data.append('image', values.featuredImage);
      data.append('title', values.title);
      data.append('slug', values.slug);
      data.append('description', values.description);

      data.append('preview_title_1', values.previewTitle1);
      data.append('preview_title_2', values.previewTitle2);
      data.append('preview_title_3', values.previewTitle3);
      data.append('preview_title_4', values.previewTitle4);
      data.append('preview_title_5', values.previewTitle5);
      data.append('preview_title_6', values.previewTitle6);
      data.append('preview_title_7', values.previewTitle7);
      data.append('preview_title_8', values.previewTitle8);
      data.append('preview_title_9', values.previewTitle9);
      data.append('preview_title_10', values.previewTitle10);
      data.append('preview_title_11', values.previewTitle11);
      data.append('preview_title_12', values.previewTitle12);
      
      data.append('key_f_1', values.key_f_1);
      data.append('key_f_2', values.key_f_2);
      data.append('key_f_3', values.key_f_3);
      data.append('key_f_4', values.key_f_4);
      data.append('key_f_5', values.key_f_5);
      data.append('key_f_6', values.key_f_6);
      data.append('key_f_7', values.key_f_7);
      data.append('key_f_8', values.key_f_8);

      data.append('preview_image_1', values.previewImage1);
      data.append('preview_image_2', values.previewImage2);
      data.append('preview_image_3', values.previewImage3);
      data.append('preview_image_4', values.previewImage4);
      data.append('preview_image_5', values.previewImage5);
      data.append('preview_image_6', values.previewImage6);
      data.append('preview_image_7', values.previewImage7);
      data.append('preview_image_8', values.previewImage8);
      data.append('preview_image_9', values.previewImage9);
      data.append('preview_image_10', values.previewImage10);
      data.append('preview_image_11', values.previewImage11);
      data.append('preview_image_12', values.previewImage12);

      data.append('file_url', values.fileUrl);
      data.append('preview_url', values.previewUrl);
      data.append('gif_file', values.gifFile);
      data.append('author_name', values.authorName);
      data.append('author_url', values.authorUrl);
      if(values.other){
        data.append('others', values.other);
      }
      

      var config;

      if(location?.state !==null){
        config = {
          method: 'post',
          url: `${postUrl}/${location?.state?.row?.id}`,
          headers: { 
            'Authorization': `Bearer ${token}`, 
          },
          data : data
        };
      }else{
        config = {
          method: 'post',
          url: postUrl,
          headers: { 
            'Authorization': `Bearer ${token}`, 
          },
          data : data
        };
      }

     

      axios.request(config)
      .then((response) => {
        if(response?.data?.success ===true){
          setLoader(false)
          navigate('/dashboard/posts')
        }

        console.log('reddd', response)
        if(response?.data?.success ===false){
          setLoader(false)
          response?.data?.message.forEach(element => {
            notifyError(element)
          });
        }
      })
      .catch((error) => {
        setLoader(false)
        if(error?.response){
          notifyError(error?.response?.data?.message)
        }else{
          notifyError('Something went wrong!. ')
        }
       
       
      });
  }

      // handle slug 
      const handleSlug = (e)=>{
        const inputValue = e.target.value;
        setValue('title',inputValue)
        const slug = inputValue.toLowerCase().replace(/[^\w-]+/g, '-');
        setValue('slug',slug)
      }
      


  return (
    <>
      <Helmet>
        <title> Post | Store </title>
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
            Post Store
          </Typography>
          {location?.state !==null &&  <Button  variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            Update Post
          </Button>}
         
        </Stack>

        <Grid container spacing={3}>
         <Grid item xs={10} md={10}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <Accordion expanded={expanded === 'panel1'} onChange={handleChangeAccordian('panel1')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                  <Typography>#1 Header,Tags & Filter (all required *)</Typography>
                </AccordionSummary>
                <AccordionDetails>
                 
                  <Grid container spacing={3}>

                    <Grid item xs={4} md={4}>
                      <Card sx={{ p: 3 }}>
                        <Stack spacing={3}>
                          <FormControl >
                            <InputLabel id="demo-simple-select-label">Select Header</InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={values.headerId}
                              label="Select Header"
                              onChange={(e)=>handleChangePosition(e,'header')}
                            >
                              {categories && categories.map((cat,i)=>{
                                if(cat.category_position ==='header'){
                                  return(
                                    <MenuItem value={cat.id}>{cat.category_name}</MenuItem>
                                  )
                                }
                              })}
                            </Select>
                          </FormControl>
                            {storedHeader !=null &&  <Box sx={{fontSize:10}}>Stored Header : {storedHeader}</Box>}
                        </Stack>
                      </Card>
                    </Grid>

                    <Grid item xs={4} md={4}>
                      <Card sx={{ p: 3 }}>
                        <Stack spacing={3}>
                          <FormControl >
                            <InputLabel id="demo-simple-select-label">Select Tag</InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={values.catId}
                              label="Select Tag"
                              onChange={(e)=>handleChangePosition(e,'tag')}
                            >
                             {categories && categories.map((cat,i)=>{
                                if(cat.category_position ==='tag'){
                                  return(
                                    <MenuItem value={cat.id}>{cat.category_name}</MenuItem>
                                  )
                                }
                              })}
                            </Select>
                          </FormControl>
                          {storedTag !=null &&  <Box sx={{fontSize:10}}>Stored Tag : {storedTag}</Box>}
                        </Stack>
                      </Card>
                    </Grid>
                  
                    <Grid item xs={4} md={4}>
                      <Card sx={{ p: 3 }}>
                        <Stack spacing={3}>
                          <FormControl >
                            <InputLabel id="demo-simple-select-label">Select Filter</InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={values.filterId}
                              label="Select Filter"
                              onChange={(e)=>handleChangePosition(e,'filter')}
                            >
                             {categories && categories.map((cat,i)=>{
                                if(cat.category_position ==='filter'){
                                  return(
                                    <MenuItem value={cat.id}>{cat.category_name}</MenuItem>
                                  )
                                }
                              })}
                            </Select>
                          </FormControl>
                          {storedFilter !=null &&  <Box sx={{fontSize:10}}>Stored Filter : {storedFilter}</Box>}
                        </Stack>
                      </Card>
                    </Grid>

                    </Grid>
                  
                </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChangeAccordian('panel2')}>
                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                  <Typography>#2 Title,Reading Time, Featurd Image & Description</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                      <Card sx={{ p: 3 }}>
                        <Stack spacing={3}>
                          <TextField name="title" label="Title" onChange={(e)=>handleSlug(e)} value={values.title}/>
                          <TextField name="slug" label="Slug"  value={values.slug} onChange={(e)=>setValue('slug',e.target.value)}/>
                          <TextField type='number' name="readingTime" label="Reading Time(0-10)" 
                              onChange={(e)=> setValue('readingTime', e.target.value)} value={values.readingTime}/>
                          <Box sx={{ mt: 2 }}>
                            <SunEditor
                              id="details"
                              name="description"
                              setContents={values.description}
                              showToolbar={true}
                              setDefaultStyle="height: 400px"
                              onChange={handleEditorChange}
                              setOptions={{
                                buttonList: [
                                  [
                                    "undo",
                                    "redo",
                                    "font",
                                    "fontSize",
                                    "formatBlock",
                                    "paragraphStyle",
                                    "blockquote",
                                    "bold",
                                    "underline",
                                    "italic",
                                    "strike",
                                    "subscript",
                                    "superscript",
                                    "fontColor",
                                    "hiliteColor",
                                    "textStyle",
                                    "removeFormat",
                                    "outdent",
                                    "indent",
                                    "align",
                                    "horizontalRule",
                                    "list",
                                    "lineHeight",
                                    "table",
                                    "link",
                                    "image",
                                    "video",
                                    "audio",
                                    "imageGallery",
                                    "fullScreen",
                                    "showBlocks",
                                    "codeView",
                                    "preview",
                                    "print",
                                    "save",
                                    "template",
                                  ],
                                ],
                              }}
                            />
                          </Box>
                         
                        </Stack>
                      </Card>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Stack spacing={2} >
                      <Card sx={{p:2}}>
                        <Box sx={{ mb: 2, mt: 2,ml:5, minHeight:165 }} >
                          <Button
                            variant="contained"
                            component="label"
                            sx={{mt:8, ml:3}}
                          >
                            Upload File
                            <input
                              type="file"
                              onChange={(e)=> setValue('featuredImage', e.target.files[0])}
                              hidden
                            />
                          </Button>
                        </Box>
                      </Card>

                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Stack spacing={2}>
                        <Card sx={{p:2}}>
                          <Box sx={{ mb: 2, mt: 2,minHeight:165 }} >
                            {values.featuredImage !=='' 
                              && <img src={URL.createObjectURL(values.featuredImage)} alt="" />
                            }
                          </Box>
                        </Card>
                      </Stack>
                    </Grid>
                    {storedFeatureImage !=null && <Grid item xs={12} md={4}>
                      <Stack spacing={2}>
                        <Card sx={{p:2}}>
                          <Box sx={{ mb: 2, mt: 2,minHeight:150 }} >
                              <img src={`${baseUrl}/storage/${storedFeatureImage}`} alt="" />
                          </Box>
                          <Box sx={{fontSize:10}} display='flex' justifyContent='center'>Stored Feature Image</Box>
                        </Card>
                       
                      </Stack>
                    </Grid>}
                    
                  </Grid>
                </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel3'} onChange={handleChangeAccordian('panel3')}>
                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                  <Typography>#3 Key Features</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                      <Card sx={{ p: 3 }}>
                        <Stack spacing={3}>
                         <TextField type='text' name="key_f_1" label="Feature 1" 
                              onChange={(e)=> setValue('key_f_1', e.target.value)} value={values.key_f_1}/>
                         <TextField type='text' name="key_f_2" label="Feature 2" 
                              onChange={(e)=> setValue('key_f_2', e.target.value)} value={values.key_f_2}/>
                         <TextField type='text' name="key_f_3" label="Feature 3" 
                              onChange={(e)=> setValue('key_f_3', e.target.value)} value={values.key_f_3}/>
                         <TextField type='text' name="key_f_4" label="Feature 4" 
                              onChange={(e)=> setValue('key_f_4', e.target.value)} value={values.key_f_4}/>
                         <TextField type='text' name="key_f_5" label="Feature 5" 
                              onChange={(e)=> setValue('key_f_5', e.target.value)} value={values.key_f_5}/>
                         <TextField type='text' name="key_f_6" label="Feature 6" 
                              onChange={(e)=> setValue('key_f_6', e.target.value)} value={values.key_f_6}/>
                         <TextField type='text' name="key_f_7" label="Feature 7" 
                              onChange={(e)=> setValue('key_f_7', e.target.value)} value={values.key_f_7}/>
                         <TextField type='text' name="key_f_8" label="Feature 8" 
                              onChange={(e)=> setValue('key_f_8', e.target.value)} value={values.key_f_8}/>
                        </Stack>
                      </Card>
                    </Grid>
                  </Grid>
                </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel4'} onChange={handleChangeAccordian('panel4')}>
                <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                  <Typography>#4 ScreenShots</Typography>
                </AccordionSummary>
                <AccordionDetails>
                   {/* secreenshot -1 */}
                    <Grid container spacing={1}>
                    <Grid item xs={6} md={6}>
                      <Card sx={{ p: 1 }}>
                        <Stack spacing={3}>
                          <TextField name="screenShotTitleOne" label="Screenshot Title 1" 
                            onChange={(e)=> handlePreviewTitle(e,1)} value={values.previewTitle1} />
                        </Stack>
                      </Card>
                    </Grid>
                   
                    <Grid item xs={3} md={3}>
                      <Card sx={{ p: 2 }}>
                        <Stack spacing={3}>
                        <Button
                            variant="contained"
                            component="label"
                          >
                            Upload File
                            <input
                              type="file"
                              hidden
                              onChange={(e)=> handlePreviewImage(e,1)}
                            />
                          </Button>
                          
                        </Stack>
                      </Card>
                    </Grid>
                    <Grid item xs={2} md={2}>
                      <Card sx={{ p: 2 }}>
                        <Stack sx={{minHeight:35}} >
                          <Box display='flex' justifyContent='center' justifyItems='center'>
                            {values.previewImage1 !=='' 
                              && <img src={URL.createObjectURL(values.previewImage1)} width='50%' alt="" />
                            }
                          </Box>
                        </Stack>
                      </Card>
                    </Grid>
                    {location?.state?.row?.preview_image_1 &&  <Grid item xs={1} md={1}>
                      <Card sx={{ p: 2 }}>
                        <Stack sx={{maxHeight:35}} >
                          <Box display='flex' justifyContent='center' justifyItems='center'>
                            <Tooltip title="Preview Stored Image">
                              <IconButton>
                                <a href={`${baseUrl}/storage/${location?.state?.row?.preview_image_1}`} target='_blank'><InfoIcon /></a>
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </Stack>
                      </Card>
                    </Grid>}
                   
                     
                    </Grid>
                   {/* secreenshot -2 */}
                    <Grid container spacing={1} sx={{mt:1}}>
                        <Grid item xs={6} md={6}>
                            <Card sx={{ p: 1 }}>
                              <Stack spacing={3}>
                                <TextField name="screenShotTitleTwo" label="Screenshot Title 2" 
                                 onChange={(e)=> handlePreviewTitle(e,2)} value={values.previewTitle2}/>
                              </Stack>
                            </Card>
                        </Grid>
                        <Grid item xs={3} md={3}>
                            <Card sx={{ p: 2 }}>
                              <Stack spacing={3}>
                              <Button
                                  variant="contained"
                                  component="label"
                                >
                                  Upload File
                                  <input
                                    type="file"
                                    hidden
                                    onChange={(e)=> handlePreviewImage(e,2)}
                                  />
                                </Button>
                              </Stack>
                            </Card>
                        </Grid>
                        <Grid item xs={2} md={2}>
                            <Card sx={{ p: 2 }}>
                            <Stack sx={{minHeight:35}} >
                                <Box display='flex' justifyContent='center' justifyItems='center'>
                                  {values.previewImage2 !=='' 
                                      && <img src={URL.createObjectURL(values.previewImage2)} width='50%' alt="" />
                                    }
                                </Box>
                              </Stack>
                            </Card>
                        </Grid>
                        {location?.state?.row?.preview_image_2 &&  <Grid item xs={1} md={1}>
                          <Card sx={{ p: 2 }}>
                            <Stack sx={{maxHeight:35}} >
                              <Box display='flex' justifyContent='center' justifyItems='center'>
                                <Tooltip title="Preview Stored Image">
                                  <IconButton>
                                    <a href={`${baseUrl}/storage/${location?.state?.row?.preview_image_2}`} target='_blank'><InfoIcon /></a>
                                  </IconButton>
                                </Tooltip>
                              </Box>
                            </Stack>
                          </Card>
                        </Grid>}
                    </Grid>
                   {/* secreenshot -3 */}
                    <Grid container spacing={1} sx={{mt:1}}>
                        <Grid item xs={6} md={6}>
                            <Card sx={{ p: 1 }}>
                              <Stack spacing={3}>
                                <TextField name="screenShotTitleThree" label="Screenshot Title 3" 
                                 onChange={(e)=> handlePreviewTitle(e,3)} value={values.previewTitle3} />
                              </Stack>
                            </Card>
                        </Grid>
                        <Grid item xs={3} md={3}>
                            <Card sx={{ p: 2 }}>
                              <Stack spacing={3}>
                              <Button
                                  variant="contained"
                                  component="label"
                                >
                                  Upload File
                                  <input
                                    type="file"
                                    hidden
                                    onChange={(e)=> handlePreviewImage(e,3)}
                                  />
                                </Button>
                              </Stack>
                            </Card>
                        </Grid>
                        <Grid item xs={2} md={2}>
                            <Card sx={{ p: 2 }}>
                            <Stack sx={{minHeight:35}} >
                                <Box display='flex' justifyContent='center' justifyItems='center'>
                                  {values.previewImage3 !=='' 
                                      && <img src={URL.createObjectURL(values.previewImage3)} width='50%' alt="" />
                                    }
                                </Box>
                              </Stack>
                            </Card>
                        </Grid>
                        {location?.state?.row?.preview_image_3 &&  <Grid item xs={1} md={1}>
                          <Card sx={{ p: 2 }}>
                            <Stack sx={{maxHeight:35}} >
                              <Box display='flex' justifyContent='center' justifyItems='center'>
                                <Tooltip title="Preview Stored Image">
                                  <IconButton>
                                    <a href={`${baseUrl}/storage/${location?.state?.row?.preview_image_3}`} target='_blank'><InfoIcon /></a>
                                  </IconButton>
                                </Tooltip>
                              </Box>
                            </Stack>
                          </Card>
                        </Grid>}
                    </Grid>
                   {/* secreenshot -4 */}
                    <Grid container spacing={1} sx={{mt:1}}>
                        <Grid item xs={6} md={6}>
                            <Card sx={{ p: 1 }}>
                              <Stack spacing={3}>
                                <TextField name="screenShotTitleFour" label="Screenshot Title 4" 
                                 onChange={(e)=> handlePreviewTitle(e,4)} value={values.previewTitle4}/>
                              </Stack>
                            </Card>
                        </Grid>
                        <Grid item xs={3} md={3}>
                            <Card sx={{ p: 2 }}>
                              <Stack spacing={3}>
                              <Button
                                  variant="contained"
                                  component="label"
                                >
                                  Upload File
                                  <input
                                    type="file"
                                    hidden
                                    onChange={(e)=> handlePreviewImage(e,4)}
                                  />
                                </Button>
                              </Stack>
                            </Card>
                        </Grid>
                        <Grid item xs={2} md={2}>
                            <Card sx={{ p: 2 }}>
                            <Stack sx={{minHeight:35}} >
                                <Box display='flex' justifyContent='center' justifyItems='center'>
                                  {values.previewImage4 !=='' 
                                      && <img src={URL.createObjectURL(values.previewImage4)} width='50%' alt="" />
                                    }
                                </Box>
                              </Stack>
                            </Card>
                        </Grid>
                        {location?.state?.row?.preview_image_4 &&  <Grid item xs={1} md={1}>
                          <Card sx={{ p: 2 }}>
                            <Stack sx={{maxHeight:35}} >
                              <Box display='flex' justifyContent='center' justifyItems='center'>
                                <Tooltip title="Preview Stored Image">
                                  <IconButton>
                                    <a href={`${baseUrl}/storage/${location?.state?.row?.preview_image_4}`} target='_blank'><InfoIcon /></a>
                                  </IconButton>
                                </Tooltip>
                              </Box>
                            </Stack>
                          </Card>
                        </Grid>}
                    </Grid>
                   {/* secreenshot -5 */}
                    <Grid container spacing={1} sx={{mt:1}}>
                        <Grid item xs={6} md={6}>
                            <Card sx={{ p: 1 }}>
                              <Stack spacing={3}>
                                <TextField name="screenShotTitleFive" label="Screenshot Title 5"  
                                onChange={(e)=> handlePreviewTitle(e,5)} value={values.previewTitle5}/>
                              </Stack>
                            </Card>
                        </Grid>
                        <Grid item xs={3} md={3}>
                            <Card sx={{ p: 2 }}>
                              <Stack spacing={3}>
                              <Button
                                  variant="contained"
                                  component="label"
                                >
                                  Upload File
                                  <input
                                    type="file"
                                    hidden
                                    onChange={(e)=> handlePreviewImage(e,5)}
                                  />
                                </Button>
                              </Stack>
                            </Card>
                        </Grid>
                        <Grid item xs={2} md={2}>
                            <Card sx={{ p: 2 }}>
                            <Stack sx={{minHeight:35}} >
                                <Box display='flex' justifyContent='center' justifyItems='center'>
                                  {values.previewImage5 !=='' 
                                      && <img src={URL.createObjectURL(values.previewImage5)} width='50%' alt="" />
                                    }
                                </Box>
                              </Stack>
                            </Card>
                        </Grid>
                        {location?.state?.row?.preview_image_5 &&  <Grid item xs={1} md={1}>
                          <Card sx={{ p: 2 }}>
                            <Stack sx={{maxHeight:35}} >
                              <Box display='flex' justifyContent='center' justifyItems='center'>
                                <Tooltip title="Preview Stored Image">
                                  <IconButton>
                                    <a href={`${baseUrl}/storage/${location?.state?.row?.preview_image_5}`} target='_blank'><InfoIcon /></a>
                                  </IconButton>
                                </Tooltip>
                              </Box>
                            </Stack>
                          </Card>
                        </Grid>}
                    </Grid>
                   {/* secreenshot -6 */}
                    <Grid container spacing={1} sx={{mt:1}}>
                        <Grid item xs={6} md={6}>
                            <Card sx={{ p: 1 }}>
                              <Stack spacing={3}>
                                <TextField name="screenShotTitleSix" label="Screenshot Title 6"  
                                onChange={(e)=> handlePreviewTitle(e,6)} value={values.previewTitle6}/>
                              </Stack>
                            </Card>
                        </Grid>
                        <Grid item xs={3} md={3}>
                            <Card sx={{ p: 2 }}>
                              <Stack spacing={3}>
                              <Button
                                  variant="contained"
                                  component="label"
                                >
                                  Upload File
                                  <input
                                    type="file"
                                    hidden
                                    onChange={(e)=> handlePreviewImage(e,6)}
                                  />
                                </Button>
                              </Stack>
                            </Card>
                        </Grid>
                        <Grid item xs={2} md={2}>
                            <Card sx={{ p: 2 }}>
                            <Stack sx={{minHeight:35}} >
                                <Box display='flex' justifyContent='center' justifyItems='center'>
                                  {values.previewImage6 !=='' 
                                      && <img src={URL.createObjectURL(values.previewImage6)} width='50%' alt="" />
                                    }
                                </Box>
                              </Stack>
                            </Card>
                        </Grid>
                        {location?.state?.row?.preview_image_6 &&  <Grid item xs={1} md={1}>
                          <Card sx={{ p: 2 }}>
                            <Stack sx={{maxHeight:35}} >
                              <Box display='flex' justifyContent='center' justifyItems='center'>
                                <Tooltip title="Preview Stored Image">
                                  <IconButton>
                                    <a href={`${baseUrl}/storage/${location?.state?.row?.preview_image_6}`} target='_blank'><InfoIcon /></a>
                                  </IconButton>
                                </Tooltip>
                              </Box>
                            </Stack>
                          </Card>
                        </Grid>}
                    </Grid>
                   {/* secreenshot -7 */}
                    <Grid container spacing={1} sx={{mt:1}}>
                        <Grid item xs={6} md={6}>
                            <Card sx={{ p: 1 }}>
                              <Stack spacing={3}>
                                <TextField name="screenShotTitleSeven" label="Screenshot Title 7" 
                                 onChange={(e)=> handlePreviewTitle(e,7)} value={values.previewTitle7}/>
                              </Stack>
                            </Card>
                        </Grid>
                        <Grid item xs={3} md={3}>
                            <Card sx={{ p: 2 }}>
                              <Stack spacing={3}>
                              <Button
                                  variant="contained"
                                  component="label"
                                >
                                  Upload File
                                  <input
                                    type="file"
                                    hidden
                                    onChange={(e)=> handlePreviewImage(e,7)}
                                  />
                                </Button>
                              </Stack>
                            </Card>
                        </Grid>
                        <Grid item xs={2} md={2}>
                            <Card sx={{ p: 2 }}>
                            <Stack sx={{minHeight:35}} >
                                <Box display='flex' justifyContent='center' justifyItems='center'>
                                  {values.previewImage7 !=='' 
                                      && <img src={URL.createObjectURL(values.previewImage7)} width='50%' alt="" />
                                    }
                                </Box>
                              </Stack>
                            </Card>
                        </Grid>
                        {location?.state?.row?.preview_image_7 &&  <Grid item xs={1} md={1}>
                          <Card sx={{ p: 2 }}>
                            <Stack sx={{maxHeight:35}} >
                              <Box display='flex' justifyContent='center' justifyItems='center'>
                                <Tooltip title="Preview Stored Image">
                                  <IconButton>
                                    <a href={`${baseUrl}/storage/${location?.state?.row?.preview_image_7}`} target='_blank'><InfoIcon /></a>
                                  </IconButton>
                                </Tooltip>
                              </Box>
                            </Stack>
                          </Card>
                        </Grid>}
                    </Grid>
                   {/* secreenshot -8 */}
                    <Grid container spacing={1} sx={{mt:1}}>
                        <Grid item xs={6} md={6}>
                            <Card sx={{ p: 1 }}>
                              <Stack spacing={3}>
                                <TextField name="screenShotTitleEight" label="Screenshot Title 8"
                                 onChange={(e)=> handlePreviewTitle(e,8)} value={values.previewTitle8}/>
                              </Stack>
                            </Card>
                        </Grid>
                        <Grid item xs={3} md={3}>
                            <Card sx={{ p: 2 }}>
                              <Stack spacing={3}>
                              <Button
                                  variant="contained"
                                  component="label"
                                >
                                  Upload File
                                  <input
                                    type="file"
                                    hidden
                                    onChange={(e)=> handlePreviewImage(e,8)}
                                  />
                                </Button>
                              </Stack>
                            </Card>
                        </Grid>
                        <Grid item xs={2} md={2}>
                            <Card sx={{ p: 2 }}>
                            <Stack sx={{minHeight:35}} >
                                <Box display='flex' justifyContent='center' justifyItems='center'>
                                  {values.previewImage8 !=='' 
                                      && <img src={URL.createObjectURL(values.previewImage8)} width='50%' alt="" />
                                    }
                                </Box>
                              </Stack>
                            </Card>
                        </Grid>
                        {location?.state?.row?.preview_image_8 &&  <Grid item xs={1} md={1}>
                          <Card sx={{ p: 2 }}>
                            <Stack sx={{maxHeight:35}} >
                              <Box display='flex' justifyContent='center' justifyItems='center'>
                                <Tooltip title="Preview Stored Image">
                                  <IconButton>
                                    <a href={`${baseUrl}/storage/${location?.state?.row?.preview_image_8}`} target='_blank'><InfoIcon /></a>
                                  </IconButton>
                                </Tooltip>
                              </Box>
                            </Stack>
                          </Card>
                        </Grid>}
                    </Grid>
                   {/* secreenshot -9 */}
                    <Grid container spacing={1} sx={{mt:1}}>
                        <Grid item xs={6} md={6}>
                            <Card sx={{ p: 1 }}>
                              <Stack spacing={3}>
                                <TextField name="screenShotTitleNine" label="Screenshot Title 9" 
                                 onChange={(e)=> handlePreviewTitle(e,9)} value={values.previewTitle9}/>
                              </Stack>
                            </Card>
                        </Grid>
                        <Grid item xs={3} md={3}>
                            <Card sx={{ p: 2 }}>
                              <Stack spacing={3}>
                              <Button
                                  variant="contained"
                                  component="label"
                                >
                                  Upload File
                                  <input
                                    type="file"
                                    hidden
                                    onChange={(e)=> handlePreviewImage(e,9)}
                                  />
                                </Button>
                              </Stack>
                            </Card>
                        </Grid>
                        <Grid item xs={2} md={2}>
                            <Card sx={{ p: 2 }}>
                            <Stack sx={{minHeight:35}} >
                                <Box display='flex' justifyContent='center' justifyItems='center'>
                                  {values.previewImage9 !=='' 
                                      && <img src={URL.createObjectURL(values.previewImage9)} width='50%' alt="" />
                                    }
                                </Box>
                              </Stack>
                            </Card>
                        </Grid>
                        {location?.state?.row?.preview_image_9 &&  <Grid item xs={1} md={1}>
                          <Card sx={{ p: 2 }}>
                            <Stack sx={{maxHeight:35}} >
                              <Box display='flex' justifyContent='center' justifyItems='center'>
                                <Tooltip title="Preview Stored Image">
                                  <IconButton>
                                    <a href={`${baseUrl}/storage/${location?.state?.row?.preview_image_9}`} target='_blank'><InfoIcon /></a>
                                  </IconButton>
                                </Tooltip>
                              </Box>
                            </Stack>
                          </Card>
                        </Grid>}
                    </Grid>
                   {/* secreenshot -10 */}
                    <Grid container spacing={1} sx={{mt:1}}>
                        <Grid item xs={6} md={6}>
                            <Card sx={{ p: 1 }}>
                              <Stack spacing={3}>
                                <TextField name="screenShotTitleTen" label="Screenshot Title 10"
                                 onChange={(e)=> handlePreviewTitle(e,10)} value={values.previewTitle10}/>
                              </Stack>
                            </Card>
                        </Grid>
                        <Grid item xs={3} md={3}>
                            <Card sx={{ p: 2 }}>
                              <Stack spacing={3}>
                              <Button
                                  variant="contained"
                                  component="label"
                                >
                                  Upload File
                                  <input
                                    type="file"
                                    hidden
                                    onChange={(e)=> handlePreviewImage(e,10)}
                                  />
                                </Button>
                              </Stack>
                            </Card>
                        </Grid>
                        <Grid item xs={2} md={2}>
                            <Card sx={{ p: 2 }}>
                            <Stack sx={{minHeight:35}} >
                                <Box display='flex' justifyContent='center' justifyItems='center'>
                                  {values.previewImage10 !=='' 
                                      && <img src={URL.createObjectURL(values.previewImage10)} width='50%' alt="" />
                                    }
                                </Box>
                              </Stack>
                            </Card>
                        </Grid>
                        {location?.state?.row?.preview_image_10 &&  <Grid item xs={1} md={1}>
                          <Card sx={{ p: 2 }}>
                            <Stack sx={{maxHeight:35}} >
                              <Box display='flex' justifyContent='center' justifyItems='center'>
                                <Tooltip title="Preview Stored Image">
                                  <IconButton>
                                    <a href={`${baseUrl}/storage/${location?.state?.row?.preview_image_10}`} target='_blank'><InfoIcon /></a>
                                  </IconButton>
                                </Tooltip>
                              </Box>
                            </Stack>
                          </Card>
                        </Grid>}
                    </Grid>
                   {/* secreenshot -11 */}
                    <Grid container spacing={1} sx={{mt:1}}>
                        <Grid item xs={6} md={6}>
                            <Card sx={{ p: 1 }}>
                              <Stack spacing={3}>
                                <TextField name="screenShotTitleEleven" label="Screenshot Title 11"
                                 onChange={(e)=> handlePreviewTitle(e,11)} value={values.previewTitle11}/>
                              </Stack>
                            </Card>
                        </Grid>
                        <Grid item xs={3} md={3}>
                            <Card sx={{ p: 2 }}>
                              <Stack spacing={3}>
                              <Button
                                  variant="contained"
                                  component="label"
                                >
                                  Upload File
                                  <input
                                    type="file"
                                    hidden
                                    onChange={(e)=> handlePreviewImage(e,11)}
                                  />
                                </Button>
                              </Stack>
                            </Card>
                        </Grid>
                        <Grid item xs={2} md={2}>
                            <Card sx={{ p: 2 }}>
                            <Stack sx={{minHeight:35}} >
                                <Box display='flex' justifyContent='center' justifyItems='center'>
                                  {values.previewImage11 !=='' 
                                      && <img src={URL.createObjectURL(values.previewImage11)} width='50%' alt="" />
                                    }
                                </Box>
                              </Stack>
                            </Card>
                        </Grid>
                        {location?.state?.row?.preview_image_11 &&  <Grid item xs={1} md={1}>
                          <Card sx={{ p: 2 }}>
                            <Stack sx={{maxHeight:35}} >
                              <Box display='flex' justifyContent='center' justifyItems='center'>
                                <Tooltip title="Preview Stored Image">
                                  <IconButton>
                                    <a href={`${baseUrl}/storage/${location?.state?.row?.preview_image_11}`} target='_blank'><InfoIcon /></a>
                                  </IconButton>
                                </Tooltip>
                              </Box>
                            </Stack>
                          </Card>
                        </Grid>}
                    </Grid>
                   {/* secreenshot -12 */}
                    <Grid container spacing={1} sx={{mt:1}}>
                        <Grid item xs={6} md={6}>
                            <Card sx={{ p: 1 }}>
                              <Stack spacing={3}>
                                <TextField name="screenShotTitleTwelve" label="Screenshot Title 12"
                                 onChange={(e)=> handlePreviewTitle(e,12)} value={values.previewTitle12}/>
                              </Stack>
                            </Card>
                        </Grid>
                        <Grid item xs={3} md={3}>
                            <Card sx={{ p: 2 }}>
                              <Stack spacing={3}>
                              <Button
                                  variant="contained"
                                  component="label"
                                >
                                  Upload File
                                  <input
                                    type="file"
                                    hidden
                                    onChange={(e)=> handlePreviewImage(e,12)}
                                  />
                                </Button>
                              </Stack>
                            </Card>
                        </Grid>
                        <Grid item xs={2} md={2}>
                            <Card sx={{ p: 2 }}>
                            <Stack sx={{minHeight:35}} >
                                <Box display='flex' justifyContent='center' justifyItems='center'>
                                  {values.previewImage12 !=='' 
                                      && <img src={URL.createObjectURL(values.previewImage12)} width='50%' alt="" />
                                    }
                                </Box>
                              </Stack>
                            </Card>
                        </Grid>
                        {location?.state?.row?.preview_image_12 &&  <Grid item xs={1} md={1}>
                          <Card sx={{ p: 2 }}>
                            <Stack sx={{maxHeight:35}} >
                              <Box display='flex' justifyContent='center' justifyItems='center'>
                                <Tooltip title="Preview Stored Image">
                                  <IconButton>
                                    <a href={`${baseUrl}/storage/${location?.state?.row?.preview_image_12}`} target='_blank'><InfoIcon /></a>
                                  </IconButton>
                                </Tooltip>
                              </Box>
                            </Stack>
                          </Card>
                        </Grid>}
                    </Grid>
                </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel5'} onChange={handleChangeAccordian('panel5')}>
                  <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                    <Typography>#5 File Url, Preview Url, Gif File</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                      <Grid container spacing={1}>
                        <Grid item xs={12} md={12}>
                        <Card sx={{ p: 1 }}>
                          <Stack spacing={3}>
                            <TextField name="fileUrl" label="File URL" 
                              onChange={(e)=> setValue('fileUrl', e.target.value)} value={values.fileUrl} />
                            <TextField name="previewUrl" label="Preview URL" 
                              onChange={(e)=> setValue('previewUrl', e.target.value)} value={values.previewUrl} />
                            
                            <TextField type='file' name="gifFile" 
                              onChange={(e)=> setValue('gifFile', e.target.files[0])} />

                            {location?.state?.row?.gif_file &&  <a href={`${baseUrl}/storage/${location?.state?.row?.gif_file}`} target='_blank'><Button>Preview Gif</Button></a>  }
                             
                          </Stack>
                        </Card>
                        </Grid>
                      </Grid>
              
                  </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel6'} onChange={handleChangeAccordian('panel6')}>
                  <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                    <Typography>#6 Author & Backlink</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                      <Grid container spacing={1}>
                        <Grid item xs={12} md={12}>
                        <Card sx={{ p: 1 }}>
                          <Stack spacing={3}>
                            <TextField name="authorName" label="Author Name" onChange={(e)=>setValue('authorName', e.target.value)} value={values.authorName} />
                            <TextField name="authorUrl" label="Author URL" onChange={(e)=>setValue('authorUrl', e.target.value)} value={values.authorUrl}/>
                            <TextField name="other" label="Backlink" onChange={(e)=>setValue('other', e.target.value)} value={values.other} />
                          </Stack>
                        </Card>
                        </Grid>
                      </Grid>
              
                  </AccordionDetails>
                </Accordion>
            </Stack>

            <Box display='flex' justifyContent='center' justifyItems='center' sx={{mt:3}}>
              <Button variant='contained' onClick={(e)=> handleStorePost()} >{location?.state !=null?'Update':'Create'}</Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
      </Container>
      <ToastContainer />
    </>
  );
}
