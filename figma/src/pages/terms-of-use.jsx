import React from "react";
import SEO from "../common/seo";
import About from "../components/about";
import WrapperTwo from "../layout/wrapper-2";
import { allcategoryUrl, allpostsUrl, settingUrl } from "@/utils/api/api";

const index = ({ posts, categories,settingData}) => {
  return (
    <WrapperTwo categories={categories.categorys}>
      <SEO pageTitle={"Terms of Use"} />
      <About pageTitle={"Terms of Use"} settingData={settingData} />
    </WrapperTwo>
  );
};

export default index;

// get all posts and categories
export async function getStaticProps() {
  const res = await fetch(allpostsUrl);
  const posts = await res.json();

  const catRes = await fetch(allcategoryUrl);
  const categories = await catRes.json()

  const settingRes = await fetch(settingUrl);
  const settingData = await settingRes.json()

  return {
      props: {
          posts,categories,settingData
      },
      revalidate: 10,
  };
}