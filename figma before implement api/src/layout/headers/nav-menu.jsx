import Link from "next/link";
import React from "react";
import menu_data from "./menu-data";

const NavMenu = () => {
  return (
    <>
      <ul>
          <li className="has-dropdown">
            <Link href='/'>Home</Link>
          </li>
          <li className="has-dropdown">
            <Link href='/'>Websites</Link>
          </li>
          <li className="has-dropdown">
            <Link href='/' >Mobile Apps</Link>
          </li>
          <li className="has-dropdown">
            <Link href='/' >Icons & Illustrations</Link>
          </li>
          <li className="has-dropdown">
            <Link href='/' >Design & Wireframes </Link>
          </li>
          <li className="has-dropdown">
            <Link href='/' >Tools & Plugins </Link>
          </li>
       
      </ul>
    </>
  );
};

export default NavMenu;


{/* <ul>
{menu_data.map((item) => (
  <li key={item.id} className="has-dropdown">
    <Link href={item.link}>{item.title}</Link>
    <ul className="submenu">
      {item.sub_menus.map((sub, i) => (
        <li key={i}>
          <Link href={sub.link}>{sub.title}</Link>
        </li>
      ))}
    </ul>
  </li>
))}
</ul> */}