import { useState } from "react";

interface Message {
    id: number;
    text: string;
    role: string;
}

function Chat() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);

    function sendMessage() {
        if (!input.trim()) return;


        setMessages((prev) => [
            ...prev,
            {
                id: Date.now(),
                text: input,
                role: "user",
            },
        ]);

        setInput("");
    }

    return (
        <div className="flex flex-col gap-4 p-6">

            {/* Messages */}
            <div className="flex flex-col gap-3">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className="bg-zinc-800 text-white p-3 rounded-xl"
                    >
                        {message.text}
                    </div>
                ))}
            </div>

            {/* Input */}
            <div className="flex gap-2">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") sendMessage();
                    }}
                    placeholder="Type a message..."
                    className="flex-1 border p-3 rounded-xl"
                />

                <button
                    onClick={sendMessage}
                    className="bg-blue-600 text-white px-5 rounded-xl"
                >
                    Send
                </button>
            </div>

        </div>
    );
}

export default Chat;
