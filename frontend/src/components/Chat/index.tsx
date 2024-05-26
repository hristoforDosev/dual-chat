import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import PersonIcon from "@mui/icons-material/Person";
import { Avatar, CardActions, Divider, Stack, Typography } from "@mui/material";
import ChatFooter from "./ChatFooter";
import { useEffect, useState } from "react";
import openSocket, { Socket } from "socket.io-client";
import { MessageType } from "./types";
import ChatBody from "./ChatBody";
import { getConfig } from "../../utils/config";
import { localStorageGet, localStorageSet } from "../../utils/local-storage";
import { ACCESS_TOKEN } from "../../utils/fetch";
import { ChatEvents } from "./consts";
import { ChatProvider } from "../context/chat/chat-provider";
import { useRootContext } from "../context/root/root-context";

export default function Chat({
  senderId,
  receiverId,
  title,
}: {
  senderId: number;
  receiverId: number;
  title: string;
}) {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [socket, setSocket] = useState<Socket>();
  const { setError, setLoggedIn } = useRootContext();

  useEffect(() => {
    !socket &&
      setSocket(
        openSocket(getConfig("SOCKET"), {
          path: "/server",
          rejectUnauthorized: false,
          requestTimeout: 5000,
          transports: ["websocket"],
          reconnection: true,
          reconnectionAttempts: 5,
          auth: (cb) => cb({ authentication: localStorageGet(ACCESS_TOKEN) }),
        }),
      );

    return () => {
      socket?.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    socket?.emit(ChatEvents.JoinRoom, { roomName: senderId });
  }, [socket, senderId]);

  useEffect(() => {
    socket?.on("connect_error", (data) => {
      localStorageSet(ACCESS_TOKEN, null);
      setLoggedIn(false);
      setError(data);
    });

    socket?.on("connect", () => {
      setError(undefined);
    });
  }, [socket, setLoggedIn, setError]);

  if (!socket) return null;

  return (
    <ChatProvider socket={socket} messages={messages} setMessages={setMessages}>
      <Card sx={{ width: 1 }}>
        <Stack justifyContent="space-between">
          <Stack>
            <CardHeader
              title={<Typography variant="h6">{title}</Typography>}
              avatar={
                <Avatar>
                  <PersonIcon />
                </Avatar>
              }
            />
            <Divider />
          </Stack>
          <Stack sx={{ height: 455, overflowX: "scroll" }}>
            <CardContent>
              <ChatBody senderId={senderId} />
            </CardContent>
          </Stack>
          <Divider />
          <CardActions>
            <ChatFooter receiverId={receiverId} />
          </CardActions>
        </Stack>
      </Card>
    </ChatProvider>
  );
}
