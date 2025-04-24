import { StoreContext } from "./model/context";
import { RootStore, AppStore } from "./model/stores";

interface IStoreProviderProps {
  children: React.ReactNode;
}
export const StoreProvider = (props: IStoreProviderProps) => {
  const { children } = props;
  const rootStore = new RootStore(new AppStore());

  return (
    <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
  );
};
