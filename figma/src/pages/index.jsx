import { allcategoryUrl, allpostsUrl } from "@/utils/api/api";
import SEO from "../common/seo";
import Blog from "../components/blog";
import Home from "../components/homes/home";
import Wrapper2 from "../layout/wrapper-2";
import CookieConsent from "react-cookie-consent";


const index = ({ posts, categories}) => {
  return (
    <Wrapper2 categories={categories.categorys}>
      <SEO pageTitle={'Epora'} />
      <Blog title='null' posts={posts.posts} catPosts={posts.posts} categories={categories.categorys} />
      
      <CookieConsent>This website uses cookies to enhance the user experience.</CookieConsent>
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

