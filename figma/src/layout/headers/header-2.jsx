import useSticky from '@/hooks/use-sticky';
import Link from 'next/link';
import React, {useEffect, useState} from 'react';
import NavMenu from './nav-menu';
import Sidebar from './sidebar';
import { allcategoryUrl } from '@/utils/api/api';
import BlogSearch from '@/src/components/blog/blog-search';

import { useRouter } from 'next/router';
// category_data
const category_data = [
    {title: "Bangla Medium"},
    {title: "English Medium"},
    {title: "Video Edition"},
    {title: "Logo Design"},
    {title: "Francy Medium"},
  
  ]

const HeaderTwo = ({categories}) => {
   const router = useRouter();
   const {sticky} = useSticky()
   const [isActive, setIsActive] = useState(false);
   const [showSearch, setShowSearch] = useState(false)

   const [searchValue, setSearchValue] = useState(null)

   const getUrl =  router.asPath;
   const segName1 = getUrl.split("/").pop();
   const segName2 = getUrl.split("/")
 

   useEffect(()=>{
      if(segName2[1] ==='search-posts'){
         setSearchValue(segName1)
         setShowSearch(true)
      }
   },[getUrl])



    return (
        <>
    <header className="header_white_area d-none d-xl-block">
      <div className="header__area pt-40 pb-5">
         <div className="main-header">
            <div className="container">
               <div className="row align-items-center justify-content-between">
                  <div className="col-xxl-7 col-xl-6 col-lg-6 col-md-5 col-6">
                     <div className="logo-area d-flex align-items-center">
                        <div className="logo">
                           <Link href="/">
                              <img src="/assets/img/logo/logo-black.png" alt="logo" />
                           </Link>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <div className={`header-menu-area ${sticky ? "header-sticky" : ""}`} id="header-sticky">
         <div className="container">
            <div className="row">
               <div className="col-xxl-9 col-xl-9 col-lg-6 text-start">
                  <div className="main-menu main-menu-white">
                     <nav id="mobile-menu">
                        <NavMenu categories={categories} />
                     </nav>
                  </div>
               </div>
               <div className="col-xxl-3 col-xl-3 col-lg-6 d-flex align-items-center justify-content-end">
                  <div className="header-meta-green">
                     <ul>
                        <li><Link href="/sign-in"><i className="fab fa-facebook-f"></i></Link></li>
                        {/* <li><Link href="/cart"><i className="fab fa-twitter"></i></Link></li> */}
                        {showSearch ===false && <li onClick={(e)=> setShowSearch(true)}><a><i className="fi fi-rr-search"></i></a></li>}
                        <li><a href="#" className="tp-menu-toggle d-xl-none"><i className="icon_ul"></i></a></li>
                     </ul>
                  </div>
                  {showSearch ===true && <BlogSearch generateValue={searchValue} />}
                  
               </div>
            </div>
         </div>
      </div>
   </header>

   <div id="header-mob-sticky" className={`mobile-header-area mob-white-sticky d-xl-none ${sticky ? "header-sticky" : ""}`}>
      <div className="container">
         <div className="row align-items-center">
            <div className="col-md-6 col-5">
               <div className="logo">
                  <Link href="/">
                     <img src="/assets/img/logo/logo-black.png" alt="logo" />
                  </Link>
               </div>
            </div>
            <div className="col-md-6 col-7 d-flex align-items-center justify-content-end">
               <div className="header-meta-green text-end">
                  <ul>
                     <li><Link href="/sign-in"><i className="fi fi-rr-user"></i></Link></li>
                     <li><Link href="/cart"><i className="fi fi-rr-shopping-bag"></i></Link></li>
                     <li><a href="#"  onClick={() => setIsActive(true)} className="tp-menu-toggle d-xl-none"><i className="icon_ul"></i></a></li>
                  </ul>
               </div>
            </div>
         </div>
      </div>
   </div>

         <Sidebar isActive={isActive} setIsActive={setIsActive} categories={categories} />
        </>
    );
};

export default HeaderTwo;

