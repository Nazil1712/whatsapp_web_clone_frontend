import { PlusIcon } from "../assets/icons";

export default function ChatInput() {
  return (
    <div className="p-4 bg-chat-bg-color flex items-center space-x-2">
      <button className="text-gray-500"><PlusIcon/></button>
      <input
        type="text"
        placeholder="Type a message"
        className="flex-1 rounded-full px-4 py-2 bg-white focus:outline-none"
      />
      <button className="text-gray-500">🎤</button>
    </div>
  )
}
