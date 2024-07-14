const baseUrl = "http://127.0.0.1:8000";

//posts
const allpostsUrl = `${baseUrl}/api/front/all-posts`
const singlePostUrl = `${baseUrl}/api/front/single-posts`
const searchPostUrl = `${baseUrl}/api/front/search-posts`


//categories
const allcategoryUrl = `${baseUrl}/api/front/categorys`

// tag header and filter posts (id nedded)
const tagpostsUrl = `${baseUrl}/api/front/category-tag-posts`
const headerpostsUrl = `${baseUrl}/api/front/category-header-posts`
const filterpostsUrl = `${baseUrl}/api/front/category-filter-posts`


//subscribe 
const subscribeUrl = `${baseUrl}/api/front/subscribe`

//contact
const contactUrl = `${baseUrl}/api/front/contact`

//commets
const commentUrl =`${baseUrl}/api/front/comments`

// setting 
const settingUrl = `${baseUrl}/api/front/setting`



export {
  baseUrl,

  allpostsUrl,
  singlePostUrl,
  searchPostUrl,

  allcategoryUrl,

  tagpostsUrl,
  headerpostsUrl,
  filterpostsUrl,

  subscribeUrl,

  contactUrl,
  commentUrl,

  settingUrl
};
