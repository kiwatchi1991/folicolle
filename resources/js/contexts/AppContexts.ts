import { createContext } from "react";

type ContextProps = {
  state: any,
  dispatch: any,
};

const AppContext = createContext<Partial<ContextProps>>({});

export default AppContext;
