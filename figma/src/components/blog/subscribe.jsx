import { errorNotify, successNotify } from "@/src/common/Toast";
import { subscribeUrl } from "@/utils/api/api";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";

const Subscribe = () => {
  const [email, setEmail] = useState('')
  // handlesubscribe
  const handleSubscripe =(e)=>{
    e.preventDefault();
    console.log('hit')
    if(email.length<4){
      errorNotify('Invalid email!. Please give a valid email!.')
    }else{
      var formdata = new FormData();
      formdata.append("email", email);
      
      var requestOptions = {
        method: 'POST',
        body: formdata
      };
      
      fetch(subscribeUrl, requestOptions)
        .then(result => {
          successNotify('Subscription Success!')
          setEmail('')
        })
        .catch(error => errorNotify('Invalid email!. Please give a valid email!.'));
    }
  }

  return (
    <>
      <div className="sidebar__widget mb-55">
        <div className="sidebar__widget-content">
          {/* <h3 className="sidebar__widget-title mb-10 text-center">Subscribe to domainname.com</h3> */}
          <p className="sidebar__widget-title mb-60 text-center">Get the latest posts delivered right to your inbox</p>
          <div className="sidebar__search">
            <form  onSubmit={(e) =>handleSubscripe(e)}>
              <div className="sidebar__search-input-2">
                <input type="text" placeholder="email@example.com" value={email} onChange={(e)=> setEmail(e.target.value)} />
                <button type="submit">
                  Subscribe
                  {/* <i className="far fa-submit"></i> */}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Subscribe;
