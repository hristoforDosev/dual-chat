import { useMemo, PropsWithChildren } from "react";
import { ChatContext } from "./chat-context";
import { ChatContextProps } from "./types";

export function ChatProvider({
  children,
  socket,
  messages,
  setMessages,
}: PropsWithChildren<ChatContextProps>) {
  const memoizedValue = useMemo(
    () => ({
      socket,
      messages,
      setMessages,
    }),
    [socket, messages, setMessages],
  );

  return (
    <ChatContext.Provider value={memoizedValue}>
      {children}
    </ChatContext.Provider>
  );
}
