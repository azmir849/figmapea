import SEO from '@/src/common/seo';
import BlogDetails from '@/src/components/blog-details';
import WrapperTwo from '@/src/layout/wrapper-2';
import React from 'react';


const index = () => {
    return (
        <WrapperTwo>
            <SEO pageTitle={"Blog Details"} />
            <BlogDetails />
        </WrapperTwo>
    );
};

export default index;