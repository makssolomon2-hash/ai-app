'use client'
import { Button } from '@/components/ui/button'
import { tr } from 'zod/v4/locales';

import Image from 'next/image';

import { useRef, useState } from 'react'
import { Background } from '@/components/Background';




  

export default function ModernAI() {
  const userName:String = 'Maks';

  const [visible,setVisible] = useState(true);

  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const divRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return

    const rect = divRef.current.getBoundingClientRect()
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (


    <main className='min-h-screen bg-[#10151F] selection:bg-white/20'>
      <div className="pointer-events-none absolute inset-0 blur-xl">
       <Background />
      </div>
      <section className='relative min-h-screen flex flex-col items-center overflow-hidden px-4 pb-24 pt-40 text-center'>

        <div className='header'>
          <h1 className='text-5xl font-bold mb-20'>Hi, <span className="bg-linear-to-r/oklch from-violet-500 to-cyan-400 bg-clip-text text-transparent">{userName}</span>  How can i help you today?</h1>
        </div>

        
      {visible && (
          
          <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setOpacity(1)}
            onMouseLeave={() => setOpacity(0)}
            
            className={`relative mt-5 w-full max-w-[700px] 
            bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 p-[2px]
            transition-transform duration-300 ease-out motion-reduce:transition-none rounded-xl
             ${isExpanded ? "scale-105" : "scale-100"}`}
          >
            <div className="pointer-events-none absolute inset-[2px] rounded-[10px] bg-white" />
            <div
                className="pointer-events-none absolute inset-0 z-10 transition duration-300"
                style={{
                  opacity,
                background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(24, 200, 232, 0.25), transparent 40%) `,
                }}
              />
           <div className={`relative z-20 w-full max-w-[700px] min-h-[180px] overflow-hidden rounded-xl flex flex-col justify-between 
          transition-[min-height] duration-300 ease-out motion-reduce:transition-none`}
           
            onFocus={() => setIsExpanded(true)}
            onBlur={(event) =>{
              if (!event.currentTarget.contains(event.relatedTarget)){
                setIsExpanded(false);
              }
            }}
            onClick={(e) => {
              const target = e.target;

              if(
                target instanceof HTMLElement && !target.closest('button, input, textarea, a')
              ){
                inputRef.current?.focus();
              }
            }}
            >
              <input
                ref={inputRef}
                className="w-full bg-transparent p-4 text-black placeholder:text-[#10151F]/80  outline-none"
                type="text"
                placeholder="Type something..."
              />

              

              <div className="flex flex-row justify-between p-3">
                <div className='flex gap-2'>
                  <Button variant="outline" className="p-2 text-black">
                    <Image src="/icons/menu.svg" alt="" width={20} height={20} />
                    Mobile App</Button>
                  <Button variant="outline" className="p-2 text-black">
                    <Image src="/icons/panel.svg" alt="" width={20} height={20} />
                    Web App</Button>
                  <Button variant="outline" className="p-2 text-black">
                    <Image src="/icons/database.svg" alt="" width={20} height={20} />
                    Dashboard</Button>
                  <Button variant="outline" className="p-2 text-black">
                    <Image src="/icons/globe.svg" alt="" width={20} height={20} />
                    Game</Button>
                </div>

                <Button variant="outline" size='lg' className="flex p-2 min-w-5 text-black bg-[#fbfdff] items-center justify-center text-center ">
                   <Image src="/icons/send.svg" alt="" width={20} height={20} />
                </Button>
              </div>
            </div>

            
          </div>
        )}

        {isExpanded && <p className='mt-5'>Focus is active</p>}

        <Button 
          className='absolute bottom-20 m-5 text-black'
          variant={'outline'}
          onClick={() => setVisible(!visible)}
        >
          {visible ? 'Hide' : 'Show element'}
        </Button>
        
      </section>
    </main>
  )
}
