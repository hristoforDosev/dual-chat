import { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { ChatEvents } from "./consts";
import { useRootContext } from "../context/root/root-context";

export default function ChatFooter({
  senderId,
  receiverId,
}: {
  senderId: number;
  receiverId: number;
}) {
  const { socket, setMessages } = useRootContext();
  const [currentMessage, setCurrentMessage] = useState("");

  useEffect(() => {
    socket.on(
      ChatEvents.ReceiveOpenAiMessage,
      ({
        message,
        senderId: socketSenderId,
      }: {
        message: string;
        senderId: number;
      }) => {
        senderId !== socketSenderId && setCurrentMessage(message);
      },
    );

    return () => {
      socket.off(ChatEvents.ReceiveOpenAiMessage);
    };
  }, [socket, senderId, receiverId, setMessages]);

  const handleSubmission = () => {
    const message = currentMessage.trim();
    setCurrentMessage("");

    if (message.length === 0) return;
    socket.emit(ChatEvents.SendMessage, {
      message: currentMessage.trim(),
      senderId,
      receiverId,
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
