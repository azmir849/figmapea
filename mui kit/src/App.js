import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import "suneditor/dist/css/suneditor.min.css";
import { useEffect, useState } from 'react';
import Context from './context/context';
// ----------------------------------------------------------------------

export default function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState('');

  useEffect(()=>{
    const getToken = sessionStorage.getItem('token')
    const getUser = sessionStorage.getItem('user')
    if(getToken){
      setToken(getToken)
    }
    if(getUser){
      setUser(JSON.parse(getUser))
    }
  },[])

  return (
    <Context.Provider value={{token,setToken,user, setUser}}>
      <HelmetProvider>
        <BrowserRouter>
          <ThemeProvider>
            <ScrollToTop />
            <StyledChart />
            <Router />
          </ThemeProvider>
        </BrowserRouter>
      </HelmetProvider>
    </Context.Provider>

  );
}
