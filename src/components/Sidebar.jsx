import { useDispatch, useSelector } from "react-redux";
import { fetchMessagesByUserIdAsync } from "../features/messages/messageSlice";
import { fetchUserByIdAsync } from "../features/user/userSlice";
import {
  NewChat,
  OptionsIcon,
  SearchIcon,
  WhatsAppIcon,
} from "../assets/icons";

export default function Sidebar({setSelectedUser}) {
  const users = useSelector((state) => state.users.users);
  const selectedUser = useSelector((state) => state.users?.selectedUser);

  const dispatch = useDispatch();

  const handleClick = (user) => {
    // console.log("User Id",userId)
    setSelectedUser(user);
    dispatch(fetchMessagesByUserIdAsync(user?.wa_id));
    dispatch(fetchUserByIdAsync(user?.wa_id));
  };

  return (
    <div className="h-screen bg-white border-r border-background-color flex flex-col">
      {/* <div className="border-b"> */}
      {/* Top Bar */}
      {/* Header */}
      <div className="flex items-center justify-between px-3 sm:px-4  m-1 sm:m-2">
        <div className="text-green-600 text-lg sm:text-xl font-bold">
          <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7" />
        </div>
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="p-2 rounded-full hover:bg-background-color cursor-pointer">
            <NewChat className="w-5 h-5 sm:w-6 sm:h-6 " />
          </div>
          <div className="p-2 rounded-full hover:bg-background-color cursor-pointer">
            <OptionsIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-3 sm:px-4 py-2">
        <div className="flex items-center bg-background-color rounded-full px-2 sm:px-3 py-1.5 sm:py-2">
          <SearchIcon className="text-gray-500 w-4 h-4 sm:w-5 sm:h-5" />
          <input
            type="text"
            placeholder="Search or start a new chat"
            className="bg-transparent outline-none w-full text-sm sm:text-base pl-3 sm:pl-4 p-0.5 text-gray-800"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 px-3 sm:px-4 pb-2 text-xs sm:text-sm">
        {["All", "Unread", "Favourites", "Groups"].map((tab, index) => (
          <button
            key={tab}
            className={`px-2 sm:px-3 py-1 rounded-full transition-colors duration-200 ${
              index === 0
                ? "bg-green-100 text-green-700 border border-border-color"
                : "bg-white text-gray-700 border border-border-color"
            }
            hover:bg-background-color cursor-pointer
            `}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* </div> */}

      <div className="overflow-y-auto flex-1 custom-scrollbar max-h-[100vh]">
        {users?.map((user) => (
          <div
            key={user.id}
            className={`flex items-center px-4 py-3 hover:bg-background-color hover:rounded-lg cursor-pointer transition-all duration-200 ml-4 mr-4 ${
              selectedUser?.wa_id === user?.wa_id
                ? "bg-background-color rounded-lg"
                : ""
            }`}
            onClick={() => handleClick(user)}
          >
            <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0" />
            <div className="ml-4 flex-1 overflow-hidden">
              <div className="font-semibold text-sm sm:text-base truncate">
                {user.name}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 truncate">
                {user.wa_id}
              </div>
            </div>
            {/* <div className="text-[10px] sm:text-xs text-gray-400 ml-2 flex-shrink-0">
              11:00 am
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}
