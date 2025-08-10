import { useState } from "react";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ChannelIcon,
  ChatsIcon,
  StatusIcon,
  CommunitiesIcon,
  SettingsIcon,
} from "../assets/icons";
import { useSelector } from "react-redux";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

const desktopIcons = [
  { id: "chats", icon: <ChatsIcon />, label: "Chats", hasNotification: true },
  { id: "status", icon: <StatusIcon />, label: "Status" },
  { id: "channels", icon: <ChannelIcon />, label: "Channels" },
  { id: "communities", icon: <CommunitiesIcon />, label: "Communities" },
];

const mobileIcons = [
  { id: "chats", icon: <ChatsIcon />, label: "Chats", hasNotification: true },
  { id: "updates", icon: <StatusIcon />, label: "Updates" },
  { id: "communities", icon: <CommunitiesIcon />, label: "Communities" },
  { id: "calls", icon: <FontAwesomeIcon icon={faPhone} />, label: "Calls" },
];

export default function IconStrip() {
  const selectedUser = useSelector((state) => state.users?.selectedUser);
  const [hovered, setHovered] = useState(null);
  const [active, setActive] = useState("chats");

  const isChatOpen = Boolean(selectedUser);

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex h-screen flex-col items-center w-14 bg-background-color border-gray-600 text-gray-700 pt-4 space-y-3 relative">
        {desktopIcons.map(({ id, icon, label, hasNotification }) => (
          <div
            key={id}
            className="relative"
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
          >
            <div
              className={`relative text-xl cursor-pointer hover:bg-gray-300 rounded-full p-2 ${
                active === id ? "bg-gray-300 rounded-full p-2" : ""
              }`}
              onClick={() => setActive(id)}
            >
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

        <hr className="text-gray-400 w-8" />

        <div className="flex-1" />

        <div className="flex flex-col items-center space-y-4 p-2 bg-gray-100">
          {/* Settings Icon */}
          <div className="relative group cursor-pointer hover:bg-gray-300 rounded-full p-2">
            <SettingsIcon />
            <span className="absolute left-12 top-1/2 -translate-y-1/2 px-2 py-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity">
              Settings
            </span>
          </div>

          {/* User Icon */}
          <div className="relative group hover:bg-gray-300 rounded-full p-2">
            <FontAwesomeIcon
              icon={faCircleUser}
              className="text-2xl cursor-pointer"
            />
            <span className="absolute left-12 top-1/2 -translate-y-1/2 px-2 py-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity">
              Profile
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      {!isChatOpen && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-14 shadow-md">
          {mobileIcons.map(({ id, icon, label, hasNotification }) => (
            <button
              key={id}
              onClick={() => setActive(id)}
              className="flex flex-col items-center relative w-full py-1 cursor-pointer"
            >
              <div
                className={`text-xl ${
                  active === id
                    ? "bg-green-300 text-green-900 p-1 rounded-lg"
                    : "text-black"
                }`}
              >
                {icon}
              </div>

              <span
                className={`text-xs ${
                  active === id ? "text-black font-bold" : "text-black"
                }`}
              >
                {label}
              </span>

              {hasNotification && (
                <span className="absolute top-1 right-[30%] bg-green-500 text-white text-[10px] rounded-full px-1">
                  1
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
