"use client";

import { useChat } from "@ai-sdk/react";
import { useRef, useState } from "react";
import { ArrowUpIcon } from "lucide-react";
import type { UIMessage } from "ai";

import { Bubble, BubbleContent } from "@/components/ui/bubble";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Message, MessageContent } from "@/components/ui/message";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller";

function textOf(message: UIMessage) {
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("");
}

export function AI
() {
  const [input, setInput] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const { messages, sendMessage, status } = useChat();
  const busy = status === "submitted" || status === "streaming";

  return (
    <div className="mx-auto flex min-h-0 w-full max-w-2xl flex-1 flex-col">
      <MessageScrollerProvider autoScroll>
        <MessageScroller className="min-h-0 flex-1">
          <MessageScrollerViewport>
            <MessageScrollerContent>
              {messages.map((message) => (
                <MessageScrollerItem
                  key={message.id}
                  messageId={message.id}
                  scrollAnchor={message.role === "user"}
                >
                  {message.role === "user" ? (
                    <Message align="end">
                      <MessageContent>
                        <Bubble align="end" variant="muted">
                          <BubbleContent>{textOf(message)}</BubbleContent>
                        </Bubble>
                      </MessageContent>
                    </Message>
                  ) : (
                    <Message>
                      <MessageContent>
                        <p className="whitespace-pre-wrap">{textOf(message)}</p>
                      </MessageContent>
                    </Message>
                  )}
                </MessageScrollerItem>
              ))}
            </MessageScrollerContent>
          </MessageScrollerViewport>
          <MessageScrollerButton />
        </MessageScroller>
      </MessageScrollerProvider>

      <form
        ref={formRef}
        className="p-4"
        onSubmit={(event) => {
          event.preventDefault();
          const text = input.trim();
          if (!text || busy) return;
          sendMessage({ text });
          setInput("");
        }}
      >
        <InputGroup>
          <InputGroupTextarea
            value={input}
            placeholder="Ask anything..."
            className="p-3"
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                formRef.current?.requestSubmit();
              }
            }}
          />
          <InputGroupAddon align="block-end">
            <InputGroupButton
              type="submit"
              size="icon-sm"
              className="ml-auto rounded-full"
              disabled={busy || input.trim().length === 0}
              aria-label="Send"
            >
              <ArrowUpIcon />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </form>
    </div>
  );
}