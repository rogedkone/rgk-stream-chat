import { observer } from "mobx-react-lite";
import { useGlobalStores } from "@renderer/store";

import s from "./_chat.module.scss";
import { Flex } from "antd";
import { useEffect, useRef } from "react";
import { Entities } from "@renderer/entities";

export const Chat = observer(() => {
  const { appStore } = useGlobalStores();
  const { messages, notifications } = appStore;
  const chatMessages = [...messages, ...notifications].sort(
    (a, b) => a.timestamp - b.timestamp
  );

  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container.current) {
      container.current.scrollTop = container.current.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <Flex vertical className={s.chat} ref={container}>
      {chatMessages.map((message) => (
        <div key={message.id}>
          {message.sender === "system" ? (
            <Entities.Chat.Message.System
              service="goodgame"
              user_name={message.user_name}
              text={message.text}
            />
          ) : (
            <Entities.Chat.Message.User
              service="goodgame"
              user_name={message.user_name}
              text={message.text}
            />
          )}
        </div>
      ))}
    </Flex>
  );
});
