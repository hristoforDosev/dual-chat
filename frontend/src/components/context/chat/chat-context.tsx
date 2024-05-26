import { createContext, useContext } from "react";
import { ChatContextProps } from "./types";

export const ChatContext = createContext({} as ChatContextProps);

export const useChatContext = () => {
  const context = useContext(ChatContext);

  if (!context)
    throw new Error("useChatContext must be use inside ChatProvider");

  return context;
};
