
import React from "react";
import Breadcrumb from "../bredcrumb/breadcrumb";
import CounterArea from "../homes/home-3/counter-area";
import PostboxBlogDetails from "./postbox-blog-details";

const BlogDetails = ({posts,categories,post,comments, relatedPosts}) => {
  return (
    <>
      {/* <Breadcrumb title="Blog Details" subtitle="Blog Details" isDbbl="Blog" /> */}
      <PostboxBlogDetails  posts={posts} categories={categories} post={post} comments={comments} relatedPosts={relatedPosts} />
      {/* <CounterArea /> */}
    </>
  );
};

export default BlogDetails;
