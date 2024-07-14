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

const Category = () => {
  return (
    <>
      <div className="sidebar__widget mb-40">
        <h3 className="sidebar__widget-title mb-10">Tags</h3>
        <div className="sidebar__widget-content">
          <ul>
            {category_data.map((item, i) => (
              <li key={i}>
                <Link href="/blog">
                  {item.category} <span>({item.blog_item})</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Category;
