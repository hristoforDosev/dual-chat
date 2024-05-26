import { useMemo, PropsWithChildren } from "react";
import { RootContext } from "./root-context";
import { RootContextProps } from "./types";

export function RootProvider({
  children,
  setLoggedIn,
  setError,
}: PropsWithChildren<RootContextProps>) {
  const memoizedValue = useMemo(
    () => ({
      setLoggedIn,
      setError,
    }),
    [setLoggedIn, setError],
  );

  return (
    <RootContext.Provider value={memoizedValue}>
      {children}
    </RootContext.Provider>
  );
}
