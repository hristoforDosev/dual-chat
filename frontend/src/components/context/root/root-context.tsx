import { createContext, useContext } from "react";
import { RootContextProps } from "./types";

export const RootContext = createContext({} as RootContextProps);

export const useRootContext = () => {
  const context = useContext(RootContext);

  if (!context)
    throw new Error("useRootContext must be use inside RootProvider");

  return context;
};
