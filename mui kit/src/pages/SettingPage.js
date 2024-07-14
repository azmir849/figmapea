import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useContext, useEffect, useRef, useState } from 'react';
// @mui
import {
  Card,
  Container,
  Backdrop,
  CircularProgress,
  Grid,
  Stack,
  TextField,
  Box,
  Button,
} from '@mui/material';
// mock
import { useNavigate } from 'react-router-dom';
import Context from 'src/context/context';
import { ToastContainer } from 'react-toastify';
import { useForm } from 'react-hook-form';
import SunEditor from 'suneditor-react';
import { settingUrl } from 'src/api';
import axios from 'axios';
import { notifyError, notifySuccess } from 'src/utils/Toast';

// ----------------------------------------------------------------------

export default function SettingPage() {
  const {token} = useContext(Context)
  const navigate = useNavigate()
  const [loader, setLoader] = useState(false);

  const defaultValues = {
    footer_desc: '',
    email: '',
    phone:'',
    address: '',
    facebook: '',
    instagram: '',
    youtube: '',
    about_title: '',
    about_desc: '',
    privacy_desc: '',
    terms_desc: '',
    other1_desc: '',
    other2_desc: '',
  };
  const methods = useForm({defaultValues});
  const {watch,setValue} = methods;
  const values = watch();


    // handle editor change
    const handleEditorChange = (content,field_name) => {
      setValue(`${field_name}`, content)
    };


    const [settingData, setSettingData] = useState('')
    // get all settings data

    const getSettingData=()=>{
      setLoader(true)
      let config = {
        method: 'get',
        url: settingUrl,
        headers: { 
          'Authorization': `Bearer ${token}`
        }
      };
      
      axios.request(config)
      .then((response) => {
        setSettingData(response.data)
        
        setValue('footer_desc',response?.data?.settings?.footer_desc)
        setValue('email',response?.data?.settings?.email)
        setValue('phone',response?.data?.settings?.phone)
        setValue('address',response?.data?.settings?.address)
        setValue('facebook',response?.data?.settings?.facebook)
        setValue('instagram',response?.data?.settings?.instagram)
        setValue('youtube',response?.data?.settings?.youtube)
        setValue('about_title',response?.data?.settings?.about_title)
        setValue('about_desc',response?.data?.settings?.about_desc)
        setValue('privacy_desc',response?.data?.settings?.privacy_desc)
        setValue('terms_desc',response?.data?.settings?.terms_desc)
        setValue('other1_desc',response?.data?.settings?.other1_desc)
        setValue('other2_desc',response?.data?.settings?.other2_desc)

        setLoader(false)
      })
      .catch((error) => {
        console.log(error);
        setLoader(false)
        // notifyError()
      });
    }

    useEffect(()=>{
      getSettingData();
    },[])


    //  handle update

    const handleUJpdate =(e)=>{
      setLoader(true)
      e.preventDefault()
      let data = new FormData();
        data.append('email', values.email);
        data.append('phone', values.phone);
        data.append('address', values.address);
        data.append('facebook', values.facebook);
        data.append('instagram', values.instagram);
        data.append('youtube', values.youtube);
        data.append('about_title', values.about_title);
        data.append('about_desc', values.about_desc);
        data.append('privacy_desc', values.privacy_desc);
        data.append('terms_desc', values.terms_desc);
        data.append('footer_desc', values.footer_desc);
        data.append('other1_desc', values.other1_desc);
        data.append('other2_desc', values.other2_desc);

        let config = {
          method: 'post',
          url: `${settingUrl}/1`,
          headers: { 
            'Authorization': `Bearer ${token}`, 
          },
          data : data
        };

        axios.request(config)
        .then((response) => {
          // console.log(JSON.stringify(response.data));
          notifySuccess()
          getSettingData()
          setLoader(false)
        })
        .catch((error) => {
          setLoader(false)
          notifyError()
          console.log(error);
        });
    }


  

  return (
    <>
      <Helmet>
        <title> Setting Page</title>
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
        <Card sx={{p:5}}>
        <p>Setting</p>
          <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                      <Card sx={{ p: 3 }}>
                        <Stack spacing={3}>
                          <TextField type='email' name="Email" label="Email" onChange={(e)=>setValue('email', e.target.value)} value={values.email}/>
                          <TextField type='number' name="Phone" label="Phone" onChange={(e)=>setValue('phone', e.target.value)} value={values.phone}/>
                          <TextField type='text' name="Address" label="Address" onChange={(e)=>setValue('address', e.target.value)} value={values.address}/>
                          <TextField type='text' name="Facebook" label="Facebook" onChange={(e)=>setValue('facebook', e.target.value)} value={values.facebook}/>
                          <TextField type='text' name="Instagram" label="Instagram" onChange={(e)=>setValue('instagram', e.target.value)} value={values.instagram}/>
                          <TextField type='text' name="Youtube" label="Youtube" onChange={(e)=>setValue('youtube', e.target.value)} value={values.youtube}/>
                          <TextField type='text' name="About Title" label="About Title" onChange={(e)=>setValue('about_title', e.target.value)} value={values.about_title}/>
                          <Box sx={{ mt: 2 }}>
                            <label>About description</label>
                              <SunEditor
                                id="details"
                                name="description"
                                setContents={values.about_desc}
                                showToolbar={true}
                                setDefaultStyle="height:200px"
                                onChange={(e)=>handleEditorChange(e,'about_desc')}
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
                          <Box sx={{ mt: 2 }}>
                            <label>Privacy description</label>
                              <SunEditor
                                id="details"
                                name="description"
                                setContents={values.privacy_desc}
                                showToolbar={true}
                                setDefaultStyle="height:200px"
                                onChange={(e)=>handleEditorChange(e,'privacy_desc')}
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
                          <Box sx={{ mt: 2 }}>
                            <label>Terms description</label>
                              <SunEditor
                                id="details"
                                name="description"
                                setContents={values.terms_desc}
                                showToolbar={true}
                                setDefaultStyle="height:200px"
                                onChange={(e)=>handleEditorChange(e,'terms_desc')}
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
                          <Box sx={{ mt: 2 }}>
                            <label>Footer description</label>
                              <SunEditor
                                id="details"
                                name="description"
                                setContents={values.footer_desc}
                                showToolbar={true}
                                setDefaultStyle="height:200px"
                                onChange={(e)=>handleEditorChange(e,'footer_desc')}
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
                         
                          <Box sx={{ mt: 2 }}>
                            <label>Other description 1</label>
                              <SunEditor
                                id="details"
                                name="description"
                                setContents={values.other1_desc}
                                showToolbar={true}
                                setDefaultStyle="height:200px"
                                onChange={(e)=>handleEditorChange(e,'other1_desc')}
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
                          <Box sx={{ mt: 2 }}>
                            <label>Other description 2</label>
                              <SunEditor
                                id="details"
                                name="description"
                                setContents={values.other2_desc}
                                showToolbar={true}
                                setDefaultStyle="height:200px"
                                onChange={(e)=>handleEditorChange(e,'other2_desc')}
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
          </Grid>
          <Box sx={{mt:3}} display='flex' justifyContent='center' justifyItems='center'>
            <Button variant='outlined' onClick={(e)=> handleUJpdate(e)}>Update</Button>
          </Box>
        </Card>
      </Container>

   <ToastContainer />
   
    </>
  );
}
