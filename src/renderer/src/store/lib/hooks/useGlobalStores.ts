import { StoreContext } from "@renderer/store";
import React from "react";

export const useGlobalStores = () => {
  const context = React.useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStore должен использоваться внутри StoreProvider");
  }
  return context;
};
