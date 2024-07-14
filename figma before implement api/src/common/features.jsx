import Link from "next/link";
import React from "react";

// choose data 
const choose_data = {
title: "Key Features",
}
const {title,sub_title, des, experiences_years} = choose_data

// choose list data
const choose_list_data = [
  {
    list: "Increasing Your Learning Skills",
  },
  {
    list: "High Quality Video  & Audio Classes",
  },
  {
    list: "Finish Your Course, Get Certificate",
  },
  {
    list: "Finish Your Course, Get Certificate",
  },
  {
    list: "Finish Your Course, Get Certificate",
  },
  {
    list: "Finish Your Course, Get Certificate",
  },
  {
    list: "Finish Your Course, Get Certificate .Finish Your Course, Get Certificate. Finish Your Course, Get Certificate",
  },
];
const features = ({style_about, style_2}) => {
  return (
    <>
      <section
        className={`choose-area bg-bottom  wow fadeInUp`}
        data-wow-duration=".8s"
        data-wow-delay=".4s"
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-12 col-lg-12 col-md-12">
              <div className="tp-choose-content mb-30">
                <div className="section-title mb-25 mt-25">
                  <span className="tp-sub-title-box mb-15">{title}</span>
                </div>
                <div className="tp-choose-list tp-choose-bg mb-60">
                  <ul>
                    {choose_list_data.map((item, i) => (
                      <li key={i}>
                        <div className="tp-list-bg">
                          <i className="fa-light fa-check"></i>
                          {item.list}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          
          </div>
        </div>
      </section>
    </>
  );
};

export default features;
