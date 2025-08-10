import { faCircleUser, faMessage } from '@fortawesome/free-regular-svg-icons'
import { faFilm, faGear, faPeopleGroup } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { ChannelIcon, ChatsIcon, StatusIcon,CommunitiesIcon, SettingsIcon } from '../assets/icons'

const icons = [
  { id: 'chats', icon: <ChatsIcon/>, label: 'Chats', hasNotification: true },
  { id: 'status', icon: <StatusIcon/>, label: 'Status' },
  { id: 'channels', icon: <ChannelIcon/>, label: 'Channels' },
  { id: 'communities', icon: <CommunitiesIcon/>, label: 'Communities' },
]

export default function IconStrip() {
  const [hovered, setHovered] = useState(null)

  return (
    <div className="flex h-[100vh] flex-col items-center w-14 bg-background-color border-gray-600 text-gray-700 pt-4 space-y-6 relative">
      
      {icons.map(({ id, icon, label, hasNotification }) => (
        <div
          key={id}
          className="relative"
          onMouseEnter={() => setHovered(id)}
          onMouseLeave={() => setHovered(null)}
        >
          <div className="relative text-xl cursor-pointer hover:text-green-600">
            {icon}
            {hasNotification && (
              <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                1
              </span>
            )}
          </div>
          {hovered === id && (
            <div className="absolute left-14 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded shadow z-10 whitespace-nowrap">
              {label}
            </div>
          )}
        </div>
      ))}

      <hr className='text-gray-400 w-8' />

      {/* Spacer */}
      <div className="flex-1" />

      {/* Settings icon */}
      <SettingsIcon/>

      {/* Profile image at the bottom */}
      <div className="mb-4">
        {/* <img
          src="/profile.png"
          alt="Profile"
          className="w-8 h-8 rounded-full border"
        /> */}
        <FontAwesomeIcon icon={faCircleUser}/>
      </div>
    </div>
  )
}
