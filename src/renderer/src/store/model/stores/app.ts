import { IGoodGameMessage } from "@renderer/features/services/good-game/types";
import { makeAutoObservable } from "mobx";

interface INotification {
  id: number;
  text: string;
  type: "success" | "error" | "warning" | "info";
  user_name: string;
  timestamp: number;
  service: "goodgame";
  sender: "system";
}

interface IMessage
  extends Pick<
    IGoodGameMessage,
    "text" | "icon" | "channel_id" | "user_id" | "user_name" | "timestamp"
  > {
  id: number;
  service: "goodgame";
  sender: "user";
}

export class AppStore {
  isMaximized: boolean = false;
  services: Set<string> = new Set(["goodgame"]);
  notifications: INotification[] = [];
  messages: IMessage[] = [];
  screen: "chat" | "settings" = "chat";

  constructor() {
    makeAutoObservable(this);
  }

  setField<K extends keyof this>(field: K, value: this[K]) {
    this[field] = value;
  }

  addMessage(message: IMessage) {
    this.messages.push(message);
  }

  addNotification(notification: INotification) {
    this.notifications.push(notification);
  }
}
