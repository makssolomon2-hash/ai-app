'use client'
import Link from "next/link";
import id from "zod/v4/locales/id.cjs";

import {navLinks } from "./constants/data.js";
import { useState } from "react";
import { Button } from "./ui/button";


const NavBar = () => {
  const [visible, setVisible] = useState(true);
  return (

    <div className="bg-black " >
      <Button 
        onClick={() => setVisible(previous => !previous)}
        aria-expanded={visible}
      >
        {visible ? "Hide menu" : "Show menu"}
      </Button>
      {/* mapping */}

      {visible && (

        <ul className="nav-links flex flex-row justify-between p-0 gap-0  text-2xl px-20">
            {navLinks.map((link) =>(
                  <li key={link.name}>
                    <Link href={link.href} className={link.id === '1' ? 'text-red-500' : link.id === '2' ? 'text-blue-500' :'text-white'} >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
        
      )}
  </div> 
  );
};

export default NavBar
