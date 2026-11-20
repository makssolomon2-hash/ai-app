'use client'

import Link from "next/link";
import id from "zod/v4/locales/id.cjs";

import {navLinks } from "./constants/data.js";
import { useState } from "react";
import { Button } from "./ui/button";

import Image from "next/image.js";


const NavBar = () => {
  const [visible, setVisible] = useState(true);
  return (

    <div className="relative min-h-16 z-1000 bg-  " >
      {/* <div className="logo text-">LOGO</div> */}
      
      {/* <Button 
        variant='outline'
        onClick={() => setVisible(previous => !previous)}
        aria-expanded={visible}
        className='fixed top-10 left-40 z-[60] text-black'
      >
        {visible ? "Close menu" : "Open menu"}
        
        <Image src="/icons/menu.svg" alt="" width={20} height={20} color="# fff"className="text-white" /> 
      </Button> */}
      <Button 
        variant='outline'
        onClick={() => setVisible(previous => !previous)}
        aria-expanded={visible}
        className='fixed top-10 left-5 z-[60] text-black'
      >
        {visible ? "Close menu" : "Open menu"}
        
        <Image src="/icons/menu.svg" alt="" width={20} height={20} color="# fff"className="text-white" /> 
      </Button>

      <aside
        id="sidrbar"
        hidden={!visible}
        className="fixed inset-y-0 left-0 z-50 w-[264px] bg-[#10151F] px-5 pt-20 text-white"
      >
        
      {/* mapping */}
      <div className="text-white flex gap-3">
        <p>Projects Navigation </p>
          <Image src="/icons/panel.svg" alt="" width={20} height={20} color="# fff"className="text-white" />  
      </div>
        <nav aria-label="Main navigation">
           <ul className=" flex flex-col  gap-4 pl-5 mt-5 ">
            {navLinks.map((link) =>(
                  <li key={link.name}>
                    
                      <Button variant='link'>
                        <Link href={link.href} className={link.id === '1' ? 'text-red-500' : link.id === '2' ? 'text-blue-500' :'text-white W' } >
                            {link.name}
                        </Link>
                      </Button>
                  </li>
                ))}
          </ul>
        </nav>
      </aside>


       
  </div> 
  );
};

export default NavBar
