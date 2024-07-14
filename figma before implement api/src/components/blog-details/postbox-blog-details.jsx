import comments_data from "@/src/data/comments-data";
import Link from "next/link";
import React from "react";
import BlogSearch from "../blog/blog-search";
import Category from "../blog/category";
import RecentPost from "../blog/recent-post";
import Tags from "../blog/tags";
import PostComment from "../form/post-comment";
import Features from "@/src/common/features";
import RelatedPostArea from "./related-post-area";
import Subscribe from "../blog/subscribe";
import Image from "next/image";
const PostboxBlogDetails = () => {
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
                    <Link href="/blog-details">
                      <Image src="/assets/img/blog/blog-in-1.jpg" alt="" width='100' height='100' />
                    </Link>
                  </div>
                  <div className="postbox__content">
                    <div className="postbox__meta">
                      <span>
                        <i className="fi fi-rr-calendar"></i> July 21, 2020
                      </span>
                      <span>
                        <a href="#">
                          <i className="fi fi-rr-user"></i> 5 mins to read
                        </a>
                      </span>
                      
                    </div>
                    <h3 className="postbox__title">
                      How to Succeed in the aws Certified Developer Associate
                      Exam
                    </h3>
                    <div className="postbox__text">
                      <p>
                        Nancy boy Charles down the pub get stuffed mate easy
                        peasy brown bread car boot squiffy loo, blimey arse over
                        tit it's your round cup of char horse play chimney pot
                        old. Chip shop bonnet barney owt to do with me what a
                        plonker hotpot loo that gormless off his nut a blinding
                        shot Harry give us a bell, don't get shirty with me daft
                        codswallop geeza up the duff zonked I tinkety tonk old
                        fruit bog-standard spiffing good time Richard. Are you
                        taking the piss young delinquent wellies absolutely
                        bladdered the BBC Eaton my good sir, cup of tea spiffing
                        bleeder David mufty you mug{" "}
                        <span>cor blimey guvnor, burke bog-standard brown</span>{" "}
                        bread wind up barney. Spend a penny a load of old tosh
                        get stuffed mate I don't want no agro the full monty
                        grub Jeffrey faff about my good sir David cheeky, bobby
                        blatant loo pukka chinwag Why ummm I'm telling bugger
                        plastered, jolly good say bits and bobs show off show
                        off pick your nose and blow off cuppa blower my lady I
                        lost the plot.
                      </p>
                      <div className="postbox__tag tagcloud">
                        <span>Author:</span>
                        <a href="#">ah official</a>
                      </div>



                      <div className="row">
                        <div className="col-lg-12">
                          <div className="blog-btn text-center">
                            <div className="load-btn m-5">
                              Live Preview
                            </div>
                          </div>
                        </div>
                      </div>

                     

                      <h3>Preview-1</h3>
                      <hr></hr>
                      <p>
                        <img src="/assets/img/blog/blog-in-4.jpg" alt="" />
                      </p>
                      <h3>Preview-2</h3>
                      <hr></hr>
                      <p>
                        <img src="/assets/img/blog/blog-in-4.jpg" alt="" />
                      </p>
                      <h3>Preview-12</h3>
                      <hr></hr>
                      <p>
                        <img src="/assets/img/blog/blog-in-4.jpg" alt="" />
                      </p>

                      
                    </div>




                    <Features />

                    <div className="row">
                        <div className="col-lg-12">
                          <div className="blog-btn text-center">
                            <div className="load-btn m-4">
                              Live Preview
                            </div>
                            <div className="load-btn m-4">
                              Get The Figma File
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
                <Category />
                <Tags />
                <RecentPost />
              </div>



              <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12">
                <div className="sidebar__wrapper">
                  <Subscribe />
                </div>
              </div>
            </div>


            <RelatedPostArea /> 
          </div>
        </div>
      </div>
    </>
  );
};

export default PostboxBlogDetails;
