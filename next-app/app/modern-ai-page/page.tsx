'use client'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { tr } from 'zod/v4/locales';

export default function ModernAI() {
  const [visible,setVisible] = useState(true);

  return (
    <main className='min-h-screen bg-[#070B14] selection:bg-white/20'>
      <section className='relative flex flex-col items-center overflow-hidden px-4 pb-24 pt-40 text-center'>

        <Button 
        className='m-5'
        onClick={() => setVisible(!visible)}
        
        >{visible ? 'Hide' : 'Show element'}</Button>
      {visible && (
        <div className='flex flex-col justify-between w-[700] h-[180]  mt-5   p-[1.5px] rounded-xl bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 backdrop-blur-md'>
          <input 
            className='mt-4 p-4 w-full w-full rounded-[10px]  text-gray-950 px-4 py-3  outline-none placeholder:text-gray-400"'
            type="text"
    placeholder="Type something..."
    
          ></input>
          <div className='input-panel flex flex-row justify-between p-3'>
            <div className='input-buttons'>
              <Button>Mobile App</Button>
              <Button>Web App</Button>
              <Button>Dashboard</Button>
              <Button>Game</Button>
            </div>
            <div>
              <Button variant={'outline'} className='p-2 text-black'>Send</Button>
            </div>
          </div>
          
        </div>
      )}
        
      </section>
    </main>
  )
}
