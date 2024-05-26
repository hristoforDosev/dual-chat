import { Dispatch, SetStateAction } from "react";

export type RootContextProps = {
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<Error | undefined>>;
};
