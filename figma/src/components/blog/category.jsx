import Link from "next/link";
import React from "react";

// category_data
const category_data = [
  {
    category: "Dashboards",
    blog_item: "14",
  },
  {
    category: "Landing Pages",
    blog_item: "14",
  },
  {
    category: "Mockups",
    blog_item: "19",
  },
  {
    category: "Illustrations",
    blog_item: "19",
  },
  {
    category: "UI Kits",
    blog_item: "19",
  },
  {
    category: "Icons",
    blog_item: "19",
  },
  {
    category: "Charts",
    blog_item: "19",
  },
  {
    category: "Maps",
    blog_item: "19",
  },
  {
    category: "Multimedia",
    blog_item: "19",
  },
  
];

const Category = ({categories}) => {
  return (
    <>
      <div className="sidebar__widget mb-40">
        <h3 className="sidebar__widget-title mb-10">Tags</h3>
        <div className="sidebar__widget-content">
          <ul>
            {categories && categories.length>0 &&  categories.map((cat, i) =>{
              if(cat?.category_position ==='tag'){
                return(
                  <li key={i}>
                    <Link href={`/category/${cat.category_slug}/${cat.id}`}>
                      {cat?.category_name} <span>({cat?.count_posts})</span>
                    </Link>
                  </li>
                 )
               }
              }
             )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Category;
