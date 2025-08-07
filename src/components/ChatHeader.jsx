export default function ChatHeader() {
  return (
    <div className="flex items-center justify-between p-4 border-b bg-white">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gray-400 rounded-full"></div>
        <div>
          <div className="font-semibold">Nazil (You)</div>
          <div className="text-sm text-gray-500">Message yourself</div>
        </div>
      </div>
      <div className="space-x-3 text-gray-500">
        <span>🔍</span>
        <span>⋮</span>
      </div>
    </div>
  )
}
