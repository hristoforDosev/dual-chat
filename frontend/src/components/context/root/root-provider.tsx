import { useMemo, PropsWithChildren } from "react";
import { RootContext } from "./root-context";
import { RootContextProps } from "./types";

export function RootProvider({
  children,
  socket,
  messages,
  setMessages,
}: PropsWithChildren<RootContextProps>) {
  const memoizedValue = useMemo(
    () => ({
      socket,
      messages,
      setMessages,
    }),
    [socket, messages, setMessages],
  );

  return (
    <RootContext.Provider value={memoizedValue}>
      {children}
    </RootContext.Provider>
  );
}
