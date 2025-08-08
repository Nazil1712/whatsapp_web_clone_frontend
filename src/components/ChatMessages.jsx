// ChatMessages.jsx
import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import { useSelector } from "react-redux";
import { SingleCheckIcon, DoubleCheckIcon } from "../assets/icons";
// import img from "../assets/Whatsapp_default_wallpaper"

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.extend(isToday);
dayjs.extend(isYesterday);

const ChatMessages = () => {
  const userMessages = useSelector((state) => state.messages?.userMessages);
  const selectedUser = useSelector((state) => state.users?.selectedUser);

  // console.log("Messages in window",userMessages)
  // Group userMessages by date
  const groupedMessages = userMessages?.reduce((groups, msg) => {
    const date = dayjs(msg.createdAt).format("YYYY-MM-DD");
    if (!groups[date]) groups[date] = [];
    groups[date].push(msg);
    return groups;
  }, {});

  // console.log("Grouped Messages",groupedMessages)

  // Helper to format date headings like WhatsApp
  const formatDateHeading = (date) => {
    if (dayjs(date).isToday()) return "Today";
    if (dayjs(date).isYesterday()) return "Yesterday";
    return dayjs(date).format("MMMM D, YYYY");
  };

  // Helper to format time like "11:05 am"
  const formatTime = (ts) => dayjs(ts).format("h:mm a");

  if (groupedMessages) {
    // console.log("Sorted Messages",Object?.keys(groupedMessages)
    // .sort((a, b) => dayjs(a).unix() - dayjs(b).unix()))
    // const sortedDates = Object?.keys(groupedMessages)
    //   .sort((a, b) => dayjs(a).unix() - dayjs(b).unix())
    // console.log("Sorted Dates",sortedDates)
  }

  return (
    <div
      className="flex flex-col p-4 space-y-6 overflow-y-auto h-full bg-[#efeae2] bg-cover"
    >
      {groupedMessages &&
        Object?.keys(groupedMessages)
          .sort((a, b) => dayjs(a).unix() - dayjs(b).unix())
          .map((date) => (
            <div key={date}>
              {/* Date separator */}
              <div className="flex justify-center mb-4">
                <span className="bg-white text-gray-700 text-xs px-3 py-1 rounded-lg">
                  {formatDateHeading(date)}
                </span>
              </div>

              {/* Messages for that date */}
              {groupedMessages[date].map((msg, idx) => {
                const isFrom = msg.from === selectedUser?.wa_id;

                console.log("Message", msg);
                // Function to return status icon
                const getStatusIcon = (status) => {
                  switch (status) {
                    case "sent":
                      return (
                        <span className="text-gray-500">
                          <SingleCheckIcon />
                        </span>
                      );
                    case "delivered":
                      return (
                        <span className="text-gray-500">
                          <DoubleCheckIcon />
                        </span>
                      );
                    case "read":
                      return (
                        <span className="text-blue-500">
                          <DoubleCheckIcon />
                        </span>
                      );
                    default:
                      return null;
                  }
                };

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
    </div>
  );
};

export default ChatMessages;
