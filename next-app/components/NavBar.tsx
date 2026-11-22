'use client'

import Link from "next/link";
import {navLinks } from "./constants/data.js";
import { useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image.js";

const NavBar = () => {
  const [visible, setVisible] = useState(false);
  return (

    <div className="z-1000  " > 
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
        className='fixed top-4 left-5 z-[60] text-black'
      >
        {visible ? 

        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><title>side-bar-fill</title><path fill="currentColor" d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1m6 2v14h11V5z"/></svg>
        : 
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><title>side-bar-line</title><path fill="currentColor" d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1m5 2H4v14h4zm2 0v14h10V5z"/></svg> }
        
      </Button>

      <aside
        id="sidrbar"
        hidden={!visible}
        className="side-bar-animation fixed inset-y-0 left-0 z-50 w-[264px] overflow-hidden bg-white"
      >
        <div className="w-[264px] px-5 pt-12">
        
      {/* mapping */}

        {/* <div className="bg-linear-to-r/oklch from-violet-500 to-cyan-400 bg-clip-text text-transparent text-3xl font-extrabold ml-5 mt-0">LOGO</div> */}
      <div className="text-black flex gap-3 font-bold mt-2">
        <p>Projects Navigation </p>
          <Image src="/icons/folder.svg" alt="" width={20} height={20} color="# fff"className="text-white" />  
      </div>
        <nav aria-label="Main navigation">
           <ul className=" flex flex-col  gap-2 pl-3 mt-1 ">
            {navLinks.map((link) =>(
                  <li key={link.name}>
                    
                      <Button variant='link'>
                        <Link href={link.href} className={link.id === '1' ? 'text-red-500' : link.id === '2' ? 'text-blue-500' :'text-black' } >
                            {link.name}
                        </Link>
                      </Button>
                  </li>
                ))}
          </ul>
        </nav>
        </div>
      </aside>


       
  </div> 
  );
};

export default NavBar
