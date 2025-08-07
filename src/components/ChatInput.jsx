export default function ChatInput() {
  return (
    <div className="p-4 bg-white border-t flex items-center space-x-2">
      <button className="text-gray-500">➕</button>
      <input
        type="text"
        placeholder="Type a message"
        className="flex-1 border rounded-full px-4 py-2 bg-gray-100 focus:outline-none"
      />
      <button className="text-gray-500">🎤</button>
    </div>
  )
}
