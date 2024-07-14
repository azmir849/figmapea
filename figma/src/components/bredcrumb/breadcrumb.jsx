import Link from "next/link";
import React from "react";

const Breadcrumb = ({ title, subtitle, isDbbl = "" }) => {
  return (
    <section
      className="breadcrumb__area include-bg pt-30"
      // style={{
      //   backgroundImage: `url(/assets/img/breadcrumb/breadcrumb-bg-1.jpg)`,
      // }}
    >
      <div className="container">
        <div className="row">
          <div className="col-xxl-12">
            <div className="breadcrumb__content p-relative z-index-1">
            {title !=='null' && <h3 className="breadcrumb__title mb-20">Posts of {title}</h3>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Breadcrumb;
