import { errorNotify, successNotify } from "@/src/common/Toast";
import { commentUrl } from "@/utils/api/api";
import React, { useState } from "react";

const PostComment = ({postId ,parentId }) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // handle contact
  const handleComment = (e) => {
    e.preventDefault();
    var formdata = new FormData();
    formdata.append("parent_id", parentId);
    formdata.append("name", data.name);
    formdata.append("email", data.email);
    formdata.append("comment", data.message);

    var requestOptions = {
      method: "POST",
      body: formdata,
    };

    fetch(`${commentUrl}/${postId}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log()
        successNotify(result?.message)
        setData({
          name: "",
          email: "",
          message: "",
        })
      })
      .catch((error) => errorNotify(error?.message[0]));
  };

  return (
    <>
      <div className='postbox__comment-form'>
        <h3 className='postbox__comment-form-title'>Write a comment</h3>
        <form onSubmit={(e) => handleComment(e)}>
          <div className='row'>
            <div className='col-xxl-6 col-xl-6 col-lg-6'>
              <div className='postbox__comment-input'>
                <input
                  name='name'
                  type='text'
                  placeholder='Your Name'
                  value={data.name}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className='col-xxl-6 col-xl-6 col-lg-6'>
              <div className='postbox__comment-input'>
                <input
                  name='email'
                  type='email'
                  placeholder='Your Email'
                  value={data.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className='col-xxl-12'>
              <div className='postbox__comment-input'>
                <textarea
                  name="message"
                  placeholder='Enter your comment ...'
                  value={data.message}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>
            <div className='col-xxl-12'>
              <div className='postbox__comment-btn'>
                <button type='submit' className='tp-btn'>
                  Post Comment
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default PostComment;
