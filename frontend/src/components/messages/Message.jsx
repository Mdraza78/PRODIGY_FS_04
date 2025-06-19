import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";
import { useEffect, useState } from "react";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const [senderAvatar, setSenderAvatar] = useState("");
  const [receiverAvatar, setReceiverAvatar] = useState("");
  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const bubbleBgColor = fromMe ? "bg-[#7c95c2]" : "bg-[#313b49]";
  const shakeClass = message.shouldShake ? "shake" : "";

  // Generate professional avatars
  useEffect(() => {
    const generateProfessionalAvatar = (user) => {
      if (user.profilePic && !user.profilePic.includes("avatar.iran.liara.run")) {
        return user.profilePic; // Use custom profile pic if available
      }
      // Fallback to professional-style avatar
      const seed = user.username || user.fullName || "default";
      return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(seed)}&fontWeight=500&fontSize=40&backgroundType=gradientLinear&backgroundRotation=45`;
    };

    setSenderAvatar(generateProfessionalAvatar(authUser));
    if (selectedConversation) {
      setReceiverAvatar(generateProfessionalAvatar(selectedConversation));
    }
  }, [authUser, selectedConversation]);

  return (
    <div className={`chat ${chatClassName}`}>
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full'>
          <img
            src={fromMe ? senderAvatar : receiverAvatar}
            alt={fromMe ? "Your profile" : `${selectedConversation?.fullName}'s profile`}
            className="border border-gray-300"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(fromMe ? authUser.fullName : selectedConversation?.fullName)}&background=random&color=fff`;
            }}
          />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>
        {message.message}
      </div>
      <div className='chat-footer text-gray-800 text-xs flex gap-1 items-center'>
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;