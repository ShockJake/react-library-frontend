import React from "react";

interface MessageItemProps {
  messageSender: string;
  text: string;
}

const MessageItem: React.FC<MessageItemProps> = ({ messageSender, text }) => {
  if (messageSender === "assistant") {
    return (
      <div className="mb-1 row justify-content-start">
        <div className="col-6 bg-primary-subtle text-primary-emphasis rounded-1 ms-2 p-2">
          {text}
        </div>
      </div>
    );
  }
  return (
    <div className="mb-1 row justify-content-end">
      <div className="col-6 bg-primary text-white rounded-1 p-2 me-2">
        {text}
      </div>
    </div>
  );
};

export default MessageItem;
