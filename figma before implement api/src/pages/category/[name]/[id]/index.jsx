import SEO from '@/src/common/seo';
import Blog from '@/src/components/blog';
import WrapperTwo from '@/src/layout/wrapper-2';
import React from 'react';

const index = () => {
    return (
        <WrapperTwo>
           <SEO pageTitle={"Blog"} /> 
           <Blog />
        </WrapperTwo>
    );
};

export default index;