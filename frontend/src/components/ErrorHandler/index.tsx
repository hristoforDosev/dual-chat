import { PropsWithChildren, useEffect, useState } from "react";
import { Alert, Stack } from "@mui/material";

export default function ErrorHandler({
  error,
  children,
}: PropsWithChildren<{ error?: Error }>) {
  const [showError, setShowError] = useState(!!error);

  useEffect(() => {
    setShowError(!!error);
  }, [error, setShowError]);

  if (!showError) {
    return <>{children}</>;
  }

  return (
    <Stack spacing={2}>
      <Alert severity="error" onClose={() => setShowError(false)}>
        {error?.message || ""}
      </Alert>
      {children}
    </Stack>
  );
}
