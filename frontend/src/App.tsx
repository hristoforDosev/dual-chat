import React, { useState } from "react";
import { Container } from "@mui/material";
import Login from "./components/Login";
import Main from "./components/Main";
import { localStorageGet } from "./utils/local-storage";
import { ACCESS_TOKEN } from "./utils/fetch";
import { SnackbarProvider } from "notistack";

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorageGet(ACCESS_TOKEN));

  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Container sx={{ p: 5 }}>
        {loggedIn ? (
          <Main setLoggedIn={setLoggedIn} />
        ) : (
          <Login setLoggedIn={setLoggedIn} />
        )}
      </Container>
    </SnackbarProvider>
  );
}

export default App;
