import IconStrip from './components/IconStrip'
import Sidebar from './components/Sidebar'
import ChatHeader from './components/ChatHeader'
import ChatMessages from './components/ChatMessages'
import ChatInput from './components/ChatInput'

export default function App() {
  return (
    <div className="flex h-screen overflow-hidden">
      <IconStrip />
      <Sidebar />
      <div className="flex-1 flex flex-col bg-chatbg">
        <ChatHeader />
        <ChatMessages />
        <ChatInput />
      </div>
    </div>
  )
}
