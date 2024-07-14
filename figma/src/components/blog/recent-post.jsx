import { baseUrl } from "@/utils/api/api";
import Link from "next/link";
import React from "react";

// recent_post data
const recent_post = [
  {
    id: 1,
    img: "/assets/img/blog/sidebar/blog-sm-1.jpg",
    date: "21 Jan 2022",
    title: "Seamlessly monetize centa material bleeding.",
  },
  {
    id: 2,
    img: "/assets/img/blog/sidebar/blog-sm-2.jpg",
    date: "12 February. 2022",
    title: "How often should you schedule professional",
  },
  {
    id: 3,
    img: "/assets/img/blog/sidebar/blog-sm-3.jpg",
    date: "14 January. 2022",
    title: "How to keep your institue and home Safe",
  },
];

const RecentPost = ({posts}) => {
  return (
    <>
      <div className="sidebar__widget mb-55">
        <h3 className="sidebar__widget-title mb-25">Recent Post</h3>
        <div className="sidebar__widget-content">
          <div className="sidebar__post rc__post">
            {posts && posts.length>0 &&  posts.slice(0,5).map((post) => { 
                const getDate = new Date(post.created_at);
                  const options = {  year: 'numeric', month: 'short', day: 'numeric' };
                  const postDate = getDate.toLocaleDateString('en-US', options)

              return(
                <div
                key={post.id}
                className="rc__post mb-20 d-flex align-items-center"
              >
                <div className="rc__post-thumb">
                  <Link  href={`/post/${post?.slug}/${post.id}`}>
                    <img src={`${baseUrl}/storage/${post?.image}`} alt={post?.title} />
                  </Link>
                </div>
                <div className="rc__post-content">
                  <h3 className="rc__post-title">
                    <Link href={`/post/${post?.slug}/${post.id}`}>{post.title}</Link>
                  </h3>
                  <div className="rc__meta">
                    <span>{postDate}</span>
                  </div>
                </div>
              </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default RecentPost;
