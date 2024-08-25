import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import ChatModal from "./chatModal";

interface ChatProps {
  isAuthenticated: boolean;
}

const ChatItem: React.FC<ChatProps> = ({ isAuthenticated }) => {
  const [showChatModal, setShowChatModal] = useState<boolean>(false);

  if (!isAuthenticated) {
    return <div></div>;
  }
  const handleShowChatModal = () => setShowChatModal(true);
  const handleCloseChatModal = () => setShowChatModal(false);

  return (
    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
      <Button
        variant="primary"
        className="position-fixed bottom-0 end-0 float-end me-3 mb-3"
        onClick={handleShowChatModal}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="currentColor"
          className="bi bi-chat-left-dots"
          viewBox="0 -2 20 20"
        >
          <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
          <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
        </svg>
        Assistant
      </Button>
      <ChatModal show={showChatModal} handleClose={handleCloseChatModal} />
    </div>
  );
};

export default ChatItem;
