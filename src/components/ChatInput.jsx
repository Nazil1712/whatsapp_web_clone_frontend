import { useEffect, useRef, useState } from "react";
import { MicIcon, PlusIcon, SendMessageIcon } from "../assets/icons";
import { useSelector } from "react-redux";

export default function ChatInput({ socket, currentUser }) {
  const selectedUser = useSelector((state) => state.users?.selectedUser);
  // console.log("From input button ", socket.id)

  // console.log("CUrrent user", currentUser)

  const [message, setMessage] = useState("");
  // console.log(new Date().toString())

  // Create a reference for the input
  const inputRef = useRef(null);

  // Focus on the input when the component mounts or selectedUser changes
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [selectedUser]); // runs every time a chat window changes

  const sendMessge = () => {
    // console.log("selected User", selectedUser);
    const timestamp = new Date().toString();
    if (selectedUser && message) {
      socket.emit("sendMessage", {
        toUserWaId: selectedUser.wa_id,
        message,
        fromUserWaId: currentUser.wa_id,
        timestamp,
      });
      setMessage(""); // Clear input after sending
      inputRef.current?.focus(); // keep focus after sending
    }
  };

  const handleKeyPress = (e) =>{
    if(e.key=="Enter") {
      sendMessge()
    }
  }

  return (
    <div className="p-4 bg-chat-bg-color flex items-center space-x-2">
      <button className="text-black hover:rouned-full p-2 cursor-pointer">
        <PlusIcon />
      </button>
      <input
        ref={inputRef} // attach the ref here
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
        onKeyDown={handleKeyPress}
        className="flex-1 rounded-full px-4 py-2 bg-white focus:outline-none"
      />
      {message === "" ? (
        <button className="text-black p-2 hover:bg-green-600 hover:text-white hover:rounded-full cursor-pointer">
          <MicIcon />
        </button>
      ) : (
        <button
          className="bg-green-600 text-white rounded-full p-2 hover:opacity-70 cursor-pointer"
          onClick={sendMessge}
        >
          <SendMessageIcon />
        </button>
      )}
    </div>
  );
}
