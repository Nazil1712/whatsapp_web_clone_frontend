// ChatMessages.jsx
import React, { useEffect, useRef } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import { useDispatch, useSelector } from "react-redux";
import { SingleCheckIcon, DoubleCheckIcon } from "../assets/icons";
import ChatInput from "./ChatInput";
// import img from "../assets/Whatsapp_default_wallpaper"
import { formatTime, getStatusIcon } from "../utilities/helper";
import { addMessage } from "../features/messages/messageSlice";

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.extend(isToday);
dayjs.extend(isYesterday);

const ChatMessages = ({ socket }) => {
  const userMessages = useSelector((state) => state.messages?.userMessages);
  const selectedUser = useSelector((state) => state.users?.selectedUser);
  // const chats = document.getElementById("chats")
  const dispatch = useDispatch();

  // console.log(chats)

  if (userMessages) {
    // console.log("UserMessages", userMessages);
  }

  useEffect(() => {
    if (!socket) return;

    const handleMessageAdded = ({
      toUserWaId,
      message,
      fromUserWaId,
      timestamp,
    }) => {
      dispatch(
        addMessage({
          from: fromUserWaId,
          to: toUserWaId,
          message,
          createdAt: timestamp,
          status: "sent",
        })
      );
    };

    socket.on("messageAdded", handleMessageAdded);

    // cleanup: remove listener when component unmounts or socket changes
    return () => {
      socket.off("messageAdded", handleMessageAdded);
    };
  }, [socket, dispatch]);

  // Ref to track the last message
  const bottomRef = useRef(null);

  // Group userMessages by date
  const groupedMessages = userMessages?.reduce((groups, msg) => {
    const date = dayjs(msg.createdAt).format("YYYY-MM-DD");
    if (!groups[date]) groups[date] = [];
    groups[date].push(msg);
    return groups;
  }, {});

  // console.log("Grouped Messages", groupedMessages);

  // Helper to format date headings like WhatsApp
  const formatDateHeading = (date) => {
    if (dayjs(date).isToday()) return "Today";
    if (dayjs(date).isYesterday()) return "Yesterday";
    return dayjs(date).format("MMMM D, YYYY");
  };

  if (groupedMessages) {
    Object.keys(groupedMessages).map((v1) => {
      groupedMessages[v1].sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    });
  }

  useEffect(() => {
    if (selectedUser && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "auto", block: "end" });
    }
  }, [userMessages, selectedUser]);

  return (
    <div className="flex flex-col p-4 space-y-6 overflow-y-auto h-[76.8vh] md:h-[77.3vh] bg-chat-bg-color bg-cover">
      {groupedMessages &&
        Object?.keys(groupedMessages)
          .sort((a, b) => dayjs(a).unix() - dayjs(b).unix())
          .map((date) => (
            <div key={date} id="chats">
              {/* Date separator */}
              <div className="flex justify-center mb-4">
                <span className="bg-white text-gray-700 text-xs px-3 py-1 rounded-lg">
                  {formatDateHeading(date)}
                </span>
              </div>

              {/* Messages for that date */}
              {groupedMessages[date].map((msg, idx) => {
                const isFrom = msg.from === selectedUser?.wa_id;

                // console.log("Message", msg);
                // Function to return status icon

                return (
                  <div
                    key={idx}
                    className={`flex ${
                      isFrom ? "justify-start" : "justify-end"
                    } mb-1`}
                  >
                    <div
                      className={`max-w-xs md:max-w-md rounded-lg px-3 py-2 text-sm shadow ${
                        isFrom
                          ? "bg-white text-black rounded-bl-none"
                          : "bg-green-200 text-black rounded-br-none"
                      }`}
                    >
                      <p>{msg.message}</p>
                      <div className="flex items-center justify-end gap-1 text-[10px] text-gray-500">
                        <span>{formatTime(msg.timestamp)}</span>
                        {/* Only show status for outgoing messages */}
                        {!isFrom && getStatusIcon(msg.status)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}

      {/* Empty div to anchor scroll */}
      <div ref={bottomRef} style={{ height: "10px" }} />
    </div>
  );
};

export default ChatMessages;
