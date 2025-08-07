import { useState } from 'react'

export default function ChatWindow() {
  const [messages, setMessages] = useState([
    { sender: 'me', text: 'Hey there!' },
    { sender: 'them', text: 'Hi! How are you?' },
  ])
  const [input, setInput] = useState('')

  const sendMessage = () => {
    if (!input.trim()) return
    setMessages([...messages, { sender: 'me', text: input }])
    setInput('')
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="bg-gray-200 p-4 font-bold border-b">Contact Name</div>
      <div className="flex-1 p-4 overflow-y-auto space-y-2 bg-gray-100">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-xs p-2 rounded-lg text-sm ${
              msg.sender === 'me'
                ? 'bg-green-100 self-end text-right'
                : 'bg-white self-start'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="p-4 border-t flex">
        <input
          type="text"
          className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
        />
        <button
          onClick={sendMessage}
          className="bg-green-500 text-white px-4 py-2 rounded-r-lg hover:bg-green-600"
        >
          Send
        </button>
      </div>
    </div>
  )
}
