import { IFollowerEvent, IMessageEvent, IUsersListEvent } from "../types";
import { AppStore, ServiceStore } from "@renderer/store/model/stores";

const follower = (data: IFollowerEvent["data"], store: AppStore) => {
  store.addNotification({
    id: Date.now(),
    text: `подписался`,
    type: "info",
    service: "goodgame",
    timestamp: Date.now(),
    user_name: data.username,
    sender: "system",
  });
};

const message = (data: IMessageEvent["data"], store: AppStore) => {
  const message = data;
  store.addMessage({
    id: message.message_id,
    text: message.text,
    icon: message.icon,
    channel_id: message.channel_id,
    user_id: message.user_id,
    user_name: message.user_name,
    timestamp: Date.now(),
    service: "goodgame",
    sender: "user",
  });
};

const usersList = (
  data: IUsersListEvent["data"],
  store: AppStore,
  serviceStore: ServiceStore
) => {
  const newUsers = data.users;

  const oldUsers = serviceStore.users;

  const newUserIds = new Set(newUsers.map((user) => user.id));
  const oldUserIds = new Set(oldUsers.map((user) => user.id));

  const joinedUsers = newUsers.filter((user) => !oldUserIds.has(user.id));
  const leftUsers = oldUsers.filter((user) => !newUserIds.has(user.id));

  if (joinedUsers.length) {
    store.addNotification({
      id: Date.now(),
      text: `присоединился к чату`,
      type: "info",
      service: "goodgame",
      timestamp: Date.now(),
      user_name: joinedUsers.map((user) => user.name).join(", "),
      sender: "system",
    });
  }

  if (leftUsers.length) {
    store.addNotification({
      id: Date.now(),
      text: `покинул чат`,
      type: "info",
      service: "goodgame",
      timestamp: Date.now(),
      user_name: leftUsers.map((user) => user.name).join(", "),
      sender: "system",
    });
  }

  serviceStore.setField("guests", data.clients_in_channel);
  serviceStore.setField(
    "users",
    newUsers.map(({ id, avatar, name, username }) => ({
      id,
      avatar,
      name,
      username,
    }))
  );
};

export const eventParser = (
  event: string,
  data: IFollowerEvent | IMessageEvent,
  store: AppStore,
  serviceStore: ServiceStore
) => {
  const events = {
    follower,
    message,
    users_list: usersList,
  };

  return events[event]?.(data, store, serviceStore) ?? undefined;
};
