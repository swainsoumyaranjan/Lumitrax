import React from "react";
import { Avatar } from "@heroui/react";
import { Chip } from "@heroui/react";

interface ChatMessageProps {
  message: {
    id: string;
    roomId: string;
    sender: {
      id: string;
      name: string;
      avatar: string;
    };
    content: string;
    timestamp: string;
    isCurrentUser?: boolean;
    isMatrixMessage?: boolean; // Added property for Matrix messages
  };
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const formattedTime = new Date(message.timestamp).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  
  // Add Matrix message indicator if needed
  const messageIndicator = message.isMatrixMessage ? (
    <Chip size="sm" variant="flat" color="primary" className="ml-2">Matrix</Chip>
  ) : null;
  
  if (message.isCurrentUser) {
    return (
      <div className="flex flex-row-reverse gap-3">
        <Avatar src={message.sender.avatar} size="sm" className="flex-shrink-0" />
        <div className="flex flex-col items-end max-w-[80%]">
          <div className="bg-primary text-white rounded-2xl rounded-tr-sm px-4 py-2">
            <p>{message.content}</p>
          </div>
          <span className="text-tiny text-default-500 mt-1 flex items-center">
            {formattedTime}
            {messageIndicator}
          </span>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex gap-3">
      <Avatar src={message.sender.avatar} size="sm" className="flex-shrink-0" />
      <div className="flex flex-col max-w-[80%]">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="font-semibold text-small">{message.sender.name}</span>
          <span className="text-tiny text-default-500">{formattedTime}</span>
          {messageIndicator}
        </div>
        <div className="bg-content2 rounded-2xl rounded-tl-sm px-4 py-2">
          <p>{message.content}</p>
        </div>
      </div>
    </div>
  );
};