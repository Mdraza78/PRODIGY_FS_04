import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";
import { useState } from "react";

const Conversation = ({ conversation, lastIdx, emoji }) => {
	const { selectedConversation, setSelectedConversation } = useConversation();
	const [imageError, setImageError] = useState(false);

	const isSelected = selectedConversation?._id === conversation._id;
	const { onlineUsers } = useSocketContext();
	const isOnline = onlineUsers.includes(conversation._id);

	// Fallback avatar based on gender
	const getFallbackAvatar = () => {
		return conversation.gender === "male" 
			? "https://avatar.iran.liara.run/public/boy" 
			: "https://avatar.iran.liara.run/public/girl";
	};

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