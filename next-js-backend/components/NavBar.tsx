'use client'

import Link from "next/link";

import {navLinks } from "./constants/data.js";
import { useState } from "react";
import { Button } from "./ui/button";
import { ChevronDown, ChevronRight, MessageSquare } from "lucide-react";

import Image from "next/image.js";


const NavBar = () => {
  const [visible, setVisible] = useState(false);
  const [chatsExpanded, setChatsExpanded] = useState(true);
  return (

    <div className="z-1000  " >
      
      

      
      <Button 
        variant='outline'
        onClick={() => setVisible(previous => !previous)}
        aria-expanded={visible}
        aria-controls="project-navigation-sidebar"
        aria-label={visible ? "Close navigation" : "Open navigation"}
        className='fixed top-4 left-5 z-[60] text-black'
      >
        {visible ? 

        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><title>side-bar-fill</title><path fill="currentColor" d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1m6 2v14h11V5z"/></svg>
        : 
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><title>side-bar-line</title><path fill="currentColor" d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1m5 2H4v14h4zm2 0v14h10V5z"/></svg> }
        
      </Button>

      <aside
        id="project-navigation-sidebar"
        hidden={!visible}
        className="side-bar-animation fixed inset-y-0 left-0 z-50 w-[264px] overflow-y-auto border-r border-slate-200 bg-white shadow-xl"
      >
        <div className="px-5 pt-12">
        
      {/* mapping */}

        {/* <div className="bg-linear-to-r/oklch from-violet-500 to-cyan-400 bg-clip-text text-transparent text-3xl font-extrabold ml-5 mt-0">LOGO</div> */}
      <div className="mt-2 flex gap-3 font-bold text-black">
        <p>Projects Navigation </p>
          <Image src="/icons/folder.svg" alt="" width={20} height={20} color="# fff"className="text-white" />  
      </div>
        <nav aria-label="Main navigation">
           <ul className=" flex flex-col  gap-2 pl-3 mt-1 ">
            {navLinks.map((link, index) =>(
                  <li key={link.name}>
                    
                      <Button variant='link'>
                        <Link href={link.href} className={index === 0 ? 'text-red-500' : index === 1 ? 'text-blue-500' :'text-black' } >
                            {link.name}
                        </Link>
                      </Button>
                  </li>
                ))}
          </ul>
        </nav>

        <section className="mt-7 border-t border-slate-200 pt-4" aria-label="Chats">
          <button
            type="button"
            aria-expanded={chatsExpanded}
            aria-controls="chat-navigation-list"
            onClick={() => setChatsExpanded((expanded) => !expanded)}
            className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-left text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-100"
          >
            <span>Your chats</span>
            {chatsExpanded ? (
              <ChevronDown size={16} aria-hidden="true" />
            ) : (
              <ChevronRight size={16} aria-hidden="true" />
            )}
          </button>

          <div
            id="chat-navigation-list"
            hidden={!chatsExpanded}
            className="mt-1 space-y-1"
          >
              <Link
                href="/"
                aria-current="page"
                className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-800"
              >
                <MessageSquare size={16} aria-hidden="true" />
                <span>Current AI chat</span>
              </Link>
              <p className="px-3 py-2 text-xs leading-relaxed text-slate-500">
                Past conversations are not saved in this demo yet.
              </p>
          </div>
        </section>
        </div>
      </aside>


       
  </div> 
  );
};

export default NavBar
