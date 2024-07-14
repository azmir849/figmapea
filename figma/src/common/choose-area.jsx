import Link from "next/link";
import React from "react";

import parser from 'html-react-parser'

// choose data 
const choose_data = {
title: "Why Choose Us",
sub_title: "Why You Choose Our E-Pora Online learning",
des: <>React.js examples
A nice collection of often useful examples done in React.js.

On the whole, React.js examples is an embodiment of satisfying my own requirements with the idea of making it useful to the wider community of React developers.

Reactjsexamples's goal is to be the go-to website for developers looking for React libraries and open source projects to get their work done.

Contacts
Should you have any ideas for improvements, enquiry for partnerships or any other feedback, please don't hesitate to contact us. All ideas are more than welcome. Thanks!

Email:codetea</>,
  experiences_years: "23",


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
];
const ChooseArea = ({style_about, style_2, pageTitle, settingData}) => {

  console.log('pageTitle', pageTitle)
  console.log('settinpageTitlegData', settingData?.settings)
  return (
    <>
      <section
        className={`choose-area bg-bottom ${style_about ? "pb-120" : "grey-bg"} ${style_2 ? "pt-120 pb-90" : ""} wow fadeInUp`}
        data-wow-duration=".8s"
        data-wow-delay=".4s"
        style={{ backgroundImage: style_about ? null : `url(/assets/img/bg/shape-bg-1.png)`  }}
      >
        <div className="container mt-50 mb-200">
          <div className="row align-items-center">
            <div className="col-xl-12 col-lg-12 col-md-12">
              <div className="tp-choose-content mb-30">
                <div className="section-title mb-25">
                  <span className="tp-sub-title-box mb-15">{pageTitle}</span>
                  {pageTitle ==='About' && <>{parser(settingData?.settings?.about_desc)}</>}
                  {pageTitle ==='Privacy Policy' && <>{parser(settingData?.settings?.privacy_desc)}</>}
                  {pageTitle ==='Terms of Use' && <>{parser(settingData?.settings?.terms_desc)}</>}
                  {/* <p>{des}</p> */}
                </div>
              </div>
            </div>
           
          </div>
        </div>
      </section>
    </>
  );
};

export default ChooseArea;
