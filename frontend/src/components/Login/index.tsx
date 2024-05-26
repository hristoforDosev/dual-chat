import { Button, Stack, TextField } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { useState } from "react";
import { ACCESS_TOKEN, fetchApi } from "../../utils/fetch";
import { localStorageSet } from "../../utils/local-storage";
import ErrorHandler from "../ErrorHandler";
import { useRootContext } from '../context/root/root-context';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<Error>();
  const { setLoggedIn } = useRootContext();

  const handleSubmit = async () => {
    fetchApi(`/auth/login`, {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((response) => {
        localStorageSet(ACCESS_TOKEN, response.access_token);
        setLoggedIn(true);
      })
      .catch((error) => setError(error));
  };

  return (
    <ErrorHandler error={error}>
      <Card>
        <CardHeader title="Login" />
        <CardContent>
          <Stack spacing={2}>
            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="contained" onClick={handleSubmit}>
              Login
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </ErrorHandler>
  );
}
