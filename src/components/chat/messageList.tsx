import React from "react";
import { Message } from "../../data/message";
import MessageItem from "./messageItem";

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isLoading }) => {
  return (
    <div>
      {messages.map((message) => (
        <MessageItem
          key={message.id}
          messageSender={message.sender}
          text={message.text}
        />
      ))}
      {isLoading ? (
        <div className="mb-1 row justify-content-start">
          <div className="col-6 bg-primary-subtle text-primary-emphasis rounded-1 ms-2 p-2">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default MessageList;
