import blog_page_data from "@/src/data/blog-page-data";
import VideoPopup from "@/src/modals/video-popup";
import Link from "next/link";
import { useState, useRef } from "react";
import Slider from "react-slick";
import BlogSearch from "./blog-search";
import Category from "./category";
import RecentPost from "./recent-post";
import Tags from "./tags";
import Subscribe from "./subscribe";
const setting = {
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
};
const Postbox = () => {
  const sliderRef = useRef(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

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
              <div className="postbox__wrapper">
                {blog_page_data.map((item, i) => (
                  <div className="row blogcard__wrapper">
                    <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-12 blog-image">
                          <Link href="/blog-details">
                            <img src={'https://reactjsexample.com/content/images/2023/07/Code-2023-06-43-42.jpg'}  alt="" />
                          </Link>
                    </div>
                    <div className="col-xxl-7 col-xl-7 col-lg-7 col-md-12">
                        <article
                          key={i}
                          className="postbox__item format-image transition-3"
                        >
                          <div className="postbox__content">
                            <div className="blog-cat-name">
                              {/* <span>
                                <i className="fi fi-rr-calendar"></i> {item.date}
                              </span> */}
                              <span>
                                Website
                              </span>
                              {/* <span>
                                <Link href="#">
                                  <i className="fi fi-rr-user"></i> {item.user}
                                </Link>
                              </span>
                              <span>
                                <Link href="#">
                                  <i className="fi fi-rr-comments"></i>{" "}
                                  {item.comments}
                                </Link>
                              </span> */}
                            </div>
                            <h3 className="postbox__title">
                              <Link href="/blog-details">A react form wizard component with validation and progress bar.</Link>
                            </h3>
                            <div className="postbox__text">
                              <p>A Jewelry website built using React.A Jewelry website built using React.A Jewelry website built using React</p>
                            </div>
                            <div className="postbox__meta">
                              <span>
                                <i className="fi fi-rr-info"></i> 2 mins to read
                              </span>
                              <span>
                                <i className="fi fi-rr-calendar"></i> {item.date}
                              </span>
                            </div>
                            {/* <div className="postbox__read-more">
                              <Link href="/blog-details" className="tp-btn">
                                read more
                              </Link>
                            </div> */}
                          </div>
                        </article>
                    </div>
                  </div>
                ))}

                {/* pagination */}
                <div className="row">
                <div className="col-lg-12">
                  <div className="blog-btn text-center">
                    <div className="load-btn">
                      LOAD MORE
                    </div>
                  </div>
                </div>
              </div>


              </div>
            </div>
            <div className="col-xxl-4 col-xl-4 col-lg-5 col-md-12">
              <div className="sidebar__wrapper">
                {/* <BlogSearch /> */}
                <Category />
                <Tags />
                {/* <RecentPost /> */}
                
                {/* <Tags /> */}
              </div>

              <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12">
                <div className="sidebar__wrapper">
                  <RecentPost />
                </div>
              </div>
              <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12">
                <div className="sidebar__wrapper">
                  <Subscribe />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Postbox;
