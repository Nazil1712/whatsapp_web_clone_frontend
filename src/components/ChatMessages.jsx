export default function ChatMessages() {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-2 bg-chatbg bg-repeat space-y-4 text-sm">
      <div className="text-center text-gray-500 text-xs my-2">15/7/2025</div>
      <div className="text-center text-gray-500 text-xs my-2">Monday</div>

      <div className="flex justify-end">
        <div className="bg-green-100 p-3 rounded-lg max-w-md">
          <div className="text-xs text-gray-600 italic">Forwarded</div>
          <div>Tab aze 250 (1-0-1) for 3 days</div>
          <div>Tab I dio m (0-0-1) for 5 days</div>
          <div>Otrivin nasal drops for nose block</div>
          <div className="text-right text-xs text-gray-500 mt-1">3:52 pm ✓✓</div>
        </div>
      </div>

      <div className="flex justify-end">
        <div className="bg-green-100 p-3 rounded-lg max-w-md">
          <img src="/job-image.png" alt="Internshala" className="mb-2 rounded" />
          <div className="font-medium">Full Stack Developer Remote Fresher Job</div>
          <p className="text-xs text-gray-700">We're not here to throw buzzwords...</p>
          <a
            href="#"
            className="text-blue-600 text-xs break-words"
          >
            https://internshala.com/job/detail/fresher-remote-full-stack-developer...
          </a>
          <div className="text-right text-xs text-gray-500 mt-1">4:29 pm ✓✓</div>
        </div>
      </div>
    </div>
  )
}
