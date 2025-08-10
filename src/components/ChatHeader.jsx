import { faArrowLeft, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import ChatInput from "./ChatInput";
import { setSelectedUser } from "../features/user/userSlice";
import { BigSearchIcon, OptionsIcon } from "../assets/icons";

export default function ChatHeader({ handleBack }) {
  // const userMessages = useSelector((state)=>state.messages?.userMessages)
  const selectedUser = useSelector((state) => state.users?.selectedUser);
  const dispatch = useDispatch();

  const handleCloseChat = () => {
    handleBack()
    dispatch(setSelectedUser(null));
  };

  return (
      <div className="flex items-center justify-between pt-4 pb-4 pr-4 border-b border-background-color bg-white">
        <div className="flex items-center space-x-3">
          <div className="flex">
            <div className="md:hidden block">
              <FontAwesomeIcon
                icon={faArrowLeft}
                onClick={handleCloseChat}
                className="hover:bg-background-color rounded-full p-2 text-lg cursor-pointer"
              />
            </div>
            <div className="w-10 h-10 bg-gray-400 rounded-full"></div>
          </div>
          <div>
            <div className="font-semibold">{selectedUser?.name}</div>
            <div className="text-sm text-gray-500">{selectedUser?.wa_id}</div>
          </div>
        </div>
        <div className="flex items-center space-x-3 text-gray-500">
          <span className="cursor-pointer hover:bg-background-color hover:rounded-full p-2 text-black">
            <BigSearchIcon />
          </span>
          <span className="cursor-pointer hover:bg-background-color hover:rounded-full p-2 text-black">
            <OptionsIcon/>
          </span>
        </div>
      </div>
  );
}
