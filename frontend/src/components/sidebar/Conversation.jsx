import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";
import { useState, useEffect } from "react";

const Conversation = ({ conversation, lastIdx, emoji }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const [avatarUrl, setAvatarUrl] = useState("");
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);
  const isSelected = selectedConversation?._id === conversation._id;

  // Generate professional avatar
  useEffect(() => {
    const generateProfessionalAvatar = () => {
      if (conversation.profilePic && !conversation.profilePic.includes("avatar.iran.liara.run")) {
        return conversation.profilePic; // Use custom profile pic if available
      }
      // Fallback to professional-style avatar
      const seed = conversation.username || conversation.fullName || "default";
      return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(seed)}&fontWeight=500&fontSize=40&backgroundType=gradientLinear&backgroundRotation=45`;
    };

    setAvatarUrl(generateProfessionalAvatar());
  }, [conversation]);

  return (
    <>
      <div
        className={`flex gap-2 items-center rounded p-2 py-1 cursor-pointer ${
          isSelected ? "bg-[#A2B9E7]" : "hover:bg-[#A2B9E7]"
        }`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className='w-12 rounded-full'>
            <img 
              src={avatarUrl}
              alt={`${conversation.fullName}'s profile`}
              className="border border-gray-300"
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(conversation.fullName)}&background=random&color=fff`;
              }}
            />
          </div>
        </div>

        <div className='flex flex-col flex-1'>
          <div className='flex gap-3 justify-between'>
            <p className={`font-bold text-slate-700 ${isSelected ? 'text-slate-800' : ''}`}>
              {conversation.fullName}
            </p>
            <span className='text-xl text-slate-700'>{emoji}</span>
          </div>
        </div>
      </div>
      {!lastIdx && <div className='divider my-0 py-0 h-1 bg-slate-300' />}
    </>
  );
};

export default Conversation;