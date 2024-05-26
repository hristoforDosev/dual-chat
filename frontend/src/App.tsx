import React, { useState } from "react";
import { Button, Container, Grid, Stack } from "@mui/material";
import Login from "./components/Login";
import { localStorageGet, localStorageSet } from "./utils/local-storage";
import { ACCESS_TOKEN } from "./utils/fetch";
import { SnackbarProvider } from "notistack";
import ErrorHandler from "./components/ErrorHandler";
import Chat from "./components/Chat";
import { RootContext } from "./components/context/root/root-context";

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorageGet(ACCESS_TOKEN));
  const [error, setError] = useState<Error>();

  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Container sx={{ p: 5 }}>
        <RootContext.Provider value={{ setLoggedIn, setError }}>
          {loggedIn ? (
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
                <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={12} md={6}>
                    <Chat senderId={1} receiverId={2} title="Participant 1" />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Chat senderId={2} receiverId={1} title="Participant 2" />
                  </Grid>
                </Grid>
              </ErrorHandler>
            </Stack>
          ) : (
            <Login />
          )}
        </RootContext.Provider>
      </Container>
    </SnackbarProvider>
  );
}

export default App;
