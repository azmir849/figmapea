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

const Tags = () => {
  return (
    <>
      <div className="sidebar__widget mb-40">
        <h3 className="sidebar__widget-title mb-30">Filter By</h3>
        <div className="sidebar__widget-content">
          <div className="tagcloud">
            {tags.map((item, i) => (
              <Link key={i} href="#">
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Tags;
