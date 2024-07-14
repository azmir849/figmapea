import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
const BlogSearch = ({generateValue}) => {
  const [searchValue, setSearchValue] = useState('')
  const router = useRouter();

  useEffect(()=>{
    if(generateValue !==null){
      setSearchValue(generateValue)
    }
  },[])

  const handleSearch =(e)=>{
    e.preventDefault();
    if(searchValue.length>1){
      router.push({
        pathname: `/search-posts/${searchValue}`
      });
    }else{
      alert('Search content must be greater than 3 characters')
    }
  }
  return (
    <>
      <div className="sidebar__widget ml-5 ">
        <div className="sidebar__widget-content">
          {/* <h3 className="sidebar__widget-title mb-25">Search</h3> */}
          <div className="sidebar__search">
            <form  onSubmit={(e) => handleSearch(e)}>
              <div className="sidebar__search-input-2">
                <input value={searchValue} type="text" placeholder="Search..." onChange={(e)=> setSearchValue(e.target.value)} />
                <button type="submit">
                  <i className="far fa-search"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogSearch;
