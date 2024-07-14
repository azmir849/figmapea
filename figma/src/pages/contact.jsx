import React from "react";
import SEO from "../common/seo";
import Contact from "../components/contact";
import Wrapper2 from "../layout/wrapper-2";
import { allcategoryUrl, allpostsUrl } from "@/utils/api/api";

const index = ({ posts, categories}) => {
  return (
    <Wrapper2 categories={categories.categorys}>
      <SEO pageTitle={"Contact"} />
      <Contact />
    </Wrapper2>
  );
};

export default index;


// get all posts and categories
export async function getStaticProps() {
  const res = await fetch(allpostsUrl);
  const posts = await res.json();

  const catRes = await fetch(allcategoryUrl);
  const categories = await catRes.json()

  return {
      props: {
          posts,categories,
      },
      revalidate: 10,
  };
}
