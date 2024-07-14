import SEO from '@/src/common/seo';
import Blog from '@/src/components/blog';
import WrapperTwo from '@/src/layout/wrapper-2';
import { allcategoryUrl, allpostsUrl, tagpostsUrl } from '@/utils/api/api';
import React from 'react';

const index = ({posts,catposts, allCats,title}) => {
    return (
        <WrapperTwo categories={allCats.categorys}>
           <SEO pageTitle={"Blog"} />
           <Blog title={title}  posts={posts.posts} catPosts={catposts.posts} categories={allCats.categorys} />
        </WrapperTwo>
    );
};

export default index;

export async function getStaticProps({ params }) {
   
    const resPosts = await fetch(allpostsUrl);
    const posts = await resPosts.json();

    const res = await fetch(`${tagpostsUrl}/${params.id}`);
    const catposts = await res.json();

  
    const catRes = await fetch(allcategoryUrl);
    const allCats = await catRes.json()
    const title = params.name

    return {
        props: {
            posts,catposts,allCats,title
        },
    };
}

export async function getStaticPaths() {
    const res = await fetch(allcategoryUrl);
    const categories = await res.json();
    // console.log('posts', posts)
    const paths = [];
    categories.categorys.forEach((cat) => paths.push(`/category/${cat.category_slug}/${cat.id}`));

    return {
        paths,
        fallback: true,
    };
}
