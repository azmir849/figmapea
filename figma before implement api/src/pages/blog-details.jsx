import React from 'react';
import SEO from '../common/seo';
import BlogDetails from '../components/blog-details';
import WrapperTwo from '../layout/wrapper-2';

const index = () => {
    return (
        <WrapperTwo>
            <SEO pageTitle={"Blog Details"} />
            <BlogDetails />
        </WrapperTwo>
    );
};

export default index;