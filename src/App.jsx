import { useEffect, useState } from "react";
import IconStrip from "./components/IconStrip";
import Sidebar from "./components/Sidebar";
import ChatHeader from "./components/ChatHeader";
import ChatMessages from "./components/ChatMessages";
import ChatInput from "./components/ChatInput";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsersAsync } from "./features/user/userSlice";
import ChatWindow from "./components/ChatWindow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DefaultChatWindow from "./components/DefaultChatWindow";
import { io } from "socket.io-client";
import { fetchMessagesByUserIdAsync } from "./features/messages/messageSlice";

const socket = io.connect("http://localhost:5000");

export default function App() {
  const [selectedUser, setSelectedUser] = useState(null);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const [currentUser, setCurrentUser] = useState({
    wa_id: "918329446654",
    name: "Nazil Dhalwala",
    socketId: socket?.id,
    isOn: true,
  });
  // const [userName, setUserName] = useState("Nazil");

  // console.log("Users in APp", users)

  console.log("Selected User",selectedUser)

  socket.on("connect", () => {
    // console.log("User connected frontend", socket);
    // console.log("User connected frontend", socket?.id);
  });

  const handleSelectUser = (userId) => {
    setSelectedUser(userId);
  };

  const handleBack = () => {
    setSelectedUser(null);
  };

  useEffect(() => {
    if (users == null) {
      dispatch(fetchAllUsersAsync());
    }
  }, [dispatch, users]);

  useEffect(()=>{
    socket.on("messageAdded",()=>{
      console.log("New Message Added into database")

      // dispatch(fetchMessagesByUserIdAsync(selectedUser?.wa_id))
    })

    console.log("UseEffect() callled.....")
  },[dispatch,selectedUser])

  return (
    <div className="flex overflow-hidden">
      {/* Left Icon Strip - hidden on mobile */}
      <div className="hidden md:flex">
        <IconStrip />
      </div>

      {/* Sidebar */}
      <div
        className={`w-full md:w-[30%] ${
          selectedUser ? "hidden md:block" : "block"
        }`}
      >
        <Sidebar setSelectedUser={setSelectedUser} />
      </div>

      {/* Chat window */}
      <div
        className={`flex-1 flex-col w-full md:flex ${
          selectedUser ? "flex" : "hidden md:flex"
        }`}
      >
        {!selectedUser && <DefaultChatWindow />}
        {selectedUser && (
          <div className="flex flex-col flex-1 bg-chatbg">
            {/* Show back button only on mobile */}
            {/* <div className="md:hidden p-2 bg-white border-b">
              <button
                className="text-blue-600 text-sm"
                onClick={handleBack}
              >
                ← Back to chats
              </button>
            </div> */}
            <ChatWindow handleBack={handleBack} socket={socket} currentUser={currentUser}/>
          </div>
        )}
      </div>
    </div>
  );
}
