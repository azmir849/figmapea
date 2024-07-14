import React from "react";
import SEO from "../common/seo";
import Contact from "../components/contact";
import WrapperTwo from "../layout/wrapper-2";

const index = () => {
  return (
    <WrapperTwo>
      <SEO pageTitle={"Contact"} />
      <Contact />
    </WrapperTwo>
  );
};

export default index;
