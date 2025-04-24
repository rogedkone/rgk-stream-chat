import { type AppStore } from "./app";

export class RootStore {
  constructor(public appStore: AppStore) {}
}
