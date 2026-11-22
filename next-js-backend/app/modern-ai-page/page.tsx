'use client'

import { useChat } from '@ai-sdk/react'
import type { UIMessage } from 'ai'
import { Button } from '@/components/ui/button'
import { Background } from '@/components/Background'
import { ArrowUp, Mic, Plus } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { placeholders } from '@/components/constants/data'

function textOf(message: UIMessage) {
  return message.parts
    .filter((part) => part.type === 'text')
    .map((part) => part.text)
    .join('')
}

function friendlyError(message: string) {
  if (/high demand|headers timeout|quota|resource_exhausted|429|503/i.test(message)) {
    return 'Gemini is temporarily busy or rate-limited. Please wait a moment and try again.'
  }

  if (/GOOGLE_GENERATIVE_AI_API_KEY|API key|401|403/i.test(message)) {
    return 'Check GOOGLE_GENERATIVE_AI_API_KEY in .env.local, then restart the dev server.'
  }

  return 'Gemini could not return a response. Check your connection and the server logs.'
}

export default function ModernAI() {
  const [input, setInput] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const [isComposerVisible, setIsComposerVisible] = useState(true)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const { messages, sendMessage, status, error } = useChat()
  const inputRef = useRef<HTMLInputElement>(null)
  const composerRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const isBusy = status === 'submitted' || status === 'streaming'
  const hasStartedChat = messages.length > 0
  const waitingForAssistant = isBusy && messages[messages.length - 1]?.role === 'user'

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((currentIndex) => (currentIndex + 1) % placeholders.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (hasStartedChat) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }, [messages, isBusy, error, hasStartedChat])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const prompt = input.trim()
    if (!prompt || isBusy) return

    sendMessage({ text: prompt })
    setInput('')
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!composerRef.current) return

    const rect = composerRef.current.getBoundingClientRect()
    setPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    })
  }

  const renderComposer = (inChat: boolean) => {
    const composerIsActive = isExpanded || Boolean(input.trim()) || isBusy

    return (
      <div
        ref={composerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setOpacity(1)}
        onMouseLeave={() => setOpacity(0)}
        className={`relative mx-auto w-full max-w-[700px] rounded-xl p-[2px] shadow-lg shadow-slate-950/20 transition-transform duration-300 ease-out motion-reduce:transition-none ${
          inChat
            ? composerIsActive
              ? 'composer-frame composer-frame-active'
              : 'composer-frame'
            : 'bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500'
        } ${isExpanded ? 'scale-[1.01]' : 'scale-100'}`}
      >
        <div
          className="pointer-events-none absolute inset-0 z-10 rounded-xl transition-opacity duration-300"
          style={{
            opacity,
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(24, 200, 232, 0.18), transparent 40%)`,
          }}
        />

        <form
          onSubmit={handleSubmit}
          className={`relative z-20 flex flex-col justify-between overflow-hidden rounded-[10px] bg-white transition-[min-height] duration-300 ease-out motion-reduce:transition-none ${
            inChat ? 'min-h-[112px]' : 'min-h-[180px]'
          }`}
          onFocus={() => setIsExpanded(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setIsExpanded(false)
            }
          }}
          onClick={(event) => {
            const target = event.target
            if (target instanceof HTMLElement && !target.closest('button, input, textarea, a')) {
              inputRef.current?.focus()
            }
          }}
        >
          {inChat ? (
            <>
              <div className="relative w-full">
                <input
                  ref={inputRef}
                  className="w-full bg-transparent px-4 py-4 text-[#10151F] outline-none"
                  type="text"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask a follow-up question…"
                  aria-label="Ask the AI a question"
                  autoComplete="off"
                />
              </div>

              <div className="mx-3 flex items-center justify-between gap-2 border-t border-slate-200 py-2">
                <div className="flex min-w-0 items-center gap-2">
                  <button
                    type="button"
                    disabled
                    title="Attachments are coming soon"
                    aria-label="Add an attachment (coming soon)"
                    className="grid size-8 shrink-0 place-items-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <Plus size={16} aria-hidden="true" />
                  </button>
                  <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                    Gemini
                  </span>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    disabled
                    title="Voice input is not connected yet"
                    aria-label="Voice input (coming soon)"
                    className="grid size-8 place-items-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <Mic size={16} aria-hidden="true" />
                  </button>
                  <Button
                    type="submit"
                    variant="outline"
                    disabled={isBusy || !input.trim()}
                    aria-label="Send message"
                    className="size-9 rounded-full border-[#10151F] bg-[#10151F] p-0 text-white hover:bg-slate-700 hover:text-white"
                  >
                    <ArrowUp size={18} aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="relative w-full">
                <input
                  ref={inputRef}
                  className="peer w-full bg-transparent px-4 py-4 text-[#10151F] outline-none"
                  type="text"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder=" "
                  aria-label="Ask the AI a question"
                  autoComplete="off"
                />
                <span
                  key={placeholderIndex}
                  aria-hidden="true"
                  className="placeholder-animation pointer-events-none absolute inset-x-4 top-4 hidden truncate text-left text-[#10151F]/55 peer-placeholder-shown:block"
                >
                  {placeholders[placeholderIndex]}
                </span>
              </div>

              <div className="flex flex-row items-center justify-between p-3">
                <div className="flex max-w-[calc(100%-48px)] flex-wrap gap-2">
                  <Button type="button" variant="outline" className="p-2 text-black">
                    <Image src="/icons/menu.svg" alt="" width={20} height={20} />
                    Mobile App
                  </Button>
                  <Button type="button" variant="outline" className="p-2 text-black">
                    <Image src="/icons/panel.svg" alt="" width={20} height={20} />
                    Web App
                  </Button>
                  <Button type="button" variant="outline" className="p-2 text-black">
                    <Image src="/icons/database.svg" alt="" width={20} height={20} />
                    Dashboard
                  </Button>
                  <Button type="button" variant="outline" className="p-2 text-black">
                    <Image src="/icons/globe.svg" alt="" width={20} height={20} />
                    Game
                  </Button>
                </div>
                <Button
                  type="submit"
                  variant="outline"
                  size="lg"
                  disabled={isBusy || !input.trim()}
                  aria-label="Send message"
                  className="flex min-w-5 items-center justify-center bg-[#fbfdff] p-2 text-center text-black"
                >
                  <Image src="/icons/send.svg" alt="" width={20} height={20} />
                </Button>
              </div>
            </>
          )}
        </form>
      </div>
    )
  }

  return (
    <main className="relative min-h-dvh overflow-hidden bg-[#10151F] text-white selection:bg-white/20">
      <div className="pointer-events-none absolute inset-0 overflow-hidden blur-xl" aria-hidden="true">
        <Background />
      </div>

      {!hasStartedChat ? (
        <section className="relative flex min-h-dvh flex-col items-center overflow-hidden px-4 pb-24 pt-40 text-center">
          <header className="w-full">
            <h1 className="mt-21 mb-20 text-4xl font-bold sm:text-5xl">
              Hi,{' '}
              <span className="bg-linear-to-r/oklch from-violet-500 to-cyan-400 bg-clip-text text-transparent">
                Maks
              </span>{' '}
              How can I help you today?
            </h1>
          </header>

          {isComposerVisible && (
            <div className="chat-panel-enter mt-15 w-full px-1">
              {renderComposer(false)}
            </div>
          )}

          <Button
            className="absolute bottom-20 m-5 border-white/30 bg-white/10 text-white hover:bg-white/20"
            variant="outline"
            onClick={() => setIsComposerVisible((isVisible) => !isVisible)}
          >
            {isComposerVisible ? 'Hide' : 'Show element'}
          </Button>
        </section>
      ) : (
        <section className="relative flex h-dvh items-center justify-center px-3 py-3 sm:px-5 sm:py-5">
          <div className="chat-panel-enter flex h-full w-full max-w-[880px] flex-col overflow-hidden rounded-2xl border border-white/70 bg-white text-[#10151F] shadow-2xl shadow-black/25 md:w-[60vw] sm:rounded-3xl">
            <header className="flex items-center justify-between border-b border-slate-100 px-5 py-3 sm:px-7">
              <div className="flex items-center gap-3">
                <span className="size-2 rounded-full bg-cyan-500" aria-hidden="true" />
                <h2 className="text-sm font-semibold">AI Chat</h2>
              </div>
              <span className="text-xs text-slate-500">Gemini</span>
            </header>

            <div
              className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto overscroll-contain px-4 py-6 text-left sm:px-7"
              aria-live="polite"
            >
              {messages.map((message) => {
                const text = textOf(message)
                if (!text) return null

                return (
                  <div
                    key={message.id}
                    className={`flex w-full ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[88%] whitespace-pre-wrap break-words rounded-2xl px-4 py-3 leading-relaxed ${
                        message.role === 'user'
                          ? 'bg-[#f1f3f8] text-[#10151F]'
                          : 'bg-slate-50 text-[#202536]'
                      }`}
                    >
                      {text}
                    </div>
                  </div>
                )
              })}

              {waitingForAssistant && (
                <p className="chat-panel-enter text-sm text-slate-500">Gemini is thinking…</p>
              )}

              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800"
                >
                  {friendlyError(error.message)}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-slate-100 bg-white px-4 py-3 sm:px-6">
              {renderComposer(true)}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
