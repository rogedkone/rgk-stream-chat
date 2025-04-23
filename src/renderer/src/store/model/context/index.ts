import React from "react";

import { RootStore } from "../stores";

export const StoreContext = React.createContext<RootStore | undefined>(
  undefined
);
