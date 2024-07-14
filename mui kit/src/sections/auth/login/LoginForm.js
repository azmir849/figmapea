import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import Context from 'src/context/context';
import { useForm } from 'react-hook-form';
import { loginUrl } from 'src/api';
import axios from 'axios';
import { notifyError, notifySuccess } from 'src/utils/Toast';
import { ToastContainer } from 'react-toastify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const {token,setToken,user, setUser} = useContext(Context)
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const defaultValues = {
    name: '',
    password:''
  };
  const methods = useForm({defaultValues});
  const {watch,setValue} = methods;
  const values = watch();


  const handleClick = () => {

    let data = new FormData();
      data.append('name', values.name);
      data.append('password', values.password);

      let config = {
        method: 'post',
        url: loginUrl,
        data : data
      };

      axios.request(config)
      .then((response) => {
        console.log('fddd',response?.data)
        if(response?.data?.token){
          sessionStorage.setItem('token', response?.data?.token)
        }
        if(response?.data?.user){
          sessionStorage.setItem('user',JSON.stringify(response?.data?.user))
        }

        console.log('fdsdf', response)
      

        if(response?.data?.success === true){
          window.location.href='/dashboard'
        }else{
          notifyError(response?.data?.message)
        }
      })
      .catch((error) => {
        notifyError('Invalid')
      });
  };


  return (
    <>
      <Stack spacing={3}>
        <TextField name="name" label="User Name" onChange={(e)=> setValue('name', e.target.value)} />

        <TextField
          onChange={(e)=> setValue('password', e.target.value)}
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>

      <ToastContainer />
    </>
  );
}
