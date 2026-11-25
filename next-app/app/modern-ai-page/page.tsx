'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react'
import { Background } from '@/components/Background';
import { placeholders } from '@/components/constants/data';

interface Message {
  id: number;
  text: string;
  role: 'user' | 'assistant';
}

export default function ModernAI() {
  const userName = ['Maks', 'Vasil', 'Anatolii'];

  const inputRef = useRef<HTMLInputElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  
  const [isExpanded, setIsExpanded] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [visible,setVisible] = useState(true);
  const [index, setIndex] = useState(0);
  const [inChat , setInChat] = useState(false);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const [userSwitch, setUserSwitch] = useState<Message['role']>('user');


  useEffect(() =>{
    const interval = setInterval(() =>{
      setIndex(curentIndex => (curentIndex + 1) % placeholders.length);

    },8000)
    return () => clearInterval(interval)
  },[])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return

    const rect = divRef.current.getBoundingClientRect()
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  function sendMessage(){
    if (!input.trim()) return;

    setMessages((prev) =>[
      ...prev,
      {
        id: Date.now(),
        text: input,
        role: userSwitch,
      },
    ]);

    setInput("") ;
  }

  return (
    <main className='min-h-screen bg-[#10151F] selection:bg-white/20'>
      
      <div className="pointer-events-none absolute inset-0 blur-xl">
       <Background />
      </div>
       
      <section className={`relative min-h-screen w-full flex flex-col items-center ju overflow-hidden px-4 text-center ${inChat ? "pb-0" : "pb-0"}`}>
        {inChat ? 
          <div className=" flex flex-col justify-between w-[58%] bg-gray-100 rounded-2xl text-black h-[95vh] m-5 ">

              <div className="flex flex-row justify-between p-3 border-b  border-b-zinc-300">

                <Button
                    onClick={() => setInChat(false)}
                    className=""
                >
                  Back
                </Button>
                {/*<p>Chat window</p>*/}
                <div className="flex gap-3 font-bold items-center px-3">
                  <div className="rounded-full bg-green-500 w-[15px] h-[15px]"></div>
                  Gemini 3.5
                </div>
              </div>

              <div className="down ">
                <div className="flex flex-col justify-end text-right gap-3 m-5">
                  {messages.map((message) => (
                      <div
                          key={message.id}
                          className={`flex items-end gap-2 ${
                              message.role === "user" ? "justify-end" : "justify-start"
                          }`}
                      >
                        {message.role === "assistant" && (
                            <Image
                                src="/tola.png"
                                alt="Tola"
                                width={40}
                                height={40}
                                className="rounded-full object-cover h-[40px]"
                            />
                        )}

                        <div
                            className={`w-fit max-w-[80%] whitespace-pre-wrap break-words rounded-2xl p-3 ${
                                message.role === "user"
                                    ? "bg-zinc-300 text-black"
                                    : "bg-zinc-200 text-black"
                            }`}
                        >
                          {message.text}
                        </div>
                      </div>
                  ))}
                </div>
                <div className="">

                  <input
                      ref={inputRef}
                      value={input}
                      className="peer w-full h-[50px] bg-zinc-200 p-4 text-black outline-black"
                      type="text"
                      placeholder="Ask folow up question..."
                      aria-label="Describe what you want to build"
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" && !event.nativeEvent.isComposing) {
                          setInChat(true);
                          sendMessage();
                        }
                      }}
                  />
                  <div className=" flex flex-row justify-between p-3 bg-zinc-200">
                    <p></p>

                    <Button
                        onClick={() =>
                            setUserSwitch((current) =>
                                current === "user" ? "assistant" : "user"
                            )
                        }
                    >
                      Switch to {userSwitch === "user" ? "assistant" : "user"}
                    </Button>
                  </div>
                </div>
              </div>
          </div> 
          : 
          <div className='header header-animation pt-40'>
            <h1 className='text-5xl font-bold mt-21 mb-20'>Hi, <span className="bg-linear-to-r/oklch from-violet-500 to-cyan-400 bg-clip-text text-transparent">{userName[0]}</span>  How can i help you today?</h1>
          </div>  
        }
  
        { visible && !inChat && (    
          <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setOpacity(1)}
            onMouseLeave={() => setOpacity(0)} 
            className={`input-animation relative mt-15 w-full max-w-[700px] 
            bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 p-[2px]
            transition-transform duration-300 ease-out motion-reduce:transition-none rounded-xl
             ${isExpanded ? "scale-105" : "scale-100"}`}
          >
            <div className="pointer-events-none absolute inset-[2px] rounded-[10px] bg-white rounded-xl" />

            {/*
              //mouse blure effect
            <div
                className="pointer-events-none absolute inset-0 z-10 transition duration-300"
                style={{
                  opacity,
                background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(24, 200, 232, 0.15), transparent 50%)  `,
                }}
              /> */}

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
              <div className="relative w-full">
              <input
                ref={inputRef}
                className="peer w-full bg-transparent p-4 text-black outline-none"
                type="text"
                placeholder=" "
                aria-label="Describe what you want to build"
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.nativeEvent.isComposing) {
                    setInChat(true);
                    sendMessage();
                  }
                }}
              />

              <span
                key={index}
                aria-hidden="true"
                className="placeholder-animation pointer-events-none absolute inset-x-4 top-4 hidden truncate text-left text-[#10151F]/80 peer-placeholder-shown:block"
              >
                {placeholders[index]}
              </span>
            </div>
          
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

              <Button variant="outline" size='lg' className="flex p-2 min-w-5 text-black bg-[#fbfdff] items-center justify-center text-center " onClick={() => {
                  setInChat(!inChat);
                  sendMessage()
              }}>
                  <Image src="/icons/send.svg" alt="" width={20} height={20} />
              </Button>
              </div>
            </div>         
          </div>
        )}

        {!inChat && visible && isExpanded && <p className="mt-5">Focus is active</p>}

        {!inChat && 
          <Button 
            className='absolute bottom-20 m-5 text-black'
            variant={'outline'}
            onClick={() => setVisible(!visible)}
          >
            {visible  ? 'Hide' : 'Show element'}
          </Button>
        }        
      </section>
    </main>
  )
}
