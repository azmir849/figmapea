import SEO from "../common/seo";
import Blog from "../components/blog";
import Home from "../components/homes/home";
import Wrapper2 from "../layout/wrapper-2";


const index = () => {
  return (
    <Wrapper2>
      <SEO pageTitle={'Epora'} />
      <Blog />
    </Wrapper2>
  );
};

export default index;