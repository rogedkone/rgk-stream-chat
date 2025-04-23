import { API_LINKS } from "@renderer/shared/consts";
import { useGlobalStores } from "@renderer/store";
import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";
import { authChannel, getUsers, joinChannel } from "./utils";
import { IGoodGameMessage } from "./types";

export const GoodGame = observer(() => {
  const { goodGameStore, appStore } = useGlobalStores();
  const { token } = goodGameStore;
  const wss = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (wss.current) {
      wss.current.close();
    }
    goodGameStore.setField("status", "connecting");
    wss.current = new WebSocket(`${API_LINKS.GoodGameWS}`);

    wss.current.onopen = () => {
      if (wss.current && token) {
        goodGameStore.setField("status", "online");
        authChannel(wss.current, token);
        joinChannel(wss.current, "212066");
        getUsers(wss.current);
      }
    };

    wss.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "message") {
        const message: IGoodGameMessage = data.data;
        appStore.addMessage({
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
      }

      if (data.type === "users_list") {
        const newUsers = data.data.users;
        const oldUsers = goodGameStore.users;

        const newUserIds = new Set(newUsers.map((user) => user.id));
        const oldUserIds = new Set(oldUsers.map((user) => user.id));

        const joinedUsers = newUsers.filter((user) => !oldUserIds.has(user.id));
        const leftUsers = oldUsers.filter((user) => !newUserIds.has(user.id));

        if (joinedUsers.length) {
          appStore.addNotification({
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
          appStore.addNotification({
            id: Date.now(),
            text: `покинул чат`,
            type: "info",
            service: "goodgame",
            timestamp: Date.now(),
            user_name: leftUsers.map((user) => user.name).join(", "),
            sender: "system",
          });
        }

        goodGameStore.setField("clients", data.data.clients_in_channel);
        goodGameStore.setField("users", newUsers);
        goodGameStore.setField("status", "online");
      }
    };

    wss.current.onclose = () => {
      goodGameStore.setField("status", "offline");
    };

    wss.current.onerror = (error) => {
      goodGameStore.setField("status", "error");
      console.error("WebSocket error:", error);
    };

    return () => {
      wss.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return <></>;
});
