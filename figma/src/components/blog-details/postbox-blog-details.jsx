import comments_data from "@/src/data/comments-data";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import BlogSearch from "../blog/blog-search";
import Category from "../blog/category";
import RecentPost from "../blog/recent-post";
import Tags from "../blog/tags";
import PostComment from "../form/post-comment";
import Features from "@/src/common/features";
import RelatedPostArea from "./related-post-area";
import Subscribe from "../blog/subscribe";
import Image from "next/image";
import { baseUrl } from "@/utils/api/api";
import parser from 'html-react-parser'
import Avatar from 'react-avatar';

import {
  FacebookIcon,
  FacebookMessengerIcon,
  LinkedinIcon,
  PinterestIcon,
  TelegramIcon,
  TwitterIcon,
  ViberIcon,
  WhatsappIcon,
  EmailIcon,
  FacebookShareButton,
  InstapaperShareButton,
  InstapaperIcon,
  LinkedinShareButton,
  PinterestShareButton,
  TwitterShareButton,
  WhatsappShareButton
} from "react-share";
import { useRouter } from "next/router";

const PostboxBlogDetails = ({posts, categories, post,comments, relatedPosts}) => {
  const router = useRouter();
  const getDate = new Date(post?.created_at);
  const options = {  year: 'numeric', month: 'short', day: 'numeric' };
  const postDate = getDate?.toLocaleDateString('en-US', options)

  const [count, setCount] = useState(0)
  const [parentId, setParentId] = useState(0)

  const shareUrl = router.asPath;
  
  useEffect(()=>{
    var hits=0;
    if(comments && comments.length>0){
      comments.forEach(element => {
        if(element.status===1){
          hits = hits+1;
        }
      });
    }
    setCount(hits)
  },[comments])



  return (
    <>
      <div
        className="postbox__area pt-50 pb-120 wow fadeInUp"
        data-wow-duration=".8s"
        data-wow-delay=".2s"
      >
        <div className="container">
          <div className="row">
            <div className="col-xxl-8 col-xl-8 col-lg-7 col-md-12">
              <div className="postbox__wrapper pr-20">
                <article className="postbox__item format-image mb-60 transition-3">
                  <div className="postbox__thumb w-img mb-30">
                    <Link href={`/post/${post?.slug}/${post.id}`}>
                       <img src={`${baseUrl}/storage/${post?.image}`}  alt={post?.title} />
                    </Link>
                  </div>
                  <div className="postbox__content">
                    <div className="postbox__meta">
                      <span>
                        <i className="fi fi-rr-calendar"></i> {postDate}
                      </span>
                      <span>
                        <a href="#">
                          <i className="fi fi-rr-user"></i> {post?.read_time} mins to read
                        </a>
                      </span>
                      
                    </div>
                    {post?.title && <h3 className="postbox__title">{post.title}</h3>} 
                    <div className="postbox__text">
                      {post?.description && <p>{parser(post?.description)}</p>}
                      <div className="postbox__tag tagcloud">
                        <span>Author:</span>
                        {(post?.author_name && post?.author_url !=="null")?<a href={post.author_url}>{post?.author_name}</a>
                        :<a>{post?.author_name}</a>
                        }
                         
                      </div>



                      <div className="row">
                        <div className="col-lg-12">
                          <div className="blog-btn text-center">
                          <Link href={post?.preview_url}><div className="load-btn m-5" > Live Preview</div></Link>
                          </div>
                        </div>
                      </div>

                     
                      {(post?.preview_title_1 !=='null' && post?.preview_image_1 !=='null') && 
                        <>
                          <h3>{post?.preview_title_1}</h3>
                          <hr></hr>
                          <p>
                            <img src={`${baseUrl}/storage/${post.preview_image_1}`} alt={post?.preview_title_1} />
                          </p>
                        </>
                      }
                      {(post?.preview_title_2 !=='null' && post?.preview_image_2 !=='null') && 
                        <>
                          <h3>{post?.preview_title_2}</h3>
                          <hr></hr>
                          <p>
                            <img src={`${baseUrl}/storage/${post.preview_image_2}`} alt={post?.preview_title_2} />
                          </p>
                        </>
                      }
                      {(post?.preview_title_3 !=='null' && post?.preview_image_3 !=='null') && 
                        <>
                          <h3>{post?.preview_title_3}</h3>
                          <hr></hr>
                          <p>
                            <img src={`${baseUrl}/storage/${post.preview_image_3}`} alt={post?.preview_title_3} />
                          </p>
                        </>
                      }
                      {(post?.preview_title_4 !=='null' && post?.preview_image_4 !=='null') && 
                        <>
                          <h3>{post?.preview_title_4}</h3>
                          <hr></hr>
                          <p>
                            <img src={`${baseUrl}/storage/${post.preview_image_4}`} alt={post?.preview_title_4} />
                          </p>
                        </>
                      }
                      {(post?.preview_title_5 !=='null' && post?.preview_image_5 !=='null') && 
                        <>
                          <h3>{post?.preview_title_5}</h3>
                          <hr></hr>
                          <p>
                            <img src={`${baseUrl}/storage/${post.preview_image_5}`} alt={post?.preview_title_5} />
                          </p>
                        </>
                      }
                      {(post?.preview_title_6 !=='null' && post?.preview_image_6 !=='null') && 
                        <>
                          <h3>{post?.preview_title_6}</h3>
                          <hr></hr>
                          <p>
                            <img src={`${baseUrl}/storage/${post.preview_image_6}`} alt={post?.preview_title_6} />
                          </p>
                        </>
                      }
                      {(post?.preview_title_7 !=='null' && post?.preview_image_7 !=='null') && 
                        <>
                          <h3>{post?.preview_title_7}</h3>
                          <hr></hr>
                          <p>
                            <img src={`${baseUrl}/storage/${post.preview_image_7}`} alt={post?.preview_title_7} />
                          </p>
                        </>
                      }
                      {(post?.preview_title_8 !=='null' && post?.preview_image_8 !=='null') && 
                        <>
                          <h3>{post?.preview_title_8}</h3>
                          <hr></hr>
                          <p>
                            <img src={`${baseUrl}/storage/${post.preview_image_8}`} alt={post?.preview_title_8} />
                          </p>
                        </>
                      }
                      {(post?.preview_title_9 !=='null' && post?.preview_image_9 !=='null') && 
                        <>
                          <h3>{post?.preview_title_9}</h3>
                          <hr></hr>
                          <p>
                            <img src={`${baseUrl}/storage/${post.preview_image_9}`} alt={post?.preview_title_9} />
                          </p>
                        </>
                      }
                      {(post?.preview_title_10 !=='null' && post?.preview_image_10 !=='null') && 
                        <>
                          <h3>{post?.preview_title_10}</h3>
                          <hr></hr>
                          <p>
                            <img src={`${baseUrl}/storage/${post.preview_image_10}`} alt={post?.preview_title_10} />
                          </p>
                        </>
                      }
                      {(post?.preview_title_11 !=='null' && post?.preview_image_11 !=='null') && 
                        <>
                          <h3>{post?.preview_title_11}</h3>
                          <hr></hr>
                          <p>
                            <img src={`${baseUrl}/storage/${post.preview_image_11}`} alt={post?.preview_title_11} />
                          </p>
                        </>
                      }
                      {(post?.preview_title_12 !=='null' && post?.preview_image_12 !=='null') && 
                        <>
                          <h3>{post?.preview_title_12}</h3>
                          <hr></hr>
                          <p>
                            <img src={`${baseUrl}/storage/${post.preview_image_12}`} alt={post?.preview_title_12} />
                          </p>
                        </>
                      }
                    </div>




                    <Features post={post} />

                    <div className="row">
                        <div className="col-lg-12">
                          <div className="blog-btn text-center">
                            <div className="load-btn m-4">
                              <Link href={post?.preview_url}> Live Preview</Link>
                            </div>
                            <div className="load-btn m-4">
                              <Link href={post?.file_url}>Get The Figma File</Link>
                            </div>
                            {/* <div className="load-btn m-4">
                              Gif Preview
                            </div> */}
                          </div>
                        </div>
                      </div>

                      

                   
                  </div>
                </article>
              </div>
            </div>
            

            {/* sidebar */}
            <div className="col-xxl-4 col-xl-4 col-lg-5 col-md-12">
              <div className="sidebar__wrapper">
                {/* <BlogSearch /> */}
                <Category categories={categories} />
                <Tags categories={categories} />
                <RecentPost  posts={posts} />
              </div>



              <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12">
                <div className="sidebar__wrapper">
                  <Subscribe />
                </div>
              </div>
            </div>

            {/* share icons */}
            <div className="d-flex justify-content-center">
              <div className="mt-20">
                <FacebookShareButton style={{margin:'3px'}} url={shareUrl}><FacebookIcon size={32} round={true} /></FacebookShareButton>
                <LinkedinShareButton style={{margin:'3px'}} url={shareUrl}><LinkedinIcon size={32} round={true} /></LinkedinShareButton>
                <PinterestShareButton style={{margin:'3px'}} url={shareUrl}><PinterestIcon size={32} round={true} /></PinterestShareButton>
                <TwitterShareButton style={{margin:'3px'}} url={shareUrl}><TwitterIcon size={32} round={true} /></TwitterShareButton>
                <WhatsappShareButton style={{margin:'3px'}} url={shareUrl}><WhatsappIcon size={32} round={true} /></WhatsappShareButton>
              </div>
            </div>
           

            <div className="postbox__comment mb-45">
                 {count>0 && <h3 className="postbox__comment-title">{count} Comments</h3>}
                  <ul>
                    {comments && comments.length>0 &&  comments.map((item, i) =>{
                      if(item.status ===1){
                        return(
                        <li key={i} className={item?.parent_id===0?'':'children'}>
                          <div className="postbox__comment-box grey-bg">
                            <div className="postbox__comment-info d-flex">
                              <div className="postbox__comment-avater mr-20">
                                {/* <img src={''} alt=""/> */}
                                <Avatar name={item?.name} size="50" round='50px' />
                              </div>
                              <div className="postbox__comment-name">
                                <h5>{item.name}</h5>
                                <span className="post-meta">{new Date(item.created_at).toLocaleDateString()}</span>
                              </div>
                            </div>
                            <div className="postbox__comment-text ml-65">
                              <p>
                                {item.comment}
                              </p>
                              <div className="postbox__comment-reply">
                                {item?.parent_id===0 ?<a href="#replay" onClick={(e)=> setParentId(item.id)}>Reply</a>
                                :<a href="#replay" onClick={(e)=> setParentId(item.parent_id)}>Reply</a>}
                               
                              </div>
                            </div>
                          </div>
                        </li>
                      )
                      }
                    }                       
                     
                      ) 
                    }                    
                  </ul>
            </div>
            <div id="replay">
              <PostComment postId ={post.id} parentId={parentId}  />
            </div>
            

            <RelatedPostArea relatedPosts={relatedPosts} /> 

          </div>
        </div>
      </div>
    </>
  );
};

export default PostboxBlogDetails;
