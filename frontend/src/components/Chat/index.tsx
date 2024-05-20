import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import PersonIcon from "@mui/icons-material/Person";
import { Avatar, CardActions, Divider, Stack, Typography } from "@mui/material";
import ChatFooter from "./ChatFooter";
import { RootProvider } from "../context/root/root-provider";
import { useState } from "react";
import { Socket } from "socket.io-client";
import { MessageType } from "./types";
import ChatBody from "./ChatBody";

export default function Chat({
  socket,
  senderId,
  receiverId,
  title,
}: {
  socket: Socket;
  senderId: number;
  receiverId: number;
  title: string;
}) {
  const [messages, setMessages] = useState<MessageType[]>([]);

  return (
    <RootProvider socket={socket} messages={messages} setMessages={setMessages}>
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
              <ChatBody senderId={senderId} receiverId={receiverId} />
            </CardContent>
          </Stack>
          <Divider />
          <CardActions>
            <ChatFooter senderId={senderId} receiverId={receiverId} />
          </CardActions>
        </Stack>
      </Card>
    </RootProvider>
  );
}
