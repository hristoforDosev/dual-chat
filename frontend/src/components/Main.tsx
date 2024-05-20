import React, { useCallback, useEffect, useState } from "react";
import { localStorageGet, localStorageSet } from "../utils/local-storage";
import { ACCESS_TOKEN } from "../utils/fetch";
import { Button, Grid, Stack } from "@mui/material";
import openSocket from "socket.io-client";
import { getConfig } from "../utils/config";
import Chat from "./Chat";
import ErrorHandler from "./ErrorHandler";

export default function Main({
  setLoggedIn,
}: {
  setLoggedIn: (value: boolean) => void;
}) {
  const [error, setError] = useState<Error>();
  const openSocketConnection = useCallback(
    () =>
      openSocket(getConfig("SOCKET"), {
        path: "/server",
        rejectUnauthorized: false,
        requestTimeout: 5000,
        transports: ["websocket"],
        reconnection: true,
        reconnectionAttempts: 5,
        auth: (cb) => cb({ authentication: localStorageGet(ACCESS_TOKEN) }),
      }),
    [],
  );

  const socket = openSocketConnection();

  useEffect(() => {
    socket.on("connect_error", (data) => {
      localStorageSet(ACCESS_TOKEN, null);
      setLoggedIn(false);
      setError(data);
    });
    socket.on("connect", () => {
      setError(undefined);
    });
  }, [socket, setLoggedIn]);

  return (
    <Stack spacing={2}>
      <Button
        onClick={() => {
          localStorageSet(ACCESS_TOKEN, null);
          setLoggedIn(false);
        }}
      >
        Logout
      </Button>
      <ErrorHandler error={error}>
        <Grid
          container
          spacing={2}
          justifyContent="center"
        >
          <Grid item xs={12} md={6}>
            <Chat
              socket={socket}
              senderId={1}
              receiverId={2}
              title="Participant 1"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Chat
              socket={socket}
              senderId={2}
              receiverId={1}
              title="Participant 2"
            />
          </Grid>
        </Grid>
      </ErrorHandler>
    </Stack>
  );
}
