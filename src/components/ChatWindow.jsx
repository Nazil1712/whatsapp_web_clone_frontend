import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";

export default function ChatWindow({handleBack}) {
  // const userMessages = useSelector((state)=>state.messages?.userMessages)
  // const selectedUser = useSelector((state)=>state.users?.selectedUser)

  // console.log("user messages ", userMessages)
  return (
    <>
      <ChatHeader handleBack={handleBack}/>
      <ChatMessages />
      <ChatInput/>
    </>
  )
}
