import { Stack } from "@mui/material";
import Message from "./Message";
import { useChatContext } from "../context/chat/chat-context";
import { useEffect, useRef } from "react";
import { ChatEvents } from "./consts";
import { useSnackbar } from "notistack";

export default function ChatBody({ senderId }: { senderId: number }) {
  const { enqueueSnackbar } = useSnackbar();
  const { socket, messages, setMessages } = useChatContext();
  const scrollRef = useRef<any>(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    socket.on(
      ChatEvents.ReceiveMessage,
      (data: { message: string; receiverId: number }) => {
        setMessages((messages) => [
          ...messages,
          { text: data.message, isMe: false },
        ]);
        enqueueSnackbar(`New message from Participant ${senderId}`, {
          variant: "info",
        });
      },
    );

    return () => {
      socket.off(ChatEvents.ReceiveMessage);
    };
  }, [socket, senderId, setMessages, enqueueSnackbar]);

  return (
    <Stack spacing={2}>
      {messages.map((message, index) => (
        <Stack
          key={index}
          direction="row"
          justifyContent={message.isMe ? "flex-end" : "flex-start"}
        >
          <Message key={index} message={message} />
        </Stack>
      ))}
      <div ref={scrollRef} />
    </Stack>
  );
}
