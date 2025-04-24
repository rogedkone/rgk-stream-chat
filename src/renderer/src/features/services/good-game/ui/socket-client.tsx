import { ServiceStore, useGlobalStores } from "@renderer/store";
import { observer } from "mobx-react-lite";
import { authChannel, getUsers, joinChannel } from "../lib";
import { useEffect, useRef } from "react";
import { API_LINKS } from "@renderer/shared/consts";
import { eventParser } from "./events";

type TSocketClientProps = {
  token: string;
  store: ServiceStore;
};

export const SocketClient = observer(({ token, store }: TSocketClientProps) => {
  const { appStore } = useGlobalStores();
  const wssRef = useRef<WebSocket | null>(null);
  const userTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (wssRef.current !== null) {
      wssRef.current.close();
    }

    wssRef.current = new WebSocket(`${API_LINKS.GoodGameWS}`);

    const wss = wssRef.current;

    wss.onopen = () => {
      store.setField("status", "online");
      authChannel(wss, token);
      joinChannel(wss, "212066");
      userTimerRef.current = getUsers(wss);
    };

    wss.onmessage = (event) => {
      const data = JSON.parse(event.data);

      eventParser(data.type, data.data, appStore, store);
    };

    wss.onclose = () => {
      store.setField("status", "offline");
      if (userTimerRef.current) {
        clearTimeout(userTimerRef.current);
        userTimerRef.current = null;
      }
    };

    wss.onerror = () => {
      store.setField("status", "error");
    };

    return () => {
      if (wssRef.current !== null) {
        wssRef.current.close();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.token]);

  return <></>;
});
