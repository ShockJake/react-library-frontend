import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Message } from "../../data/message";
import MessageList from "./messageList";

import { askAssistant, getState, getResponse } from "../../services/chat";

interface ChatModalProps {
  show: boolean;
  handleClose: () => void;
}

async function waitForState(id: string): Promise<void> {
  let state = "";
  for (let i = 0; i < 6; i++) {
    state = await getState(id);
    if (state !== "WAITING_FOR_RESPONSE") {
      break;
    }
    await new Promise((r) => setTimeout(r, 30000));
  }
  if (state !== "COMPLETED") {
    throw new Error("Assistant cannot respond to given propmt...");
  }
}

async function sendMessage(
  query: string,
  startStateCallback: (text: string) => void,
): Promise<void> {
  let response;

  try {
    console.log("Sending message to assistant");
    const id = await askAssistant(query);
    console.log("Waiting for state to be COMPLETED");
    await waitForState(id);
    console.log("Getting response");
    response = await getResponse(id);
  } catch (error: any) {
    response = error.message;
  } finally {
    startStateCallback(response);
  }
}

const ChatModal: React.FC<ChatModalProps> = ({ show, handleClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, sender: "assistant", text: "Hi, how can I help you?" },
  ]);
  const [inputValue, setInputValue] = useState<string>("");
  const [readOnly, setReadOnly] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleReturningToStartState = (text: string) => {
    console.log("Got response: ", text);
    messages.push({ id: messages.length, sender: "assistant", text: text });
    const updatedMessages = messages;
    setMessages(updatedMessages);
    setReadOnly(false);
    setLoading(false);
  };

  const handleSendMessage = () => {
    if (inputValue === "") {
      return;
    }
    messages.push({ id: messages.length, sender: "user", text: inputValue });
    const updatedMessages = messages;
    setMessages(updatedMessages);
    sendMessage(inputValue, handleReturningToStartState);
    setInputValue("");
    setReadOnly(true);
    setLoading(true);
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      scrollable
      centered
      className="modal-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-person-square"
            viewBox="0 0 20 22"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
          </svg>
          Book Assistant
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container bg-body-tertiary rounded-1 pb-2 pt-2">
          <MessageList messages={messages} isLoading={loading} />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="input-group mb-3">
          <input
            className="form-control"
            aria-label="Write your question"
            aria-describedby="button-addon2"
            value={inputValue}
            onChange={handleInputChange}
            readOnly={readOnly}
          />
          <button
            className="btn btn-outline-primary"
            type="button"
            id="button-addon2"
            onClick={handleSendMessage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-send"
              viewBox="-1 -1 20 20"
            >
              <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
            </svg>
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ChatModal;
