import { Socket } from "socket.io-client";
import { MessageType } from "../../Chat/types";
import { Dispatch, SetStateAction } from "react";

export type ChatContextProps = {
  socket: Socket;
  messages: MessageType[];
  setMessages: Dispatch<SetStateAction<MessageType[]>>;
};
