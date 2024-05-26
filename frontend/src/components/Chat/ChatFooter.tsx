import { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { ChatEvents } from "./consts";
import { useChatContext } from "../context/chat/chat-context";

export default function ChatFooter({ receiverId }: { receiverId: number }) {
  const { socket, setMessages } = useChatContext();
  const [currentMessage, setCurrentMessage] = useState("");

  useEffect(() => {
    socket.on(
      ChatEvents.ReceiveOpenAiMessage,
      ({ message }: { message: string }) => {
        setCurrentMessage(message);
      },
    );

    return () => {
      socket.off(ChatEvents.ReceiveOpenAiMessage);
    };
  }, [socket, receiverId, setMessages]);

  const handleSubmission = () => {
    const message = currentMessage.trim();
    setCurrentMessage("");

    if (message.length === 0) return;
    socket.emit(ChatEvents.SendMessage, {
      message: currentMessage.trim(),
      to: receiverId,
    });

    setMessages((messages) => [...messages, { text: message, isMe: true }]);
  };

  return (
    <>
      <TextField
        multiline
        maxRows={4}
        fullWidth
        placeholder="Type a message"
        value={currentMessage}
        onChange={(e) => setCurrentMessage(e.target.value)}
      />
      <Button
        disabled={!socket.connected || currentMessage.length === 0}
        variant="contained"
        onClick={handleSubmission}
      >
        Send
      </Button>
    </>
  );
}
