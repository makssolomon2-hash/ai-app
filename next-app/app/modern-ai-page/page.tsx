'use client'
import { Button } from '@/components/ui/button'
import { tr } from 'zod/v4/locales';

import { useRef, useState } from 'react'


  

export default function ModernAI() {
  const [visible,setVisible] = useState(true);

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

    <main className='min-h-screen bg-[#070B14] selection:bg-white/20'>
      <section className='relative flex flex-col items-center overflow-hidden px-4 pb-24 pt-40 text-center'>

        <Button 
        className='m-5'
        onClick={() => setVisible(!visible)}
        
        >{visible ? 'Hide' : 'Show element'}</Button>
      {visible && (
  <div
    ref={divRef}
    onMouseMove={handleMouseMove}
    onMouseEnter={() => setOpacity(1)}
    onMouseLeave={() => setOpacity(0)}
    className="relative mt-5 w-full max-w-[700px] overflow-hidden rounded-xl bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 p-[2px]"
  >
    <div className="flex min-h-[180px] flex-col justify-between rounded-[10px] bg-[#101725]">
      <input
        className="w-full bg-transparent p-4 text-white placeholder:text-gray-400"
        type="text"
        placeholder="Type something..."
      />

      <div className="flex flex-row justify-between p-3">
        <div>
          <Button>Mobile App</Button>
          <Button>Web App</Button>
          <Button>Dashboard</Button>
          <Button>Game</Button>
        </div>

        <Button variant="outline" className="p-2 text-black">
          Send
        </Button>
      </div>
    </div>

    <div
      className="pointer-events-none absolute inset-0 transition duration-300"
      style={{
        opacity,
        background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.15), transparent 40%)`,
      }}
    />
  </div>
)}
        
      </section>
    </main>
  )
}
