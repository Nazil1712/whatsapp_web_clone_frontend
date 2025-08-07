export default function Sidebar() {
  return (
    <div className="w-[30%] min-w-[280px] border-r bg-white flex flex-col">
      <div className="p-4 flex justify-between items-center border-b">
        <h1 className="font-bold text-green-600 text-xl">WhatsApp</h1>
        <div className="space-x-3 text-gray-500">
          <span>📷</span>
          <span>💬</span>
          <span>⋮</span>
        </div>
      </div>

      <div className="p-2">
        <input
          type="text"
          placeholder="Search or start a new chat"
          className="w-full px-4 py-2 rounded-full bg-gray-100 focus:outline-none"
        />
      </div>

      <div className="flex px-2 py-1 space-x-2 text-sm">
        {['All', 'Unread', 'Favourites', 'Groups'].map(tab => (
          <button key={tab} className="px-3 py-1 bg-gray-200 rounded-full">{tab}</button>
        ))}
      </div>

      <div className="overflow-y-auto flex-1">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="flex items-center px-4 py-3 border-b hover:bg-gray-100 cursor-pointer">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white text-sm">
              {i + 1}
            </div>
            <div className="ml-4 flex-1">
              <div className="font-medium">Contact {i + 1}</div>
              <div className="text-sm text-gray-500">Last message...</div>
            </div>
            <div className="text-xs text-gray-400">11:00 am</div>
          </div>
        ))}
      </div>
    </div>
  )
}
