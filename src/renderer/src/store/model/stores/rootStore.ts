import { type AppStore } from "./app";
import { type GoodGameStore } from "./good-game";

export class RootStore {
  constructor(public goodGameStore: GoodGameStore, public appStore: AppStore) {}
}
