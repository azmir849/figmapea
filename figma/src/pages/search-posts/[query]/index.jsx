import { allcategoryUrl, allpostsUrl, searchPostUrl } from "@/utils/api/api";
import SEO from '@/src/common/seo';
import Blog from '@/src/components/blog';
import WrapperTwo from '@/src/layout/wrapper-2';


const index = ({ posts, categories, title}) => {
  return (
    <WrapperTwo categories={categories.categorys}>
      <SEO pageTitle={'Epora'} />
      <Blog title={title} posts={posts.posts} catPosts={posts.posts} categories={categories.categorys} />
    </WrapperTwo>
  );
};

export default index;

export async function getServerSideProps({params}) {

  const res = await fetch(`${searchPostUrl}/${params.query}`);
  const posts = await res.json();

  const catRes = await fetch(allcategoryUrl);
  const categories = await catRes.json()
  const title = params.query
  return {
    props: {
        posts,categories,title
    },
 };

}


