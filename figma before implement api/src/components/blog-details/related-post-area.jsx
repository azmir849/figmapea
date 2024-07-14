import our_course_data from "@/src/data/our-course-data";
import Link from "next/link";
import React from "react";

const RelatedPostArea = () => {
  return (
    <>
      <section className="course-area mb-80">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-title mb-65">
                <h2 className="tp-section-title mb-20">Related Posts</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {our_course_data.slice(0, 3).map((item, i) => (
              <div key={i} className="col-xl-4 col-lg-6 col-md-6">
                <div
                  className="tpcourse mb-40 wow fadeInUp"
                  data-wow-duration=".8s"
                  data-wow-delay=".3s"
                >
                  <div className="tpcourse__thumb p-relative w-img fix">
                    <Link href={item.course_link}>
                      <img src={item.img} alt="course-thumb" />
                    </Link>
                  </div>
                  <div className="tpcourse__content-2">
                    <div className="tpcourse__category mb-10">
                      <ul className="tpcourse__price-list d-flex align-items-center">
                        <li>
                          <Link
                            className={item.ct_color}
                            href={item.course_link}
                          >
                            Website
                          </Link>
                        </li>
                        
                      </ul>
                    </div>
                    <div className="tpcourse__ava-title mb-15">
                      <h4 className="tpcourse__title tp-cours-title-color">
                        <Link href={item.course_link}>{item.title}</Link>
                      </h4>
                    </div>
                    <div className="tpcourse__meta-gap pb-15 mb-15">
                      <ul className="d-flex align-items-center">
                        <li>
                          <span>20 July 2023</span>
                        </li>
                        <li>
                          <span>2 mins to read</span>
                        </li>
                      </ul>
                    </div>
                    
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default RelatedPostArea;
