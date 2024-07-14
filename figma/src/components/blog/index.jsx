
import React from "react";
import Breadcrumb from "../bredcrumb/breadcrumb";
import CounterArea from "../homes/home-3/counter-area";
import Postbox from "./postbox";

const Blog = ({title, posts, catPosts,categories}) => {
   
  return (
    <>
      <Breadcrumb title={title?title:'null'} subtitle="blog" />
      <Postbox posts={posts} catPosts={catPosts} categories={categories} />
      {/* <CounterArea /> */}
    </>
  );
};

export default Blog;
