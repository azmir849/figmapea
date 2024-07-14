import Link from "next/link";
import React from "react";

//  tags data
const tags = [
  { name: "Creative" },
  { name: "Consultant" },
  { name: "Technology" },
  { name: "Social Media" },
  { name: "Photography" },
  { name: "Music" },
  { name: "Ecommerce" },
  { name: "Food" },
  { name: "Travel" },
  { name: "News" },
  { name: "Crypto" },
  { name: "Real Estate" },
];

const Tags = ({categories}) => {
  return (
    <>
      <div className="sidebar__widget mb-40">
        <h3 className="sidebar__widget-title mb-30">Filter By</h3>
        <div className="sidebar__widget-content">
          <div className="tagcloud">
            {categories && categories.length>0 &&  categories.map((cat, i) =>{
              if(cat?.category_position ==='filter'){
                return(
                  <Link key={i} href={`/category-filter/${cat.category_slug}/${cat.id}`}>
                    {cat?.category_name}
                  </Link>
                )
              }
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Tags;
