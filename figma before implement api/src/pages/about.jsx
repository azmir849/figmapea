import React from "react";
import SEO from "../common/seo";
import About from "../components/about";
import WrapperTwo from "../layout/wrapper-2";

const index = () => {
  return (
    <WrapperTwo>
      <SEO pageTitle={"About"} />
      <About />
    </WrapperTwo>
  );
};

export default index;
